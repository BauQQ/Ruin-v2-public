class Modal{
    constructor(){

    }

    static async Register(data){
        if(!await Modal.Exist(data.name)){
            ModalArgs[data.name] = data;
            return true;
        }else{
            return false;
        }
    }

    static Exist(name){
        if(ModalArgs.hasOwnProperty(name)){
            if(!UI.Exist($(`.${ModalArgs[name].cls}`)[0])){
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
    }

    static async Create(data, innerHtml, mainMenu = false, rem = false, skipAddWindow = false){        
        if(!await Modal.Exist(data.name)){
            Modal.Register(data);

            if(mainMenu){
                UI.AddToMenu(await Elements.aBuild(data.element, {
                    id : data.id,
                    text : data.btn
                }));
            }            

            let id = data.cls;
            if(data.nid!=null){
                id = data.nid;
            }

            let windowData = {
                id: id,
                cls : data.cls,
                n : data.nx,
                text : data.name,
                html : await Elements.aBuild(data.internal, innerHtml),
                close : data.close
            };
            
            if(typeof data.minimize !== "undefined"){
                windowData.minimize = data.minimize;
            }
            
            UI.Append(`${Classes.uibase}:first`, await Elements.aBuild(data.base, windowData));
           
            if(data.nid!=null){
                UI.CloseElementDelegation($(`.${data.nid}`), rem);
            }else{
                UI.CloseElementDelegation($(`.${data.cls}`), rem);
            }
            
            
            if(mainMenu){
                UI.DelegateMainMenu(data.id, `.${data.cls}`, data.name.toLowerCase());
            }

            if(!skipAddWindow){
                UI.AddWindow(data.name.toLowerCase(), {modable: data.modable, top:data.position.top, left:data.position.left, w:data.size.width, h:data.size.height, resize:data.resize, custom_svelte:data.svelte, rem:rem, storage:data.name.toLowerCase()+"Open"});    
            }
            
            return true;
        }else{
            return false;
        }
    }
}