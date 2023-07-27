/*
 * Boss Extension
 */

let bosstimers = [];

class Boss{

    constructor(){
        const buildData = {
            name : "Bosstimers",
            element : "mainMenuButton",
            id : "sysbosstimer",
            cls : "r2_bosstimer",
            base : "windowPanel",
            svelte: "r2_bosstimer",
            nx: "next_boss",
            close: Classes.closefeature,
            internal : "nextboss_i_button",
            btn : "N",
            settings : {
                key : "bosstimerkey",
                hotkey : "n",
                description: "Bosstime hotkey"
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
        
        Boss.CreateTimer(buildData);
    }

    static LoadUI(){

    }

    static async CreateTimer(data){
        let times = Boss.HtmlTimetable();  
        if(await Modal.Create(data, {html:times.html}, true)){
            Settings.Add(data.settings.key, "input", data.settings.hotkey, data.settings.description, false, "hotkeys", data.name, null);
            Input.WindowBind(Settings.Get(data.settings.key), data, Boss.SavePerfTimers);
            Boss.RunTimers(times);
        }        
    }

    static async SavePerfTimers(data){
        UI.WindowOpened("bosstimers");
        let times = Boss.HtmlTimetable();
        if($(`.${data.cls}`).is(":visible")){
            for(let entry in times.timers){  
                $(`div[data-action=${entry}_timer_action]`).countdown('stop');
            }
        }else{
            Boss.RunTimers(times);
        }
    }

    static RunTimers(times){        
        $(`div[data-action=Now_timer_action]`).html(times.now);
        for(let entry in times.timers){         
            $(`div[data-action=${entry}_timer_action]`).countdown(new Date(times.timers[entry])).on('update.countdown', function(event) {
                var format = '%H:%M:%S';
                if(event.offset.totalDays > 0) {
                    format = '%-d day%!d ' + format;
                }
                if(event.offset.weeks > 0) {
                    format = '%-w week%!w ' + format;
                }
                $(this).html(event.strftime(format));
            }).on('finish.countdown', function(event) {
                let ntimes = Boss.HtmlTimetable();
                for(let entry in ntimes.timers){    
                    $(`div[data-action=${entry}_timer_action]`).countdown('stop');
                }
                Boss.RunTimers(ntimes);
            });
        }
    }
   

    static HtmlTimetable(){
        let fixedTime = new Date(Date.now());
        let offset = fixedTime.getTimezoneOffset();
        let newTimetable = [];

        for(let entry in TimetableFaivel){
            if(entry>fixedTime.getUTCHours()){
                let time = new Date(fixedTime.getUTCFullYear(), fixedTime.getUTCMonth(), fixedTime.getUTCDate(), entry, 0, 0);
                newTimetable.push({time: time.getTime()/1000, type: TimetableFaivel[entry]});          
            }else if(entry<fixedTime.getUTCHours()){
                let time = new Date(fixedTime.getUTCFullYear(), fixedTime.getUTCMonth(), fixedTime.getUTCDate()+1, entry, 0, 0);                
                newTimetable.push({time: time.getTime()/1000, type: TimetableFaivel[entry]});  
            }else if(entry==fixedTime.getUTCHours()){
                let time = new Date(fixedTime.getUTCFullYear(), fixedTime.getUTCMonth(), fixedTime.getUTCDate(), entry, 0, 0);
                newTimetable.push({time: time.getTime()/1000, type: TimetableFaivel[entry]});
            }
        }

        
        newTimetable.sort(function(a, b) {
            return a.time - b.time;
        });

        let nextIn = {
            Boss:null,
            Obelisk: null,
            Nothing: null
        }
        let Now = null;

        for(let entry in newTimetable){
            let localtime = Utility.ToLocalTime(newTimetable[entry].time - (offset*60));
            if(entry!=0){
                if(nextIn[newTimetable[entry].type]===null){
                    nextIn[newTimetable[entry].type] = localtime;
                }      
            }else{
                Now = newTimetable[entry].type;
            }
        }
        let innerHTML = "";
        innerHTML += Elements.Build("settingTitle", {cls:``, text:`Now:`});
        innerHTML += Elements.Build("bossnexttimer", {text:"", action:`Now_timer_action`});
        for (let x in nextIn){
            innerHTML += Elements.Build("settingTitle", {cls:``, text:`Next ${x}:`});
            innerHTML += Elements.Build("bossnexttimer", {text:"00", action:`${x}_timer_action`});
        }

        return {html: innerHTML, timers: nextIn, now:Now};
    }
}