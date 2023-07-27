/*
 * Interaction Extension
 */

class Interaction{

    constructor(){        
        Actions.Add("endisescapeclosekey", Interaction.RegisterKeybinds);
        Settings.Add("endisescapeclosekey", "tick", false, "Enable or disable the escape hotkey for window closing" , false, "main","Escape to close windows", null, null, null, 7);

        UI.AddWindow("interaction", {action:Interaction.LoadUI, modable: true, top:50, left:200, w:0, h:0, resize:true, svelte:Classes.interactionSvelte});
        ExecuteOnWindowLoad["interaction"] = [];
        Actions.Add("closeWindowsKey", Interaction.RegisterKeybinds);
        Settings.Add("closeWindowsKey", "input", "escape", "Enable it in Ruin UI v2", false, "hotkeys", "Close Last Window", null);
        
        Interaction.CheckWindowPreopen();
        Interaction.RegisterKeybinds();

    }

    static CheckWindowPreopen(){
        $.each(SystemWindows, function(i, window){
            let result = Storage.Get(i);
            if(result === "true"){
                UI.WindowOpened(window);
            }
        });
    }

    static async RegisterKeybinds(){
        let ticked = Settings.Get("endisescapeclosekey");
        let key = Settings.Get("closeWindowsKey");
        if(fnKeys.hasOwnProperty(key.trim())){
            key = [fnKeys[key.trim()]];
        }else{
            key = [key.trim().toUpperCase().charCodeAt(0), key.trim().charCodeAt(0)];
        }
        
        $.each(key, function(i, setting){
            if(ticked){           
                Input.Bind(setting, "down", Interaction.CloseWindowOnKey);
            }else{
                Input.Unbind(setting);
            }            
        });        
    }

    static async CloseWindowOnKey(){
        //if(!HasTarget){
            let closed = false;            
            let OpenedWindowsClone = Utility.Clone(OpenWindows);
            OpenedWindowsClone.reverse().forEach(async (window) => {
                if(closed) return;
                if(Interaction.CloseWindow(window)){
                    closed = true;
                }
            });           
        //}
    }

    static CloseWindow(windowName){
        let window = UI.GetWindow(windowName);
        if(window === null){
            $.each($(`.window .titleframe_custom`), function(i, handle){
                let title = $(handle).find(".title div").text();
                if(typeof title !== "undefined" && !Utility.isEmpty(title)){
                    title = title.trim().toLowerCase();
                    if(title === windowName.trim().toLowerCase()){                
                        window = $(handle).closest(".window")[0];
                    }
                }
            });
            if(window === null){
                return false;
            }
        }

        let button;
        if(typeof window === "object" && window instanceof Element){
            button = $(window).find(".titleframe .btn.svgicon")[0];   
        }else{
            if(window.hasOwnProperty("custom_svelte") && UI.Exist(window.custom_svelte)){
                button = $(`.${window.custom_svelte} .titleframe .btn.svgicon`);
            }else{
                button = $(`.${window.svelte} .window .titleframe .btn.svgicon`);
            }
        }
        
       
        const index = OpenWindows.indexOf(windowName);
        if (index > -1) {
            OpenWindows.splice(index, 1);            
        }

        if($(button).is(":visible")){
            if(UI.Exist(button)){
                button.click();
            }
            if(typeof window === "object" && window instanceof Element){
                $(window).remove();
            }else{
                if(window.hasOwnProperty("rem") && window.rem){
                    if(window.hasOwnProperty("custom_svelte") && UI.Exist(window.custom_svelte)){
                        $(`.${window.custom_svelte}`).remove();
                    }else{
                        $(`.${window.svelte}`).remove();
                    }
                }
            }
            return true;
        }else{

            return false;
        }
    }

    static LoadUI(){
        Inject.ExecuteOnWindowLoad("interaction");

        //console.log("open character UI");
    }
}

