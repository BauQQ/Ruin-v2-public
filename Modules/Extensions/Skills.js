/*
 * Stash Extension
 */

class Skills{
    constructor(){
        UI.AddWindow("skills", {action:Skills.LoadUI, modable: true, top:50, left:150, w:0, h:0, resize:true, svelte:"svelte-e2mar4", storage:"skillmenuOpen"});
        ExecuteOnWindowLoad["skills"] = [];
    }

    static LoadUI(){
        Inject.ExecuteOnWindowLoad("skills");
        //console.log("open stash UI");
    }
}

