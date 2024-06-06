import { BASEURL } from "../assets/page_importants";
import { build_url, decode_url } from "../assets/zip";

const zip_table = [
  { uz: "name", z: "@a@" },
  { uz: "money", z: "@b@" },
  { uz: "waifus", z: "@c@" },
  { uz: "costumes", z: "@d@" },
];

const unzip_keys = (data) => {
  zip_table.map((zip) => {
    data = data.replaceAll(zip.z, zip.uz);
  });

  return data;
};

//NOMBRE DE USUARIO DEBE TENER  16 CHAR MAX Y NO PUEDE TENER @

const zip_keys = (data) => {
  data = JSON.stringify(data);

  zip_table.map((zip) => {
    data = data.replaceAll(zip.uz, zip.z);
  });

  return data;
};

export default class TOKEN {
  GEN_DATA(token) {
    try {
      this.data = decode_url(token);
      this.data = unzip_keys(this.data);
    } catch (error) {
      this.data = "";
      console.error(error);
    }
  }
  GEN_URL(LANG) {
    try {
      let data = JSON.parse(sessionStorage.getItem("save"));
      data.l = LANG;
      data = zip_keys(data);
      this.url = build_url(data);
      // this.url = BASEURL + "load/" + token;
    } catch (error) {
      this.url = "";
      console.error(error);
    }
  }
}

