export default class SAVEGAME {
  constructor(name, waifus, money) {
    this.name = name;
    this.waifus = waifus;
    this.money = money;
  }

  NW (name){
    this.name = name;
    this.waifus = []
    this.money = 0;
  }
  
}
