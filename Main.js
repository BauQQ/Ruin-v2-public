/*
 * Ruin UI 2.0.0 - hordes.io 
 * Ruin UI's base system needs the following scripts
 * provided by Bau, without them the mod will not work.
 */

class Main extends Storage {
    constructor() {
        super();        
    }

    static Load() {
        HasTarget = false;
        if (Character.Exist(CharID)) { 
            $.each(Extension, function(key, value) {
                new value;
            });
            $.each(Hooks, function(key, value) {
                if(value.hasOwnProperty("Hook")){
                    value["Hook"]();
                }
            });
        }
    }

    static Install(mutations) {
        for(let mutation in mutations){
            let element = mutations[mutation];
            element.removedNodes.length && element.removedNodes.forEach(function (node) {      
                if ($(node).hasClass(Classes.init)) {
                    if (Character.Exist(CharID)) {                                    
                        Character.Update(CharID);                            
                        UI.DisplayVersion();                            
                        $(`#${Classes.chatId}`).addClass(Classes.chatClass);      
                        $(`#${Classes.chatId}`).parent().attr('id', Classes.uichat);                        
                        Main.Load(); 
                    }
                }
            });
        }
    }

    Initialize() {
        console.log(`Ruin UI v${_Version}`);        
        CharID = Character.Id();
        var options = {childList: true, subtree: false, attributes: false, characterData: true};
        if (Character.Exist(CharID)) {            
            Mutator.Create("installer", "body", options, Main.Install);
        } else {
            return Character.Create(CharID).then(function (result) {
                if (result) {                    
                    Mutator.Create("installer", "body", options, Main.Install);
                } else {
                    console.log("Character was not created, reload!");
                }
            });
        }
    }
}

/*
let out = "";
$.each(ChatEmotes, function(key, value) {
    out += key + " ";
});
console.log(out);*/
var main = new Main();
main.Initialize();