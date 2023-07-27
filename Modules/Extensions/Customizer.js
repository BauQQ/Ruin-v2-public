/*
 * Customizer Extension
 */

class Customizer{

    constructor(){
        
        UI.AddWindow("uftarget", {top: -100, left: 237, uilock: `#${Classes.targetId}`});
        UI.AddWindow("uichat", {top: 0, left: 0, uilock: `#${Classes.uichat}`});
        UI.AddWindow("ufplayer", {top: -100, left: -300, uilock: `#${Classes.playerId}`});
        UI.AddWindow("skillbar", {top: -67, left: -253, uilock: `#${Classes.skillbarId}`});
        UI.AddWindow("expbar", {top: 956, left: 785, uilock: `#${Classes.expbarBar}`});
        UI.AddWindow("partyframes", {top: 0, left: 0, uilock: `.${Classes.partyFrameClass}`});
        UI.AddWindow("mainMenu", {top: 4, left: -1000, uilock: `${Classes.mainmenu}`});

        Actions.Add("hidequicklinks", Customizer.HideQuickLinks);
        Actions.Add("defaultfont", Customizer.DefaultFont);
        Actions.Add("hideexpbar", Customizer.HideExpBar);
        Actions.Add("classicons", Customizer.HideClassIcon);
        Actions.Add("classcolors", Customizer.ClassColors);
        Actions.Add("lockui", Customizer.LockUnlockUI);
        Actions.Add("gridmode", Customizer.Gridmode);

        Settings.Add("lockui", "tick", true, "Lock or unlock your ui", false, "customizer", "Lock UI", null, null, null, 1);
        Settings.Add("gridmode", "tick", false, "Enable gridmode", false, "customizer", "Gridmode", null, null, null, 2);        
        //Settings.Add("gridmodesnap", "ninput", 1, "Snapping Size in pixels for grid (default:1)", false, "customizer", "Gridmode Snapsize", null, null, null, 3);

        Settings.Add("hideexpbar", "tick", false, "Hides or shows your expbar", false, "customizer", "Hide Expbar", null, null, null, 5);
        Settings.Add("hidequicklinks", "tick", false, "Hide twitch and other links under minimap", false, "customizer", "Hide Quick Links", null, null, null, 6);
        Settings.Add("defaultfont", "tick", false, "Use default font", false, "customizer", "Default Font", null, null, null, 7);
       
        
        Settings.Add("classpacer", "spacer", null, "", false, "customizer", "Classes", null, null, null, 19);
        Settings.Add("classicons", "tick", false, "Hides all class icons", false, "customizer", "Hide Class Icons", null, null, null, 20);
        Settings.Add("classcolors", "tick", false, "Enable or disable classcolors", false, "customizer", "Use Class Colors", null, null, null, 21);

        setTimeout(function () {
            Customizer.HideQuickLinks();
            Customizer.DefaultFont();
            Customizer.HideExpBar();
            Customizer.HideClassIcon();
            Customizer.ClassColors(); 
            Customizer.LockUnlockUI();
            Customizer.Gridmode();
            Customizer.ChatPosition();
            Customizer.PartyframesPosition();
            Customizer.PartyframesSize();
            
        }, 200);
    }

    static async PartyframesPosition(){
        let data = Gstate.mod.chars[CharID].ui["partyframes"];
        $(`.${Classes.partyFrameClass}`).css({position: "absolute", top: data.top + "px", left: data.left + "px"});
    }

    static async ChatPosition(){
        let data = Gstate.mod.chars[CharID].ui["uichat"];
        if(data.top==0 && data.left ==0){

        }else{
            $(`#${Classes.uichat}`).css({position: "absolute", top: data.top + "px", left: data.left + "px"});
        }
    }

    static PartyframesSize(){     
        let l = $(`.${Classes.partyFrameClass}`).children();
        let data = Gstate.mod.chars[CharID].ui["partyframes"];
        for (let node of l) {
            let width = Settings.Get("bartenderpartywidth");
            let height = Settings.Get("bartenderpartyheight");
            if(width>0){
                $(l).css({width: width + "px"});
            }
            if(height>0){
                $(l).css({height: height + "px"});
            }
        }
    }

    static async Gridmode(){
        if(Settings.Get("gridmode")){
            $(Classes.uiUBase).addClass("gridmode_grid");
        }else{
            $(Classes.uiUBase).removeClass("gridmode_grid");
        }        
    }

    static async LockUnlockUI(){
        $.each(Gstate.mod.chars[CharID].ui, function(key, value){
            if(value.hasOwnProperty("uilock") && UI.Exist(value.uilock)){                
                Customizer.AddDrag($(value.uilock), null, key); 
                Customizer.ModDrag($(value.uilock));
            }
        });
    }

    static async ClassColors(){
        Customizer.PlayerClassColors();
        Customizer.TargetClassColors();
        Customizer.PartyframesClassColors();
    }

    static async PartyframesClassColors(){
        if(Settings.Get("classcolors")){
            let l = $(`.${Classes.partyFrameClass}`).children();
            for (let node of l) {
                let c = Character.ClassByImage($(node).find('.iconcontainer img.icon').attr('src'));
                $($(node).find(` .bar .bgmana`)[0]).addClass("mana_gradient");
                if ($(node).find(".bar .bghealth")[0]) {
                    if (~$(node).find(".bar .bghealth").attr('class').indexOf(c.type + "_gradient")) {
                        continue;
                    } else {
                        $(node).find(".bar .bghealth").addClass(ColorData[c.key].gradient);
                    }
                }
            }
        }else{            
            let l = $(`.${Classes.partyFrameClass}`).children();
            for (let node of l) {
                for(let entry in ColorData){
                    if($($(node).find(".bar .bghealth")[0]).hasClass(ColorData[entry].gradient)){
                        $($(node).find(".bar .bghealth")[0]).removeClass(ColorData[entry].gradient);
                    }
                }
            }
        }
        if(!CustomCss.IsDefualt()){
            Customizer.PartyframesPosition();
            Customizer.PartyframesSize();
        }
    }

    static async TargetClassColors(){
            let targetElement = $(`#${Classes.targetId}`)[0];
            if(targetElement){
                $($(targetElement).find(` .bar .bgmana`)[0]).addClass("mana_gradient");
                let classKey = $($(targetElement).find(` .bars`)[0]).children().first().find(".progressBar").data("classkey");
                if(UI.Exist(classKey)){
                    $($(targetElement).find(` .bars`)[0]).children().first().find(".progressBar").removeClass(ColorData[classKey].gradient);
                }
                
                if(Settings.Get("classcolors")){
                    classKey = Character.ClassByImage($(targetElement).find('.iconcontainer img').attr('src'));
                    $($(targetElement).find(` .bars`)[0]).children().first().find(".progressBar").data("classkey", classKey.key);
                    $($(targetElement).find(` .bars`)[0]).children().first().find(".progressBar").addClass(ColorData[classKey.key].gradient);
                }
            }
        
    }

    static async PlayerClassColors(){
            let playerClass = Gstate.mod.chars[CharID].class;
            let playerElement = $(`#${Classes.playerId}`)[0];
            if(playerElement){
                $($(playerElement).find(` .bar .bgmana`)[0]).addClass("mana_gradient");
                $($(playerElement).find(` .bars`)[0]).children().first().find(".progressBar").removeClass(ColorData[playerClass.key].gradient);
                
                if(Settings.Get("classcolors")){
                    $($(playerElement).find(` .bars`)[0]).children().first().find(".progressBar").addClass(ColorData[playerClass.key].gradient);
                }
            }
    }

    static async HideClassIcon(){
        if(Settings.Get("classicons")){
            let l = $(`.${Classes.partyFrameClass}`).children();
            for (let node of l) {
                $(node).find(Classes.partyIconContainer).hide();
            }
            $(`${Classes.targetframesIcons}`).hide();
        }else{
            let l = $(`.${Classes.partyFrameClass}`).children();
            for (let node of l) {
                $(node).find(Classes.partyIconContainer).show();
            }
            $(`${Classes.targetframesIcons}`).show();
        }
    }

    static async HideExpBar(){
        if(Settings.Get("hideexpbar")){
            $(`#${Classes.expbarBar}`).hide();
        }else{

            $(`#${Classes.expbarBar}`).show();
        }
    }

    static async DefaultFont(){
        if(!Settings.Get("defaultfont")){
            $("head").append("<style id='hordesfont' type='text/css'>@font-face{font-family:hordes;font-style:normal;font-weight:400;font-display:fallback;src:local('hordes Regular'),local('OpenSans-Regular'),url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWJ0bbck.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:hordes;font-style:normal;font-weight:400;font-display:fallback;src:local('hordes Regular'),local('OpenSans-Regular'),url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFUZ0bbck.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:hordes;font-style:normal;font-weight:400;font-display:fallback;src:local('hordes Regular'),local('OpenSans-Regular'),url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWZ0bbck.woff2) format('woff2');unicode-range:U+1F00-1FFF}@font-face{font-family:hordes;font-style:normal;font-weight:400;font-display:fallback;src:local('hordes Regular'),local('OpenSans-Regular'),url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVp0bbck.woff2) format('woff2');unicode-range:U+0370-03FF}@font-face{font-family:hordes;font-style:normal;font-weight:400;font-display:fallback;src:local('hordes Regular'),local('OpenSans-Regular'),url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWp0bbck.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:hordes;font-style:normal;font-weight:400;font-display:fallback;src:local('hordes Regular'),local('OpenSans-Regular'),url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFW50bbck.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:hordes;font-style:normal;font-weight:400;font-display:fallback;src:local('hordes Regular'),local('OpenSans-Regular'),url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0b.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:hordes;font-style:normal;font-weight:700;font-display:fallback;src:local('hordes Bold'),local('OpenSans-Bold'),url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOX-hpOqc.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:hordes;font-style:normal;font-weight:700;font-display:fallback;src:local('hordes Bold'),local('OpenSans-Bold'),url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOVuhpOqc.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:hordes;font-style:normal;font-weight:700;font-display:fallback;src:local('hordes Bold'),local('OpenSans-Bold'),url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOXuhpOqc.woff2) format('woff2');unicode-range:U+1F00-1FFF}@font-face{font-family:hordes;font-style:normal;font-weight:700;font-display:fallback;src:local('hordes Bold'),local('OpenSans-Bold'),url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOUehpOqc.woff2) format('woff2');unicode-range:U+0370-03FF}@font-face{font-family:hordes;font-style:normal;font-weight:700;font-display:fallback;src:local('hordes Bold'),local('OpenSans-Bold'),url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOXehpOqc.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:hordes;font-style:normal;font-weight:700;font-display:fallback;src:local('hordes Bold'),local('OpenSans-Bold'),url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOXOhpOqc.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:hordes;font-style:normal;font-weight:700;font-display:fallback;src:local('hordes Bold'),local('OpenSans-Bold'),url(https://fonts.gstatic.com/s/opensans/v17/mem5YaGs126MiZpBA-UN7rgOUuhp.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}</style>");
            $("body").css("font-family", "Roboto, Open Sans, sans-serif");
        }else{           
            $("#hordesfont").remove();
            $("body").css("font-family", "");
        }
    }

    static async HideQuickLinks(){
        let target =`.${Classes.quicklinksClass}`;
        if(Settings.Get("hidequicklinks")){
            $(target).hide();
        }else{
            $(target).show();
        }
    }

    static async LoadModsFor(key, element, data = null){
        if(Gstate.mod.chars[CharID].ui[key].hasOwnProperty("modable") && Gstate.mod.chars[CharID].ui[key].modable){
            let window = $(element).closest(`.${Classes.windowCls}`)[0];
            if(Gstate.mod.chars[CharID].ui[key].custom_svelte){
                window = $(element).closest(`.${Gstate.mod.chars[CharID].ui[key].custom_svelte}`)[0];
            }else if(Gstate.mod.chars[CharID].ui[key].svelte){            
                window = $(element).closest(`.container.${Gstate.mod.chars[CharID].ui[key].svelte}`)[0];
            }
            if(UI.Exist(window)){
                if(key!=="inventory" && key!=="stash"){
                    if(!$(window).hasClass('window')){
                        window = $(window).find('.window')[0];
                    }
                }

                if(Gstate.mod.chars[CharID].ui[key].hasOwnProperty("top") && Gstate.mod.chars[CharID].ui[key].hasOwnProperty("left")){
                    if(Gstate.mod.chars[CharID].ui[key].top!=0 || Gstate.mod.chars[CharID].ui[key].left!=0){
                        if(key!=="inventory" && key!=="stash"){
                            UI.Position(window, "absolute", Gstate.mod.chars[CharID].ui[key].top, Gstate.mod.chars[CharID].ui[key].left);
                        }else{
                            UI.Position(window, "absolute", Gstate.mod.chars[CharID].ui[key].top, Gstate.mod.chars[CharID].ui[key].left, true);
                        }
                    }
                }
                let handle = $(window).find(`.${Classes.windowHandle}`)[0];
                if(handle!=undefined){
                    $(element).addClass("stackable");
                    Customizer.AddDrag(window, handle, key);
                    if(!Settings.Get("lockui")){
                        Customizer.ModDrag(window);
                    }
                }            
            }
        }
    }

    static async ModDrag(element){
        if($(element).hasClass("stackable")){
            if(Settings.Get("lockui")){
                $(element).draggable('disable');
            }else{
                $(element).draggable('enable');
            } 
        }
    }

    static async AddDrag(element, handle, key = null){      
        //setTimeout(function () {
            $(element).addClass("stackable");       
            $(element).draggable({handle: handle, stack: ".stackable", stop: function (event, window) {
                if(key!==null){
                    Gstate.mod.chars[CharID].ui[key].top = window.position.top;
                    Gstate.mod.chars[CharID].ui[key].left = window.position.left;
                    Storage.Save();
                }
            }});
       // }, 50);
    }
}
