/*
 * Itemization Extension
 */

let SharedChatItems = [];
let SharedCompared = {};


class Itemization{    

    constructor(){
        const buildData = {
            name : "Itemization",
            element : "mainMenuButton",
            id : "sysitemization",
            nx: "itemization",
            svelte: "r2_itemization",
            cls : "r2_itemization",
            base : "windowPanel",
            internal : "itemization_i_button",
            inputcls : "itemization_i_button searchinput",
            settings : {
                key : "itemizationkey",
                hotkey : "i",
                description: "Itemization hotkey"
            },
            close: Classes.closefeature,
            btn : "I",
            actions : {
                action :  {key :"IMLookup", func : "Lookup"}
            },
            modable : true,
            size:{
                width:0,
                height:0
            },
            resize:true,
            position : {
                top: 150,
                left: 150
            }
        }

        Itemization.Create(buildData);

        Chat.AddCommand("&gt;", {r:">",f:Itemization.ItemLink, p:false, dev:false});
        Chat.AddCommand(">", {r:">",f:Itemization.ItemLink, p:false, dev:false});
    }
    
    static async ItemLink(type, name, text, node){
        text = text.replace("&gt;", ">");        
        if((text.match(/,/g) || []).length==1){
            text = text.split(" ")[0];
            text = text.split(","); 
            let itemID = Itemization.GetFromStringItemID(text[0]);   
            let ids = [];     
            if(UI.Exist(itemID)){
                ids.push(itemID);
                ids.push(text[1]);
            }
            if(ids.length>0){
                $(node).addClass("chatlookupable");
                $(node).data('itemid', ids.join(','));
                Input.BindOnClick(node, Itemization.ProcessChatClick);
            }
        }else{
            let itemID = Itemization.GetFromStringItemID(text);
            if(UI.Exist(itemID)){
                $(node).addClass("chatlookupable");
                $(node).data('itemid', itemID);
                Input.BindOnClick(node, Itemization.ProcessChatClick);
            }
        }
    }
    
    static async Create(data){
        let innerHtml = {};

        $.each(data.actions, function(key, value) {
            innerHtml[key] = value.key;
            Actions.Add(value.key, Itemization[value.func]);
        });

        innerHtml['cls'] = `${data.inputcls}`;        

        if(await Modal.Create(data, innerHtml, true)){
            Settings.Add(data.settings.key, "input", data.settings.hotkey, data.settings.description, false, "hotkeys", data.name, null);
            Input.RegisterKeybinds();
            Input.WindowBind(Settings.Get(data.settings.key), data);
            $.each(data.actions, function(key, value) {
                UI.Delegate(`.${data.cls}`, "click", `div[data-action='${value.key}']`, value.key, null);
            });
        }        
    }

    static async DirectLookup(inu, co = null){
        let OXkey = `${Classes.itemlookupitemwindow}`;
        if(!Gstate.mod.chars[CharID].ui[OXkey]){
            Gstate.mod.chars[CharID].ui[OXkey] = {top:50, left:150};
            Storage.Save();
        }

        var u = Gstate.mod.chars[CharID];
        if(UI.Exist(inu) && !isNaN(inu) && typeof inu == 'number'){       
            return await Api.quickCall('item',{id:inu}).then(function (result) {     
                $(`.${Classes.itemlookupitemwindow}`).length && $(`.${Classes.itemlookupitemwindow}`).remove();        
                if (result.length > 0) {
                        let item = new Item(result[0]);
                        if (!sit.includes(item.type)){ 
                            var q = Item.Quality(item.quality);{
                            item.name = Language.items[item.type][item.tier];
                            null === item.logic.level || isNaN(item.logic.level) || "number" != typeof item.logic.level || (item.haslvl = item.logic.level <= u.lvl ? "green" : "red");
                            let cls = "";
                            null === item.logic["class"] || isNaN(item.logic["class"]) || "number" != typeof item.logic["class"] || (item.hasclass = item.logic["class"] == u["class"].key ? "green" : "red", cls = `<div class="text${item.hasclass}"> Class: ${Language.classes[item.logic.class].name} </div>`);
                            let buildThis = {
                                id:`${Classes.itemlookupitemwindow}_display`,
                                text: '', 
                                cls: `${Classes.itemlookupitemwindow} border ${q.color}`, 
                                n: `${Classes.itemlookupitemwindow}`, 
                                html: "",
                                close:Classes.closefeature,
                            };
                            let upg = "";
                            0 < item.upgrade && (upg = "+" + item.upgrade);
                            let innerHtml = "";
                            weap.includes(item.type) && (innerHtml += Item.Weapon(item), Array.from(item.stats.keys()).slice(0, 2).forEach(function (a) {
                                return item.stats["delete"](a);
                            }));
                            
                            for (const [key, value] of item.stats.entries()) {                            
                                let qa = Item.Quality(value.qual);
                                if (value.type == "base") {                                
                                    if (stsperc.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${num.toFixed(1)}% ${StatsData[key]}`}); 
                                    } else if (stsdivten.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${num.toFixed(1)} ${StatsData[key]}`});                                    
                                    } else {
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${value.value} ${StatsData[key]}`});
                                    }
                                } else if (value.type == "bonus") {
                                    if (stsperc.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${num.toFixed(1)}% ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    } else if (stsdivten.includes(StatsData[key])) {
                                        let num = value.value / 10;     
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${num.toFixed(1)} ${StatsData[key]} ${Math.round(value.qual)}%`});                                                              
                                    } else if (StatsData[key] == "Item Find") {
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${value.value}% ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    } else {
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${value.value} ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    }
                                }
                            }
                            let isBoundHtml = "";
                            if(item.bound){
                                isBoundHtml = `<div class="textgreen"> Character Bound </div>`;
                            }

                            if(co==null){
                                buildThis.html = `<div class="slotdescription svelte-18ojcpo"> <div class="container svelte-e3ao5j"> <div class="pack svelte-e3ao5j"> <div class="slottitle text${q.color} svelte-e3ao5j">T${item.tier + 1} ${item.name.name}<span class="textprimary">${upg}</span> </div><div class="type textwhite svelte-e3ao5j"> ${q.text} ${item.type} <span>${item.quality}%</span> </div><small><span class="textgreen">GS: ${item.gs}<span class="textgrey"> ID: ${inu} </span> </small> </div><div class="pack svelte-e3ao5j">${innerHtml}</div><div class="pack svelte-e3ao5j"> ${cls}<div class="text${item.haslvl}"> Requires Lv. ${item.logic.level} </div>${isBoundHtml}</div></div></div>`;
                            }else{
                                return `<div class="container svelte-e3ao5j comparePack"> <div class="pack svelte-e3ao5j"> <div class="slottitle text${q.color} svelte-e3ao5j">T${item.tier + 1} ${item.name.name}<span class="textprimary">${upg}</span> </div><div class="type textwhite svelte-e3ao5j"> ${q.text} ${item.type} <span>${item.quality}%</span> </div><small><span class="textgreen">GS: ${item.gs}<span class="textgrey"> ID: ${inu} </span> </small> </div><div class="pack svelte-e3ao5j">${innerHtml}</div><div class="pack svelte-e3ao5j"> ${cls}<div class="text${item.haslvl}"> Requires Lv. ${item.logic.level} </div>${isBoundHtml}</div></div>`;
                            
                            }
                            return [buildThis, OXkey];
                        }
                    }
                }
            });
        }  
    }

    static async Lookup(event, data){   
        let OXkey = `${Classes.itemlookupitemwindow}`;
        if(!Gstate.mod.chars[CharID].ui[OXkey]){
            Gstate.mod.chars[CharID].ui[OXkey] = {top:50, left:150};
            Storage.Save();
        }

        var u = Gstate.mod.chars[CharID];
        let inu =  parseInt($('.searchinput').val());   
        $('.searchinput').val("");           
        if(UI.Exist(inu) && !isNaN(inu) && typeof inu == 'number'){            
            await Api.quickCall('item',{id:inu}).then(function (result) {
                $(`.${Classes.itemlookupitemwindow}`).length && $(`.${Classes.itemlookupitemwindow}`).remove();        
                if (result.length > 0) {
                        let item = new Item(result[0]);
                        if (!sit.includes(item.type)){ 
                            var q = Item.Quality(item.quality);{
                            item.name = Language.items[item.type][item.tier];
                            null === item.logic.level || isNaN(item.logic.level) || "number" != typeof item.logic.level || (item.haslvl = item.logic.level <= u.lvl ? "green" : "red");
                            let cls = "";
                            null === item.logic["class"] || isNaN(item.logic["class"]) || "number" != typeof item.logic["class"] || (item.hasclass = item.logic["class"] == u["class"].key ? "green" : "red", cls = `<div class="text${item.hasclass}"> Class: ${Language.classes[item.logic.class].name} </div>`);
                            let buildThis = {                                
                                id:`${Classes.itemlookupitemwindow}_display`,
                                text: '', 
                                cls: `${Classes.itemlookupitemwindow} border ${q.color}`, 
                                n: `${Classes.itemlookupitemwindow}`, 
                                html: "",
                                close:Classes.closefeature,
                            };
                            let upg = "";
                            0 < item.upgrade && (upg = "+" + item.upgrade);
                            let innerHtml = "";
                            weap.includes(item.type) && (innerHtml += Item.Weapon(item), Array.from(item.stats.keys()).slice(0, 2).forEach(function (a) {
                                return item.stats["delete"](a);
                            }));
                            
                            for (const [key, value] of item.stats.entries()) {                            
                                let qa = Item.Quality(value.qual);
                                if (value.type == "base") {                                
                                    if (stsperc.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${num.toFixed(1)}% ${StatsData[key]}`}); 
                                    } else if (stsdivten.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${num.toFixed(1)} ${StatsData[key]}`});                                    
                                    } else {
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`${value.value} ${StatsData[key]}`});
                                    }
                                } else if (value.type == "bonus") {
                                    if (stsperc.includes(StatsData[key])) {
                                        let num = value.value / 10;
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${num.toFixed(1)}% ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    } else if (stsdivten.includes(StatsData[key])) {
                                        let num = value.value / 10;     
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${num.toFixed(1)} ${StatsData[key]} ${Math.round(value.qual)}%`});                                                              
                                    } else if (StatsData[key] == "Item Find") {
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${value.value}% ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    } else {
                                        innerHtml += Elements.Build("basic_itemstat_div", {cls:`text${qa.color}`, text:`+ ${value.value} ${StatsData[key]} ${Math.round(value.qual)}%`});
                                    }
                                }
                            }

                            let isBoundHtml = "";
                            if(item.bound){
                                isBoundHtml = `<div class="textgreen"> Character Bound </div>`;
                            }
                            
                            buildThis.html = `<div class="slotdescription svelte-18ojcpo"> <div class="container svelte-e3ao5j"> <div class="pack svelte-e3ao5j"> <div class="slottitle text${q.color} svelte-e3ao5j">T${item.tier + 1} ${item.name.name}<span class="textprimary">${upg}</span> </div><div class="type textwhite svelte-e3ao5j"> ${q.text} ${item.type} <span>${item.quality}%</span> </div><small><span class="textgreen">GS: ${item.gs}<span class="textgrey"> ID: ${inu} </span> </small> </div><div class="pack svelte-e3ao5j">${innerHtml}</div><div class="pack svelte-e3ao5j"> ${cls}<div class="text${item.haslvl}"> Requires Lv. ${item.logic.level} </div>${isBoundHtml}</div></div></div>`;
                            
                            const buildData = {
                                name : "Item Viewer",
                                nid: buildThis.cls.split(" ")[0],
                                cls : buildThis.cls,
                                svelte: buildThis.id,
                                base : "windowPanel",
                                nx: "item viewer",
                                close: Classes.closefeature,
                                internal : "new_script_internal",
                                modable : true,
                                size:{
                                    width:0,
                                    height:0
                                },
                                resize:true,
                                position:{
                                    top: 150,
                                    left: 150
                                }
                            };
            
                            Itemization.BuildUiOutput(buildData, buildThis);
                            
                        }
                    }
                }
            });
        }     
    }

    static async BuildUiOutput(buildData, buildThis){        
        Interaction.CloseWindow("item viewer");     
        if(await Modal.Create(buildData, {html:buildThis.html}, false, true)){
            $(`#${buildData.nid}`).css({top: Gstate.mod.chars[CharID].ui[buildData.nx].top, left: Gstate.mod.chars[CharID].ui[buildData.nx].left});
            Customizer.AddDrag($(`#${buildData.nid}`)[0], $($(`#${buildData.nid}`)[0]).find(`.${Classes.windowHandle}`)[0], buildData.nx);
            $(`#${buildData.nid}`).show();
        } 
    }

    static async CreateSingle(id){
        await Itemization.DirectLookup(id).then(function (result) {
            if(result!=undefined){
                let buildThis = result[0];
                const buildData = {
                    name : "Item Viewer",
                    nid: buildThis.cls.split(" ")[0],
                    cls : buildThis.cls,
                    svelte: buildThis.id,
                    base : "windowPanel",
                    nx: "item viewer",
                    close: Classes.closefeature,
                    internal : "new_script_internal",
                    modable : true,
                    size:{
                        width:0,
                        height:0
                    },
                    resize:true,
                    position:{
                        top: 150,
                        left: 150
                    }
                };

                Itemization.BuildUiOutput(buildData, buildThis);
                //>192328180
            }
        });
    }

    static async CompareCreate(ids){          
        let inUse = false;
        let OXkey = `${Classes.itemlookComparewindow}`;
        if(!Gstate.mod.chars[CharID].ui[OXkey]){
            Gstate.mod.chars[CharID].ui[OXkey] = {top:50, left:150};
            Storage.Save();
        }

        $(`.${Classes.itemlookComparewindow}`).length && $(`.${Classes.itemlookComparewindow}`).remove();   
        let buildThis = {            
            id:`${Classes.itemlookupitemwindow}_display`,
            text: '', 
            cls: `${Classes.itemlookComparewindow}`, 
            n: `${Classes.itemlookComparewindow}`, 
            html: "",
            close:Classes.closefeature,
        };
        
        SharedCompared = [];
        //>167591381,167803766
        let proxyArray = new Proxy(SharedCompared, {
            get: function(target, property) {
                return target[property];
            },
            set: function(target, property, value, receiver) {
                target[property] = value;
                if(SharedCompared.length===2 && !inUse){
                    inUse = true;
                    $(`.${Classes.itemlookComparewindow}`).length && $(`.${Classes.itemlookComparewindow}`).remove();   
                    buildThis.html = SharedCompared.join("<div class='combsplit'></div>");                    
                   
                    const buildData = {
                        name : "Item Viewer",
                        nid: buildThis.cls.split(" ")[0],
                        cls : buildThis.cls,
                        svelte: buildThis.id,
                        base : "windowPanel",
                        nx: "item viewer",
                        close: Classes.closefeature,
                        internal : "new_script_internal",
                        modable : true,
                        size:{
                            width:0,
                            height:0
                        },
                        resize:true,
                        position:{
                            top: 150,
                            left: 150
                        }
                    };

                    Itemization.BuildUiOutput(buildData, buildThis); 
                }
                return true;
            }
        });

        $.each(ids, function(hand, val){
            (async() => {
                await Itemization.DirectLookup(parseInt(val), true).then(function (result) {
                    proxyArray.push(result);
                });
            })();
        });        
    }


    static GetFromStringItemID(string){
        let re = />[1-9]\d*\b/g;
        let matches = string.match(re);
        if (matches !== null) {
            let id = matches[0].slice(1);
            if(UI.Exist(id)){
                return id;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    static ProcessChatClick(event){
        let target = event.currentTarget;
        let itemID = $(target).data('itemid');
        if(typeof itemID != 'number' && itemID.includes(',')){
            if((itemID.match(/,/g) || []).length==1){
                Itemization.CompareCreate(itemID.split(','));
            }else{
                
            }
        }else{
            Itemization.CreateSingle(parseInt(itemID));
        }
    }

    //>192328180
}