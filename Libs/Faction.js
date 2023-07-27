/*
 * Faction Lib
 */
class Faction {
  constructor() {

  }

  //Get faction name by ID
  static NameByID(id){
      switch(parseInt(id)){
          case 0:
              return "vanguard";
          case 1:
              return "bloodlust";
          default:
              return "monster";
      }
  }
}