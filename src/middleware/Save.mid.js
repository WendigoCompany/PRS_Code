import { BASEURL } from "../assets/page_importants";

export default function SAVE_MIDDLEWARE(lang){
    if(sessionStorage.getItem("save") == null){
        window.location.href = BASEURL + lang  +"/home";
        window.location.reload()
    }
    
}