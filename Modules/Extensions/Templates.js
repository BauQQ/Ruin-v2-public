/*
 * Templates Extension
 */

class Templates{

    constructor(){
        

        Character.GetTemplate();        
        let setting = Templates.GetModuleSetting();
        
        Actions.Add(setting.id, Templates.OnLoad);
        Settings.Add(setting.id, setting.type, setting.defaultvalue, setting.description, setting.hidden, setting.parent, setting.name, setting.handler, null, setting.action, setting.order);
        
        Settings.Add("mytemplatespacer", "spacer", null, "", false, setting.id, "My Templates", null, null, null, 35);
        Settings.Add("mytemplateswind", "ButtonLeft", null, "", false, setting.id, "Select Templates", null, null, null, 36);
        Settings.Add("savetemplateas", "ButtonLeft", null, "", false, setting.id, "Save Template", null, null, null, 37);
        Settings.Add("deletetemplates", "ButtonLeft", null, "", false, setting.id, "Delete Template", null, null, null, 38);
        Settings.Add("importtemplatewind", "ButtonLeft", null, "", false, setting.id, "Import Template", null, null, null, 39);
        Settings.Add("exporttemplatewind", "ButtonLeft", null, "", false, setting.id, "Export Template", null, null, null, 40);
    }
    
    static GetModuleSetting(){
        return {id: "emc-templates", type: null, defaultvalue: null, description:"Template tool", hidden : false, name :"Templates", parent: null, handler: 1, action:true, order:90};
    }

    static async OnLoad(){
        Input.BindOnClick($(`div[data-action="exporttemplate"]`), Templates.Export);
        Input.BindOnClick($(`div[data-action="addtemplatebutton"]`), Templates.Import);
        Input.BindOnClick($(`div[data-action="mytemplateswind"]`), Templates.SelectTemplateWindow);
        Input.BindOnClick($(`div[data-action="importtemplatewind"]`), Templates.ImportTemplateWindow);
        Input.BindOnClick($(`div[data-action="exporttemplatewind"]`), Templates.ExportTemplateWindow);
        Input.BindOnClick($(`div[data-action="savetemplateas"]`), Templates.SaveTemplateWindow);
        Input.BindOnClick($(`div[data-action="deletetemplates"]`), Templates.DeleteTemplateWindow);
    }

    static LoadTemplates(){
        TemplatesLog = Storage.Get(MemKeys.Templates);
        if(TemplatesLog==undefined || TemplatesLog==null || TemplatesLog==''){
            TemplatesLog = {};
        }else{
            TemplatesLog = $.parseJSON(TemplatesLog);
        }
    }

    static async Export(){
        let output = Base64.Encode(JSON.stringify(await Templates.Pack()));
        Utility.Copy(output);
        alert("Ui templated copied to clipboard");
    }

    static async Pack(){
        let jsString = {
            ui: {},
            se: {}
        };
        $.each(Gstate.mod.chars[CharID].ui, function(key, value){
            jsString.ui[key] = {};
            if(value.top!==undefined && value.top!==null){
                jsString.ui[key].t = value.top;
            }
            if(value.left!==undefined && value.left!==null){
                jsString.ui[key].l = value.left;                
            }
        });        

        $.each(Gstate.mod.chars[CharID].settings, function(key, val) {
            $.each(val, function(k, v){
                if(v!==null && v.hasOwnProperty('value') && v.value!==null){
                    jsString.se[k] = v.value;
                }
            });
        });    
        return jsString;    
    }

    static async Import(event, template = null){
        /*if(template==null){
            template = $('.settings_textarea_addtemplate').val();
            template = $.parseJSON(Base64.Decode(template));
        }*/
        if(UI.Exist(template)){            
            if(template.hasOwnProperty('ui')){
                $.each(template.ui, function(key, val) {
                    if(Gstate.mod.chars[CharID].ui.hasOwnProperty(key)){
                        Gstate.mod.chars[CharID].ui[key].top = val.t;
                        Gstate.mod.chars[CharID].ui[key].left = val.l;
                    }
                });
            }

            if(template.hasOwnProperty('se')){
                $.each(template.se, function(key, val) {
                    if(Settings.Check(key)){
                        
                        for(let [k, v] of Object.entries(Gstate.mod.chars[CharID].settings)){
                            if(v.hasOwnProperty(key)){
                                Gstate.mod.chars[CharID].settings[k][key].value = val;
                            }
                        }
                    }
                });
            }

            Storage.Save();
            UI.Reload();
        }
    }

    static CloseAllWindows(){
        $(`.emc-savetemplate`).length && $(`.emc-savetemplate`).remove();
        $(`.emc-exporttemplate`).length && $(`.emc-exporttemplate`).remove();
        $(`.emc-importtemplate`).length && $(`.emc-importtemplate`).remove();
        $(`.emc-mytemplates`).length && $(`.emc-mytemplates`).remove();
        $(`.emc-deletetemplate`).length && $(`.emc-deletetemplate`).remove();
        Templates.LoadTemplates();
    }

    static templateDropdown(key, data, selected){
        let html = "";
        html += Elements.Build("sdropdownOption", {value:"", selected:"", text:""});          
        if(data!==null){
            $.each(data, function(hand, value){
                if(selected==hand){
                    html += Elements.Build("sdropdownOption", {value:hand, selected:"selected", text:hand}); 
                }else{
                    html += Elements.Build("sdropdownOption", {value:hand, selected:"", text:hand});
                }            
            });
        }       
        let element = Elements.Build("sdropdown", {cls:`dropdown_${key}`, action:"", html:html});
        return element;
    }

    static async SaveTemplateWindow(){         
        Templates.CloseAllWindows(); 
        const buildData = {
            name : "Save Template",
            cls : "emc-savetemplate",
            svelte: "emc-savetemplate",
            base : "windowPanel",
            nx: "savetemplateswindow",
            close: Classes.closefeature,
            internal : "new_script_internal",
            modable : true,
            size:{
                width:0,
                height:0
            },
            resize:true,
            position:{
                top: 150,
                left: 150
            }
        };

        let innerHTML = "";

        let description = Elements.Build("description", {cls:``, text:"type in a template name"});
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Name: ${description}`});

        innerHTML += Elements.xInput(`${buildData.nx}`, {type:`${buildData.cls}`, value:""});
           
        innerHTML += Elements.ButtonRight("savetemplate", {name:"Save As"});

        innerHTML = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${buildData.nx} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        $(`.${buildData.cls}`).length && $(`.${buildData.cls}`).remove();

        await Modal.Create(buildData, {html:innerHTML}, false, true);
        $(`.panel_${buildData.nx}`).show();

        if(!Gstate.mod.chars[CharID].ui[buildData.nx]){
            Gstate.mod.chars[CharID].ui[buildData.nx] = {top:buildData.position.top, left:buildData.position.left};
            Storage.Save();
        }
        
        let element = $(`.${buildData.cls}`)[0];
        $(`.panel_${buildData.nx}`).show();
        UI.WindowOpened(buildData.name.toLowerCase());
        $(element).css({ width:350+"px", top: Gstate.mod.chars[CharID].ui[buildData.nx].top, left: Gstate.mod.chars[CharID].ui[buildData.nx].left});

        Input.BindOnClick($(`div[data-action="savetemplate"]`), Templates.SaveTemplate); 

        if(!$(element).is(":visible")){
            $(element).show();
        }
    }

    static async ExportTemplateWindow(){         
        Templates.CloseAllWindows(); 
        const buildData = {
            name : "Export Template",
            cls : "emc-exporttemplate",
            svelte: "emc-exporttemplate",
            base : "windowPanel",
            nx: "exporttemplateswindow",
            close: Classes.closefeature,
            internal : "new_script_internal",
            modable : true,
            size:{
                width:0,
                height:0
            },
            resize:true,
            position:{
                top: 150,
                left: 150
            }
        };

        let innerHTML = "";     

        let description = Elements.Build("description", {cls:``, text:"Select a saved template"});
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Templates: ${description}`});

        innerHTML += Templates.templateDropdown("exportmytemplates", TemplatesLog, "");

        innerHTML += Elements.ButtonRight("exporttemplatexx", {name:"Export"});

        innerHTML = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${buildData.nx} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        $(`.${buildData.cls}`).length && $(`.${buildData.cls}`).remove();

        await Modal.Create(buildData, {html:innerHTML}, false, true);
        $(`.panel_${buildData.nx}`).show();

        if(!Gstate.mod.chars[CharID].ui[buildData.nx]){
            Gstate.mod.chars[CharID].ui[buildData.nx] = {top:buildData.position.top, left:buildData.position.left};
            Storage.Save();
        }
        
        let element = $(`.${buildData.cls}`)[0];
        $(`.panel_${buildData.nx}`).show();
        UI.WindowOpened(buildData.name.toLowerCase());
        $(element).css({ width:350+"px", top: Gstate.mod.chars[CharID].ui[buildData.nx].top, left: Gstate.mod.chars[CharID].ui[buildData.nx].left});

        Input.BindOnClick($(`div[data-action="exporttemplatexx"]`), Templates.ExportTemplate); 

        if(!$(element).is(":visible")){
            $(element).show();
        }
    }

    static async ImportTemplateWindow(){         
        Templates.CloseAllWindows(); 
        const buildData = {
            name : "Import Template",
            cls : "emc-importtemplate",
            svelte: "emc-importtemplate",
            base : "windowPanel",
            nx: "importtemplateswindow",
            close: Classes.closefeature,
            internal : "new_script_internal",
            modable : true,
            size:{
                width:0,
                height:0
            },
            resize:true,
            position:{
                top: 150,
                left: 150
            }
        };

        let innerHTML = "";       
        
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Template Name:`});
        innerHTML += Elements.xInput(`${buildData.nx}`, {type:`${buildData.cls}`, value:""});   

        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Import string:`});
        innerHTML += Elements.xTextarea("importtextfield", null);    
           
        innerHTML += Elements.ButtonRight("importtemplatexx", {name:"Import"});

        innerHTML = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${buildData.nx} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        $(`.${buildData.cls}`).length && $(`.${buildData.cls}`).remove();

        await Modal.Create(buildData, {html:innerHTML}, false, true);
        $(`.panel_${buildData.nx}`).show();

        if(!Gstate.mod.chars[CharID].ui[buildData.nx]){
            Gstate.mod.chars[CharID].ui[buildData.nx] = {top:buildData.position.top, left:buildData.position.left};
            Storage.Save();
        }
        
        let element = $(`.${buildData.cls}`)[0];
        $(`.panel_${buildData.nx}`).show();
        UI.WindowOpened(buildData.name.toLowerCase());
        $(element).css({ width:350+"px", top: Gstate.mod.chars[CharID].ui[buildData.nx].top, left: Gstate.mod.chars[CharID].ui[buildData.nx].left});

        Input.BindOnClick($(`div[data-action="importtemplatexx"]`), Templates.ImportTemplate); 

        if(!$(element).is(":visible")){
            $(element).show();
        }
    }

    static async DeleteTemplateWindow(){
        Templates.CloseAllWindows(); 
        const buildData = {
            name : "Delete Template",
            cls : "emc-deletetemplate",
            svelte: "emc-deletetemplate",
            base : "windowPanel",
            nx: "deletetemplatewindow",
            close: Classes.closefeature,
            internal : "new_script_internal",
            modable : true,
            size:{
                width:0,
                height:0
            },
            resize:true,
            position:{
                top: 150,
                left: 150
            }
        };

        let setTemplate = Character.GetTemplate();
        let innerHTML = "";            

        let description = Elements.Build("description", {cls:``, text:"Delete a saved template"});
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Templates: ${description}`});

        let selected = "";
        if(setTemplate!==null){
            selected = setTemplate;
        }

        innerHTML += Templates.templateDropdown("deletemytemplates", TemplatesLog, selected);
           
        innerHTML += Elements.ButtonRight("deletetemplate", {name:"Delete"});

        innerHTML = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${buildData.nx} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        
        $(`.${buildData.cls}`).length && $(`.${buildData.cls}`).remove();

        await Modal.Create(buildData, {html:innerHTML}, false, true);

        if(!Gstate.mod.chars[CharID].ui[buildData.nx]){
            Gstate.mod.chars[CharID].ui[buildData.nx] = {top:buildData.position.top, left:buildData.position.left};
            Storage.Save();
        }
        
        let element = $(`.${buildData.cls}`)[0];
        $(`.panel_${buildData.nx}`).show();
        UI.WindowOpened(buildData.name.toLowerCase());

        Input.BindOnClick($(`div[data-action="deletetemplate"]`), Templates.DeleteTemplate); 

        if(!$(element).is(":visible")){
            $(element).show();
        }
    }

    static async SelectTemplateWindow(){
        Templates.CloseAllWindows(); 

        const buildData = {
            name : "Select Template",
            cls : "emc-mytemplates",
            svelte: "emc-mytemplates",
            base : "windowPanel",
            nx: "mytemplateswindow",
            close: Classes.closefeature,
            internal : "new_script_internal",
            modable : true,
            size:{
                width:0,
                height:0
            },
            resize:true,
            position:{
                top: 150,
                left: 150
            }
        };

        let setTemplate = Character.GetTemplate();
        let innerHTML = "";            

        let description = Elements.Build("description", {cls:``, text:"Select a saved template"});
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Templates: ${description}`});

        let selected = "";
        if(setTemplate!==null){
            selected = setTemplate;
        }
        innerHTML += Templates.templateDropdown("mystoredtemplates", TemplatesLog, selected);
           
        innerHTML += Elements.ButtonRight("selecttemplate", {name:"Select"});

        innerHTML = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${buildData.nx} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        $(`.${buildData.cls}`).length && $(`.${buildData.cls}`).remove();

        await Modal.Create(buildData, {html:innerHTML}, false, true);

        if(!Gstate.mod.chars[CharID].ui[buildData.nx]){
            Gstate.mod.chars[CharID].ui[buildData.nx] = {top:buildData.position.top, left:buildData.position.left};
            Storage.Save();
        }
        
        let element = $(`.${buildData.cls}`)[0];
        $(`.panel_${buildData.nx}`).show();
        UI.WindowOpened(buildData.name.toLowerCase());

        Input.BindOnClick($(`div[data-action="selecttemplate"]`), Templates.SelectTemplate); 
            
        if(!$(element).is(":visible")){
            $(element).show();
        }
    }

    static async DeleteTemplate(){
        let tempstr = $('.dropdown_deletemytemplates').val();
        if(!Utility.isEmpty(tempstr)){            
            delete TemplatesLog[tempstr];
            Storage.Set(MemKeys.Templates, JSON.stringify(TemplatesLog));
            Storage.Save();
        }        
        Templates.CloseAllWindows();
    }

    static async SaveTemplate(){
        let tempstr = $('.emc-savetemplate_savetemplateswindow').val(); 
        if(!Utility.isEmpty(tempstr)){
            TemplatesLog[tempstr] = await Templates.Pack();
            Storage.Set(MemKeys.Templates, JSON.stringify(TemplatesLog));
        }
        Templates.CloseAllWindows();
    }

    static async SelectTemplate(){
        let tempstr = $('.dropdown_mystoredtemplates').val();
        if(!Utility.isEmpty(tempstr)){
            Character.SetTemplate(tempstr);
            Templates.Import(null, TemplatesLog[tempstr]);
        }        
        Templates.CloseAllWindows();
    }    

    static async ImportTemplate(){
        let tempstr = $('.emc-importtemplate_importtemplateswindow').val(); 
        let template = $('.settings_textarea_importtextfield').val();

        if(UI.Exist(template)){      
            if(UI.Exist(tempstr)){
                TemplatesLog[tempstr] = $.parseJSON(Base64.Decode(template));                
                Storage.Set(MemKeys.Templates, JSON.stringify(TemplatesLog));
            }
        }
        Templates.CloseAllWindows();
    }

    static async ExportTemplate(){
        let tempstr = $('.dropdown_exportmytemplates').val();
        if(!Utility.isEmpty(tempstr) && TemplatesLog.hasOwnProperty(tempstr)){
            let output = Base64.Encode(JSON.stringify(TemplatesLog[tempstr]));
            Utility.Copy(output);
            alert("Ui templated copied to clipboard");
        }        
        Templates.CloseAllWindows();
    }
}
