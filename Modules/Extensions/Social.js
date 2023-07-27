class Social{
    
    

    constructor(){
        let inc = Social.GetModuleSetting();

        
        Actions.Add(inc.setting.id, Social.OnLoad);   
        //Actions.Add("chattabsenb", Social.ChatTabs); 
        Actions.Add("streamermode", UI.Reload);         

        Settings.Add(inc.setting.id, inc.setting.type, inc.setting.defaultvalue, inc.setting.description, inc.setting.hidden, inc.setting.parent, inc.setting.name, inc.setting.handler, null, inc.setting.action, inc.setting.order);
        
        Settings.Add("chatspacer", "spacer", null, "", false, inc.setting.id, "Chat", null, null, null, 1);        
        //Settings.Add("chattabsenb", "tick", false, "Enable Chat Tabs", false, inc.setting.id, "Chat Tabs", null, null, null, 3);
        Settings.Remove("chattabsenb");
        Settings.Add("dndautorespons", "tick", false, "Send automatic respons to whispers", false, inc.setting.id, "Do Not Disturb", null, null, null, 5); 
        Settings.Add("chatheight", "ninput", 240, "Chat Height (default: 240)", false, inc.setting.id, "Chat Height Size", null, null, null, 9);
        Settings.Add("chatwidth", "ninput", 450, "Chat Width(default: 450)", false, inc.setting.id, "Chat Width Size", null, null, null, 10);
        Settings.Add("fontchatsize", "ninput", 14, "Chat Font Size(default: 14)", false, inc.setting.id, "Chat Font Size", null, null, null, 11);
        
        Actions.Add("chatheight", Social.ChatResize);
        Actions.Add("chatwidth", Social.ChatResize);
        Actions.Add("fontchatsize", Social.ChatResize);

        Actions.Add("chatcolorspacer", Social.ModifyChatColors);
        Actions.Add("chatglobalcolor", Social.ModifyChatColors);
        Actions.Add("chatclancolor", Social.ModifyChatColors);
        Actions.Add("chatfactioncolor", Social.ModifyChatColors);
        Actions.Add("chatpartycolor", Social.ModifyChatColors);
        Actions.Add("chatplayervgcolor", Social.ModifyChatColors);
        Actions.Add("chatplayerblcolor", Social.ModifyChatColors);
        Actions.Add("chatwhispercolor", Social.ModifyChatColors);
        Actions.Add("chatbackground", Social.ModifyChatColors);
        Actions.Add("chatbackgroundalpha", Social.ModifyChatColors);

        Settings.Remove('whispermodule');
        //Actions.Add("whispermodule", Social.WhisperModule);
        //Settings.Add("whispermodule", "tick", false, "Seperate whisper windows", false, inc.setting.id, "Whisper Module", null, null, null, 21); 
        Settings.Add("clearchathistory", "ButtonRight", null, "", false, inc.setting.id, "Clear History", null, null, null, 20);
        Settings.Add("chatcolorspacer", "spacer", null, "", false, inc.setting.id, "Chat Colors", null, null, null, 30);  
        Settings.Add("chatglobalcolor", "inputcolor", 'FFCB9D', "(default: #FFCB9D)", false, inc.setting.id, "Global Text Color", null, null, null, 31);   
        Settings.Add("chatclancolor", "inputcolor", 'EE960B', "(default: #EE960B)", false, inc.setting.id, "Clan Text Color", null, null, null, 32);   
        Settings.Add("chatfactioncolor", "inputcolor", 'F68E7A', "(default: #F68E7A)", false, inc.setting.id, "Faction Text Color", null, null, null, 33); 
        Settings.Add("chatpartycolor", "inputcolor", '2ED3F6', "(default: #2ED3F6)", false, inc.setting.id, "Party Text Color", null, null, null, 34); 
        Settings.Add("chatwhispercolor", "inputcolor", 'EF3EFF', "(default: #EF3EFF)", false, inc.setting.id, "Whisper Text Color", null, null, null, 35); 
        Settings.Add("chatbackground", "inputcolor", '0e0f10', "(default: 0e0f10)", false, inc.setting.id, "Chat Background", null, null, null, 36);
        Settings.Add("chatbackgroundalpha", "colorrangeslider", 33, "", false, inc.setting.id, "Chat Background Opacity", null, null, null, 37);
        
        
        Settings.Add("chatcolornamespacer", "spacer", null, "", false, inc.setting.id, "Chat Name Colors", null, null, null, 40);
        Settings.Add("chatplayervgcolor", "inputcolor", '458BD9', "(default: #458BD9)", false, inc.setting.id, "VG Name Color", null, null, null, 41);   
        Settings.Add("chatplayerblcolor", "inputcolor", 'C32929', "(default: #C32929)", false, inc.setting.id, "BL Name Color", null, null, null, 42);        

        Settings.Add("socialusercontrolspacer", "spacer", null, "", false, inc.setting.id, "Players", null, null, null, 50);        
        Settings.Add("openblockedusers", "ButtonRight", null, "", false, inc.setting.id, "Blocked Players", null, null, null, 51);
        
        Settings.Add("streamerspacer", "spacer", false, "", false, "main", "Stream", null, null, null, 80); 
        Settings.Add("streamermode", "tick", false, "Protect your identity for recording (reload needed)", false, "main", "Streamer Mode", null, null, null, 81); 

        Social.smLOAD(inc);
        Social.StreamerMode();
        Social.ChatTabs();
        Social.ChatResize();

        setTimeout(function () {
            Social.ModifyChatColors();
        }, 200);
    }

    static GetModuleSetting(){
        return {
            name : "Social",
            setting: {id: "emc-social", type: null, defaultvalue: null, description:"Social features", hidden : false, name :"Social", parent: null, handler: 1, action:true, order:5},
            element : "mainMenuButton",
            id : "syssocial",
            cls : "r2_social",
            base : "windowPanel",
            settings : {
                key : "socialkey",
                hotkey : "y"
            },
            close: Classes.closefeature,
            btn : "F",
            position : {
                top: 150,
                left: 150
            },
            actions : {
                
            }
        };
    }

    static async ModifyChatColors(){
        $("#modifychatcolors").remove();
        let chatglobalcolor = Settings.Get("chatglobalcolor");
        let chatclancolor = Settings.Get("chatclancolor");
        let chatfactioncolor = Settings.Get("chatfactioncolor");
        let chatpartycolor = Settings.Get("chatpartycolor");
        let chatplayervgcolor = Settings.Get("chatplayervgcolor");
        let chatplayerblcolor = Settings.Get("chatplayerblcolor");
        let chatwhispercolor = Settings.Get("chatwhispercolor");
        let chatbackground = Settings.Get("chatbackground");
        let chatbackgroundalpha = Settings.Get("chatbackgroundalpha");

        $("head").append(`<style id='modifychatcolors' type='text/css'>
        .textfaction{
            color:#${chatfactioncolor};
        }
        .textglobal{            
            color:#${chatglobalcolor};
        }
        .textclan{            
            color:#${chatclancolor};
        }
        .textparty{            
            color:#${chatpartycolor};
        }
        .name.textf0{            
            color:#${chatplayervgcolor};
        }
        .name.textf1{            
            color:#${chatplayerblcolor};
        }

        .textfrom, .textto{
            color:#${chatwhispercolor};
        }

        .js-chat{
            background-color:#${chatbackground}${chatbackgroundalpha}
        }
        </style>`);
    }

    static async ChatResize(){
        setTimeout(function(){
            let chatheight = Settings.Get("chatheight");
            let chatwidth = Settings.Get("chatwidth");
            let fontchatsize = Settings.Get("fontchatsize");
            let parent = $(`.${Classes.chatClass}`).parent()[0];
            if(UI.Exist(parent)){
                $(parent).css({height: chatheight, width:chatwidth, 'font-size':`${fontchatsize}px`});
            }            
        }, 200);
    }

    static async ChatTabs(){
        if(Settings.Get("chattabsenb")){
            let parent = $(`.${Classes.chatClass}`).parent()[0];
            if(UI.Exist(parent)){
                
            }
        }
    }

    static async StreamerMode(){
        if(Settings.Get("streamermode")){
            let name = Player.Name();
            $.each($('.left.svelte-i7i7g5'), function(hand, node){
                if($(node).html().includes(name)){
                    $(node).hide();      
                }else{
                    $(node).show();
                }
            });
        }
    }

    static async WhisperModule(){

    }

    static async smLOAD(inc){        
        Settings.Remove("customdndrespons");
    }

    static async OnLoad(){
        Input.DelegateClick($(`div[data-action="clearchathistory"]`), $(`div[data-action="clearchathistory"]`), Social.ClearChatHistory);
        Input.DelegateClick($(`div[data-action="openblockedusers"]`), $(`div[data-action="openblockedusers"]`), Social.BlockedUserWindow);
    }

    static async ClearChatHistory(){        
        if(confirm("Clear whisper history")){
            GlobalChatlog = {};
            Storage.Set(MemKeys.ChatLog, JSON.stringify(GlobalChatlog));
        }
    }

    static async BlockUserFromChat(event){
        let name = $(event.currentTarget).data('name');
        Social.BlockUser(name);
        $(event.currentTarget).parent().hide();
    }

    static BlockUser(name){
        if(!Player.IsBlocked(name)){
            Gstate.social.blocked.push(name);
            Storage.Save();
        }
    }

    static DoNotDisturb(){
        setTimeout(function(){
            let message = Settings.Get("customdndrespons");
            if(UI.Exist(message)){
                Chat.Send(`/r <DND>${Gstate.mod.chars[CharID].name}, ${message}`);
            }else{
                Chat.Send(`/r <DND>${Gstate.mod.chars[CharID].name}, is currently busy.`);
            }
        }, 200);
    }

    static async BlockedUserWindow(){ 
            let windowData = {
                id : "emc-blockedusers",
                cls : 'emc-blockedusers',
                n : "blockeduserwindow",
                text : `Blocked Players`,
                html : "",
                close : Classes.closefeature
            };  
            let innerHTML = "";    

            innerHTML += Elements.Build("settingTitle", {cls:``, text:`Player:`});
            
            innerHTML += Social.playerDropdown("playerlist", Gstate.social.blocked);        
            innerHTML += Elements.ButtonRight("unblockuser", {name:"Unblock"});

            windowData.html = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${windowData.n} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
            $(`.${windowData.cls}`).length && $(`.${windowData.cls}`).remove();

            let html = Elements.Build("windowPanel", windowData);

            UI.Append(document.querySelector(`${Classes.uibase}:first-of-type`), html);
            UI.CloseElementDelegation($(`.${windowData.cls}`));

            if(!Gstate.mod.chars[CharID].ui[windowData.n]){
                Gstate.mod.chars[CharID].ui[windowData.n] = {top:50, left:150};
                Storage.Save();
            }
            $(`.${windowData.cls}`).css({ width:250+"px", top: Gstate.mod.chars[CharID].ui[windowData.n].top, left: Gstate.mod.chars[CharID].ui[windowData.n].left});
            let handle = $($(`.${windowData.cls}`)).find(`.${Classes.windowHandle}`)[0];
            Customizer.AddDrag($(`.${windowData.cls}`), handle, windowData.n);

            Input.BindOnClick($(`div[data-action="unblockuser"]`), Social.UnblockPlayer);   
        
            $(`.${windowData.cls}`).show();
            $(`.panel_${windowData.n}`).show();
    }

    static async UnblockPlayer(){
        let name = $('.dropdown_playerlist').val();
        if(Player.IsBlocked(name)){
            var index = Gstate.social.blocked.indexOf(name);
            if (index >= 0) {
                Gstate.social.blocked.splice(index, 1);
            }
            Storage.Save();
        }
        $(`.emc-blockedusers`).length && $(`.emc-blockedusers`).remove();
    }
    

    static playerDropdown(key, data){
        let html = "";
        html += Elements.Build("sdropdownOption", {value:"", selected:"", text:""});          
        if(data!==0){
            $.each(data, function(hand, value){
                html += Elements.Build("sdropdownOption", {value:value, selected:"", text:value});         
            }); 
        }       
        let element = Elements.Build("sdropdown", {cls:`dropdown_${key}`, action:"", html:html});
        return element;
    }
}