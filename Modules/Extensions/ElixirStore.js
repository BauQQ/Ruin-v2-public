/*
 * Interaction Extension
 */

class ElixirStore{

    constructor(){
        UI.AddWindow("store / elixir", {action:ElixirStore.LoadUI, modable: false, top:50, left:50, w:0, h:0, resize:false, svelte:Classes.elixirstoreSvelte, storage:"subscriptionOpen"});
        ExecuteOnWindowLoad["store / elixir"] = [];
    }

    static LoadUI(){
        Inject.ExecuteOnWindowLoad("store / elixir");
        //console.log("open elixir UI");
        //console.log("open character UI");
    }
}

