import { useParams } from "react-router-dom";
import { BASEURL } from "../assets/page_importants";

export default function Disclaim_Middleware({children}){
    const lang = useParams().lang;
    if(sessionStorage.getItem("save") == null){
        window.location.href = BASEURL + lang  +"/home";
    }
    return <>
    {children}
    </>
}