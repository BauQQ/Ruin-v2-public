/*
 * Mutation observer for Ruin UI.
 * Check documentation for more information.
 */
class Mutator {
    constructor() {
        //Empty for now, not needed
    }

    //Mutation observer create
    static Create(id, target, options, callback) {
        Mutator.Destroy(id);
        target = $(target)[0];
        "undefined" === target || null === target || Mutos.hasOwnProperty(id) || (Mutos[id] = new MutationObserver(callback), Mutos[id].observe(target, options));
    }

    //Mutation observer destroy
    static Destroy(id) {
        Mutos.hasOwnProperty(id) && (Mutos[id].disconnect(), delete Mutos[id]);
    }

}