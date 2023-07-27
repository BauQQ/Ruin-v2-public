/*
 * Settings class
 *
 * Reserved Settings Properties:
 * {string} Name
 * {string} Type
 * {int} Handler
 * 
 */
class Settings{    
   
    
    constructor(){   
        let defaultSettings = [
            {id: "main", type: null, defaultvalue: null, description:"", hidden : false, name :"Ruin Ui v2", parent: null,  handler: 1, action:null, order:1},   
            {id: "customizer", type: null, defaultvalue: null,description:"", hidden : false, name :"Simple UI", parent: null, handler: 1, action:null, order:2}, 
            {id: "bartender", type: null, defaultvalue: null, description:"Customization options for everything related to user bars", hidden : false, name :"Bartender", parent: null, handler: 1, action:null, order:3},    
            {id: "hotkeys", type: null, defaultvalue: null,description:"", hidden : false, name :"Hotkeys", parent: null, handler: 1, action:null, order:4},        
            {id: "resetui", type: null, defaultvalue: null,description:"", hidden : false, name :"Reset UI", parent: null, handler: 2, action:Settings.ResetRUIN, order:99}
        ];     
        this.Setup(defaultSettings);
        Settings.GetLanguage();
        //Build ui for settings
    }
    
    //Setup missing settings
    Setup(defaultSettings){
        if(!Settings.Exist()){
            Gstate.mod.chars[CharID].settings = {}; 
        }
        $.each(defaultSettings, function(key, value) {
            if(!Settings.Exist(value.id)){
                Settings.Add(value.id, value.type, value.defaultvalue, value.description, value.hidden, value.parent, value.name, value.handler, null, value.action, value.order);
            }
            if(value.hasOwnProperty("action")){
                Actions.Add(value.id, value.action);
            }
        });
        
        UI.AddWindow("settings", {action:Settings.LoadUI, modable: false, storage:"settingsOpen", svelte:Classes.settingSvelte});
    }

    //Get language from api async
    static async GetLanguage() {
        await Api.GetLanguage("GET", `./assets/loc/${$.parseJSON(localStorage.getItem('lang'))}.json`).then(function (result) {
            Language = result;
        });
    }

    //Add Array of selectable to one dropdown
    static AddToDropdown(setting, selectable){
        if(Settings.Check(setting)){
            if(Gstate.mod.chars[CharID].hasOwnProperty("settings")){
                $.each(Gstate.mod.chars[CharID].settings, function(key, value) {
                    if(value.hasOwnProperty(setting) && value[setting].hasOwnProperty("multiselect")){
                        if(!Gstate.mod.chars[CharID].settings[key][setting].multiselect.includes(selectable)){
                            Gstate.mod.chars[CharID].settings[key][setting].multiselect.push(selectable);
                        }
                    }
                });
            }
            Storage.Save();
        }
    }

    static RemoveFromDropDown(setting, selectable){
        if(Settings.Check(setting)){
            if(Gstate.mod.chars[CharID].hasOwnProperty("settings")){
                $.each(Gstate.mod.chars[CharID].settings, function(key, value) {
                    if(value.hasOwnProperty(setting) && value[setting].hasOwnProperty("multiselect")){
                        if(Gstate.mod.chars[CharID].settings[key][setting].multiselect.includes(selectable)){
                            var index = Gstate.mod.chars[CharID].settings[key][setting].multiselect.indexOf(selectable);
                            if (index !== -1) {
                                Gstate.mod.chars[CharID].settings[key][setting].multiselect.splice(index, 1);
                            }
                        }
                    }
                });
            }
            Storage.Save();
        }
    }

    // Add setting to user
    static Add(key, type, defaultvalue, description = null, hidden = false, parent = null, name = null, handler = null, multiselect = null, action = null, order = 99){
        if(action!==null){
            if(Actions.Has(key)){
                Actions.Add(key, action);
            }
            action=true;
        }

        if(description!==null){
            SettingDescriptions[key] = description;
        }

        if(parent==null){
            if(!Settings.Exist(key)){
                if(type==null){
                    Gstate.mod.chars[CharID].settings[key] = {
                        name : name,
                        handler: handler,
                        hidden: hidden,                        
                        action: action,
                        order : order
                    };
                    Storage.Save();
                    return true;
                }else{
                    //What if type is NOT null
                }
            }else{
                return false;
            }
        }else{
            if(!Settings.Exist(key, parent)){
                if(!reservedKeywords.includes(key) && Utility.FindPropertyCaseInsensitive(Gstate.mod.chars[CharID].settings[parent], key)==undefined 
                && Utility.FindPropertyCaseInsensitive(Gstate.mod.chars[CharID].settings[parent], key)==null){
                    Gstate.mod.chars[CharID].settings[parent][key] = {
                        name : name,
                        type : type,
                        hidden: hidden,
                        value : defaultvalue,
                        handler : handler,
                        multiselect : multiselect,                        
                        action:action,
                        order : order
                    };
                    Storage.Save();
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
    }

    static async Remove(setting){
        if(Gstate.mod.chars[CharID].settings.hasOwnProperty(setting)){
            delete Gstate.mod.chars[CharID].settings[setting];
        }else if(Settings.Check(setting)){
            $.each(Gstate.mod.chars[CharID].settings, function(key, value) {
                if(value.hasOwnProperty(setting)){
                    delete Gstate.mod.chars[CharID].settings[key][setting];
                }
            });
        }
        Storage.Save();
    }

    // Does settings, target and parent even exist
    static Exist(target = null, parent = null){
        if(parent!= null){
            if(Settings.Exist() && Settings.Exist(parent)){
                if(Gstate.mod.chars[CharID].settings[parent].hasOwnProperty(target)){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            if(target!=null){
                if(Settings.Exist()){
                    if(Gstate.mod.chars[CharID].settings.hasOwnProperty(target)){
                        return true;
                    }else{
                        return false;
                    }
                }
            }else{
                if(Gstate.mod.chars[CharID].hasOwnProperty("settings")){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }

    //Check if settings exists and return value for it
    static Check(setting){
        let result = false;
        if(Gstate.mod.chars[CharID].hasOwnProperty("settings")){
            $.each(Gstate.mod.chars[CharID].settings, function(key, value) {
                if(value.hasOwnProperty(setting)){
                    result = true;
                }
            });
        }
        return result;
    }

    static Get(setting){
        if(Settings.Check(setting)){
            let result = null;            
            for(let [key, value] of Object.entries(Gstate.mod.chars[CharID].settings)){
                if(value.hasOwnProperty(setting)){
                    result = value[setting].value;
                    break;
                }
            }
            return result;
        }else{
            return null;
        }
    }

    static async LoadUI(){
        let menu = $($(`.${Classes.settingSvelte} .${Classes.divide}.${Classes.settingSvelte} .${Classes.choice}`)[0]).parent();        

        for(let element of $(menu).children()){
            element.setAttribute("data-key", "default");
            $(element).undelegate(element, "click");
            $(element).delegate(element, "click", function (event) {
                Settings.MenuDelegation(menu, element);
            });
        }

        let defaultpanel = $($(menu).parent()).find(`.${Classes.menu}`)[0];
        defaultpanel.setAttribute("data-panel", "default");

        let sorted = Object.entries(Gstate.mod.chars[CharID].settings).sort((a,b)=> (a[1].order - b[1].order));

        for(let [key, value] of sorted){
            
            let menuButton = await Elements.aBuild("settingMenuButton", {key:key, text:value.name});
            UI.Append(menu, menuButton);
            let html = "";
            if(value.handler===1){
                let valuez = {};
                $.each(value, function(skey, entry){
                    if(UI.Exist(entry)){
                        if(entry.hasOwnProperty("order")){
                            valuez[skey] = entry;
                        }
                    }
                });
                let valueSorted = Object.entries(valuez).sort((a,b)=> (a[1].order - b[1].order));
                for(let [skey, entry] of valueSorted){
                    if(UI.Exist(entry)){
                        if(entry.hasOwnProperty("name")){
                            let type = Utility.Ucfirst(entry.type);
                            if(Elements.hasOwnProperty(type)){                             
                                html +=  Elements[type](skey, entry);                                
                            }
                        }
                    }
                }
                let panel = Elements.Build("settingBasePanel", {panel:key, cls:Classes.ruinSettingBase + " " + key, text:value.name, html:html});
                UI.Append($(menu).parent(), panel);
                
                $.each(value, function(skey, entry){
                    if(UI.Exist(entry)){                        
                        if(entry.hasOwnProperty("name")){
                            let type = Utility.Ucfirst(entry.type);
                            if(Elements.hasOwnProperty(type)){    
                                if(Settings.hasOwnProperty(`Delegate_${entry.type}`)){
                                    Settings[`Delegate_${entry.type}`](key, skey, entry);
                                }
                            }
                        }
                    }
                });
            }         
            

            $(menu).undelegate(`div[data-key='${key}']`, "click");
            $(menu).delegate(`div[data-key='${key}']`, "click", function (event) {
                
                if(value.handler===1){
                    Settings.MenuDelegation(menu, $(`div[data-key='${key}']`)[0]);                    
                }
                if(value.hasOwnProperty("action") && value.action){                    
                    if(Actions.Has(key)){
                        FActions[key]();
                    }
                }
            });
        }
    }

    static Delegate_tick(parent, key, data){
        let element = $(`.${data.type}_${key}`)[0];
        $(element).undelegate(element, "click");
        $(element).delegate(element, "click", function (event) {            
            if ($(element).hasClass("active")) {
                $(element).removeClass("active");
                Gstate.mod.chars[CharID].settings[parent][key].value = false;
            }else{
                Gstate.mod.chars[CharID].settings[parent][key].value = true;
                $(element).addClass("active");
            }
            if(Actions.Has(key)){
                FActions[key]();
            }
            Storage.Save();
        });
    }

    static Delegate_dropdown(parent, key, data){        
        let element = $(`.${data.type}_${key}`)[0];
        $(element).off("change");
        $(element).on("change", function (event) {
            Gstate.mod.chars[CharID].settings[parent][key].value = this.value;
            if(Actions.Has(key)){
                FActions[key]();
            }
            Storage.Save();
        });
    }

    static Delegate_ScriptDropdown(parent, key, data){        
        let element = $(`.${data.type}_${key}`)[0];
        $(element).off("change");
        $(element).on("change", function (event) {
            Gstate.mod.chars[CharID].settings[parent][key].value = this.value;
            if(Actions.Has(key)){
                FActions[key]();
            }
            Storage.Save();
        });
    }

    static Delegate_input(parent, key, data){     
        let element = $(`.${data.type}_${key}`)[0];
        $(element).off("change");
        $(element).on("change", function (event) {
            Gstate.mod.chars[CharID].settings[parent][key].value = this.value;
            if(Actions.Has(key)){
                FActions[key]();
            }
            Storage.Save();
        });
    }

    static Delegate_ninput(parent, key, data){     
        let element = $(`.${data.type}_${key}`)[0];
        $(element).off("change");
        $(element).on("change", function (event) {
            Gstate.mod.chars[CharID].settings[parent][key].value = this.value;
            if(Actions.Has(key)){
                FActions[key]();
            }
            Storage.Save();
        });
    }

    static Delegate_inputcolor(parent, key, data){     
        let element = $(`.${data.type}_${key}`)[0];
        $(element).off("change");
        $(element).on("change", function (event) {       
            let val = this.value;     
            val = val.replace('#', '');
            Gstate.mod.chars[CharID].settings[parent][key].value = val;
            if(Actions.Has(key)){
                FActions[key]();
            }
            Storage.Save();
        });
    }

    static Delegate_colorrangeslider(parent, key, data){     
        let element = $(`.${data.type}_${key}`)[0];
        $(element).off("change");
        $(element).on("change", function (event) {
            Gstate.mod.chars[CharID].settings[parent][key].value = this.value;
            if(Actions.Has(key)){
                FActions[key]();
            }
            Storage.Save();
        });
    }
    
    static Delegate_dinput(parent, key, data){     
        let element = $(`.${data.type}_${key}`)[0];
        $(element).off("change");
        $(element).on("change", function (event) {
            Gstate.mod.chars[CharID].settings[parent][key].value = this.value;
            if(Actions.Has(key)){
                FActions[key]();
            }
            Storage.Save();
        });
    }

    static Delegate_Decimalinput(parent, key, data){    
        let element = $(`.${data.type}_${key}`)[0];
        $(element).off("change");
        $(element).on("change", function (event) {
            Gstate.mod.chars[CharID].settings[parent][key].value = this.value;
            if(Actions.Has(key)){
                FActions[key]();
            }
            Storage.Save();
        });
    }

    static Delegate_customjsInput(parent, key, data){
        let element = $(`.settings_textarea_${key}`)[0];
        $(element).off("input propertychange");
        $(element).on("input propertychange", function (event) {
            if(Actions.Has(key)){
                FActions[key](this.value);
            }
        });
    }


    static MenuDelegation(menu, element){
        let dataKey = $(element).data("key");
        if(dataKey!=undefined){
            $.each($(menu).find(`.${Classes.active}`), function(key, value) {
                $(value).removeClass(`${Classes.active}`);
            });

            $.each($(element).parent().parent().find(`.${Classes.menu}`), function(key, value) {
                $(value).hide();
                $(value).removeClass(`${Classes.active}`);
            });

            let panel = $(element).parent().parent().find(`div[data-panel='${dataKey}']`);
            $(panel).show();            
            $(element).addClass(`${Classes.active}`);
        }
    }

    static async ResetRUIN(){
        if(confirm("Confirm UI Reset")){
            delete Gstate.mod.chars[CharID].settings;
            delete Gstate.mod.chars[CharID].ui;
            Storage.Save();
            UI.Reload();
        }
    }
}