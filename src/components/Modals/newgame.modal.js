// import SAVEGAME from "@/models/user.model";
// import { BASEURL } from "@/router/routes.params";
// import { INIT_NWG } from "./modals.init";

import Swal from "sweetalert2";
import SAVEGAME from "../../models/user.model";
import { BASEURL } from "../../assets/page_importants";
import { INIT_NWG } from "./modals.init";
import "../../style/less/Components/Modals/LoadModal.less"

const forbiden_chars = ['/', '\\', '?', '%', '*', ':', '|', '"', '<', '>', '.', '$', '!', '&', "'", '`', '~', '{', '}', '[', ']', '^', '@', '+', '=', ';', ',', '#'];


const evaluate_name =(name)=>{
    let valid = true;
    
    forbiden_chars.map(fc => {
      if(name.includes(fc)){
        valid = false;
      }
    })

    console.log(valid);

    return valid
}

export const new_game_modal = (LANG) => {
  INIT_NWG({ lang: LANG }).then((TEXT) => {
    Swal.fire({
      title: TEXT.title,
      input: "text",
      showCancelButton: true,
      confirmButtonText: TEXT.acp_btn,
      cancelButtonText: TEXT.ccl_btn,
      showLoaderOnConfirm: true,
      inputPlaceholder: TEXT.txt_inp_ph,

      customClass: {
        title: "txt-sw2",
        popup: "pop-sw2",
        confirmButton: "btn-sw2-confirm",
        cancelButton: "btn-sw2-cancel",
        input: "basic-input",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value.trim().length == 0 || !evaluate_name(result.value)) {
          Swal.fire({
            text: TEXT.error.text,
            customClass: {
              title: "txt-sw2",
              htmlContainer: "basic-label",
              popup: "pop-sw2",
              confirmButton: "btn-sw2-confirm",
              cancelButton: "btn-sw2-cancel",
              input: "basic-input",
            },
          }).then(() => {
            new_game_modal(LANG);
          });
        } else {
          Swal.fire({
            title: TEXT.confirm.title,
            text: TEXT.confirm.text,
            customClass: {
              title: "txt-sw2",
              htmlContainer: "basic-label",
              popup: "pop-sw2",
              confirmButton: "btn-sw2-confirm",
              cancelButton: "btn-sw2-cancel",
              input: "basic-input",
            },
          }).then(() => {
            const save = new SAVEGAME();
            save.NW(result.value.trim());
            sessionStorage.setItem("save", JSON.stringify(save));
            window.location.href = BASEURL + LANG + "/loby";
          });
        }
      }
    });
  });
};


