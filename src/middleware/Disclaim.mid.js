import { BASEURL } from "../assets/page_importants";

export default function DISCLAIM_MIDDLEWARE (lang, location){

    if(sessionStorage.getItem("disclaim") == null){
        sessionStorage.setItem("origin", location   )
        window.location.href = BASEURL + lang  +"/disclaim";
        window.location.reload()
    }
    
}