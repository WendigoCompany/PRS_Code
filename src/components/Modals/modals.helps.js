export const keys_to_clear1 = [
    "cidg",
"tigger",
"sidg",
"widg",
"wid",
"sid",
];




export const SESSION_CLEANER =(keys=[])=>{
    keys.map(k => sessionStorage.removeItem(k))
}