/**
 * Warning: This module is not finished yet, it is not recommended to use it.
 * 
 */

class BuffTracker{
    constructor(){
        BuffTracker.GetBuffTrackerArray();
        let setting = BuffTracker.GetModuleSetting();
        
        Actions.Add(setting.id, BuffTracker.OnLoad);
        Settings.Add(setting.id, setting.type, setting.defaultvalue, setting.description, setting.hidden, setting.parent, setting.name, setting.handler, null, setting.action, setting.order);
        
        BuffTracker.SettingsUionLoad();


        Actions.Add("bufftrackerParty", BuffTracker.BuffTrackerEnable);
        Actions.Add("bufftrackerModule", BuffTracker.BuffTrackerEnable);
        Settings.Add("bufftrackerModule", "tick", false, "Enable or Disable bufftracker module (reload)", false, "main", "Bufftracker", null, null, null, 8);
        Settings.Add("bufftrackerParty", "tick", false, "Allow party to be tracked (reload)", false, "main", "Party Tracker", null, null, null, 9); 
        if(Settings.Get("bufftrackerModule")){
            setTimeout(function () {                
                BuffTracker.PlayerTracker();   
                BuffTracker.TargetTracker(); 
                if(Settings.Get("bufftrackerParty")){
                    BuffTracker.PartyTracker();
                }
                BuffTracker.CheckAllBuffs();            
            }, 200);
        }
    }

    static GetModuleSetting(){
        return {id: "emc-bufftracker", type: null, defaultvalue: null, description:"Bufftracker Tool", hidden : false, name :"Bufftracker", parent: null, handler: 1, action:true, order:91};
    }

    static async SettingsUionLoad(){
        Settings.Add("bufftrackerFirstSpacer", "spacer", null, "", false, "emc-bufftracker", "Player Buff", null, null, null, 1);
        Settings.Add("buffPlayerMarkerText", "doubleBuffDivText", null, "", false, "emc-bufftracker", "doubleBuffDivText", null, null, null, 4);
        Settings.Add("buffPlayerMarker", "doubleBuffDiv", "player_positive", "", false, "emc-bufftracker", "doubleBuffDiv", null, null, null, 5);

        Settings.Add("bufftrackerSecondSpacer", "spacer", null, "", false, "emc-bufftracker", "Target Buff", null, null, null, 35);
        Settings.Add("buffTargetMarkerText", "doubleBuffDivText", null, "", false, "emc-bufftracker", "doubleBuffDivText", null, null, null, 36);
        Settings.Add("buffTargetMarker", "doubleBuffDiv", "target_positive", "", false, "emc-bufftracker", "doubleBuffDiv", null, null, null, 37);

        Settings.Add("bufftrackerThirdSpacer", "spacer", null, "", false, "emc-bufftracker", "Party Buff", null, null, null, 70);
        Settings.Add("buffPartyMarkerText", "doubleBuffDivText", null, "", false, "emc-bufftracker", "doubleBuffDivText", null, null, null, 71);
        Settings.Add("buffPartyMarker", "doubleBuffDiv", "party_positive", "", false, "emc-bufftracker", "doubleBuffDiv", null, null, null, 72);
        
        Settings.Add("debufftrackerFirstSpacer", "spacer", null, "", false, "emc-bufftracker", "Player Debuff", null, null, null, 80);
        Settings.Add("debuffPlayerMarkerText", "doubleBuffDivText", null, "", false, "emc-bufftracker", "doubleBuffDivText", null, null, null, 81);
        Settings.Add("debuffPlayerMarker", "doubleBuffDiv", "player_negative", "", false, "emc-bufftracker", "doubleBuffDiv", null, null, null, 82);

        Settings.Add("debufftrackerSecondSpacer", "spacer", null, "", false, "emc-bufftracker", "Target Debuff", null, null, null, 90);
        Settings.Add("debuffTargetMarkerText", "doubleBuffDivText", null, "", false, "emc-bufftracker", "doubleBuffDivText", null, null, null, 91);
        Settings.Add("debuffTargetMarker", "doubleBuffDiv", "target_negative", "", false, "emc-bufftracker", "doubleBuffDiv", null, null, null, 92);

        Settings.Add("debufftrackerThirdSpacer", "spacer", null, "", false, "emc-bufftracker", "Party Debuff", null, null, null, 100);    
        Settings.Add("debuffPartyMarkerText", "doubleBuffDivText", null, "", false, "emc-bufftracker", "doubleBuffDivText", null, null, null, 101);
        Settings.Add("debuffPartyMarker", "doubleBuffDiv", "party_negative", "", false, "emc-bufftracker", "doubleBuffDiv", null, null, null, 102);
        
    }

    static BuffTrackerEnable(){
        window.location.reload();
    }

    static GetBuffTrackerArray(){
        BuffTrackerArgs =  Storage.Get(`${MemKeys.Bufftracker}${Player.Name()}`);
        if(BuffTrackerArgs==undefined || BuffTrackerArgs==null || BuffTrackerArgs==''){
            BuffTrackerArgs = {
                positive:{
                    player:{on:[], off:[]}, target:{on:[], off:[]}, party:{on:[], off:[]}
                },
                negative:{
                    player:{on:[], off:[]}, target:{on:[], off:[]}, party:{on:[], off:[]}
                },
                neutral:{
                    player:{on:[], off:[]}, target:{on:[], off:[]}, party:{on:[], off:[]}
                }
            };
            Object.keys(SkillsData).forEach(key => {
                BuffTrackerArgs.positive.player.on.push(key);
                BuffTrackerArgs.positive.target.on.push(key);
                BuffTrackerArgs.positive.party.on.push(key);

                BuffTrackerArgs.negative.player.on.push(key);
                BuffTrackerArgs.negative.target.on.push(key);
                BuffTrackerArgs.negative.party.on.push(key);

                BuffTrackerArgs.neutral.player.on.push(key);
                BuffTrackerArgs.neutral.target.on.push(key);
                BuffTrackerArgs.neutral.party.on.push(key);
            });
            BuffTracker.SaveBuffTrackerArray();
        }else{
            BuffTrackerArgs = $.parseJSON(BuffTrackerArgs);
        }
    }

    static async SaveBuffTrackerArray(){
        Storage.Set(`${MemKeys.Bufftracker}${Player.Name()}`, JSON.stringify(BuffTrackerArgs));
    }

    static async OnLoad(){
        let trackerN = ["buff", "debuff"];
        let trackerTypes = ["Player", "Target", "Party"];
        trackerN.forEach(nType => {        
            trackerTypes.forEach(type => {
                $("."+nType+type+"Marker").sortable({
                    connectWith: "."+nType+type+"Marker",
                    cursor: "move",
                    helper: "clone",
                    items: "> div",
                    stop: function(event, ui) {
                        var $item = ui.item;
                        var id = $item.parent().attr("id");
        
                        let info = $item[0].id.split("_");
                        let skillID = info[2];
                        let type = info[0];
        
                        let array_location = $(`#${id}`).data("array-location");
                        let array_type = $(`#${id}`).data("array-type");
                        
                        if(array_location=="on"){
                            let idxObj = BuffTrackerArgs[array_type][type].off.findIndex(object => {
                                return object === skillID;
                            });
                            delete BuffTrackerArgs[array_type][type].off[idxObj];
                        }else{
                            BuffTrackerArgs[array_type][type][array_location].push(skillID);
                        }     

                        
                        BuffTrackerArgs[array_type][type].off = BuffTrackerArgs[array_type][type].off.filter(function (el) {
                            return el != null;
                        });

                        BuffTracker.SaveBuffTrackerArray(); 
                        BuffTracker.CheckAllBuffs();
                    }
                }).disableSelection();
            });  
        });      
    }

    static async GetSkillNameByID(id){
        if(SkillsData.hasOwnProperty(id)){
            return SkillsData[id].name;
        }else{
            return null;
        }
    }

    static CheckAllBuffs(){    
        let trackerTypes = ["player", "target", "party"];
        trackerTypes.forEach(type => {
            BuffTracker.CheckBuffs(type);
        });
    }

    //remember to check for positive and negative conditions
    static async CheckBuffs(type){
        let classes = {player: "#"+Classes.playerId, target: "#"+Classes.targetId, party: "."+Classes.partyFrameClass};
        let element = $(`${classes[type]}`);
        let buffArrays = $(element).find('.buffarray');
        if(buffArrays.length>0){
            $(buffArrays).each(function(index, buffArray){
                let buffSlots = $(buffArray).find('.container .slot');
                if(buffSlots.length>0){
                    $(buffSlots).each(function(index, buffSlot){
                        let iconElement = $(buffSlot).find('img')[0];
                        let icon = $(iconElement).attr("src");
                        if(UI.Exist(icon)){
                            let sID = icon.split("/").pop().split(".")[0];
                            if(UI.Exist(sID) && !isNaN(sID)){
                                BuffTracker.BuffModifier(iconElement, sID, type);
                            }
                        }
                    });
                }
            });
        }
    }
    

    static BuffModifier(element, sID, type){
        let hideList = BuffTrackerArgs.negative[type].off; //Replace this array with data from settings
        let target = $(element).closest('.container');
        if(UI.Exist(target)){
            let slot = $(target).children()[0];
            if(UI.Exist(slot)){
                if($(slot).hasClass('positive')){
                    hideList = BuffTrackerArgs.positive[type].off
                }else if($(slot).hasClass('negative')){
                    hideList = BuffTrackerArgs.negative[type].off
                }else{
                    hideList = BuffTrackerArgs.neutral[type].off
                }                
            }         

            if(hideList.includes(sID)){
                $(target).hide();
            }else{                
                $(target).show();
            }        
        }
    }

    static TargetWatcher() {        
        let objConfig = {childList: true, subtree: false, attributes: false, characterData: false};
        Mutator.Destroy("BuffTargetWatcher");
        if($(`#${Classes.targetId} .buffarray`).length>0){   
            Mutator.Create("BuffTargetWatcher", `#${Classes.targetId} .buffarray`, objConfig, function (mutations) {
                BuffTracker.CheckBuffs("target");     
            });
        }
    }

    static TargetTracker(){
        Mutator.Create("TargetTrackerParent", `.${Classes.targetframes}`, {childList: true, subtree: true, attributes: false, characterData: false}, function(mutations){
            if (mutations !== null) {
                if ($(`#${Classes.targetId}`).length>0) {
                    BuffTracker.CheckBuffs("target");  
                    BuffTracker.TargetWatcher();
                }else{
                    Mutator.Destroy("BuffTargetWatcher");
                }
            }else{
                if ($(`#${Classes.targetId}`).length>0) {
                    BuffTracker.CheckBuffs("target");  
                    BuffTracker.TargetWatcher();
                }
            }
        });
    }

    static PlayerTracker(){     
        Mutator.Destroy('PlayerTracker');
        Mutator.Create(`PlayerTracker`, $(`#${Classes.playerId}`).find('.buffarray')[0], {childList: true, subtree: true, attributes: true, characterData: true}, function(mutations){
            let found = false;
            for (let mutation of mutations) {
                if(found) break;
                if(mutation.type == 'attributes'){
                    let iconElement = mutation.target;
                    if(UI.Exist(iconElement)){                        
                        let icon = $(iconElement).attr("src");
                        if(UI.Exist(icon)){
                            let sID = icon.split("/").pop().split(".")[0];
                            if(UI.Exist(sID) && !isNaN(sID)){
                                BuffTracker.BuffModifier(iconElement, sID, "player");
                                found = true;
                                break;
                            }
                        }
                    }
                }else{
                    if(mutation.addedNodes.length>0){
                        if(found) break;
                        for(let node of mutation.addedNodes){
                            if(found) break;
                            let iconElement = $(node).find('.icon')[0];
                            if(UI.Exist(iconElement)){                        
                                let icon = $(iconElement).attr("src");
                                let sID = icon.split("/").pop().split(".")[0];
                                if(UI.Exist(sID) && !isNaN(sID)){
                                    BuffTracker.BuffModifier(iconElement, sID, "player");
                                    found = true;
                                    break;
                                }
                            }
                        }
                    } 
                }         
            }
        });
    }

    static SkillTracker(node){
        let id = $(node).data('plsid');
        Mutator.Destroy(`SkillTracker${id}`);
        Mutator.Create(`SkillTracker${id}`, $(node).find('.buffarray')[0], {childList: true, subtree: true, attributes: true, characterData: true}, function(mutations){
            for (let mutation of mutations) { 
                let target = mutation.target; 
                if(mutation.type == 'attributes'){
                    if(UI.Exist(target)){               
                        let icon = $(target).attr("src");
                        if(UI.Exist(icon)){
                            let sID = icon.split("/").pop().split(".")[0];
                            if(UI.Exist(sID) && !isNaN(sID)){
                                BuffTracker.BuffModifier(target, sID, "party");
                                break;
                            }
                        }                        
                    }
                }else{
                    if(mutation.addedNodes.length>0){
                        if(UI.Exist(target)){
                            if($(target).hasClass('positive') || $(target).hasClass('negative') || $(target).hasClass('neutral')){
                                let iconElement = $(target).find('.icon')[0];
                                if(UI.Exist(iconElement)){                        
                                    let icon = $(iconElement).attr("src");
                                    let sID = icon.split("/").pop().split(".")[0];
                                    if(UI.Exist(sID) && !isNaN(sID)){
                                        BuffTracker.BuffModifier(iconElement, sID, "party");
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                                   
            }
        });
    }

    static PartyTracker(){
        Mutator.Destroy('BuffPartyTracker');
        if(Settings.Get("bufftrackerParty")){
            $.each($(`.${Classes.partyFrameClass}`).children(), function(x, o){
                BuffTracker.SkillTracker(o);
            });
            Mutator.Create(`BuffPartyTracker`, `.${Classes.partyFrameClass}`, {childList: true, subtree: true, attributes: false, characterData: true}, function(mutations){
                for (let mutation of mutations) {
                    if(mutation.addedNodes.length>0){
                        for(let node of mutation.addedNodes){
                            if($(node).hasClass('left') && $(node).hasClass('grid')){
                                BuffTracker.SkillTracker(node);
                            }
                        }
                    }        
                    if(mutation.removedNodes.length>0){
                        (async() => {                            
                            await Bartender.PartyDataOrganizer().then(function (result) {
                                BuffTracker.SkillTracker(node);
                            });
                        })();
                    }
                }
            });
        }
    }

}