import { BASEURL, LANGS } from "../assets/page_importants";

// const lang = useParams().lang;
// let location = useLocation().pathname;


export default function LANG_MIDDLEWARE (lang, location){
    if(LANGS.indexOf(lang) == -1){
        location = location.replace("/" + lang, "");
        window.location.href = BASEURL + "en" + location;
        window.location.reload()
    }
    
}