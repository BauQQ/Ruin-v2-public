/*
 * Interaction Extension
 */
let loadingPvpProjections = false;

class Pvp{

    constructor(){
        UI.AddWindow("pvp", {action:Pvp.LoadUI, modable: true, top:50, left:50, w:0, h:0, resize:true, svelte:Classes.pvpSvelte});
        ExecuteOnWindowLoad["pvp"] = [];
    }

    static LoadUI(){
        Pvp.FameForNextBracket();
        Inject.ExecuteOnWindowLoad("pvp");
    }

    static async GetFactionPercentiles(){
        return await Api.Fetch("pvpfactionpercentiles", {});
    }

    static async GetPvpData(){
        return await Api.Fetch("playerpvp", {name: Player.Name()});
    }

    static async FameForNextBracket(){
        if(!loadingPvpProjections){
            loadingPvpProjections = true;
            let percentiles = await Pvp.GetFactionPercentiles();
            let data = await Pvp.GetPvpData();
            let faction = await Player.Faction();
            Pvp.FameForNextBracketUpdate(percentiles, data, faction);
        }
    }

    static async FameForNextBracketUpdate(percentiles, data, faction){
        if(!UI.Exist($(".projection_panel")[0])){  
            let factionPercentile = percentiles[faction.key];
            let t = Utility.findIndexGreaterThan(factionPercentile, data.fame);
            if(t == -1){
                if(data.fame >= factionPercentile[12]) t = 12;
            }
            
            let nextFame = factionPercentile[t];
            let fameDiff = nextFame - data.fame;
            let prestigeBracket = PrestigeBrackets[t];
            if(prestigeBracket == undefined) prestigeBracket = 0;

            let nextPrestigeBacket = parseInt(((data.prestige/5)*4)+prestigeBracket);
            let nt = Utility.findIndexGreaterThan(PrestigeRanks, nextPrestigeBacket);
            if(nt == -1) nt = 0;
            if(nextPrestigeBacket>PrestigeRanks[11]) nt = 12;
            

            // if fameDiff is negative, we are already in the next bracket
            if(fameDiff <= 0){
                fameDiff = 0;
                nextPrestigeBacket = nextPrestigeBacket + 1000;
            }
            
            let innerHtml = `<small class="bold textgreen">Projection</small>
            <span></span>
            <span class="textwhite">New Bracket In</span>
            <span class="textfame statnumber"><img class="svgicon" src="/assets/ui/currency/fame.svg"> ${Utility.numberWithCommas(fameDiff)}</span>
            <span class="textwhite">Prestige</span>
            <span class="textgreen statnumber">${Utility.numberWithCommas(nextPrestigeBacket)} 
                <img class="svgicon" src="/assets/ui/rank/rank${nt}.svg?v=5699699">
            </span>`;

            let html = await Elements.Build("pvpSmallPanel", {cls:`projection_panel stats ${Classes.panel_black} marg-top ${Classes.pvpSvelte}`, html:innerHtml});
            let slot = $(`.${Classes.pvpSvelte} ${Classes.pvpSlot} div:first-child`)[0];
            
            UI.AppendAfter(slot, html);
            loadingPvpProjections = false;
        }
    }
}



