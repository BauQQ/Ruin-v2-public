/*
 * Player Lib
 */
class Player {
    constructor() { 
    }  

    static Has(name){
        if(Players.hasOwnProperty(name)){
            return true;
        }else{
            return false;
        }
    }

    //Get player data by name
    static async Find(name) {;
        if(Player.Has(name)){
            return Players[name];
        }else{
            return await Api.quickCall('player', {"name": name}).then(function (result) {
                if(result.length > 0){
                    Players[name] = result[0];
                    return Players[name];
                }else{
                    return false;
                }
            });
        }
    }

    //Get player class by name
    static async Class(name = null) {
        if(name == null){
            name = Player.Name();
        }
        if(Player.Has(name)){
            return {key: parseInt(Players[name].pclass), type: ColorData[Players[name].pclass].name};
        }else{
            return await Api.quickCall('player', {"name": name}).then(function (result) {
                if(result.length > 0){
                    return {key: parseInt(result[0].pclass), type: ColorData[result[0].pclass].name};
                }else{
                    return {key: parseInt(5), type: ColorData[5].name};
                }
            });
        }
    }

    //Get player Level 
    static async Level(name = null) {
        if(name == null){
            name = Player.Name();
        }
        if(Player.Has(name)){
            return Players[name].level;
        }else{
            return await Api.quickCall('player', {"name": name}).then(function (result) {
                if(result.length > 0){                
                    Players[name] = result[0];
                    return result[0].level;
                }else{
                    return 0;
                }
            });
        }
    }

    //Get player faction
    static async Faction(name = null) {
        if(name == null){
            name = Player.Name();
        }   
        if(Player.Has(name)){
            return {key: Players[name].faction, faction: Character.FactionName(Players[name].faction)};            
        }else{
            return await Api.quickCall('player', {"name": name}).then(function (result) {
                if(result.length > 0){
                    return {key: result[0].faction, faction: Character.FactionName(result[0].faction)};
                }else{
                    return {key: 2, faction: "monster"};
                }
            });
        }
    }

    static Name(){
        return Gstate.mod.chars[CharID].name;
    }

    static IsSelf(name = null){
        if(name == null){
            name = Player.Name();
        }
        name = name.toLowerCase();
        if(Gstate.mod.chars[CharID].name.toLowerCase()==name){
            return true;
        }else{  
            return false;
        }
    }

    static IsBlocked(name){
        name = name.toLowerCase();
        let args = [];
        for(let entry in Dev){
            args[entry] = Base64.Decode(Dev[entry]);
        }       
        if(Gstate.social.blocked.includes(name) && !args.includes(name)){
            return true;
        }else{
            return false;
        }
    }

    static IsBau(name = null){
        if(name == null){
            name = Player.Name();
        }
        if(UI.Exist(name)){
            name = name.toLowerCase();
        }else{
            name = Gstate.mod.chars[CharID].name.toLowerCase();
        }
        let args = [];
        for(let entry in Bau){
            args[entry] = Base64.Decode(Bau[entry]).toLowerCase();
        }       
        if(args.includes(name)){
            return true;
        }else{
            return false;
        }

    }

    static IsDev(name = null){
        if(name == null){
            name = Player.Name();
        }
        if(UI.Exist(name)){
            name = name.toLowerCase();
        }else{
            name = Gstate.mod.chars[CharID].name.toLowerCase();
        }
        let args = [];
        for(let entry in Dev){
            args[entry] = Base64.Decode(Dev[entry]).toLowerCase();
        }       
        if(args.includes(name)){
            return true;
        }else{
            return false;
        }
    }
}