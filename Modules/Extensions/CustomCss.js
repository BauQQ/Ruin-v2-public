class CustomCss{
    constructor(){
        let setting = CustomCss.GetModuleSetting();
        Actions.Add(setting.id, CustomCss.OnLoad);
        Settings.Add(setting.id, setting.type, setting.defaultvalue, setting.description, setting.hidden, setting.parent, setting.name, setting.handler, null, setting.action, setting.order);
        
        Actions.Add("baseCssSelector", CustomCss.InjectBaseTheme);
        Settings.Add("baseCssSelector", "dropdown", "Ruin UI", "Choose your default theme", false, setting.id, "Theme Selector", null, ["Ruin UI","Default"], null, 5);
        Settings.Add("customCssFirstSpacer", "spacer", null, "", false, setting.id, "Input Your Customized CSS", null, null, null, 9);
        Settings.Add("customCssInput", "customcssInput", "15_35", "", false, setting.id, "customcssInput", null, null, null, 10);
        Settings.Add("save_customCssInput", "ButtonRight", null, "", false, setting.id, "Apply Custom CSS", null, null, null, 11);
        
        CustomCss.InjectBaseTheme();
        CustomCss.LoadCustomCSS();
    }

    static GetModuleSetting(){
        return {id: "emc-customcss", type: null, defaultvalue: null, description:"Custom CSS Tool", hidden : false, name :"CSS Customizer", parent: null, handler: 1, action:true, order:93};
    }
    
    static GetStyleName(){
        return Settings.Get("baseCssSelector").toLowerCase().replace(/ /g,'');
    }

    static IsDefualt(){
        return CustomCss.GetStyleName()=="default";
    }

    static InjectBaseTheme(){
        $("#main_theme").remove();
        if(!CustomCss.IsDefualt()){
            let style = `${CustomCss.GetStyleName()}_style`;
            if(typeof GlobalStyles[style] != undefined && UI.Exist(GlobalStyles[style])){                
                $("head").append(GlobalStyles[style]);
            }          
        }
    }

    static LoadCustomCSS(){  
        let css = Storage.Get(`${MemKeys.CustomCss}${Player.Name()}`);
        if(css!==null && css.length>0){
            $("head").append(`<style id="custom_emc_css_input">${css}</style>`);
        }
    }

    static OnLoad(){
        Input.DelegateClick($(`div[data-action="save_customCssInput"]`), $(`div[data-action="save_customCssInput"]`), CustomCss.SaveCustomCSS);
        $(".settings_textarea_customCssInput").val(Storage.Get(`${MemKeys.CustomCss}${Player.Name()}`));
    }

    static SaveCustomCSS(){
        let css = $(".settings_textarea_customCssInput").val();
        if(css.length>0){
            Storage.Set(`${MemKeys.CustomCss}${Player.Name()}`, css);
            $("#custom_emc_css_input").remove();
            $("head").append(`<style id="custom_emc_css_input">${css}</style>`);
        }else{
            $("#custom_emc_css_input").remove();
            Storage.Set(`${MemKeys.CustomCss}${Player.Name()}`, ' ');
        }
    }
}