import Swal from "sweetalert2";
import { INIT_Back } from "./modals.init";
import { BASEURL } from "../../assets/page_importants";


export const back_modal = (LANG) => {
  INIT_Back({lang: LANG}).then((TEXT) => {
    Swal.fire({
      title: TEXT.title,
      text : TEXT.text,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: TEXT.acp_btn,
      cancelButtonText: TEXT.ccl_btn,
      customClass: {
        title: "txt-sw2",
        htmlContainer : "txt-sw2",
        popup: "pop-sw2",
        confirmButton: "btn-sw2-confirm",
        cancelButton: "btn-sw2-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
          window.location.href = BASEURL + LANG + "/loby";
      }
    });

  });
};

