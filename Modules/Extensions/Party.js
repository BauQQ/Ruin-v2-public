/*
 * Party Extension
 */

let PIRProxy = {};

class Party{

    constructor(){  
        const buildData = {
            name : "Party Signups",
            element : "mainMenuButton",
            id : "syspartysign",
            cls : "r2_syspartysign",
            svelte: "r2_syspartysign",
            nx: "party_signup",
            base : "windowPanel",
            close: Classes.closefeature,
            internal : "innerPartySignup",
            btn : "U",
            settings : {
                key : "partysignupkey",
                hotkey : "u",
                description: "Party Signup hotkey"
            },
            position : {
                top: 150,
                left: 150
            },
            modable : true,
            size:{
                width:0,
                height:0
            },
            resize:true
        }
        
        Actions.Add("partyselection", Input.RegisterKeybinds);
        Actions.Add("mouseoverhotkey", Input.RegisterKeybinds);
                
        Settings.Add("mouseoverhotkey", "input", "123456789", "What hotkeys to use mouseover on", false, "hotkeys", "Mouseover Hotkeys", null);
        Settings.Add("partyselection", "dropdown", "", "Choose your party selector module ", false, "main", "Party Selector", null, ["","mouseover"], null, 53);
        ModularBinds['mouseover'] = Party;

        Actions.Add("partycolumns", Party.PartyFrameColumns);
        Settings.Add("partyspacer", "spacer", null, "", false, "bartender", "Party", null, null, null, 21);
        Settings.Add("partycolumns", "ninput", 1, "Set columns your partyframe has", false, "bartender", "Party Columns", null, null, null, 22);

        Party.PartyFrameColumns();

        Party.CreateSignupWindow(buildData);
        
        Chat.AddCommand("!invite", {r:"!invite",f:Party.wInvite, p:false, dev:false, sec:"wfrom"});
        Chat.AddCommand("!inv", {r:"!inv",f:Party.wInvite, p:false, dev:false, sec:"wfrom"}); 
        Chat.AddCommand("!x", {r:"!x",f:Party.wInvite, p:false, dev:false, sec:"wfrom"});
        Chat.AddCommand("x", {r:"x",f:Party.wInvite, p:false, dev:false, sec:"wfrom"});
    }  

    static async CreateSignupWindow(data){
        let innerHtml = '<thead><tr class="textprimary"><th>Name</th><th>Class</th><th>Level</th><th>Message</th><th>Action</th></tr></thead><tbody></tbody>';
        if(await Modal.Create(data, {html:innerHtml}, true)){
            $(`.${data.cls}`).css({ width:550+"px"});
            Settings.Add(data.settings.key, "input", data.settings.hotkey, data.settings.description, false, "hotkeys", data.name, null);
            Input.WindowBind(Settings.Get(data.settings.key), data, Party.UpdateInviteList);
            Party.MakeInviteProxy();
        }
    }

    static MakeInviteProxy(){
        PIRProxy = new Proxy({}, {
            get: function(target, property) {
                return target[property];
            },
            set: function(target, property, value, receiver) {               
                target[property] = value;
                Party.UpdateInviteList();
                return true;
            },
            deleteProperty(target, property) {
                if (property in target) {
                    delete target[property];               
                }
                return true;
            }
        });
    }

    static async UpdateInviteList(){
        let time = Math.floor(Date.now() / 1000);
        for(let entry in PIRProxy){
            if(PIRProxy[entry].time<time){
                Party.DeletePirEntry(entry);
            }
        }
        let tbody = $(`.r2_syspartysign .playerlist tbody`)[0];
        UI.Empty(tbody);
        for(let entry in PIRProxy){
            let html = `<tr class="striped"><td>${PIRProxy[entry].name}</td><td>${PIRProxy[entry].xclass.type}</td><td>${PIRProxy[entry].level}</td><td>${PIRProxy[entry].message}</td><td class="pirMaxModif"><div style="float:left" class="btn green invitetoparty" data-player="${entry}">Accept</div><div style="float:left" class="btn red rejecttoparty" data-player="${entry}">Reject</div></td></tr>`; 
            UI.Append(tbody, html);
        }        
        Input.BindOnClick($(`.invitetoparty`), Party.PartyInvite);        
        Input.BindOnClick($(`.rejecttoparty`), Party.RejectPlayer);
    }

    static async PartyInvite(event){
        let target = event.target;
        let name = $(target).data('player');        
        Chat.Send(`/partyinvite ${name}`);
        Party.DeletePirEntry(name);  
        Party.UpdateInviteList();
    }

    static async RejectPlayer(event){
        let target = event.target;
        let name = $(target).data('player');  
        Party.DeletePirEntry(name);  
        Party.UpdateInviteList();
    }
    

    static async DeletePirEntry(entry){
        delete PIRProxy[entry];
    }
    
    static Unbind(){
        let Binds = Character.GetKeybinds();
        for(let key in Binds){
            Input.Unbind(Binds[key]);
        }
    }

    static RegisterKeybinds(){
        let setting = Settings.Get("mouseoverhotkey");
        let Binds = setting.split('');
        for(let key in Binds){     
            Input.Bind(Binds[key].trim().toUpperCase().charCodeAt(0), "down", Party.UseAbilityOnMouse);
            Input.Bind(Binds[key].trim().charCodeAt(0), "down", Party.UseAbilityOnMouse);
        }
    }

    static PartyFrameColumns(){ 
        if(!CustomCss.IsDefualt()){ 
            let columns = Settings.Get("partycolumns");
            if(columns>0){
                if($(`.${Classes.partyFrameClass}`)[0]){
                    $(`.${Classes.partyFrameClass}`).css("grid-template-columns", `repeat(${columns}, auto)`);
                }
            }
        }
    }

    static async UseAbilityOnMouse(){
        let element = document.elementsFromPoint(Mpos.x, Mpos.y);
        $(element).closest(Classes.partyMembersSelect)[0] && $(element).closest(Classes.partyMembersSelect)[0].click();
    }

    static async wInvite(name, string, node){
        let elementN = $(node).find('.sender span.textwhite')[0];
        let MyFaction = await Player.Faction(Player.Name());
        if(MyFaction.key==1){
            MyFaction = "textf1";
        }else{
            MyFaction = "textf0";
        }
        if($($(node).find('.name')[0]).hasClass(MyFaction)){
            let player = {message:string.substring(2).trim().toLowerCase(), name:name, level:0, xclass:null, time: Math.floor(Date.now() / 1000)+120};
            if(UI.Exist(elementN)){
                let Fhtml = elementN.cloneNode(true);
                for(let eG of $(elementN).find('img')){
                    let srcD = $(eG).attr('src');
                    if(srcD.includes("classes")){
                        player.xclass = Character.ClassByImage(srcD);
                    }
                }
                $(Fhtml).find('img').remove();
                player.level = parseInt($(Fhtml).html().trim());
                if(PIRProxy[player.name]==undefined || partyInviteRequestProxy[player.name]==null){
                    PIRProxy[player.name] = player;
                }
            }
        }
    }
}