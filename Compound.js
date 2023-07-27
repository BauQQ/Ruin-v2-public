//Developer
const Dev = ["QmF1"];
//Bau
const Bau = ["QmF1", "TWV0cmljcw=="];
//Mod name
const ModName = "Ruin UI";
//version number 
const _Version = "2.1.15.4";
//Memory keys
const MemKeys = {
    Storage : "ruinui-ca-dev-2",
    Skillbarsetting : "skillbarsettings",
    ChatLog : "emc-chatlog-ruin-dev-2",
    Templates : "emc-templates-ruin-dev-2",
    BuffTemplate : "emc-bufftemplates-ruin-dev-2",
    AngryAssignment : "emc-angry-ruin-dev-2",
    Bufftracker : "emc-bufftracker-2-",
    CustomCss : "emc-customcss-2-",
    CustomJs : "emc-customjs-2-",
    WhisperTabs : "emc-whispertabs-2-",
};
//Global Styles
let GlobalStyles = {};
//Chatlog
let GlobalChatlog = {};
//Angry assignments
let AngryAssignments = {};
//Templates
let TemplatesLog = {};
//BuffTemplates
let BuffTemplatesLog = {};
//Gemote 
let Gmode = [];
//Mutation observer object
let Mutos = {};
//Proxies object
let Prox = {};
//Current Game State
let Gstate = null;
//Current character
let CharID = "";
//Current characters name
let CharName = null;
//Mouse position
let Mpos = {x: 0, y: 0};
//Current Language
let Language = null;
//Full Player list from api lookups - to minimize api usage
let Players = {};
//Max emotes
let maxEmotes = 25;
//Function Actions
let FActions = {};
//Registered Keybinds
let Keybinds = {};
//Settings Descriptions
let SettingDescriptions = {};
//Player party
let MyParty = {};
//Chat commands
let ChatCommands = {};
//Active whispers
let ActiveWhispers = [];
// Current party target selected element
let PartyTarget = null;
//User Addons
let UserAddons = {};
//Modular keybinds
let ModularBinds = {};
//Any reserved keywords for arrays and objects
let reservedKeywords = [
    "name",
    "type",
    "handler"
];
//Function keys
let fnKeys = {
    "escape":27,
    "f1":112,
    "f2":113,
    "f3":114,
    "f4":115,
    "f5":116,
    "f6":117,
    "f7":118,
    "f8":119,
    "f9":120,
    "f10":121,
    "f11":122,
    "f12":123
};

let ChatVars = {
    emoteToFind : ""
};

let hideOnClicks = {};

let BuffTrackerArgs = {};

let ModalArgs = {};

let AllSnippets = {};

let PlayerScripts = {};

let HasTarget = false;

let OpenWindows = [];

let SystemWindows = {
    subscriptionOpen : "store / elixir",
    skillmenuOpen : "skills",
    charpanelOpen : "character",
    settingsOpen : "settings",
    clanOpen : "clan",
    pvpOpen : "pvp",
};

let ExecuteOnWindowLoad = {};

let PrestigeBrackets = {
    1: 2000,
    2: 3000,
    3: 4000,
    4: 5000,
    5: 6000,
    6: 7000,
    7: 8000,
    8: 9000,
    9: 10000,
    10: 11000,
    11: 12000,
    12: 13000,
    13: 14000
};

let PrestigeRanks = [
    4000,8000,12000,16000,20000, 24000,28000,32000, 36000,40000,44000,48000
];
