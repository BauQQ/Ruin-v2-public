/*
 * Utility class for methods that has to be used everywhere 
 * load with super() if needed
 */
class Utility {
    constructor() {
        
    }

    //Get current time
    static Time() {
        var a = new Date($.now()), b = a.getHours(), c = a.getMinutes();
        10 > b && (b = "0" + a.getHours());
        10 > c && (c = "0" + a.getMinutes());
        return `${b}:${c}`;
    }


    //Delegate on action
    static async FDelegation(element, action, data){
        $(element).undelegate(`div[data-action='${action}']`, "click");
        $(element).delegate(`div[data-action='${action}']`, "click", function (event) {
            if(Actions.Has(action)){
                FActions[action](event, data);
            }
        });
    }

    //Copy text to clipboard
    static Copy(b) {
        let a = document.createElement("input");
        a.setAttribute("value", b);
        document.body.appendChild(a);
        a.select();
        document.execCommand("copy");
        document.body.removeChild(a);
    }

    //First letter to uppercase
    static Ucfirst(word) {
        return"string" !== typeof word ? "" : word.charAt(0).toUpperCase() + word.slice(1);
    }

    //All words capitalized
    static Ucwords(str) {
        str = str.split(" ");
        for (var i = 0; i < str.length; i++)
            "undefined" !== str[i][0] && "undefined" !== typeof str[i][0] && (str[i] = str[i][0].toUpperCase() + str[i].substr(1));
        return str.join(" ");
    }

    //Check if all properties of object are true
    static TableIsTrue(table) {
        for (var key in table)
            if (!table[key])
                return!1;
        return!0;
    }

    //Convert to milliseconds
    static ToMilliseconds(hour, minute, seconds) {
        return ((hour * 60 * 60 + minute * 60 + seconds) * 1000);
    }

    //Convert milliseconds to minutes
    static ToMinutes(ms) {
        var m = Math.floor(ms / 60000);
        return m;
    }
    
    static Clone(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    //property of object, Case insensitive
    static FindPropertyCaseInsensitive(object, key){
        return object[Object.keys(object).find(k => k.toLowerCase() === key.toLowerCase())];
    }

    static GetTime(){
        let invdate = new Date(new Date().toLocaleString('en-US', {
          timeZone: 'Europe/Copenhagen' 
        }));
        return invdate;
    }

    static ToLocalTime(stamp){
        let date = new Date(stamp * 1000);
        return date;
    }

    static GetTimeRemaining(endtime) {
        var t = endtime - new Date().getTime();
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds
        };
    }      
    
    static GetKeybinds(){        
        if($.parseJSON(localStorage.getItem(MemKeys.Skillbarsetting)).hasOwnProperty(CharName)){
            return $.parseJSON(localStorage.getItem(MemKeys.Skillbarsetting))[CharName];
        }else{
            return null;
        }
    }

    static isEmpty(str) {
        return (!str || str.length === 0 );
    }

    static ObjectSortByKey(obj){
        return Object.keys(obj).sort().reduce(function (result, key) {
            result[key] = obj[key];
            return result;
        }, {});
    }

    static OutputAllElements(){
        let out = "";
        $.each(ELib, function(key, value){
            out += "| `"+key+"` | `string` | `"+value+"` |  \n";
        });
        console.log(out);
    }

    static OutputAllClasses(){
        let out = "";
        $.each(Classes, function(key, value){
            out += "| `"+key+"` | `string` | `"+value+"` |  \n";
        });
        console.log(out);
    }

    static GenID(table, id = null){
        if(id==null){
            id = Math.random().toString(26);
        }

        $.each(table, (key, value)=>{
            if(value.hasOwnProperty("id") && value.id==id){
                return CustomJs.ScriptIDExist(table);
            }
        });

        return id;
    }

    static findIndexGreaterThan(arr, x) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] > x) {
            return i;
          }
        }
        return -1;
    }

    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static replaceLast(str, pattern, replacement){
        const match =
          typeof pattern === 'string'
            ? pattern
            : (str.match(new RegExp(pattern.source, 'g')) || []).slice(-1)[0];
        if (!match) return str;
        const last = str.lastIndexOf(match);
        return last !== -1
          ? `${str.slice(0, last)}${replacement}${str.slice(last + match.length)}`
          : str;
    };

    static splitStringAt(str, index) {
        const result = [str.slice(0, index), str.slice(index)];
      
        return result;
    }
}