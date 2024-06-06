import TOKEN from "../models/token.model";
import { BASEURL } from "../assets/page_importants";
import { useParams } from "react-router-dom";

export default function Token() {
  const token = sessionStorage.getItem("token");
  const data = new TOKEN();
  data.GEN_DATA(token);
  const LANG = JSON.parse(data.data).l;
  sessionStorage.setItem("save", data.data);
  sessionStorage.removeItem("token")
  window.location.href = `${BASEURL}${LANG}/loby`;

  return <>Loading...</>;
}
