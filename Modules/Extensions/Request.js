/*
 * AuctionHouse Extension
 */

class Request{
    constructor(){
        UI.AddWindow("request", {action:Request.LoadUI, modable: false, top:0, left:0, svelte:Classes.requetsSvelte});
        Actions.Add("autodenyparty", Request.LoadUI);    
        ExecuteOnWindowLoad["request"] = [];    
        
        Settings.Add("partyspacermain", "spacer", false, "", false, "main", "Party", null, null, null, 19); 
        Settings.Add("autodenyparty", "tick", false, "Auto Deny Party", false, "main", "Auto Deny Party", null, null, null, 22); 
        Request.Load();
    }

    static async Load(){          
        Settings.Remove("autoacceptsummon");
    }

    static LoadUI(){        
        let inner = $(`.${Classes.requetsSvelte}`)[0];
        if(inner!=undefined && inner!=null){
            let innerX = $($(inner).find('h3.textprimary')[0]).html();
            if(Settings.Get("autodenyparty")){
                if(innerX.toString().toLowerCase()=="party invite"){
                    $($(inner).find('.choice.svelte-1dzs2t1:last-child')[0]).click();
                }
            }
            if(Settings.Get("autoacceptsummon")){
                if(innerX.toString().toLowerCase()=="summon"){
                    $($(inner).find('.choice.svelte-1dzs2t1')[0]).click();
                }
            }
        }
        Inject.ExecuteOnWindowLoad("request"); 
    }
}