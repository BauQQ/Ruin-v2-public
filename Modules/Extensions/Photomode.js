/*
 * Photomode Extension
 */

let oldKey = "";

class Photomode{

    constructor(){
        Actions.Add("photomodekey", Photomode.Rebind);
        Settings.Add("photomodekey", "input", "f9", "Photomode hotkey", false, "hotkeys", "Photomode", null);        
        Photomode.Rebind();
    }

    static async Rebind(){
        Input.RegisterKeybinds();
        let key = Settings.Get("photomodekey");
        if(key.length>1){
            if(fnKeys.hasOwnProperty(key)){                
                Input.Unbind(oldKey);
                key = fnKeys[key];
                oldKey = key;
                Input.Bind(key, "down", Photomode.UIPM);
            }
        }else{
            Input.Unbind(oldKey);
            key = key.toUpperCase().trim().charCodeAt(0);
            oldKey = key;
            Input.Bind(key, "down", Photomode.UIPM);
        }   
    }

    static LoadUI(){
        
    }

    static async UIPM(){
        let can = $('body').find(`.${Classes.lcanvas}`)[1];
        if($(`.${Classes.layout}`).is(":visible")){
            $(can).hide();
            $(`.${Classes.layout}`).hide();
        }else{
            $(can).show();
            $(`.${Classes.layout}`).show();
        }
    }
}
