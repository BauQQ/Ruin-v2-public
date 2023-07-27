/*
 * Tell Me When Extension
 */

class TellMeWhen{   
    
    constructor(){       
        
        Chat.AddCommand("!#W", {r:"!#W",f:TellMeWhen.TmwIN, p:false, dev:false, sec:"party"});
    }


    static LoadUI(data){

    }

    static TmwIN(name, text, node){
        // && !Player.IsSelf(name)
        if(Character.IsPartyLead(name)){
            text = text.substring(4);
            //console.log(text);
        }
        $(node).hide();
    }

    static TmwOut(){
               
    }
}

