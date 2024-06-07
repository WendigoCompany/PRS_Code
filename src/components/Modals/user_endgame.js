import Swal from "sweetalert2";
import { INIT_Endgame } from "./modals.init";
import { BASEURL } from "../../assets/page_importants";
import { SESSION_CLEANER, keys_to_clear1 } from "./modals.helps";

export const endgame_modal = (
  LANG, END
) => {
    INIT_Endgame({ lang: LANG }).then((TEXT) => {

    TEXT = TEXT[END]
    Swal.fire({
      title: TEXT.title,
      text: TEXT.text,
      showConfirmButton: true,
      confirmButtonText: TEXT.acp_btn,
      customClass: {
        title: "txt-sw2",
        htmlContainer: "txt-sw2",
        popup: "pop-sw2",
        confirmButton: "btn-sw2-confirm",
        cancelButton: "btn-sw2-cancel",
      },
    }).then((result) => {
        if(END == "win"){
            const save = JSON.parse(sessionStorage.getItem("save"));
            save.money ++
            sessionStorage.setItem("save", JSON.stringify(save))
        }
        SESSION_CLEANER(keys_to_clear1)
        window.location.href = BASEURL + LANG + "/loby";
    });
  });
};
