class CustomJs{
    constructor(){        

        let setting = CustomJs.GetModuleSetting();

        Actions.Add(setting.id, CustomJs.OnLoad);
        Settings.Add(setting.id, setting.type, setting.defaultvalue, setting.description, setting.hidden, setting.parent, setting.name, setting.handler, null, setting.action, setting.order);
        
        Actions.Add("customJsSelect", CustomJs.LoadSelectedScript);
        Settings.Add("customJsFirstSpacer", "SoloSpacer", null, "", false, setting.id, "SELECTED SCRIPT SETUP", null, null, null, 1);
        Settings.Add("customJsSelect", "ScriptDropdown", "", " ", false, setting.id, "", null, [""], null, 2);

        Actions.Add("add_script_button", CustomJs.NewScriptBuilderWindow);
        Settings.Add("add_script_button", "Add_script_button", null, "", false, setting.id, "+ Add Snippet", null, null, null, 3);
        
        Settings.Add("customJsSnippetList", "EmptyDiv", "", "", false, setting.id, "emptyDiv", null, null, null, 11);
        Settings.Add("specialSoloSpaceCustomJs", "SoloSpacer", null, "", false, setting.id, "", null, null, null, 12);
        Settings.Add("customJsLowerButtons", "CustomJsLowerButtons", "", "", false, setting.id, "customJsLowerButtons", null, null, null, 13);

        CustomJs.LoadScripts(setting);
    }

    static GetModuleSetting(){
        return {id: "emc-customjs", type: null, defaultvalue: null, description:"Custom JS Tool", hidden : false, name :"JS Customizer", parent: null, handler: 1, action:true, order:94};
    }

    static async LoadScripts(setting){
        PlayerScripts = await Storage.Get(`${MemKeys.CustomJs}${Player.Name()}_scripts`);
        if(UI.Exist(PlayerScripts)){
            PlayerScripts = JSON.parse(PlayerScripts);
        }else{
            PlayerScripts = {};
        }

        AllSnippets = await Storage.Get(`${MemKeys.CustomJs}${Player.Name()}_snippets`);
        if(UI.Exist(AllSnippets)){
            AllSnippets = JSON.parse(AllSnippets);
        }else{
            AllSnippets = {};
        }
        
        CustomJs.LoadSelectedScript(Settings.Get("customJsSelect"));
        CustomJs.RunScripts();
    }

    static async SaveScripts(){
        Storage.Set(`${MemKeys.CustomJs}${Player.Name()}_scripts`, JSON.stringify(PlayerScripts));
        Storage.Set(`${MemKeys.CustomJs}${Player.Name()}_snippets`, JSON.stringify(AllSnippets));
    }

    static OnLoad(){
        Input.DelegateClick($(`.script_dropdown_container .add_new_script`), $(`.script_dropdown_container .add_new_script`), CustomJs.NewScriptWindow);
        
        Input.DelegateClick($(`.script_dropdown_container .import_script`), $(`.script_dropdown_container .import_script`), CustomJs.ImportWindow);

        Input.DelegateClick($(`.solospacer_addScript .add_script_button`), $(`.solospacer_addScript .add_script_button`), CustomJs.NewScriptBuilderWindow);
        
        Input.DelegateClick($(`.customJsLowerButtons .customJsDeleteButton`), $(`.customJsLowerButtons .customJsDeleteButton`), CustomJs.DeleteScript);

        Input.DelegateClick($(`.customJsLowerButtons .customJsExportButton`), $(`.customJsLowerButtons .customJsExportButton`), CustomJs.ExportScript);

        CustomJs.LoadSelectedScript();
    }

    static async RunScripts(){
        let scriptId = Settings.Get("customJsSelect");
        let evalScript = "";
        let innerHtmlScript = "";
        if(typeof scriptId != undefined && !Utility.isEmpty(scriptId)){
            let script = PlayerScripts[scriptId];
            if(typeof script != undefined && !Utility.isEmpty(script)){
                $.each(script.snippets, (index, snippetId)=>{
                    if(AllSnippets.hasOwnProperty(snippetId)){
                        let snippet = AllSnippets[snippetId];
                        if(typeof snippet != undefined && !Utility.isEmpty(snippet)){
                            if(snippet.active){
                                if(snippet.eval){
                                    evalScript += snippet.code;
                                }else{
                                    innerHtmlScript += snippet.code;
                                }
                            }                            
                        }
                    }
                });
                eval(evalScript);
                let scriptEl = document.createElement('script');
                scriptEl.innerHTML = innerHtmlScript;
                document.body.appendChild(scriptEl);
            }
        }          
    }

    static async NewScriptBuilderWindow(event, snippetId = null){        
        let scriptId = Settings.Get("customJsSelect");
        if(typeof scriptId != undefined && !Utility.isEmpty(scriptId)){
            const buildData = {
                name : "Script Builder",
                cls : "r2_script_builder",
                svelte: "r2_script_builder",
                base : "windowPanel",
                nx: "script_builder",
                close: Classes.closefeature,
                internal : "script_builder_internal",
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
            }

            let name = "";
            let addButton = "Add Snippet"
            let evalTick = "";
            //let exec_time = "0.0";
            let scriptSnippet = "";

            if(snippetId!=null){
                if(!AllSnippets.hasOwnProperty(snippetId)){
                    return;
                }
                let snippet = AllSnippets[snippetId];
                if(AllSnippets[snippetId].eval){
                    evalTick = "active";
                }
                name = AllSnippets[snippetId].name;
                addButton = "Update Snippet"
                scriptSnippet = AllSnippets[snippetId].code;
            }

            let innerHtml = ``;
            innerHtml += await Elements.Build("ptextbox", {cls:`${buildData.cls}_snippet_name`, value:name, placeholder:"Snippet Name"});

            //innerHtml += await Elements.Build("settingTitle", {cls:`${buildData.cls}_exec_time_title`, text:`Execution Time: ${Elements.Build("description", {cls:``, text:"Set when to execute custom js, float (0 as soon as possible)"})}`});
            //innerHtml += await Elements.Build("decimaltextbox", {cls:`${buildData.cls}_exec_time`, value:exec_time});

            let tickBox = await Elements.Build("tickbox", {cls:`${buildData.cls}_evalTick ${evalTick}`});
            innerHtml += await Elements.Build("settingTitle", {cls:`${buildData.cls}_eval_use_title`, text:`Eval Usage: ${Elements.Build("description", {cls:``, text:"Enables eval() in the execution"})} ${tickBox}`});

            innerHtml += await Elements.Build("settingTitle", {cls:`${buildData.cls}_code_title`, text:`Your Code: ${Elements.Build("description", {cls:``, text:"Custom javascript code to execute"})}`});
            innerHtml += await Elements.Build("customjsInput", {identifier:`${buildData.cls}_cjs`, action:"", rows:`14`, cols:`40`,text:scriptSnippet});
            
            innerHtml += Elements.Build("hiddeninput",  {a:`value="${snippetId}"`, n:"snippetId"});
            innerHtml += Elements.Build("buttonSingle",  {cls:`${buildData.cls}_add_button` ,action:`${buildData.cls}_add_button`, text:addButton});

            await Modal.Create(buildData, {html:innerHtml}, false, true);

            let tick = $(`.${buildData.cls}_evalTick`)[0];

            if(UI.Exist(tick)){
                $(tick).undelegate(tick, "click");
                $(tick).delegate(tick, "click", function (event) {            
                    if ($(tick).hasClass("active")) {
                        $(tick).removeClass("active");
                    }else{
                        $(tick).addClass("active");
                    }
                });
            }

            let element = $(`.${buildData.cls}`)[0];

            if(UI.Exist(element)){
                $(`.${buildData.cls}`).css({ width:550+"px", "z-index": 99});
                UI.WindowOpened(buildData.name.toLowerCase());
                if(snippetId!=null){

                    Input.BindOnClick($(`div[data-action="${buildData.cls}_add_button"]`), CustomJs.UpdateScriptSnippet); 
                }else{
                    Input.BindOnClick($(`div[data-action="${buildData.cls}_add_button"]`), CustomJs.GenerateScriptPart);                    
                } 
                if(!$(element).is(":visible")){
                    $(element).show();
                }
            }        
        }
    }

    static async UpdateScriptSnippet(event){
        let parentWindow = $(event.target).closest(".window");
        let windowID = $(parentWindow).attr("id");
        let GenID = $(`#${windowID} .hidden_input_snippetId`).val();
        if(windowID!==null || typeof windowID!==undefined){
            if(AllSnippets.hasOwnProperty(GenID)){
                AllSnippets[GenID].name = $(`#${windowID} .r2_script_builder_snippet_name`).val();
                //AllSnippets[GenID].exec_time = $(`#${windowID} .r2_script_builder_exec_time`).val();
                AllSnippets[GenID].eval = $(`#${windowID} .r2_script_builder_evalTick`).hasClass("active");
                AllSnippets[GenID].code = $(`#${windowID} .settings_textarea_r2_script_builder_cjs`).val();
            }
        }
        $(parentWindow).hide();
        CustomJs.SaveScripts();
        
        Interaction.CloseWindow("script builder");        
        $(parentWindow).remove();
        CustomJs.LoadSelectedScript();
    }

    static async GenerateScriptPart(event){
        let scriptId = Settings.Get("customJsSelect");
        let GenID = Utility.GenID(AllSnippets, null);
        let parentWindow = $(event.target).closest(".window");
        let windowID = $(parentWindow).attr("id");
        if(windowID!==null || typeof windowID!==undefined){
            AllSnippets[GenID] = {
                id: GenID,
                name: $(`#${windowID} .r2_script_builder_snippet_name`).val(),
                //exec_time: $(`#${windowID} .r2_script_builder_exec_time`).val(),
                eval: $(`#${windowID} .r2_script_builder_evalTick`).hasClass("active"),
                code: $(`#${windowID} .settings_textarea_r2_script_builder_cjs`).val(),
                active: true
            }
            PlayerScripts[scriptId].snippets.push(GenID);
        }
        $(parentWindow).hide(); 
        CustomJs.SaveScripts();
        
        Interaction.CloseWindow("script builder");        
        $(parentWindow).remove();
        CustomJs.LoadSelectedScript();
    }

    static async ImportWindow(){
        const buildData = {
            name : "Import Script",
            cls : "r2_import_script",
            base : "windowPanel",
            svelte: "r2_import_script",
            nx: "import_script",
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

        let innerHtml = await Elements.Build("ptextbox", {cls:`${buildData.cls}_script_name`, value:"", placeholder:"Script Name"});
        innerHtml += await Elements.Build("settingTitle", {cls:`${buildData.cls}_code_title`, text:`Your Import String: ${Elements.Build("description", {cls:``, text:"The string you got from an exported script"})}`});
        innerHtml += await Elements.Build("customjsInput", {identifier:`${buildData.cls}_import_text`, action:"", rows:`14`, cols:`40`, text:""});
        
        innerHtml += Elements.Build("buttonSingle",  {cls:`${buildData.cls}_add_button` ,action:`${buildData.cls}_add_button`, text:"Import"});
        
        await Modal.Create(buildData, {html:innerHtml}, false, true);
        
        let element = $(`.${buildData.cls}`)[0];

        if(UI.Exist(element)){
            $(`.${buildData.cls}`).css({ width:550+"px", "z-index": 99});
            UI.WindowOpened(buildData.name.toLowerCase());
            
            Input.BindOnClick($(`div[data-action="${buildData.cls}_add_button"]`), CustomJs.ImportReader); 
            if(!$(element).is(":visible")){
                $(element).show();
            }
        }        
    }

    static async ImportReader(event){
        let parentWindow = $(event.target).closest(".window");
        let windowID = $(parentWindow).attr("id");
        let scriptName = $(`#${windowID} .r2_import_script_script_name`).val();
        let scriptString = $(`#${windowID} .settings_textarea_r2_import_script_import_text`).val();
        $(parentWindow).hide();          
        Interaction.CloseWindow("import script");

        if(scriptName=="" || scriptString==""){
            CustomJs.ImportScript(scriptString, null);
        }else{
            CustomJs.ImportScript(scriptString, scriptName);
        }
        $(parentWindow).remove();
    }

    static async NewScriptWindow(){
        let scriptId = Settings.Get("customJsSelect");
        const buildData = {
            name : "New Script",
            cls : "r2_new_script",
            svelte: "r2_new_script",
            base : "windowPanel",
            nx: "new_script",
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
        }

        let innerHtml = await Elements.aBuild("ptextbox", {cls:`new_script_name`, value:"", placeholder:"Script Name"})
        + await Elements.aBuild("buttonSingle", {cls:`${buildData.cls}_create_button` ,action:`${buildData.cls}_create_button`, text:"Create"});

        await Modal.Create(buildData, {html:innerHtml}, false, true);

        let element = $(`.${buildData.cls}`)[0];
        if(UI.Exist(element)){
            $(`.${buildData.cls}`).css({ width:550+"px", "z-index": 99});
            UI.WindowOpened(buildData.name.toLowerCase());
            
            Input.BindOnClick($(`div[data-action="${buildData.cls}_create_button"]`), CustomJs.GenerateScriptEntry); 
            if(!$(element).is(":visible")){
                $(element).show();
            }
        }        
    }

    static async GenerateScriptEntry(event){
        let parentWindow = $(event.target).closest(".window");        

        let scriptName = $(`.r2_new_script .new_script_name`).val();
        $.each(PlayerScripts, (key, value)=>{
            if(value.hasOwnProperty("name") && value.name==scriptName){
                scriptName = "";
            }
        });

        if(scriptName.length>0){
            let scriptData = {
                id: Utility.GenID(PlayerScripts, null),
                name : scriptName,
                snippets: []
            };
            PlayerScripts[scriptData.id] = scriptData;
            Gstate.mod.chars[CharID].settings['emc-customjs']['customJsSelect'].value = scriptData.id;
            Storage.Save();

            $(parentWindow).hide();          
            Interaction.CloseWindow("new script");
            $(parentWindow).remove(); 

            CustomJs.SaveScripts();
            
            CustomJs.UpdateSettingsScriptDropdown(scriptData.id);
        }else{
            $(`.r2_new_script .new_script_name`).val("");
            console.log("Script name already exists");
        }
    }

    static async LoadSelectedScript(id = null){
        let settings = CustomJs.GetModuleSetting();        
        let scriptId = id
        if(scriptId==null){
            scriptId = Settings.Get("customJsSelect");
        }

        let settingsPage = $(`.${settings.id} .settings`)[0];
        if(UI.Exist(settingsPage)){
            let emptyDiv = $(`.${settings.id} .settings .EmptyDiv_customJsSnippetList`)[0];
            UI.Empty(emptyDiv);
            
            if(PlayerScripts.hasOwnProperty(scriptId)){
                let innerHtml = "<ul class='r2_script_snippet_list'>";
                $.each(PlayerScripts[scriptId].snippets, (key, value)=>{
                    if(AllSnippets.hasOwnProperty(value)){
                        let snippet = AllSnippets[value];
                        let active = "";
                        if(snippet.active){
                            active = "active";
                        }
                        innerHtml += `<li class='r2_script_snippet_list_item' data-id='${snippet.id}'><span class='r2_script_snippet_list_item_name'>${snippet.name}</span>
                        <span data-id='${snippet.id}' class="btn delete-snippet material-symbols-outlined float-right">delete</span>
                        <span data-id='${snippet.id}' class="btn edit-snippet material-symbols-outlined float-right">app_registration</span>
                        <span data-id='${snippet.id}' class="btn modulate-snippet material-symbols-outlined float-right ${active}">check_box</span>
                        </li>`;
                    }
                });
                innerHtml += "</ul>";
                UI.Append(emptyDiv, innerHtml);

                $(`.${settings.id} .settings .r2_script_snippet_list`).sortable({
                    update: function(event, ui){
                        let scriptId = Settings.Get("customJsSelect");
                        let newOrder = [];
                        $.each($(`.${settings.id} .settings .r2_script_snippet_list li`), (key, value)=>{
                            newOrder.push($(value).attr("data-id"));
                        });
                        PlayerScripts[scriptId].snippets = newOrder;
                        CustomJs.SaveScripts();
                    }
                });

                Input.BindOnClick($(`.${settings.id} .settings .delete-snippet`), CustomJs.DeleteSnippet);
                Input.BindOnClick($(`.${settings.id} .settings .edit-snippet`), CustomJs.EditSnippet);
                Input.BindOnClick($(`.${settings.id} .settings .modulate-snippet`), CustomJs.ModulateSnippet);
            }
        }
    }

    static async ModulateSnippet(event){
        let snippetId = $(event.target).attr("data-id");
        if(snippetId!=null && AllSnippets.hasOwnProperty(snippetId)){
            let snippet = AllSnippets[snippetId];
            snippet.active = !snippet.active;
            $(event.target).toggleClass("active");
            CustomJs.SaveScripts();
        }
    }

    static async EditSnippet(event){
        let snippetId = $(event.target).attr("data-id");
        if(snippetId!=null && AllSnippets.hasOwnProperty(snippetId)){
            CustomJs.NewScriptBuilderWindow(null, snippetId);
        }
    }

    static async DeleteSnippet(event){
        let snippetId = $(event.target).attr("data-id");
        if(snippetId!=null && AllSnippets.hasOwnProperty(snippetId)){
            let scriptId = Settings.Get("customJsSelect");
            let script = PlayerScripts[scriptId];
            let index = script.snippets.indexOf(snippetId);
            if(index>-1){
                script.snippets.splice(index, 1);
            }
            delete AllSnippets[snippetId];
            CustomJs.SaveScripts();
            CustomJs.LoadSelectedScript();
        }
    }
    

    static async UpdateSettingsScriptDropdown(selectedId){
        let html = await Elements.Build("scriptDropdownOption", {
            value: selectedId,
            selected: "selected",
            text: PlayerScripts[selectedId].name
        });
        UI.Append($(`.script_dropdown_container .ScriptDropdown_customJsSelect`), html);   
    }

    static async DeleteScript(){
        if(confirm("Delete Script?")){
            let scriptId = Settings.Get("customJsSelect");
            if(PlayerScripts.hasOwnProperty(scriptId)){
                let script = PlayerScripts[scriptId];
                $.each(script.snippets, (key, value)=>{ 
                    if(AllSnippets.hasOwnProperty(value)){
                        delete AllSnippets[value];
                    }                
                });

                delete PlayerScripts[scriptId];
                Gstate.mod.chars[CharID].settings['emc-customjs']['customJsSelect'].value = "";

                $(`.ScriptDropdown_customJsSelect option[value="${scriptId}"]`).remove();

                Storage.Save();
                CustomJs.SaveScripts();
            }
            
            let settings = CustomJs.GetModuleSetting(); 
            let settingsPage = $(`.${settings.id} .settings`)[0];
            if(UI.Exist(settingsPage)){
                let emptyDiv = $(`.${settings.id} .settings .EmptyDiv_customJsSnippetList`)[0];
                UI.Empty(emptyDiv);
            }
        }
    }

    static async ExportScript(){
        let scriptId = Settings.Get("customJsSelect");
        if(PlayerScripts.hasOwnProperty(scriptId)){
            let script = PlayerScripts[scriptId];
            let exportData = {
                name: script.name,
                snippets: []
            };
            $.each(script.snippets, (key, value)=>{
                if(AllSnippets.hasOwnProperty(value)){
                    let snippet = AllSnippets[value];
                    exportData.snippets.push({
                        name: snippet.name,
                        code: snippet.code,
                        active: snippet.active,
                        eval: snippet.eval
                    });
                }
            });
            
            let output = Base64.Encode(JSON.stringify(exportData));
            Utility.Copy(output);
            alert("Ui templated copied to clipboard");
        }
    }

    static async ImportScript(string, ScriptName = null){
        let data = JSON.parse(Base64.Decode(string));
        let scriptId = Utility.GenID(PlayerScripts, null);
        if(ScriptName!=null){
            data.name = ScriptName;
        }
        let script = {
            id: scriptId,
            name: data.name,
            snippets: []
        };
        PlayerScripts[scriptId] = script;
        $.each(data.snippets, (key, value)=>{
            let snippetId = Utility.GenID(AllSnippets, null);
            let snippet = {
                id: snippetId,
                name: value.name,
                code: value.code,
                active: true,
                eval: value.eval
            };
            AllSnippets[snippetId] = snippet;
            script.snippets.push(snippetId);
        });
        CustomJs.SaveScripts();
        CustomJs.UpdateSettingsScriptDropdown(scriptId);
    }
}
