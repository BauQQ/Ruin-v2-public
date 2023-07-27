const ChatData = {
  data: {
    public: [
      "global",
      "faction",
      "clan",
      "party"
    ],
    private: [
      "wto",
      "wfrom"
    ],
    system: [
      "pvp",
      "inv",
      "system",
      "systemf"
    ],
    ex: [
      "gm"
    ],
    formatted: {
      "global": "textglobal",
      "faction": "textfaction",
      "clan": "textclan",
      "party": "textparty",
      "pvp": "textpvp",
      "inv": "textinv",
      "wto": "textto",
      "wfrom": "textfrom",
      "system": "textsystem",
      "systemf": "texterror",
      "gm": "textGM"
    }
  },
  default: {
    channels: {
      general: [
        'global',
        'faction'
      ],
      party: [
        'party'
      ],
      clan: [
        'clan'
      ],
      log: [
        'inv',
        'pvp',
        'system',
        'systemf'
      ]
    },
    combatlog: {
      
    }
  },
  cmd: {
    "global": {
      alias: [
        "g",
        "global"
      ],
      intr: "g %message%"
    },
    "faction": {
      alias: [
        "f",
        "faction"
      ],
      intr: "f %message%"
    },
    "party": {
      alias: [
        "p",
        "party"
      ],
      intr: "p %message%"
    },
    "clan": {
      alias: [
        "c",
        "clan"
      ],
      intr: "c %message%"
    },
    "whisper": {
      alias: [
        "w",
        "whisper"
      ],
      intr: "%name% %message%"
    },
    "report": {
      alias: [
        "report"
      ],
      intr: "report %message%"
    },
    "time": {
      alias: [
        "time"
      ],
      intr: "time"
    },
    "bosslog": {
      alias: [
        "bosslog"
      ],
      intr: "bosslog"
    },
    "partyleave": {
      alias: [
        "partyleave"
      ],
      intr: "partyleave"
    },
    "partycreate": {
      alias: [
        "partycreate"
      ],
      intr: "partycreate"
    },
    "partyinvite": {
      alias: [
        "partyinvite"
      ],
      intr: "partyinvite %message%"
    },
    "r": {
      alias: [
        "r",
        "respond"
      ],
      intr: "r %message%"
    },
    "ignore": {
      alias: [
        "ignore"
      ],
      a: ""
    },
    "unignore": {
      alias: [
        "unignore"
      ],
      a: ""
    },
    "chathelp": {
      alias: [
        "chathelp"
      ],
      a: ""
    }
  }
};