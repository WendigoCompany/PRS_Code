import { useLocation, useParams } from "react-router-dom";
import { BASEURL, LANGS } from "../assets/page_importants";


export default function Lang_Middleware({children}){

    const lang = useParams().lang;
    let location = useLocation().pathname;

    if(LANGS.indexOf(lang) == -1){
        location = location.replace("/" + lang, "");
        window.location.href = BASEURL + "en" + location;
    }
    return <>
    {children}
    </>
}

// const lang = to.params.lang;
// if (ava_langs.indexOf(lang.toLowerCase()) == -1) {
//   const restOfPath = to.fullPath.replace(`/${lang}`, '');
//   next({ path: `/en${restOfPath}` });
// }