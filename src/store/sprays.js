export default {
  get: (slot) => {
    return slot.value;
  },
  set: (slot, value) => {
    slot.value = value;
  },
  find: (slot, value) => {
    slot.value = value;
  },
  slot: {
    sp: [],
  },
};
