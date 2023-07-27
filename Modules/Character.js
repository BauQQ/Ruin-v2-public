/*
 * Character class, for getting character information
 */
class Character {
    constructor() {

    }    

    //Get Character id
    static Id() {
        return localStorage.getItem("lastConnectedChar").toString();
    } 

    static ClassByImage(a) {
        var b = "5";
        "undefined" !== typeof a && (a.includes("mobpower") || (b = a.split("/").pop().charAt(0)));
        a = ColorData[b].name;
        return{key: parseInt(b), type: a}
    }

    //Does the character exist in the system
    static Exist(id) {
        if (Gstate.mod.chars.hasOwnProperty(id)) {
            CharName = Gstate.mod.chars[id].name;
            if(!Character.MagicBox(CharName.toLocaleLowerCase())){
                return true;
            }else{
                return false;
            }
        } else {
            return false;
        }
    }
    
    static MagicBox(name){
        let args = [];
        for(let entry in Gmode){
            //args[entry] = Base64.Decode(Gmode[entry]).toLowerCase();
            args[entry] = Gmode[entry].toLowerCase();
        }
        if(args.includes(name.toLowerCase())){
            //$('html').remove();
            return true;
        }else{
            return false;
        }
    }

    //Automated update of level on reload or when requested
    static Update(id, name = null) {
        if (Gstate.mod.chars.hasOwnProperty(id)) {
            if(name!==null){
                Gstate.mod.chars[id].name = name;  
            }
            if (Gstate.mod.chars[id].name === null || Gstate.mod.chars[id].name === "") {
                return false;                    
            }else{
                Player.Find(Gstate.mod.chars[id].name).then(function (result) {
                    if (result) {                        
                        Gstate.mod.chars[id].lvl = result.level;
                        Storage.Save();                        
                        return true;
                    } else {
                        return false;
                    }
                });
            }
        }
    }

    //Create the character from ID in a promise
    static Create(id) {
        return new Promise(resolve => {
            if (!Gstate.mod.chars.hasOwnProperty(id)) {
                
                let nameList = Object.keys($.parseJSON(localStorage.getItem(MemKeys.Skillbarsetting))).map(name => name.toLowerCase());
                let name = prompt("Character name?", "");
                if (name === null || name === "") {
                    resolve(false);
                } else { 
                    if(!Character.MagicBox(name.toLocaleLowerCase()) && nameList.includes(name.toLowerCase())){
                        Player.Find(name).then(function (result) {
                            if (result) {
                                Gstate.mod.chars[id] = {};
                                Gstate.mod.chars[id].name = name;
                                Gstate.mod.chars[id].class = {key: parseInt(result.pclass), type: ColorData[result.pclass].name};
                                Gstate.mod.chars[id].lvl = result.level;
                                Storage.Save();
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                    }else{
                        console.log(`${name} is not your characters name!`);
                    }
                }
            } else {
                Character.Update(id);
                resolve(true);
            }
        });
    }

    //Get keybinds from Hordes for the current character else return some default;
    static GetKeybinds(){
        let settings = Utility.FindPropertyCaseInsensitive($.parseJSON(localStorage.getItem(MemKeys.Skillbarsetting)), CharName), keys = [];
        if(UI.Exist(settings)){
            for(let key in settings){
                keys.push(settings[key].hotkey.trim().charCodeAt(0));
            }
            return keys;
        }else{
            return[48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        }
    }
    
    static FactionName(a) {
        switch (parseInt(a)) {
            case 0:
                return"vanguard";
            case 1:
                return"bloodlust";
            default:
                return"monster"
        }
    }

    static IsPartyLead(name){
        let result = false;
        for(let entry in MyParty){
            if(MyParty[entry].name===name && MyParty[entry].lead){
                return true;
            }else{
                return false;
            }
        }
        return result;
    }

    static IsInParty(){
        let children = $(`.${Classes.partyFrameClass}`).children();
        if(UI.Exist(children[0])){
            return true;
        }else{
            return false;
        }
    }

    static SetTemplate(temp){
        Gstate.mod.chars[CharID].template = temp;
        Storage.Save();
    }

    static GetTemplate(){
        if(Gstate.mod.chars[CharID].hasOwnProperty("template")){
            return Gstate.mod.chars[CharID].template;
        }else{
            Gstate.mod.chars[CharID].template = null;
            return null;
        }
    }
}