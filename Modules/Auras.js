/*
 * Tracker class 
 * used for tracking everything
 */  
/*
let SkillCDTrack = {};
const aurasTracker  = {
    aurakey: "aura-emnc-stor",
    fpskey : "showFpsPing",
    charkey: "charpanelOpen",
    charclose:"charsheetClose",
    charkbkey: "kbCharacter",
    charhotkey: "c",
    when:{
        "Skill":{
            "offcd":{
                name: "off cooldown"
            },
            "click":{
                name: "clicked"
            }
        },
        "Buff":{
            "new":{
                name:"new"
            },
            "ending":{
                name: "ending"
            }
        }
    },
    doing:{
        "Skill":{
            "playsound":{
                name:"play sound"
            },
            "sendtoparty":{
                name:"send in party chat",
                f:""
            }
        },
        "Buff":{
            "popup":{
                name:"add to screen"
            }
        }
    },
    whiles:{
        "Buff":{
            "show":{
                name:"show icon in buffarray",
                func: "HideElement"
            }
        }
    },
    setting: {id: "emc-auras", type: null, defaultvalue: null, description:"Aura tool", hidden : false, name :"Auras", parent: null, handler: 1, action:true, order:6},
    settings : {
        fps :{
            key: "auras",
            type : "tick",
            default: true,
            hidden: false,
            parent: "main",
            name: "Enable Auras",
            order: 80
        },
        auras:{
            key: "auras",
            type : "boolean",
            default: false,
            description: "",
            hidden: false,
            parent: "main",
            name: "Enable Auras",
            order: 80
        }            
    }

};

let lastType = null;

class Auras{

    constructor(){   
        
        (async function() {
            await License.Validate().then(function (result) {
                if(result){
                    Actions.Add(aurasTracker.setting.id, Auras.OnLoad);
                    Settings.Add(aurasTracker.setting.id, aurasTracker.setting.type, aurasTracker.setting.defaultvalue, aurasTracker.setting.description, aurasTracker.setting.hidden, aurasTracker.setting.parent, aurasTracker.setting.name, aurasTracker.setting.handler, null, aurasTracker.setting.action, aurasTracker.setting.order);
                    Settings.Add("enableauras", "tick", false, "Enable Auras", false, aurasTracker.setting.id, "Enable auras", null, null, null, 1);
        
                    Settings.Add("auracreateskillbutton", "ButtonLeft", null, "", false, aurasTracker.setting.id, "Create Skill Aura", null, null, null, 2);
                    Settings.Add("auracreatebuffbutton", "ButtonLeft", null, "", false, aurasTracker.setting.id, "Create Buff Aura", null, null, null, 3);
                    Settings.Add("auracreatedebuffbutton", "ButtonLeft", null, "", false, aurasTracker.setting.id, "Create DeBuff Aura", null, null, null, 4);
                    Settings.Add("auracreatestatbutton", "ButtonLeft", null, "", false, aurasTracker.setting.id, "Create Stats Aura", null, null, null, 5);
                    Settings.Add("auraspacer", "spacer", null, "", false, aurasTracker.setting.id, "My Auras:", null, null, null, 6);
       
                    let myAuras = Storage.Get(aurasTracker.aurakey+CharID);
                    if(UI.Exist(myAuras)){
                        gameAuras = $.parseJSON(Base64.Decode(myAuras));
                    }
                }else{
                    Settings.Remove(aurasTracker.setting.id);
                }  
            });            
        })();
    }

    static async OnLoad(){
        if(License.QuickValidate()){
            Input.BindOnClick($(`div[data-action="auracreateskillbutton"]`), Auras.SkillAuraWindow);
            Input.BindOnClick($(`div[data-action="auracreatebuffbutton"]`), Auras.BuffAuraWindow);
            Input.BindOnClick($(`div[data-action="auracreatedebuffbutton"]`), Auras.DebuffAuraWindow);
            Input.BindOnClick($(`div[data-action="auracreatestatbutton"]`), Auras.StatsauraWindow);
            Auras.MyAuraList();
        }        
    }

    static MyAuraList(){
        //console.log(gameAuras);
        //gameAuras
    }

    static async HideElement(element, data){
        $(element).hide();
    }

    static async ShowElement(element, data){
        $(element).show()
    }
    

    static async StatsauraWindow(){
        Auras.CreateWindow("Stats");
    }    
    
    static async SkillAuraWindow(){
        Auras.CreateWindow("Skill");
    }

    static async BuffAuraWindow(){
        Auras.CreateWindow("Buff");
    }

    static async DebuffAuraWindow(){
        Auras.CreateWindow("Debuff");
    }

    static async SaveAuras(){
        Storage.Set(aurasTracker.aurakey+CharID, Base64.Encode(JSON.stringify(gameAuras)));
    }

    static async CreateWindow(type){       
        lastType = type; 
        let windowData = {
            cls : 'emc-aurascreatewindow',
            n : "createaurawindow",
            text : `Create  ${type} Aura`,
            html : "",
            close : Classes.closefeature
        };  
        let innerHTML = "";    
        
        if(type=="Stats"){
            innerHTML += Elements.Build("settingTitle", {cls:``, text:`Skill:`});
            innerHTML += Auras.statsDropdown("auraskillslist", StatsData);
        }else{
            innerHTML += Elements.Build("settingTitle", {cls:``, text:`Skill:`});
            innerHTML += Auras.skillDropdown("auraskillslist", SkillsData);
        }

        let when = null;
        if(aurasTracker.when.hasOwnProperty(type)){
            when = aurasTracker.when[type];
        }

        let doing = null;
        if(aurasTracker.doing.hasOwnProperty(type)){
            doing = aurasTracker.doing[type];
        }

        let whiles = null;
        if(aurasTracker.whiles.hasOwnProperty(type)){
            whiles = aurasTracker.whiles[type];
        }
        
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`When:`});
        innerHTML += Auras.whenDropdown("aurawhenlist", when);

        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Do:`});
        innerHTML += Auras.doingDropdown("auradoinglist", doing);   
        
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`While:`});
        innerHTML += Auras.whilesDropdown("aurawhileslist", whiles);     
        
        innerHTML += Elements.ButtonRight("addauratouser", {name:"Add Aura"});

        windowData.html = Elements.Build("settingBasePanel", {panel:``, cls:`panel_${windowData.n} ${Classes.ruinSettingBase}`, text:"", html:innerHTML});
        $(`.${windowData.cls}`).length && $(`.${windowData.cls}`).remove();
        let html = await Elements.aBuild("windowPanel", windowData);
        //let html = Elements.Build("windowPanel", windowData);

        UI.Append(`${Classes.uibase}:first`, html);
        UI.CloseElementDelegation($(`.${windowData.cls}`));

        if(!Gstate.mod.chars[CharID].ui[windowData.n]){
            Gstate.mod.chars[CharID].ui[windowData.n] = {top:50, left:150};
            Storage.Save();
        }
        let handle = $($(`.${windowData.cls}`)).find(`.${Classes.windowHandle}`)[0];
        Customizer.AddDrag($(`.${windowData.cls}`), handle, windowData.n);
        $(`.${windowData.cls}`).css({ width:400+"px", top: Gstate.mod.chars[CharID].ui[windowData.n].top, left: Gstate.mod.chars[CharID].ui[windowData.n].left});
        
        Input.BindOnClick($(`div[data-action="addauratouser"]`), Auras.SaveAura);
        $(`.${windowData.cls}`).show();
        $(`.panel_${windowData.n}`).show();
    }

    static SaveAura(){
        let data = {
            type: lastType,
            skill: parseInt($('.dropdown_auraskillslist').val()),
            when: $('.dropdown_aurawhenlist').val(),
            doing:  $('.dropdown_auradoinglist').val(),
            what: "consolelog",
            while:$('.dropdown_aurawhileslist').val()
        };
        gameAuras.push(data);
        $(`.emc-aurascreatewindow`).hide();
        Auras.SaveAuras();
    }

    static whilesDropdown(key, data){
        let html = "";
        html += Elements.Build("sdropdownOption", {value:"", selected:"", text:""});  
        $.each(data, function(hand, value){
            html += Elements.Build("sdropdownOption", {value:hand, selected:"", text:value.name});         
        });        
        let element = Elements.Build("sdropdown", {cls:`dropdown_${key}`, action:"", html:html});
        return element;
    }

    static doingDropdown(key, data){
        let html = "";
        html += Elements.Build("sdropdownOption", {value:"", selected:"", text:""});  
        $.each(data, function(hand, value){
            html += Elements.Build("sdropdownOption", {value:hand, selected:"", text:value.name});         
        });        
        let element = Elements.Build("sdropdown", {cls:`dropdown_${key}`, action:"", html:html});
        return element;
    }

    static whenDropdown(key, data){
        let html = "";
        html += Elements.Build("sdropdownOption", {value:"", selected:"", text:""});  
        $.each(data, function(hand, value){
            html += Elements.Build("sdropdownOption", {value:hand, selected:"", text:value.name});         
        });        
        let element = Elements.Build("sdropdown", {cls:`dropdown_${key}`, action:"", html:html});
        return element;
    }

    static statsDropdown(key, data){
        let html = "";
        html += Elements.Build("sdropdownOption", {value:"", selected:"", text:""});  
        $.each(data, function(hand, value){
            html += Elements.Build("sdropdownOption", {value:hand, selected:"", text:value});         
        });        
        let element = Elements.Build("sdropdown", {cls:`dropdown_${key}`, action:"", html:html});
        return element;
    }

    static skillDropdown(key, data){
        let html = "";
        html += Elements.Build("sdropdownOption", {value:"", selected:"", text:""});  
        $.each(data, function(hand, value){
            html += Elements.Build("sdropdownOption", {value:hand, selected:"", text:value.name});         
        });        
        let element = Elements.Build("sdropdown", {cls:`dropdown_${key}`, action:"", html:html});
        return element;
    }


    /*
    static fixCharactersheet(data){
        let refresh = false;
        if(Settings.Get(data.settings.auras.key)){
            let char = Storage.Get(data.charkey);
            let charkeyset = Storage.Get(data.charkey);
            if(char!==undefined){
                if((char==='false')){
                    Storage.Set(data.charkey, 'true');
                    Storage.Set(data.charkbkey, `"null"`);
                    refresh = true;
                }
            }
                        
            if($(`.${Classes.charSheetSvelte} .window`).is(":visible")){
                $(`.${Classes.charSheetSvelte} .window`).hide();
            }

            let closeBtn = $(`.${Classes.charSheetSvelte} ${Classes.closeicon}`)[0];
            if(closeBtn!==undefined){
               Tracker.ReplaceCloseButton(closeBtn, data.charclose);
            }            
            
            Input.Bind(data.charhotkey.toUpperCase().trim().charCodeAt(0), "down", Charactersheet.Visibility);
            Input.DelegateClick($(`.${Classes.charSheetSvelte} .titleframe`), `.${data.charclose}`, Charactersheet.Visibility);
        }else{
            Storage.Set(data.charkbkey, `"${data.charhotkey}"`);
        }

        return refresh;
    }

    static async ReplaceCloseButton(element, cls){
        let html = await Elements.aBuild("closebtn", {close:`${Classes.closefeature} ${cls}`});
        $(element).replaceWith(html);
    }

    static async consolelog(data){

    }

    static RebindDataKeys(keybinds){
        /*$.each($(`#${Classes.skillbarId}`).children(), function(key, value){
            if($(value).hasClass('filled')){
                $(value).data('abKey', keybinds[key].id);
                $(value).data('abID', key);
            }
            Mutator.Create(`PlayerSkillbarReplace${key}`, $(value).find('.icon')[0], {childList: false, subtree: false, attributes: true, characterData: false}, function(mutations){
                let newbinds = Utility.GetKeybinds();
                if(newbinds[key].id!=keybinds[key].id){
                    Auras.RebindDataKeys(newbinds);
                }
            });
        });   
    }

    static async sendtoparty(data){
            if(SkillCDTrack.hasOwnProperty(data.skill)){
                let cal = Date.now() - SkillCDTrack[data.skill];
                if(cal>10000){
                    if(Character.IsInParty()){
                        SkillCDTrack[data.skill] = Date.now();
                        setTimeout(function () {
                            let message = `${CharName} used ${SkillsData[data.skill].name}`;
                            Chat.Send(`/p ${message}`);
                        }, 500);
                    }
                }
            }else{   
                if(Character.IsInParty()){       
                    SkillCDTrack[data.skill] = Date.now();  
                    setTimeout(function () {
                        let message = `${CharName} used ${SkillsData[data.skill].name}`;
                        Chat.Send(`/p ${message}`);
                    }, 500);
                }
            }
    }

    static async Hook(){
        (async function() {
            await License.Validate().then(function (result) {
                if(result){
                    if(Settings.Get('enableauras')){
                        if(Utility.GetKeybinds()!==null){
                            /*
                            Auras.RebindDataKeys(Utility.GetKeybinds());
                            Proxies.Variable("skillbarProxy", SkillCDTrack, {
                                set(target, property, value){
                                    console.log(value);
                                }
                            });
                            */
                            // Create proxy
                            /* 
                            $.each($(`#${Classes.skillbarId}`).children(), function(key, value){
                                let abID = $(value).data('abID');
                                if(abID!==undefined && abID!==null && abID!==""){ 
                                    Mutator.Create(`PlayerSkillAction${abID}`, $(value), {childList: false, subtree: false, attributes: true, characterData: false}, function(mutations){
                                        for(let mutation of mutations){ 
                                            if(mutation['attributeName']==="class"){
                                                if(mutation.target.classList.contains('auto')){
                                                    let time = $(mutation.target).find('.time')[0];
                                                    if(time==undefined || time==null || time==""){
                                                        let abKey = $(mutation.target).data('abkey');
                                                        for(let entry in gameAuras){
                                                            entry = gameAuras[entry];
                                                            if(entry.skill===abKey){
                                                                if(entry.when==="click"){
                                                                    if(Auras.hasOwnProperty(entry.doing)){
                                                                        Auras[entry.doing](entry);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }                                                
                                            }        
                                        }
                                    });
                                }
                            });*/

                            /*
                            Mutator.Create("PlayerBuffTracker", `#${Classes.playerId} .${Classes.buffarray}`, {childList: true, subtree: false, attributes: false, characterData: true}, function(mutations){
                                for(let mutation of mutations){
                                    for(let node of mutation.addedNodes){
                                        let icon = $(node).find('.icon')[0];
                                        let time = $(node).find('.time')[0];
                                        if(icon!==undefined){ 
                                            $(node).hide();
                                            let time = $(node).find('.time')[0];
                                            let img = $(icon).attr("src");
                                            let id = parseInt(img.split("/").pop().split(".")[0]);
                                            for(let entry in gameAuras){
                                                if(gameAuras[entry].skill===id && gameAuras[entry].when==="new"){
                                                    console.log(time);
                                                    if(aurasTracker.whiles.hasOwnProperty(gameAuras[entry].whiles)){
                                                        console.log("found1");
                                                        if(aurasTracker.whiles[gameAuras[entry].whiles].hasOwnProperty("func")){
                                                            console.log("found2");
                                                            if(Auras.hasOwnProperty(aurasTracker.whiles[gameAuras[entry].whiles].func)){
                                                                console.log("found3");
                                                                Auras[aurasTracker.whiles[gameAuras[entry].whiles].func]($(node), gameAuras[entry]);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }      
                }     
            });            
        })();
    }
    
}
*/