export default {
    get: (slot)=>{
        return slot.value
    },
    set: (slot , value)=>{
        slot.value = value;
    },
    slot :{
        bc: undefined
    }
}