const ApiUrls = {
  'item': {
    "type": "POST",
    "url": "./api/item/get",
    "string": '{"ids":[%id%]}'
  },
  'items': {
    "type": "POST",
    "url": "./api/item/get",
    "string": '{"auction":1,"ids":[%ids%]}'
  },
  'clan': {
    "type": "POST",
    "url": "./api/claninfo/info",
    "string": '{"tag":"%tag%"}'
  },
  'invites': {
    "type": "POST",
    "url": "./api/clan/invites",
    "string": '{"name":"%name%"}'
  },
  'player': {
    "type": "POST",
    "url": "./api/playerinfo/search",
    "string": '{"name":"%name%","order":"name","limit":1}'
  },
  'players': {
    "type": "POST",
    "url": "./api/playerinfo/search",
    "string": '{"name":"%name%","order":"name","limit":%limit%}'
  },
  'playerpvp': {
    "type": "POST",
    "url": "./api/pvp/getplayerpvpinfo",
    "string": '{"name":"%name%"}'
  },
  'default': {
    "type": "GET",
    "url": "./api/account/info",
    "string": ""
  },
  'join': {
    "type": "POST",
    "url": "./api/user/join",
    "string": ""
  },
  'pvpfactionpercentiles': {
    "type": "GET",
    "url": "./api/pvp/getfactionpercentiles",
    "string": ""
  }
};