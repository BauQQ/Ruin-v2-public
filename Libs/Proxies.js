/*
 * Proxy observer for Ruin UI.
 */
class Proxies {
    constructor() {
    }

    static async Revokable(handle, target, func){     
        if(!Prox.hasOwnProperty(handle)){            
            Prox[handle] = Proxy.revocable(target, func);
        }
    }

    static async Revoke(handle){
        if(Prox.hasOwnProperty(handle)){
            Prox[handle].revoke();
            delete Prox[handle];
        }
    }

    static async Get(handle){
        if(Prox.hasOwnProperty(handle)){
            return Prox[handle];
        }
    }

    static async Set(handle, target, func){
        if(!Prox.hasOwnProperty(handle)){
            Prox[handle] = new Proxy(target, func);
        }
    }

    static async Has(handle){
        return Prox.hasOwnProperty(handle);
    }
    
    static async Delete(handle){
        if(Prox.hasOwnProperty(handle)){
            delete Prox[handle];
        }
    }

    static async Clear(){
        Prox = {};
    }

    static async GetProxies(){
        return Prox;
    }
}
