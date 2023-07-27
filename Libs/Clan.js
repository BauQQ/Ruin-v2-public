/*
 * Clan Lib
 */
class Clan {
    constructor() {

    }

    //Get clan data from clantag
    static async ByTag(tag) {
        return await Api.quickCall('clan', {"tag":tag}).then(function (result) {
            return result;
        });
    }
}