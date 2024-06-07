import Swal from "sweetalert2";
import { INIT_Skip } from "./modals.init";
import { BASEURL } from "../../assets/page_importants";

export const skip_modal = (
  LANG,
  extra = {
    onConfirm: () => {},
    onCancel: () => {},
  }
) => {
  INIT_Skip({ lang: LANG }).then((TEXT) => {
    Swal.fire({
      title: TEXT.title,
      text: TEXT.text,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: TEXT.acp_btn,
      cancelButtonText: TEXT.ccl_btn,
      customClass: {
        title: "txt-sw2",
        htmlContainer: "txt-sw2",
        popup: "pop-sw2",
        confirmButton: "btn-sw2-confirm",
        cancelButton: "btn-sw2-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        extra.onConfirm();
      } else {
        extra.onCancel();
      }
    });
  });
};
