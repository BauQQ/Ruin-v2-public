/*
 * Angry Assignment Extension
 */

class AngryAssignment{   
    
    constructor(){
        AngryAssignments = Storage.Get(MemKeys.AngryAssignment);
        if(AngryAssignments==undefined || AngryAssignments==null || AngryAssignments==''){
            AngryAssignments = {};
        }else{
            AngryAssignments = $.parseJSON(AngryAssignments);
        }

        let inc = {
            setting : {id: "angryassigns", type: null, defaultvalue: null, description:"", hidden : false, name :"Angry Assignments", parent: null, handler: 2, action:AngryAssignment.LoadExtraUI, order:90}
        };

        //Settings.Add(inc.setting.id, inc.setting.type, inc.setting.defaultvalue, inc.setting.description, inc.setting.hidden, inc.setting.parent, inc.setting.name, inc.setting.handler, null, inc.setting.action, inc.setting.order);
        //Actions.Add(inc.setting.id, inc.setting.action);
        
        //Chat.AddCommand("!AA", {r:"!AA",f:AngryAssignment.AssignIN, p:false, dev:false, sec:"party"});
        Settings.Remove(inc.setting.id);
    }


    static LoadUI(data){

    }

    static async LoadExtraUI(data){
        UI.Remove(`.${Classes.AngryAssignementControlWindow}`);
        AngryAssignment.CreateAssignmentControlWindow();
        //MemKeys.AngryAssignment
    }

    static async CreateAssignmentControlWindow(){

        // Generate Inner HTML + Existing Data
        //Add window to the UI
        let windowData = {
            cls : Classes.AngryAssignementControlWindow,
            n : "angry_control",
            text : "Angry Assignments",
            html : "",
            close : Classes.closefeature
        };

        let html = await Elements.aBuild("windowPanel", windowData);
        UI.Append(`${Classes.uibase}:first`, html);

        UI.DeleteElementDelegation(`.${Classes.AngryAssignementControlWindow}`);

        UI.AddWindow(windowData.text.toLowerCase(), {modable: true, top:50, left:150, w:0, h:0, resize:true, custom_svelte:windowData.cls});     
        $(`.${windowData.cls}`).css({ width:550+"px"});           
        $(`.${windowData.cls}`).show();
    }

    static AssignIN(name, text, node){
        // && !Player.IsSelf(name)
        if(Character.IsPartyLead(name)){
            text = text.substring(4);
            // Display handler some time
        }
        $(node).hide();
    }

    static AssignOut(){
               
    }
}