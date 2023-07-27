/*
 * Stash Extension
 */

class Stash{
    static Data = {
        key : "stash",
        svelte: "svelte-1ilvxqc",
        deposit: "depositAll",
        withdraw: "withdrawAll"
    };

    constructor(){
        UI.AddWindow(Stash.Data.key, {action:Stash.LoadUI, modable: true, top:0, left:0, w:0, h:0, resize:true, svelte:Stash.Data.svelte});
        ExecuteOnWindowLoad[Stash.Data.key] = [];
    }

    static LoadUI(){
        $(Classes.stashButtonsLoc).first().before(ELib.stashAllButton);
        $(Classes.stashButtonsLoc).last().before(ELib.withdrawAllButton);
        Input.DelegateClick($(`.formelements.${Stash.Data.svelte}`).first(), `.${Stash.Data.deposit}`, function(){
            Stash.WDGold($(Classes.stashButtonsLoc).first());
        });

        Input.DelegateClick($(`.formelements.${Stash.Data.svelte}`).first(), `.${Stash.Data.withdraw}`, function(){
            Stash.WDGold($(Classes.stashButtonsLoc).last());
        });
        Inject.ExecuteOnWindowLoad(Stash.Data.key);
    }

    //Widthdraw or deposit all gold
    static WDGold(element){
        $(element).click();
        element = document.querySelector(`.${Stash.Data.svelte} .navbtn.formatted`);
        element.value = 999999999999999;
        element.dispatchEvent(new Event("input"));
        setTimeout(function () {
            document.querySelector(`.${Stash.Data.svelte} .marg-top .btn`).dispatchEvent(new Event("click"))
        }, 0);
    }
}
