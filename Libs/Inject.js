/*
* Inject Library
*
*/
class Inject{
    constructor(){
        
    }

    static async RemoveExecuteOnWindowLoad(window, func){
        if(ExecuteOnWindowLoad.hasOwnProperty(window)){
            ExecuteOnWindowLoad[window].forEach(async (func, index) => {
                if(func === func){
                    ExecuteOnWindowLoad[window].splice(index, 1);
                }
            });
        }
    }

    static async AddExecuteOnWindowLoad(window, func){
        if(!ExecuteOnWindowLoad.hasOwnProperty(window)){
            ExecuteOnWindowLoad[window] = [];
        }
        ExecuteOnWindowLoad[window].push(func);
    }

    static async ExecuteOnWindowLoad(window){
        if(ExecuteOnWindowLoad.hasOwnProperty(window)){
            ExecuteOnWindowLoad[window].forEach(async (func) => {
                func();
            });
        }
    }
}