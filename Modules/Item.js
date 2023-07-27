/*
 * Itemization class for methods that has to be used everywhere, 
 * this will generate stats for items if rolls is given
 * load with super() if needed
 */
class Item {
    constructor(a) {
        this.stats = new Map;
        return this.Generate(a);
    }

    //Generate item stats from data rolls
    Generate(c) {
        var b = this;
        if (this.type = c.type, this.bound = c.bound, this.tier = c.tier, this.logic = Ry[this.type + this.tier], void 0 === this.logic)
            return!1;
        if (this.upgrade = c.upgrade, this.stats.clear(), c.rolls) {
            this.isBound(c.bound);
            if (this.SetRolls(c.rolls), this.quality = this.NextRoll(), this.logic.stats) {
                this.logic.stats.forEach(function (d, f) {
                    b.stats.set(f, {type: "base", qual: b.quality, value: Math.floor(d.min + (d.max - d.min) * Math.pow(b.quality / 100, 2) + Yo[f] * b.upgrade)})
                });
                c = Math.round(3.6 * Math.pow(this.quality / 100, 1.5));
                for (var h = 0; h < c; ++h) {
                    for (var e =
                            this.NextRoll(), a = -1; - 1 === a || this.stats.has(a); )
                        a = parseInt(Ho(wM, e / 101)), e = (e + 5) % 100;
                    e = (this.NextRoll() + this.quality) / 2;
                    this.stats.set(a, {type: "bonus", qual: e, value: Math.ceil(Math.max((Vo[a].min + (Vo[a].max - Vo[a].min) * Math.pow(e / 100, 2)) * this.logic.level * jo[this.type].weight, Yo[a]) + Yo[a] * this.upgrade)})
                }
            }
            this.quality = this.logic.quality || this.quality;
            this.gs = 0;
            this.logic.gs ? this.gs = this.logic.gs : this.stats.forEach(function (d, f) {
                if (17 !== f) {
                    var g = d.value / Yo[f];
                    "shield" == b.type && "base" == d.type && (g *= .5);
                    "orb" == b.type && "base" == d.type && (g *= .7);
                    b.gs += g
                }
            });
            this.gs = Math.round(this.gs)
        }        
    }

    isBound(a){
        if(a==2){
            this.bound = true;
        }else{
            this.bound = false;
        }
    }

    //Set Rolls from daa
    SetRolls(a) {
        this.rolls = a;
        this.currentRoll = 0;
    }

    //Whats the next roll for the item
    NextRoll() {
        if (this.currentRoll === this.rolls.length)
            throw"roll maximum reached";
        return this.rolls[this.currentRoll++];
    }

    //Process weapon quality
    static Weapon(item){
        let rating = Array.from(item.stats.values()).slice(0, 2);
        let quality = Item.Quality(1);
        let result = [];

        for(let value of rating){
            quality = Item.Quality(value.qual);
            result.push(value.value);
        }
        return Elements.Build('basic_itemstat_div', {cls:`text${quality.color}`, text:`${result.join(' - ')} Damage`});
    }

    //Find quality depending on rating percentage
    static Quality(rating){
        let quality = QHold[0], next;
        for(next in QHold)
            rating >= next && (quality = QHold[next]);
        return quality;
    }
}