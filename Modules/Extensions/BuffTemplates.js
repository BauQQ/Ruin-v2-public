class BuffTemplates{
    constructor(){
        let setting = BuffTemplates.GetModuleSetting();
        
        Actions.Add(setting.id, BuffTemplates.OnLoad);
        Settings.Add(setting.id, setting.type, setting.defaultvalue, setting.description, setting.hidden, setting.parent, setting.name, setting.handler, null, setting.action, setting.order);
      
        Settings.Add("mybufftemplatespacer", "spacer", null, "", false, setting.id, "My Templates", null, null, null, 35);
        Settings.Add("mybufftemplateswind", "ButtonLeft", null, "", false, setting.id, "Select Templates", null, null, null, 36);
        Settings.Add("savebufftemplateas", "ButtonLeft", null, "", false, setting.id, "Save Template", null, null, null, 37);
        Settings.Add("deletebufftemplates", "ButtonLeft", null, "", false, setting.id, "Delete Template", null, null, null, 38);
        Settings.Add("importbufftemplatewind", "ButtonLeft", null, "", false, setting.id, "Import Template", null, null, null, 39);
        Settings.Add("exportbufftemplatewind", "ButtonLeft", null, "", false, setting.id, "Export Template", null, null, null, 40);
    }

    static GetModuleSetting(){
        return {id: "emc-bufftemplate", type: null, defaultvalue: null, description:"BuffTracker Template Tool", hidden : false, name :"Buff Templates", parent: null, handler: 1, action:true, order:92};
    }

    static OnLoad(){
        Input.BindOnClick($(`div[data-action="exporttemplate"]`), BuffTemplates.Export);
        Input.BindOnClick($(`div[data-action="addtemplatebutton"]`), BuffTemplates.Import);

        Input.BindOnClick($(`div[data-action="mybufftemplateswind"]`), BuffTemplates.SelectTemplateWindow);
        Input.BindOnClick($(`div[data-action="savebufftemplateas"]`), BuffTemplates.SaveTemplateWindow);
        Input.BindOnClick($(`div[data-action="deletebufftemplates"]`), BuffTemplates.DeleteTemplateWindow);
        
        Input.BindOnClick($(`div[data-action="importbufftemplatewind"]`), BuffTemplates.ImportTemplateWindow);
        Input.BindOnClick($(`div[data-action="exportbufftemplatewind"]`), BuffTemplates.ExportTemplateWindow);
    }

    static LoadTemplates(){
        BuffTemplatesLog = Storage.Get(MemKeys.BuffTemplate);
        if(BuffTemplatesLog==undefined || BuffTemplatesLog==null || BuffTemplatesLog==''){
            BuffTemplatesLog = {};
        }else{
            BuffTemplatesLog = $.parseJSON(BuffTemplatesLog);
        }
    }

    static async Export(){
        let output = Base64.Encode(JSON.stringify(await BuffTemplates.Pack()));
        Utility.Copy(output);
        alert("Ui templated copied to clipboard");
    }

    static async Pack(){        
        return Storage.Get(`${MemKeys.Bufftracker}${Player.Name()}`);  
    }

    static async Import(event, template = null){
        if(UI.Exist(template)){    
            BuffTrackerArgs = $.parseJSON(template);
            BuffTracker.SaveBuffTrackerArray();
            UI.Reload();
        }
    }

    static CloseAllWindows(){
        $(`.emc-buffsavetemplate`).length && $(`.emc-buffsavetemplate`).remove();
        $(`.emc-buffexporttemplate`).length && $(`.emc-buffexporttemplate`).remove();
        $(`.emc-buffimporttemplate`).length && $(`.emc-buffimporttemplate`).remove();
        $(`.emc-buffmytemplates`).length && $(`.emc-buffmytemplates`).remove();
        $(`.emc-buffdeletetemplate`).length && $(`.emc-buffdeletetemplate`).remove();
        BuffTemplates.LoadTemplates();
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
        
        BuffTemplates.CloseAllWindows(); 
        let windowData = {
            id  : "emc-buffsavetemplate",
            cls : "emc-buffsavetemplate",
            n : "savetemplateswindow",
            text : `Save Template`,
            html : "",
            close : Classes.closefeature
        };  
        let innerHTML = "";

        let description = Elements.Build("description", {cls:``, text:"type in a template name"});
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Name: ${description}`});

        innerHTML += Elements.xInput(`${windowData.n}`, {type:`${windowData.cls}`, value:""});
           
        innerHTML += Elements.ButtonRight("savetemplate", {name:"Save As"});

        windowData.html = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${windowData.n} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        $(`.${windowData.cls}`).length && $(`.${windowData.cls}`).remove();

        let html = Elements.Build("windowPanel", windowData);

        UI.Append(`${Classes.uibase}:first`, html);
        UI.CloseElementDelegation($(`.${windowData.cls}`));

        if(!Gstate.mod.chars[CharID].ui[windowData.n]){
            Gstate.mod.chars[CharID].ui[windowData.n] = {top:50, left:150};
            Storage.Save();
        }

        $(`.${windowData.cls}`).css({ width:350+"px", top: Gstate.mod.chars[CharID].ui[windowData.n].top, left: Gstate.mod.chars[CharID].ui[windowData.n].left});
        let handle = $($(`.${windowData.cls}`)).find(`.${Classes.windowHandle}`)[0];
        Customizer.AddDrag($(`.${windowData.cls}`), handle, windowData.n);
        Input.BindOnClick($(`div[data-action="savetemplate"]`), BuffTemplates.SaveTemplate); 

        $(`.${windowData.cls}`).show();
        $(`.panel_${windowData.n}`).show();
    }

    static async ExportTemplateWindow(){ 
        
        BuffTemplates.CloseAllWindows(); 
        let windowData = {
            id  : "emc-buffexporttemplate",
            cls : "emc-buffexporttemplate",
            n : "exporttemplateswindow",
            text : `Export Template`,
            html : "",
            close : Classes.closefeature
        };  
        let setTemplate = Character.GetTemplate();
        let innerHTML = "";     

        let description = Elements.Build("description", {cls:``, text:"Select a saved template"});
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Templates: ${description}`});

        innerHTML += BuffTemplates.templateDropdown("exportmytemplates", BuffTemplatesLog, "");

        innerHTML += Elements.ButtonRight("exporttemplatexx", {name:"Export"});

        windowData.html = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${windowData.n} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        $(`.${windowData.cls}`).length && $(`.${windowData.cls}`).remove();

        let html = Elements.Build("windowPanel", windowData);

        UI.Append(`${Classes.uibase}:first`, html);
        UI.CloseElementDelegation(`.${windowData.cls}`);

        if(!Gstate.mod.chars[CharID].ui[windowData.n]){
            Gstate.mod.chars[CharID].ui[windowData.n] = {top:50, left:150};
            Storage.Save();
        }

        $(`.${windowData.cls}`).css({ width:350+"px", top: Gstate.mod.chars[CharID].ui[windowData.n].top, left: Gstate.mod.chars[CharID].ui[windowData.n].left});
        let handle = $($(`.${windowData.cls}`)).find(`.${Classes.windowHandle}`)[0];
        Customizer.AddDrag($(`.${windowData.cls}`), handle, windowData.n);
        Input.BindOnClick($(`div[data-action="exporttemplatexx"]`), BuffTemplates.ExportTemplate); 

        $(`.${windowData.cls}`).show();
        $(`.panel_${windowData.n}`).show();
    }

    static async ImportTemplateWindow(){ 
        
        BuffTemplates.CloseAllWindows(); 
        let windowData = {
            id  : "emc-buffimporttemplate",
            cls : "emc-buffimporttemplate",
            n : "importtemplateswindow",
            text : `Import Template`,
            html : "",
            close : Classes.closefeature
        };  
        let setTemplate = Character.GetTemplate();
        let innerHTML = "";       
        
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Template Name:`});
        innerHTML += Elements.xInput(`${windowData.n}`, {type:`${windowData.cls}`, value:""});   

        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Import string:`});
        innerHTML += Elements.xTextarea("importtextfield", null);    
           
        innerHTML += Elements.ButtonRight("importtemplatexx", {name:"Import"});

        windowData.html = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${windowData.n} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        $(`.${windowData.cls}`).length && $(`.${windowData.cls}`).remove();

        let html = Elements.Build("windowPanel", windowData);

        UI.Append(`${Classes.uibase}:first`, html);
        UI.CloseElementDelegation($(`.${windowData.cls}`));

        if(!Gstate.mod.chars[CharID].ui[windowData.n]){
            Gstate.mod.chars[CharID].ui[windowData.n] = {top:50, left:150};
            Storage.Save();
        }

        $(`.${windowData.cls}`).css({ width:350+"px", top: Gstate.mod.chars[CharID].ui[windowData.n].top, left: Gstate.mod.chars[CharID].ui[windowData.n].left});
        let handle = $($(`.${windowData.cls}`)).find(`.${Classes.windowHandle}`)[0];
        Customizer.AddDrag($(`.${windowData.cls}`), handle, windowData.n);
        Input.BindOnClick($(`div[data-action="importtemplatexx"]`), BuffTemplates.ImportTemplate); 

        $(`.${windowData.cls}`).show();
        $(`.panel_${windowData.n}`).show();
    }

    static async DeleteTemplateWindow(){
        BuffTemplates.CloseAllWindows(); 
        let windowData = {
            id  : "emc-buffdeletetemplate",
            cls : "emc-buffdeletetemplate",
            n : "deletetemplatewindow",
            text : `Delete Template`,
            html : "",
            close : Classes.closefeature
        };  
        let setTemplate = Character.GetTemplate();
        let innerHTML = "";            

        let description = Elements.Build("description", {cls:``, text:"Delete a saved template"});
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Templates: ${description}`});

        let selected = "";
        if(setTemplate!==null){
            selected = setTemplate;
        }

        innerHTML += BuffTemplates.templateDropdown("deletemytemplates", BuffTemplatesLog, selected);
           
        innerHTML += Elements.ButtonRight("deletetemplate", {name:"Delete"});

        windowData.html = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${windowData.n} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        $(`.${windowData.cls}`).length && $(`.${windowData.cls}`).remove();

        let html = Elements.Build("windowPanel", windowData);

        UI.Append(`${Classes.uibase}:first`, html);
        UI.CloseElementDelegation($(`.${windowData.cls}`));

        if(!Gstate.mod.chars[CharID].ui[windowData.n]){
            Gstate.mod.chars[CharID].ui[windowData.n] = {top:50, left:150};
            Storage.Save();
        }

        $(`.${windowData.cls}`).css({ width:350+"px", top: Gstate.mod.chars[CharID].ui[windowData.n].top, left: Gstate.mod.chars[CharID].ui[windowData.n].left});
        let handle = $($(`.${windowData.cls}`)).find(`.${Classes.windowHandle}`)[0];
        Customizer.AddDrag($(`.${windowData.cls}`), handle, windowData.n);
        Input.BindOnClick($(`div[data-action="deletetemplate"]`), BuffTemplates.DeleteTemplate); 

        $(`.${windowData.cls}`).show();
        $(`.panel_${windowData.n}`).show();
    }

    static async SelectTemplateWindow(){
        BuffTemplates.CloseAllWindows(); 
        let windowData = {
            id  : "emc-buffmytemplates",
            cls : "emc-buffmytemplates",
            n : "mytemplateswindow",
            text : `Select Template`,
            html : "",
            close : Classes.closefeature
        };  
        //let setTemplate = Character.GetTemplate();
        let innerHTML = "";            

        let description = Elements.Build("description", {cls:``, text:"Select a saved template"});
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Templates: ${description}`});

        let selected = "";
        /*if(setTemplate!==null){
            selected = "";
        }*/

        innerHTML += BuffTemplates.templateDropdown("mystoredtemplates", BuffTemplatesLog, selected);
           
        innerHTML += Elements.ButtonRight("selecttemplate", {name:"Select"});

        windowData.html = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${windowData.n} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        $(`.${windowData.cls}`).length && $(`.${windowData.cls}`).remove();

        let html = Elements.Build("windowPanel", windowData);

        UI.Append(`${Classes.uibase}:first`, html);
        UI.CloseElementDelegation($(`.${windowData.cls}`));

        if(!Gstate.mod.chars[CharID].ui[windowData.n]){
            Gstate.mod.chars[CharID].ui[windowData.n] = {top:50, left:150};
            Storage.Save();
        }

        $(`.${windowData.cls}`).css({ width:350+"px", top: Gstate.mod.chars[CharID].ui[windowData.n].top, left: Gstate.mod.chars[CharID].ui[windowData.n].left});
        let handle = $($(`.${windowData.cls}`)).find(`.${Classes.windowHandle}`)[0];
        Customizer.AddDrag($(`.${windowData.cls}`), handle, windowData.n);
        Input.BindOnClick($(`div[data-action="selecttemplate"]`), BuffTemplates.SelectTemplate); 

        $(`.${windowData.cls}`).show();
        $(`.panel_${windowData.n}`).show();
    }

    static async DeleteTemplate(){
        let tempstr = $('.dropdown_deletemytemplates').val();
        if(!Utility.isEmpty(tempstr)){            
            delete BuffTemplatesLog[tempstr];
            Storage.Set(MemKeys.BuffTemplate, JSON.stringify(BuffTemplatesLog));
            Storage.Save();
        }        
        BuffTemplates.CloseAllWindows();
    }

    static async SaveTemplate(){
        let tempstr = $('.emc-buffsavetemplate_savetemplateswindow').val(); 
        if(!Utility.isEmpty(tempstr)){
            BuffTemplatesLog[tempstr] = await BuffTemplates.Pack();
            Storage.Set(MemKeys.BuffTemplate, JSON.stringify(BuffTemplatesLog));
        }
        BuffTemplates.CloseAllWindows();
    }

    static async SelectTemplate(){
        let tempstr = $('.dropdown_mystoredtemplates').val();
        if(!Utility.isEmpty(tempstr)){
            //Character.SetTemplate(tempstr);
            BuffTemplates.Import(null, BuffTemplatesLog[tempstr]);
        }        
        BuffTemplates.CloseAllWindows();
    }    

    static async ImportTemplate(){
        let tempstr = $('.emc-buffimporttemplate_importtemplateswindow').val(); 
        let template = $('.settings_textarea_importtextfield').val();

        if(UI.Exist(template)){      
            if(UI.Exist(tempstr)){
                BuffTemplatesLog[tempstr] = $.parseJSON(Base64.Decode(template));                
                Storage.Set(MemKeys.BuffTemplate, JSON.stringify(BuffTemplatesLog));
            }
        }
        BuffTemplates.CloseAllWindows();
    }

    static async ExportTemplate(){
        let tempstr = $('.dropdown_exportmytemplates').val();
        if(!Utility.isEmpty(tempstr) && BuffTemplatesLog.hasOwnProperty(tempstr)){
            let output = Base64.Encode(JSON.stringify(BuffTemplatesLog[tempstr]));
            Utility.Copy(output);
            alert("Ui templated copied to clipboard");
        }        
        BuffTemplates.CloseAllWindows();
    }
}