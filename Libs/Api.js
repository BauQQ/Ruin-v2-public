/*
 * Baseline API Lib
 */
class Api {
    constructor() {

    }

    //Standard ajax api call for mod with callback method on promise
    static Call(url, args, callback) {        
        if(ApiUrls.hasOwnProperty(url)){
            let query = Utility.Clone(ApiUrls[url].string);
            $.each(args, function( key, value ) {
                query = query.replace(`%${key}%`, value);
            });
            
            $.ajax({type: ApiUrls[url].type, url: ApiUrls[url].url, data: query, contentType: "text/plain;charset=UTF-8", dataType: "json", success: function (data) {
                callback(data);
            }, error: function () {
                return !1;
            }});
        }
    }

    //Quick api call with no callback, returns result only on promise
    static quickCall(url, args) {        
        if(ApiUrls.hasOwnProperty(url)){
            let query = Utility.Clone(ApiUrls[url].string);
            $.each(args, function( key, value ) {
                query = query.replace(`%${key}%`, value);
            });
            return $.ajax({type: ApiUrls[url].type, url: ApiUrls[url].url, data: query, contentType: "text/plain;charset=UTF-8", dataType: "json"});
        }
    }

    static GetLanguage(type, url) {
        return $.ajax({type: type, url: url, contentType: "text/plain;charset=UTF-8", dataType: "json"});
    }

    static async Fetch(key, json){
        if(ApiUrls.hasOwnProperty(key)){
            let api = Utility.Clone(ApiUrls[key]);
            let rawResponse = null;
            if(api.type==="GET"){
                rawResponse = await fetch(api.url);
            }else if(api.type==="POST"){
                rawResponse = await fetch(api.url, {
                    method: api.type,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(json)
                });
            }            
            return await rawResponse.json();
        }else{
            return null;
        }
    }
}