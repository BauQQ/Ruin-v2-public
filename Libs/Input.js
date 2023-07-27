/*
 * Input manager Lib class
 * Deals with all inputs and assign them to the correct position
 */
class Input {
    constructor() {
        Input.Mouse();
        Input.Keyboard();
        setTimeout(function () { 
            Input.RegisterKeybinds();            
        }, 500);
    }

    //Delegate for picking up keybinds
    static Keyboard() {
        $(document).undelegate("html", "keydown");
        $(document).delegate("html", "keydown", function (e) {
            if(!$(Classes.chatfocusinput).is(":focus") && !$('input').is(':focus') && !$('textarea').is(':focus')){
                let key = e.originalEvent.which;
                if (Keybinds.hasOwnProperty(key) && Keybinds[key].type=="down") {
                    Keybinds[key].func();
                }
            }
        });

        $(document).undelegate("html", "keypress");
        $(document).delegate("html", "keypress", function (e) {
            if(!$(Classes.chatfocusinput).is(":focus") && !$('input').is(':focus') && !$('textarea').is(':focus')){
                let key = e.originalEvent.which;
                if (Keybinds.hasOwnProperty(key) && Keybinds[key].type=="press") {
                    Keybinds[key].func();
                }
            }
        });
    }
    
    // Trigger keyboard event on element
    static KeyboardEvent(element, event, option){
        event = new KeyboardEvent(event, option);
        element.dispatchEvent(event);
    }

    static Mouse() {
        $("html").mouseover(function (e) {
            Mpos.x = e.pageX;
            Mpos.y = e.pageY;
        });

        //Bind click event
        $(document).delegate("html", "click", function (e) {
            if(Settings.Get("partytabtarget")){
                if($(e.target).hasClass(Classes.targetClickClass)){
                    PartyTarget = $(e.target).closest(Classes.partyMembersSelect)[0];
                }
            }
            let toHide = [];
            for(let x in hideOnClicks){  
                if(!e.target.classList.contains(x)){
                    toHide.push(x);
                }   
            }

            for(let x of toHide){
                let elem = $(`.${hideOnClicks[x]}`);
                if(UI.Exist(elem)){
                    if(!$(elem).hasClass("hidden")){
                        $(elem).addClass("hidden");
                    }
                }
            }
            
        });
    }

    static DelegateClick(parent, target, func){
        $(parent).undelegate(target, "click");
        $(parent).delegate(target, "click", function (e) {
           func(e);
        });
    }

    static BindOnClick(target, func){
        $(target).off("click");
        $(target).on("click", function(e){
            func(e);
        });
    }

    static Bind(key, type, func){
        if (!Input.Has(key)){
            Keybinds[key] = {type:type, func:func};
            return true;
        }else{
            return false;
        }
    }

    //Unbind
    static Unbind(key){
        if (Input.Has(key)){
            delete Keybinds[key];
        }
    }

    //Has Keybind
    static Has(key){     
        if (Keybinds.hasOwnProperty(key)){
            return true;
        }else{
            return false;
        }
    }

    static RegisterKeybinds(){
        let Binds = Character.GetKeybinds();
        for(let key in Binds){
            Input.Unbind(Binds[key]);
        }

        for(let key in ModularBinds){
            ModularBinds[key].Unbind();
        }

        let result = Settings.Get("partyselection");
        if(ModularBinds.hasOwnProperty(result)){
            ModularBinds[result].RegisterKeybinds();
        }
    }

    static async WindowBind(key, data, func = null){
        Input.Bind(key.toUpperCase().trim().charCodeAt(0), "down", function(){
            if(func!==null){
                func(data);
            }
            if($(`.${data.cls}`).is(":visible")){
                $(`.${data.cls}`).hide();
            }else{
                UI.WindowOpened(data.name.toLowerCase());
                $(`.${data.cls}`).show();
            }
        })
    }
}