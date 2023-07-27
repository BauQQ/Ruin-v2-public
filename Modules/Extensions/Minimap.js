/*
 * Minimap Extension
 */

class Minimap{
    constructor(){
        UI.AddWindow("minimap", {modable: false, top:0, left:0});    
        Settings.Add("mapspacer", "spacer", null, "", false, "customizer", "Maps", null, null, null, 6);
        Settings.Add("roundmap", "tick", false, "Enable round minimap", false, "customizer", "Round Map", null, null, null, 7);
        Settings.Add("centermap", "tick", false, "Enable map centering", false, "customizer", "Center Big Map", null, null, null, 8);
        Actions.Add("roundmap", Minimap.Round);
        Minimap.ResizeObserver();                  
        Minimap.Round();
    }

    static async Round(){
        if(Settings.Get("roundmap")){
            Minimap.Modify(100);
        }else{
            Minimap.Modify(0);
        }
    }

    static async ResizeObserver(){
        let flexSize = 200;
        let offset = 100;
        let element = $(`.${Classes.mapClass}`)[0];
        let minimap = $(`.${Classes.minimapCanvas}`)[0];
        Gstate.mod.chars[CharID].ui.minimap.left = $(element).offset().left;
        Gstate.mod.chars[CharID].ui.minimap.top = $(element).offset().top;
        let resizeObserver = new ResizeObserver(function () {
            if(Settings.Get("centermap")){
                if (minimap.height > flexSize || minimap.width > flexSize) {                 
                    Minimap.Modify(0);
                    $(minimap).addClass("mapCanvas566");
                    $(element).css("height", "auto");
                    $(element).css("width", "auto");

                    let t = Math.max(0, ($(window).height() - $(element).height()) /
                            2 + $(window).scrollTop());
                    let l = Math.max(0, ($(window).width() - $(element).width()) / 2 + $(window).scrollLeft());
                    $(element).offset({top: t - offset, left: l});
                }else{                    
                    Minimap.Round();                 
                    $(minimap).removeClass("mapCanvas566");
                    $(element).offset({top: Gstate.mod.chars[CharID].ui.minimap.top, left: Gstate.mod.chars[CharID].ui.minimap.left});
                }
            }else{                       
                Minimap.Round();   
            }
        });
        resizeObserver.observe(element);
    }

    static async Modify(radius){
        let map = $(`.${Classes.mapClass}`), canvas = $(map).find("canvas");        
        $(map).css("border-radius", `${radius}px`); 
        $(canvas).css("border-radius", `${radius}px`);
    }
}
