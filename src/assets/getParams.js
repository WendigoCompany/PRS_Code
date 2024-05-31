export default function GetParams(){
    const route = window.location.hash.substring(1);
    const urlparams = new URLSearchParams(route);
    const params ={};
    
    urlparams.forEach((v, k ) => {
        params[k.replace("/?", "")]  = v;
    })
    return params
    }

