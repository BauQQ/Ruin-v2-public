/*
 * AuctionHouse Extension
 */

class Charactersheet{

    constructor(){
        UI.AddWindow("character", {action:Charactersheet.LoadUI, modable: true, top:0, left:0, w:0, h:0, resize:true, svelte:Classes.charSheetSvelte, storage:"charpanelOpen"});
        ExecuteOnWindowLoad["character"] = [];
    }

    static LoadUI(){        
        if(Settings.Get("streamermode")){
            $($('.statcol .bold.textwhite')[0]).empty();
        }
        Inject.ExecuteOnWindowLoad("character");
        //console.log("open character UI");
    }

    static Visibility(){
        if($(`.${Classes.charSheetSvelte} .window`).is(":visible")){
            $(`.${Classes.charSheetSvelte} .window`).hide();
        }else{
            $(`.${Classes.charSheetSvelte} .window`).show();
        }
    }
}