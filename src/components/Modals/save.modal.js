// import TOKEN from "@/models/token.model";
// import { INIT_Save } from "./modals.init";

import Swal from "sweetalert2";
// import TOKEN from "../../models/token.model";
import { INIT_Save } from "./modals.init";
import { zip_keys } from "../../models/save.methods";

let token;

export const save_game_modal = (LANG) => {
  INIT_Save({ lang: LANG }).then((TEXT) => {
    Swal.fire({
      title: TEXT.title,

      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: TEXT.ccl_btn,
      html: `

  
      <h3 class="basic-label">
      ${TEXT.text}
      </h3>
      <br/>
      <div>
        <button id="dowload-btn" class="input-modal btn-info">
        ${TEXT.dowload_btn}
        </button>
      </div>

              
              `,

      customClass: {
        title: "txt-sw2",
        popup: "pop-sw2",
        cancelButton: "btn-sw2-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
    // document.getElementById("copy-btn").onclick = ()=> COPY(LANG, TEXT.copy_msj);
    document.getElementById("dowload-btn").onclick = () =>
      DOWLOAD(LANG, TEXT.dowload_msj);
  });
};

// const generate_url = (LANG) => {
//   const URL = new TOKEN();
//   URL.GEN_URL(LANG);
//   return URL.url;
// };

// const COPY = (LANG, MSJ) => {
//   const URL = generate_url(LANG);
//   navigator.clipboard
//     .writeText(URL)
//     .then(() => {

//       Swal.fire({
//         title: MSJ,
//         customClass: {
//           title: "txt-sw2",
//           popup: "pop-sw2",
//           cancelButton: "btn-sw2-cancel",
//         },
//       })

//     })
//     .catch((err) => {
//       console.error("Error!", err);
//     });
// };

const DOWLOAD = (LANG, MSJ) => {
  // const URL = generate_url(LANG);
  let URL = JSON.parse(sessionStorage.getItem("save"));
  const username = URL.name;
  URL.l = LANG;
  URL = zip_keys(URL);
  const filename = username + ".txt";
  const dowload = document.createElement("a");
  dowload.href = "data:text/plain;charset=utf-8," + URL;
  dowload.download = filename;
  document.body.appendChild(dowload);
  dowload.click();
  document.body.removeChild(dowload);
  Swal.fire({
    title: MSJ,
    customClass: {
      title: "txt-sw2",
      popup: "pop-sw2",
      cancelButton: "btn-sw2-cancel",
    },
  });
};
