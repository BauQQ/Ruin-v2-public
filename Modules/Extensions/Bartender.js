/*
 * Bartender Extension
 */

class Bartender{

   
    constructor(){
        //Settings.Add("defaultmode", "tick", false, "Enable or Disable default ui (reload)", false, "main", "Default UI", null, null, null, 11); 
        //Actions.Add("defaultmode", Bartender.DefaultUi);

        Actions.Add("bartendertargetswidth", Bartender.TargetPlateSize);
        Actions.Add("bartendertargetsheight", Bartender.TargetPlateSize);
        Actions.Add("bartenderplayerwidth", Bartender.PlayerPlateSize);
        Actions.Add("bartenderplayerheight", Bartender.PlayerPlateSize);
        Actions.Add("bartenderpartywidth", Customizer.PartyframesSize);
        Actions.Add("bartenderpartyheight", Customizer.PartyframesSize);
        Actions.Add("skillbarrows", Bartender.SkillbarRows);
        Actions.Add("manaplayerfontsize", Bartender.SetFontSizes);
        Actions.Add("manatargetfontsize", Bartender.SetFontSizes);
        Actions.Add("hpplayerfontsize", Bartender.SetFontSizes);
        Actions.Add("hptargetfontsize", Bartender.SetFontSizes);
        Actions.Add("partybuffposition", Bartender.BuffarrayPositionParty);
        Actions.Add("removepanelbackground", Bartender.RemovePanelBackground);
        Actions.Add("skillbarskillsize", Bartender.SkillBarSkilSize);
        Actions.Add("skillbarskillfont", Bartender.SkillBarSkilSize);
        Actions.Add("skillbarborderbase", Bartender.Skillbarborderbase);
        Actions.Add("showtargetbufftimers", Bartender.ShowTargetBuffTimers);
        Actions.Add("showplayerbufftimers", Bartender.ShowPlayerBuffTimers);
        Actions.Add("targetbufftimerssize", Bartender.BuffTimerFontSize);
        Actions.Add("playerbufftimerssize", Bartender.BuffTimerFontSize);
        
        Actions.Add("partybuffsize", Bartender.BuffSize);
        Actions.Add("playerbuffsize", Bartender.BuffSize);
        Actions.Add("targetbuffsize", Bartender.BuffSize);

        Actions.Add("selectedpartyborder", Bartender.PartyBorderColor);     
        Actions.Add("selectedpartyborderalpha", Bartender.PartyBorderColor);       
        
        Settings.Add("bartenderpacer", "spacer", null, "", false, "bartender", "Bartender", null, null, null, 1);
        Settings.Add("removepanelbackground", "tick", false, "Remove Black Background for all plates", false, "bartender", "Background Modifier", null, null, null, 2);
        Settings.Add("bartendertargetswidth", "ninput", 230, "Set WIDTH Targetplate ui size (0 means ignored)", false, "bartender", "Target Width Size", null, null, null, 3);
        Settings.Add("bartendertargetsheight", "ninput", 60, "Set HEIGHT Targetplate ui size  (0 means ignored)", false, "bartender", "Target Height Size", null, null, null, 4);
        
        Settings.Add("bartenderplayerwidth", "ninput", 230, "Set WIDTH Playerplate ui size (0 means ignored)", false, "bartender", "Player Width Size", null, null, null, 5);
        Settings.Add("bartenderplayerheight", "ninput", 60, "Set HEIGHT Playerplate ui size  (0 means ignored)", false, "bartender", "Player Height Size", null, null, null, 6);
        
        Settings.Add("bartenderpartywidth", "ninput", 200, "Set WIDTH Partyplate ui size (0 means ignored)", false, "bartender", "Party Width Size", null, null, null, 23);
        Settings.Add("bartenderpartyheight", "ninput", 0, "Set HEIGHT Partyplate ui size  (0 means ignored)", false, "bartender", "Party Height Size", null, null, null, 24);
        
        //Settings.Add("selectedpartyborder", "input", 'ffffff77', "(default: ffffff77)", false, "bartender", "Party Selected Bordercolor", null, null, null, 26);
        Settings.Add("selectedpartyborder", "inputcolor", 'ffffff', "(default: ffffff)", false, "bartender", "Party Selected Bordercolor", null, null, null, 26);
        Settings.Add("selectedpartyborderalpha", "colorrangeslider", 77, "", false, "bartender", "Party Selected Border Opacity", null, null, null, 27);
        

        Settings.Add("skillbarspacer", "spacer", null, "", false, "bartender", "Skillbar", null, null, null, 16);
        Settings.Add("skillbarrows", "ninput", 2, "Set how many rows you want in your skillbars", false, "bartender", "Skillbar Rows", null, null, null, 17);
        Settings.Add("skillbarskillsize", "ninput", 35, "Change the size of your skillsbar skills (default: 35)", false, "bartender", "Ability Size", null, null, null, 18);
        Settings.Add("skillbarskillfont", "ninput", 11, "Change the size of your skillsbar font (default: 11)", false, "bartender", "Skillbar Fontsize", null, null, null, 19);
        Settings.Add("skillbarborderbase", "tick", false, "Add or Remove Skillbar Border/Background", false, "bartender", "Skillbar Border", null, null, null, 20);

        Settings.Add("fontspacer", "spacer", null, "", false, "bartender", "Font Sizes", null, null, null, 45);
        Settings.Add("manaplayerfontsize", "dinput", 0.6, "Font size for mana (default: 0.6)", false, "bartender", "Player Mana Fontsize", null, null, null, 46);
        Settings.Add("manatargetfontsize", "dinput", 0.6, "Font size for mana (default: 0.6)", false, "bartender", "Target Mana Fontsize", null, null, null, 47);
        Settings.Add("hpplayerfontsize", "dinput", 1.2, "Font size for health (default: 1.2)", false, "bartender", "Player Health Fontsize", null, null, null, 48);
        Settings.Add("hptargetfontsize", "dinput", 1.2, "Font size for health (default: 1.2)", false, "bartender", "Target Health Fontsize", null, null, null, 49);

        Settings.Add("buffspacer", "spacer", null, "", false, "bartender", "Buff Sizes", null, null, null, 75);
        Settings.Add("partybuffsize", "ninput", 15, "Buff size for party(default: 15)", false, "bartender", "Party Buff Size", null, null, null, 76);
        Settings.Add("partybuffposition", "tick", true, "Buffarray inside party plates", false, "bartender", "Buffarray position", null, null, null, 77);
        Settings.Add("playerbuffsize", "ninput", 22, "Buff size for player (default: 22)", false, "bartender", "Player Buff Size", null, null, null, 78);
        Settings.Add("targetbuffsize", "ninput", 22, "Buff size for target (default: 22)", false, "bartender", "Target Buff Size", null, null, null, 79);
        Settings.Add("showtargetbufftimers", "tick", false, "Target Buffs", false, "bartender", "Hide Buff Timers", null, null, null, 81);
        Settings.Add("targetbufftimerssize", "ninput", 14, "Target (default: 14)", false, "bartender", "BuffTimer Font Size", null, null, null, 82);
        Settings.Add("showplayerbufftimers", "tick", false, "Player Buffs", false, "bartender", "Hide Buff Timers", null, null, null, 83);
        Settings.Add("playerbufftimerssize", "ninput", 14, "Player (default: 14)", false, "bartender", "BuffTimer Font Size", null, null, null, 84);
        
        setTimeout(function () {             
            Bartender.MainMenuPosition();  
            Bartender.TargetPlatePosition();
            Bartender.PlayerPlatePosition();  
            Bartender.PlayerPlateSize();
            Bartender.TargetPlateSize();
            Bartender.ExpBarPosition();
            Bartender.SkillbarRows();
            Bartender.Target();
            Bartender.SetFontSizes();
            Bartender.BuffSize();
            Bartender.PartyBorderColor();
            Bartender.PartyDataOrganizer();
            Bartender.BuffarrayPositionParty();
            Bartender.SetPartyMana();
            Bartender.RemovePanelBackground();
            Bartender.SkillBarSkilSize();
            Bartender.Skillbarborderbase();
            Bartender.ShowPlayerBuffTimers();
            Bartender.ShowTargetBuffTimers();
            Bartender.BuffTimerFontSize();
        }, 200);
    }

    static BuffTimerFontSize(){    
            $("#bufftimerfontsize").remove();   
            let player = Settings.Get("playerbufftimerssize");
            let target = Settings.Get("targetbufftimerssize");
            $("head").append(`<style id='bufftimerfontsize' type='text/css'>
            #ufplayer .buffarray .time{
                font-size:${player}px;
            }
            #uftarget .buffarray .time{
                font-size:${target}px;
            }
            </style>`);
    }

    static async ShowPlayerBuffTimers(){
            $("#showplayerbufftimers").remove();
            if(!Settings.Get("showplayerbufftimers")){
                $("head").append(`<style id='showplayerbufftimers' type='text/css'>
                #ufplayer .buffarray .time{
                    display:block;
                }
                </style>`);
            }else{
                $("head").append(`<style id='showplayerbufftimers' type='text/css'>
                #ufplayer .buffarray .time{
                    display:none;
                }            
                </style>`);
            }
    }

    static async ShowTargetBuffTimers(){
        $("#showtargetbufftimers").remove();
        if(!Settings.Get("showtargetbufftimers")){
            $("head").append(`<style id='showtargetbufftimers' type='text/css'>
            #uftarget .buffarray .time{
                display:block;
            }
            </style>`);
        }else{
            $("head").append(`<style id='showtargetbufftimers' type='text/css'>
            #uftarget .buffarray .time{
                display:none;
            }            
            </style>`);
        }
    }

    static async SetPartyMana(){
        let result = Storage.Get('showPartyMana');     
        if((result==='true')){
            $("head").append(`<style id='partymanafix' type='text/css'>
            .partyframes .panel-black .bar:first-child{
                height: 80%;
            }
            </style>`);
        }else{
            $("#partymanafix").remove();
        }
    }

    static async SetFontSizes(){     
        let manaplayer = Settings.Get("manaplayerfontsize");
        let manatarget = Settings.Get("manatargetfontsize");
        let hpplayer = Settings.Get("hpplayerfontsize");
        let hptarget = Settings.Get("hptargetfontsize");
        $($(`#${Classes.targetId}`).find('.progressBar.bghealth.svelte-i7i7g5')[0]).css({'font-size':`${hptarget}rem`});
        $($(`#${Classes.targetId}`).find('.progressBar.bgmana.svelte-i7i7g5')[0]).css({'font-size':`${manatarget}rem`});
        $($(`#${Classes.playerId}`).find('.progressBar.bghealth.svelte-i7i7g5')[0]).css({'font-size':`${hpplayer}rem`});
        $($(`#${Classes.playerId}`).find('.progressBar.bgmana.svelte-i7i7g5')[0]).css({'font-size':`${manaplayer}rem`});
    }    

    static Skillbarborderbase(){
        $("#SkillbarBorderBase").remove();
        if(Settings.Get("skillbarborderbase")){
            $("head").append(`<style id='SkillbarBorderBase' type='text/css'>
            #skillbar{
                border: 1px solid #ffffff00 !important;
                background-color: #ffffff00 !important;
            }
            </style>`);
        }
    }

    static SkillBarSkilSize(){        
        $("#skillbarskillsize").remove();
        let skillsize = Settings.Get("skillbarskillsize");
        let fontsize = Settings.Get("skillbarskillfont");
        $("head").append(`<style id='skillbarskillsize' type='text/css'>
        #skillbar .slot, #skillbar .icon, #skillbar .overlay img{
            height:${skillsize}px;
            width:${skillsize}px;
        }
        #skillbar .slottext{
            font-size:${fontsize}px;
        }
        </style>`);
    }

    static BuffarrayPositionParty(){      
            $("#buffpartyposition").remove();
            if(Settings.Get("partybuffposition")){
                $("head").append(`<style id='buffpartyposition' type='text/css'>
                .partyframes .buffarray{
                    left: 0!important;
                    top: inherit !important;
                }
                </style>`);
            } 
    }

    static BuffSize(){   
            let partySize = Settings.Get("partybuffsize");
            let selfSize = Settings.Get("playerbuffsize");
            let targetSize = Settings.Get("targetbuffsize");
            $("#buffsizes").remove();
            $("head").append(`<style id='buffsizes' type='text/css'>${Classes.buffarrayParty} ${Classes.buffSlot} {
                height:${partySize}px !important;
                max-width: ${partySize}px !important;
            }
            #${Classes.targetId} ${Classes.buffSlot}{
                height:${targetSize}px !important;
                max-width: ${targetSize}px !important;
            }

            #${Classes.playerId} ${Classes.buffSlot}{
                height:${selfSize}px !important;
                max-width: ${selfSize}px !important;
            }
            </style>`);
    }

    static PartyBorderColor(){        
            let color = Settings.Get("selectedpartyborder");
            let alpha = Settings.Get("selectedpartyborderalpha");
            $("#targetbarborder").remove();
            $("head").append(`<style id='targetbarborder' type='text/css'>.${Classes.target} {
                box-shadow: 0px 0px 0px 2px #${color}${alpha} !important;
            }
            </style>`);
    }
    
    static RemovePanelBackground(){        
            $("#RemovePanelBackground").remove();
            if(Settings.Get("removepanelbackground")){
                $("head").append(`<style id='RemovePanelBackground' type='text/css'>
                #ufplayer .panel-black, #uftarget .panel-black, .partyframes .panel-black{
                    background-color:unset;
                }
                </style>`);
            }
    }

    
    static TargetWatcher() {        
            let objConfig = {childList: true, subtree: true, attributes: true, characterData: true};
            Mutator.Destroy("targetTidyWatcher");
            if($(`#${Classes.targetId} .left`).length>0){     
                Bartender.SetFontSizes();       
                Bartender.TargetPlatePosition();
                Bartender.TargetPlateSize();
                Bartender.RemovePanelBackground();
                Customizer.TargetClassColors();  
                Mutator.Create("targetTidyWatcher", `#${Classes.targetId} .left`, objConfig, function (mutations) {                   
                    Bartender.Target(null);
                });
            }
    }

    static SkillBarPosition(){        
        let data = Gstate.mod.chars[CharID].ui["skillbar"];
        $(`#${Classes.skillbarId}`).css({position: "absolute", top: data.top + "px", left: data.left + "px"});        
    }

    static ExpBarPosition(){        
        if(!CustomCss.IsDefualt()){
            let data = Gstate.mod.chars[CharID].ui["expbar"];
            $(`#${Classes.expbarBar}`).css({position: "absolute", top: data.top + "px", left: data.left + "px"});
        }
    }

    static MainMenuPosition(){
        let data = Gstate.mod.chars[CharID].ui["mainMenu"];
        $(`${Classes.mainmenu}`).css({position: "relative", top: data.top + "px", left: data.left + "px"});
    }

    static TargetPlatePosition(){
        let data = Gstate.mod.chars[CharID].ui["uftarget"];
        $(`#${Classes.targetId}`).css({position: "absolute", top: data.top + "px", left: data.left + "px"});
    }

    static PlayerPlatePosition(){
        let data = Gstate.mod.chars[CharID].ui["ufplayer"];
        $(`#${Classes.playerId}`).css({position: "absolute", top: data.top + "px", left: data.left + "px"});
    }

    static TargetPlateSize(){
            let width = Settings.Get("bartendertargetswidth");
            let height = Settings.Get("bartendertargetsheight");
            if(width>0){
                width = parseInt(width) + 30;
                $(`#${Classes.targetId}`).css({width: width+ "px"});
            }
            if(height>0){
                $(`#${Classes.targetId}`).css({height: height + "px"});
            }
    }

    static PlayerPlateSize(){ 
            let width = Settings.Get("bartenderplayerwidth");
            let height = Settings.Get("bartenderplayerheight");
            if(width>0){
                $(`#${Classes.playerId}`).css({width: width + "px"});
            }
            if(height>0){
                $(`#${Classes.playerId}`).css({height: height + "px"});
            }
    }
    
    /*
     * Disable Bartender
     */
    static Disable() {
            $(".bgmana").removeClass("mana_gradient");
            $.each(ColorData, function (b, a) {
                $(`.${a.gradient}`).removeClass(a.gradient);
            });
    }

    static Target(mutations = null) {  
            Bartender.SetFontSizes();        
            Bartender.TargetPlatePosition();
            Bartender.TargetPlateSize();
            Bartender.RemovePanelBackground();
            Customizer.TargetClassColors();
            if (mutations !== null) {
                for (let mutation of mutations) {
                    for (let node of mutation.addedNodes) {
                        if ($(node).attr('id') === Classes.targetId) { 
                            HasTarget = true;
                            Customizer.HideClassIcon();  
                            Bartender.TargetWatcher();
                        }
                    }
                    for (let node of mutation.removedNodes) {
                        if ($(node).is(`#${Classes.targetId}`)) { 
                            HasTarget = false;
                            Customizer.HideClassIcon();  
                            Bartender.TargetWatcher();
                            Mutator.Destroy("targetTidyWatcher");
                        }
                    }
                }
            }else{
                if ($(`#${Classes.targetId}`).length>0) {
                    HasTarget = false;
                    Social.StreamerMode(); 
                    Customizer.HideClassIcon();  
                    Bartender.SetFontSizes();    
                    Bartender.TargetPlatePosition();
                    Bartender.TargetPlateSize();
                    Bartender.RemovePanelBackground();
                    Customizer.TargetClassColors();
                    Bartender.TargetWatcher();
                }
            }
    }

    
    static async SkillbarRows(){        
            let rows = Settings.Get("skillbarrows");
            if(rows>0){
                let i = Math.floor($(`#${Classes.skillbarId}`).children().length / rows);
                $(`#${Classes.skillbarId}`).css("grid-template-columns", `repeat(${i}, auto)`);    
            }
            Bartender.SkillBarPosition();
    }

    static PartyDataOrganizer(){    
            MyParty = {};
            $.each($(`.${Classes.partyFrameClass}`).children(), function(hand, node){
                let nameNode = $(node).find('.bghealth .left')[0];
                let iconStr = $($(node).find('img.tag.icon')[0]).attr('src');
                let name = "";
                let lead = false;
                if(UI.Exist(nameNode)){
                    name = $(nameNode).html().trim();   
                }
                $(node).data('plsid', hand);
                $(node).attr('data-plsid', hand);
                $($(node).find('.buffarray')[0]).data('plsid', hand);            
                
                if(UI.Exist(iconStr)){
                    if(iconStr.includes("/star.webp")){
                        lead = true;
                    }else{
                        lead = false;
                    }
                }
                MyParty[hand] = {lead:lead, name:name, abilities:{}};                
            });
            return true;
    }

    static async Party(mutations){        
            if (mutations !== null) {
                for (let mutation of mutations) {
                    if (mutation.type === "attributes") {
                        Customizer.PartyframesClassColors();
                        Customizer.HideClassIcon(); 
                    }
                    for (let node of mutation.addedNodes) {
                        if ($(node).is('div') && $(node).hasClass('left') && $(node).hasClass('grid')) {
                            Bartender.BuffarrayPositionParty();
                            Bartender.RemovePanelBackground();
                            Bartender.SetPartyMana();
                            Customizer.HideClassIcon();
                            Customizer.PartyframesClassColors(); 
                            Bartender.PartyDataOrganizer();
                            Social.StreamerMode();
                        }
                    }
                    for (let node of mutation.removedNodes) {
                        if ($(node).is('div') && $(node).hasClass('left') && $(node).hasClass('grid')) {
                            Bartender.PartyDataOrganizer();
                        }
                    }
                }
            }
    }
    
    static Hook(){        
        Mutator.Create("uftarget", `.${Classes.targetframes}`, {childList: true, subtree: false, attributes: false, characterData: false}, Bartender.Target);
        Mutator.Create("partyplates", `.${Classes.partyFrameClass}`, {childList: true, subtree: true, attributes: true, attributeFilter: ['class'], characterData: false}, Bartender.Party);
    }
    
}