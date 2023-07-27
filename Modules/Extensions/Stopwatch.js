/*
 * Stopwatch Extension
 */

class Stopwatch{    

    constructor(){
        let inc = Stopwatch.GetModuleSetting();
        if(!$(`.${inc.cls}`)[0]){
            Stopwatch.Create(inc);
        }
    }

    static GetModuleSetting(){
        return {
            name : "Stopwatch",
            element : "mainMenuButton",
            id : "sysstopwatch",
            cls : "r2_stopwatch",
            base : "windowPanel",
            internal : "stopwatch_i_button",
            settings : {
                key : "stopwatchkey",
                hotkey : "l",
                description: "Stopwatch hotkey"
            },
            close: Classes.closefeature,
            btn : "S",
            position : {
                top: 150,
                left: 150
            },
            actions : {
                action :  {key :"SWStart", func : "Start"},
                action2 : {key :"SWReset", func: "Reset"}
            }
        };
    }

    static async Create(data){
        //Menu
        let menu = {
            id : data.id,
            text : data.btn
        };
        let menuElement = await Elements.aBuild(data.element, menu);
        //let menuElement = Elements.Build(data.element, menu);
        UI.AddToMenu(menuElement);

        let actions = {};
        $.each(data.actions, function(key, value) {
            actions[key] = value.key;
            Actions.Add(value.key, Stopwatch[value.func]);
        });

        //Add window to the UI
        let windowData = {
            id: data.cls,
            cls : data.cls,
            n : data.name.toLowerCase(),
            text : data.name,
            //html : Elements.Build(data.internal, actions),
            html : await Elements.aBuild(data.internal, actions),
            close : data.close
        };
        
        //let html = Elements.Build(data.base, windowData);
        let html = await Elements.aBuild(data.base, windowData);
        UI.Append(`${Classes.uibase}:first`, html);
        UI.CloseElementDelegation($(`.${data.cls}`));
        UI.DelegateMainMenu(data.id, `.${data.cls}`, data.name.toLowerCase());

        $.each(data.actions, function(key, value) {
            //Utility.FDelegation(`.${data.cls}`, value.key, null);
            
            UI.Delegate(`.${data.cls}`, "click", `div[data-action='${value.key}']`, value.key, null);
        });

        UI.AddWindow(data.name.toLowerCase(), {modable: true, top:50, left:150, w:0, h:0, resize:true, custom_svelte:data.cls});        
        Settings.Add(data.settings.key, "input", data.settings.hotkey, data.settings.description, false, "hotkeys", data.name, null);
        Stopwatch.Bind(Settings.Get(data.settings.key), data);
    }

    static async Bind(key, data){
        Input.Bind(key.toUpperCase().trim().charCodeAt(0), "down", function(){
            if($(`.${data.cls}`).is(":visible")){
                $(`.${data.cls}`).hide();
            }else{
                $(`.${data.cls}`).show();
            }
        })
    }
    
    static async Start(event, data){
        //console.log("start/stop");
    }

    static async Reset(event, data){
        //console.log("reset");
    }


}
