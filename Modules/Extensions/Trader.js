/*
 * Trader Extension
 */

class Trader{

    constructor(){
        UI.AddWindow("trader", {action:Trader.LoadUI, modable: true, top:50, left:50, w:0, h:0, resize:true, svelte:Classes.traderSvelte});
        ExecuteOnWindowLoad["trader"] = [];
    }

    static LoadUI(){        
        Inject.ExecuteOnWindowLoad("trader");
        //console.log("open character UI");
    }
}

