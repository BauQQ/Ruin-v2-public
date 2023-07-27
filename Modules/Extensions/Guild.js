/*
 * Guild Extension
 */

class Guild{

    constructor(){
        UI.AddWindow("clan", {action:Guild.LoadUI, modable: false, top:0, left:0, w:0, h:0, resize:true, svelte:Classes.clanSvelte, storage:"clanOpen"});
        ExecuteOnWindowLoad["clan"] = [];
    }

    static LoadUI(){
        Guild.AddPartyInvite();
        Inject.ExecuteOnWindowLoad("clan");
    }

    static async AddPartyInvite(){     
        setTimeout(function () {
            let memberTable = $(`.clanView table`)[0];
            let html = '<tbody>';
            
            $.each($(`.clanView table tbody`).children(), function(hand, node){
                let nameNode = $(node).find('.name');
                let name = $(nameNode).html();
                html += `<tr class="striped svelte-6t8hqd"><td><div class="btn blue partyinviteclanmember" data-player="${name}">Invite</div></td></tr>`; 
            });
            html += '</tbody>';
            UI.Append($(`.clanView table`).parent(), `<table class="marg-top panel-black svelte-6t8hqd inviteClan"><thead><tr class="textprimary"><th>Invite</th></tr></thead>${html}</table>`);
            
            Input.BindOnClick($(`.partyinviteclanmember`), Guild.PartyInvite);
            Input.BindOnClick($(`.clanView div.subnav .btn.navbtn.grey`)[1], Guild.ShowInviteList);
            Input.BindOnClick($(`.clanView div.subnav .btn.navbtn.grey`)[2], Guild.HideInviteList);
        }, 300);
    }

    static async HideInviteList(){
        $('.inviteClan').hide();
    }   

    static async ShowInviteList(){
        $('.inviteClan').show();

    }

    static async PartyInvite(event){
        let target = event.target;
        let name = $(target).data('player');        
        Chat.Send(`/partyinvite ${name}`);
    }
}



