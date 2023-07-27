/*
 * AuctionHouse Extension
 */

let startTime = 0;
let startingCopper = 0;
let copperCollected = 0;
let refInterval = null;
let selC = "h";
let selTime = {h:3600, m:60, s: 1};
let selXTime = {Hours:'h', Minutes:"m", Seconds: "s"};

class Details{

    constructor(){
        UI.AddWindow("damage", {action:Details.LoadUI, modable: true, top:50, left:150, w:0, h:0, resize:true, svelte:Classes.detailsSvelte, storage:"dpsmeterOpen"});
        UI.AddWindow("healing", {reff:"damage"});
        Details.GoldCounter();
    }

    static LoadUI(){
        //console.log("open Details UI");
    }

    static GoldCounter(){
        Settings.Add("goldcountspacer", "spacer", false, "", false, "main", "Gold Counter", null, null, null, 90);
        Settings.Add("goldcounterselection", "dropdown", "", "Choose what the goldcounter should be shown in ", false, "main", "Gold Counter", null, ["","Hours","Minutes", "Seconds"], null, 91);
        
        let menuactions = {start:"Slsstartg", stop:"Sslstopgc", reset:"Sslsresetgc"};
        Details.AddGCTab(menuactions);
    }

    static ObtainCopperFromInv(){
        let now = 0;
        let copperElement = $(`.gold.${Classes.inventorySvelte} .textcopper`);
        if(UI.Exist(copperElement)){
            now = now + parseInt($(copperElement).text());
        }
        let silverElement = $(`.gold.${Classes.inventorySvelte} .textsilver`);
        if(UI.Exist(silverElement)){
            now = now + parseInt($(silverElement).text()*100);
        }
        let goldElement = $(`.gold.${Classes.inventorySvelte} .textgold`);
        if(UI.Exist(goldElement)){
            now = now + parseInt($(goldElement).text()*100*100);
        }
        return now;
    }

    static CopperChange(amount) {
        let divisions = [10000, 100, 1];
        let number = {};
    
        let copper = amount;
        divisions.forEach(function(entry) {
          number[entry] = (copper - copper % entry)/ entry;
          copper = copper % entry;
        });

        return number;
    }

    static Slsstartg(e){  
        startTime = Date.now()/1000;
        refInterval = setInterval(Details.RecalculateCopper, 1000);
        $(`.${Classes.GCounterClass}`).css("color", "#08ff08");
        $(`.Slsstartg`).hide();
        $(`.Sslstopgc`).show();
        startingCopper = Details.ObtainCopperFromInv();
    }

    static Sslstopgc(e){
        $(`.Slsstartg`).show();
        $(`.Sslstopgc`).hide();
        $(`.${Classes.GCounterClass}`).css("color", "white");
        clearInterval(refInterval);
    }

    static Sslsresetgc(e){
        clearInterval(refInterval);
        $(`.Slsstartg`).show();
        $(`.${Classes.GCounterClass}`).css("color", "white");
        $(`.${Classes.GCounterClass}`).html(`0g 0s 0c / ${selC}`);
        copperCollected = 0;
        startingCopper = 0;
        startTime = 0;
    }

    static RecalculateCopper(){
        let result = Settings.Get("goldcounterselection");
        if(UI.Exist(result)){
            selC = selXTime[result];
        }
        
        let nowTime = Date.now()/1000;
        let sessiontime = nowTime - startTime;
        let activeCopper = Details.ObtainCopperFromInv() - startingCopper;
        let timedCopper = activeCopper / (sessiontime/selTime[selC]);
        if(timedCopper<0){
            timedCopper = 0;
        }
        let copperResult = Details.CopperChange(timedCopper);
        let goldHtml = `${copperResult[10000]}g ${copperResult[100]}s ${copperResult[1]}c / ${selC}`;

        $(`.${Classes.GCounterClass}`).html(goldHtml);
        
        
    }

    static AddGCTab(menuactions){
        let menu = $(Classes.topLeftMenu)[0];
        if(UI.Exist(menu)){
            let html = Elements.Build("topLeftElem", {cls : Classes.GCounterClass, content:"0g 0s 0c / h"});
            UI.Append(menu, html);
            let innerhtml = "";
            for (let x in menuactions){
                let entry = menuactions[x];
                innerhtml += Elements.Build("dropdownEntry",{cls:entry, action:entry,html:x});
            }    
            html = Elements.Build("contextMenuElement", {c:Classes.GCounterMenuClass + " hidden", td:innerhtml});
            UI.Append(menu, html);

            hideOnClicks[Classes.GCounterClass] = Classes.GCounterMenuClass;

            Input.DelegateClick(menu, `.${Classes.GCounterClass}`, function(e){
                let elem = $(`.${Classes.GCounterMenuClass}`);
                if(UI.Exist(elem)){              
                    UI.Position($(`.${Classes.GCounterMenuClass}`)[0], "absolute", Mpos.y, Mpos.x-2);
                    if($(elem).hasClass("hidden")){
                        $(elem).removeClass("hidden");
                    }
                }
            });

            for (let x in menuactions){
                let entry = menuactions[x];
                Input.DelegateClick($(`.${Classes.GCounterMenuClass}`)[0], `.${entry}`, function(e){
                    if (Details.hasOwnProperty(entry)) {
                        Details[entry](e);
                    }
                });
            }
            $('.Sslstopgc').hide();
        }
    }
}