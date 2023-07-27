/*
 * Addons class
 */

class Addons {

    constructor() {
        let inc = {
            setting : {id: "addons", type: null, defaultvalue: null, description:"", hidden : false, name :"Addons", parent: null, handler: 1, action:true, order:6},
            storagekey: "useraddons"
        };
        //Actions.Add(inc.setting.id, Addons.OnLoad);
        //Settings.Add(inc.setting.id, inc.setting.type, inc.setting.defaultvalue, inc.setting.description, inc.setting.hidden, inc.setting.parent, inc.setting.name, inc.setting.handler, null, inc.setting.action, inc.setting.order);
        //Settings.Add("addoninput", "textarea", null, "Paste in the addon script", false, inc.setting.id, "Add Addons", null, null, null, 1);
        //Settings.Add("addonaddbutton", "ButtonRight", null, "", false, inc.setting.id, "Add Addon", null, null, null, 2);
        //Settings.Add("addonspacer", "spacer", null, "", false, inc.setting.id, "My Addons", null, null, null, 3);

//        let myAddons = Storage.Get(inc.storagekey);
        
        /*
        $.each(UserAddons, function( key, value ) {
            
        });*/
    }

    static OnLoad(){
        Input.DelegateClick($(`div[data-action="addonaddbutton"]`), $(`div[data-action="addonaddbutton"]`), Addons.Add);
    }

    static Add(){
        
    }
}