class Emotes{
    constructor(){        

        let setting = Emotes.GetModuleSetting();

        Actions.Add(setting.id, Emotes.OnLoad);
        Settings.Add(setting.id, setting.type, setting.defaultvalue, setting.description, setting.hidden, setting.parent, setting.name, setting.handler, null, setting.action, setting.order);

        Settings.Add("allEmotesList", "EmptyDiv", "", "", false, setting.id, "emptyDiv", null, null, null, 5);
    }

    static GetModuleSetting(){
        return {id: "emc-emotes", type: null, defaultvalue: null, description:"Emotes", hidden : false, name :"Emotes", parent: null, handler: 1, action:true, order:97};
    }

    static OnLoad(){
        if(UI.Exist(ChatEmotes)){
            UI.Empty($(`.EmptyDiv_allEmotesList`));
            $.each(ChatEmotes, function(index, value){
                let emote = `<div><span>${index}</span><br><img class="emoteCorScale2" src="${value}"></div>`;
                UI.Append($(`.EmptyDiv_allEmotesList`), emote);
            });
        }
        //EmptyDiv_allEmotesList
    }

}
