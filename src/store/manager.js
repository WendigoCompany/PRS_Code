import slot_Background from "./background";
import slot_Spray from "./sprays";

const Capitalizate = (word) => {
  return word[0].toUpperCase() + word.slice(1, word.length);
};

class Memory {
  constructor() {
    this.data = {};
  }

  get(id, extra) {
    return this.data[id].get(extra);
  }
  set(id, value, extra) {
    this.data[id].set(value, extra);
  }

  special(head, id, value, extra) {
    return this.data[id][head](value, extra);
  }
  process(data) {
    const MEMSLOT = {};
    MEMSLOT.id = Object.keys(data.slot)[0];
    Object.keys(data).map((key) => {
      switch (key) {
        case "slot":
          MEMSLOT.value = data[key][MEMSLOT.id];
          break;
        case "get":
          MEMSLOT[`get`] = (extra = {}) => {
            return data[key](MEMSLOT, extra);
          };
          break;
        case "set":
          MEMSLOT[`set`] = (value, extra = {}) => {
            data[key](MEMSLOT, value, extra);
          };
          break;
        default:
          MEMSLOT[key] = (value, extra = {}) => {
            data[key](MEMSLOT, value, extra);
          };
          break;
      }
    });

    const id = MEMSLOT.id;
    delete MEMSLOT.id;
    this.data[id] = MEMSLOT;
  }

  build(slot) {
    if (Array.isArray(slot.slot)) {
    } else if (typeof slot.slot == "object") {
      this.process(slot);
    } else {
    }
  }


  pack(id) {
    return {
      get: () => {
        return this.get(id);
      },
      set: (value) => {
        return this.set(id, value);
      },
    };
  }
}

const MEMORY = new Memory();
MEMORY.build(slot_Background);
MEMORY.build(slot_Spray);

export default MEMORY;
