/*
 * Stash Extension
 */

class Inventory{
    
    
    constructor(){
        let data = {
            key : "inventory",
        };
        Actions.Add("disableitemprotection", Inventory.DisableProtection);
        UI.AddWindow(data.key, {modable: true, top:0, left:0, svelte:Classes.inventorySvelte});        
        Settings.Add("disableitemprotection", "tick", false, "Disable Item Protection", false, "main", "Disable Item Protection for 100%+", null, null, null, 8); 
        Inventory.LoadUI(data);
    }


    static DisableProtection(){
        let protKey = "itemProtectQuality";
        if(Settings.Get("disableitemprotection")){ 
            Storage.Set(protKey, 150);
        }else{            
            Storage.Set(protKey, 0);
        }
    }

    static LoadUI(data){
        let element = $(`.container.${Classes.inventorySvelte}`).find("div[name]")[0];
        if(element!=undefined){
            Customizer.LoadModsFor(data.key, element);
        }
    }
}

