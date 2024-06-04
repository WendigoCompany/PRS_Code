import { useLocation, useParams } from "react-router-dom";
import { BASEURL } from "../assets/page_importants";

export default function Disclaim_Middleware({children}){
    const lang = useParams().lang;
    const location = useLocation().pathname;
    
    if(sessionStorage.getItem("disclaim") == null){
        sessionStorage.setItem("origin", location   )
        window.location.href = BASEURL + lang  +"/disclaim";
    }
    
    return <>
    {children}
    </>
}