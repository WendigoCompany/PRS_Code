import { BASEURL } from "../assets/page_importants";
import { build_url, decode_url } from "../assets/zip";


export default class TOKEN {
  GEN_DATA(token) {
    try {
      this.data = decode_url(token);
    } catch (error) {
      this.data = "";
      console.error(error);
    }
  }
  GEN_URL(LANG) {
    try {
      const data = JSON.parse(sessionStorage.getItem("save"));
      data.l = LANG;
      const token = build_url(JSON.stringify(data));
      this.url = BASEURL + "load/" + token;
    } catch (error) {
      this.url = "";
      console.error(error);
    }
  }
}
