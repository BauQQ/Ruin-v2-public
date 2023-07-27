/*
 * AuctionHouse Extension
 */

let storedAuction = {};

let targettype = null;
class Auctionhouse{

    constructor(){
        
        UI.AddWindow("merchant", {action:Auctionhouse.LoadUI, modable: true, top:0, left:0, w:0, h:0, resize:true, svelte:Classes.auctionHouseSvelte});
        ExecuteOnWindowLoad["merchant"] = [];
    }  

    static LoadUI(){
        let dropdown = Auctionhouse.statsDropdown("ahsearchstats", StatsData);      
        UI.Append($(`.${Classes.auctionHouseSvelte} .search span`), dropdown);

        $(`.dropdown_ahsearchstats`).off("change");
        $(`.dropdown_ahsearchstats`).on("change", function (event) {
            Auctionhouse.doSearch();
        });

        let choices = $(`.${Classes.auctionHouseSvelte} .choices`)[0];
        Mutator.Create(`AhObserver`, $(`.${Classes.auctionHouseSvelte} .items .buytable .buytblhead .textprimary `), {childList: false, subtree: false, attributes: true, characterData: true}, function(mutations){
            (async() => {    
                await $.each($($(`.${Classes.auctionHouseSvelte} .items .buytable .scrollbar.scrollbar-fix`)[1]).children(), function(key, value) {
                    $(value).show();
                });         
                for(let mutation of mutations){
                    if(!$(mutation.target).hasClass('disabled')){                    
                        targettype = $($(choices).find('.active')[0]).html();
                        $('.dropdown_ahsearchstats option').prop('selected', function() {
                            return this.defaultSelected;
                        });
                        if(ItemTypes.hasOwnProperty(targettype) && ItemTypes[targettype].searchable){
                            if(!storedAuction.hasOwnProperty(targettype)){
                                storedAuction[targettype] = {};
                            }                        
                            Auctionhouse.readAllIds(targettype);
                        }
                    }
                }
                
            })();
        });
        
        Inject.ExecuteOnWindowLoad("merchant");
    }

    static async doSearch(){        
        setTimeout(() => { 
            let choices = $(`.${Classes.auctionHouseSvelte} .choices`)[0];
            targettype = $($(choices).find('.active')[0]).html();
            let statid = $('.dropdown_ahsearchstats').val();
            $.each($($(`.${Classes.auctionHouseSvelte} .items .buytable .scrollbar.scrollbar-fix`)[1]).children(), function(key, value) {
                if(statid=="nothing"){
                    $(value).show();
                }else{
                    let itemid = $(value).data('itemid');
                    if(UI.Exist(targettype) && UI.Exist(storedAuction[targettype]) && storedAuction[targettype].hasOwnProperty(itemid)){
                        if(storedAuction[targettype][itemid].data.includes(statid)){
                            $(value).show();
                        }else{
                            $(value).hide();
                        }
                    }
                }
            });
        }, 100);
    }

    static statsDropdown(key, data){
        let html = "";
        html += Elements.Build("sdropdownOption", {value:"nothing", selected:'selected="selected"', text:""});  
        $.each(data, function(hand, value){
            html += Elements.Build("sdropdownOption", {value:value.toLowerCase(), selected:"", text:value});         
        });        
        let element = Elements.Build("sdropdown", {cls:`dropdown_${key}`, action:"", html:html});
        return element;
    }

    static async readAllIds(type = null){
        setTimeout(() => { 
            (async() => {  
            await $.each($($(`.${Classes.auctionHouseSvelte} .items .buytable .scrollbar.scrollbar-fix`)[1]).find('.slot'), function(key, $value) {
                $value.dispatchEvent(new Event('pointerenter'));
                new Promise(resolve => setTimeout(() => {
                    let r = () => {
                        let $t = document.querySelector('.slotdescription');
                        if (!$t || !$t.cloneNode) {
                            resolve(false);
                        } else {
                            let slotdesc = $t.cloneNode(true);
                            let itemid = Auctionhouse.GetFromStringItemID(slotdesc.outerHTML);
                            $($value.closest('.item')).data('itemid', itemid);
                            if(!storedAuction[type].hasOwnProperty(itemid)){
                                storedAuction[type][itemid] = {
                                    html:slotdesc.outerHTML,
                                    data:null
                                };
                            }                        
                            resolve(true);
                        }
                        $value.dispatchEvent(new Event('pointerleave'));
                    };
                    r();
                }, 1));
            });
            Auctionhouse.SolveData();
        })();
        }, 1);
    }

    static async SolveData(){
        setTimeout(() => {
            $.each(storedAuction, function(key, value){
                for(let entry in value){
                    if(value[entry].data===null){
                        storedAuction[key][entry].data = [];
                        $.each(StatsData, function(hand, val){                      
                            if(value[entry].html.includes(val)){
                                storedAuction[key][entry].data.push(val.toLowerCase());
                            }
                        });
                    }
                }
            });
        }, 51);
    }

    static GetFromStringItemID(string){
        let result = string.substring(
            string.indexOf("ID: ") + 1, 
            string.lastIndexOf("</span></small> ")
        );
        result = result.split(" ");

        return result[1];
    }
}