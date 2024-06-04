import { BASEURL } from "../assets/page_importants";

export default function Redirect({children , to}){

    window.location.href = BASEURL +  to;
    window.location.reload()
    return <>{children}</>
}
