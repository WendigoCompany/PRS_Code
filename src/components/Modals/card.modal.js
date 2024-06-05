import money_img from "../../assets/icons/money.png";
import prev_img from "../../assets/icons/left_arrow.png";
import next_img from "../../assets/icons/right_arrow.png";
import Swal from "sweetalert2";
import { INIT_WCard } from "./modals.init";

import CHARACTERS from "../../characters/init";
import { BASEURL } from "../../assets/page_importants";

let TEXT;
let lang = "";

const START_GAME = (WAIFU_ID, COSTUME_ID, device) => {
  const WAIFU = CHARACTERS.filter((char) => char.id == WAIFU_ID)[0];
  const WAIFU_NAME = WAIFU.s_name;
  const COSTUME_NAME = WAIFU[lang].customes.filter(
    (cos) => cos.id == COSTUME_ID
  )[0].txt;

  let subtitle;
  subtitle = TEXT.game.stitle.replace("@WAIFU@", WAIFU_NAME);
  subtitle = subtitle.replace("@COSTUME@", COSTUME_NAME);

  Swal.fire({
    title: TEXT.game.title,
    text: subtitle,
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: TEXT.game.conf_btn,
    cancelButtonText: TEXT.game.cl_btn,
    customClass: {
      title: "txt-sw2",
      htmlContainer: "basic-label",
      popup: `pop-costu`,
      confirmButton: "btn-sw2-confirm",
      cancelButton: "btn-sw2-cancel",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href =
        BASEURL + lang + "/game/" + `${WAIFU_ID}-${COSTUME_ID}`;
    } else {
      card_modal_show(lang, WAIFU, device);
    }
  });
};

const BUY_COSTUME = (WAIFU_ID, COSTUME_ID, device) => {
  const save = JSON.parse(sessionStorage.getItem("save"));

  const WAIFU = CHARACTERS.filter((char) => char.id == WAIFU_ID)[0];
  const WAIFU_NAME = WAIFU.s_name;
  const COSTUME_NAME = WAIFU[lang].customes.filter(
    (cos) => cos.id == COSTUME_ID
  )[0].txt;

  let subtitle;
  subtitle = TEXT.buy.stitle.replace("@WAIFU@", WAIFU_NAME);
  subtitle = subtitle.replace("@COSTUME@", COSTUME_NAME);

  Swal.fire({
    title: TEXT.buy.title,
    text: subtitle,
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: TEXT.buy.conf_btn,
    cancelButtonText: TEXT.buy.cl_btn,
    customClass: {
      title: "txt-sw2",
      htmlContainer: "basic-label",
      popup: `pop-costu`,
      confirmButton: "btn-sw2-confirm",
      cancelButton: "btn-sw2-cancel",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      if (save.money > 1) {
        save.money -= 1;
        const index = save.waifus.indexOf(
          save.waifus.filter((w) => w.id == WAIFU.id)[0]
        );

        if (index == -1) {
          save.waifus.push({
            id: WAIFU.id,
            costumes: [COSTUME_ID],
          });
        } else {
          save.waifus[index].costumes.push(COSTUME_ID);
        }
        sessionStorage.setItem("save", JSON.stringify(save));
        document.getElementById("user-money").textContent = save.money;
        card_modal_show(lang, WAIFU, device);
      } else {
        Swal.fire({
          title: "Error",
          text: TEXT.buy.error,
          showCancelButton: false,
          confirmButtonText: "OK",
          customClass: {
            title: "txt-sw2",
            htmlContainer: "basic-label",
            popup: `pop-costu`,
            confirmButton: "btn-sw2-confirm",
            cancelButton: "btn-sw2-cancel",
          },
        }).then(() => {
          card_modal_show(lang, WAIFU, device);
        });
      }
    } else {
      card_modal_show(lang, WAIFU, device);
    }
  });
};

const CREATE_COSTUME_CARD = (COSTUME, WAIFU_ID, device) => {
  const save = JSON.parse(sessionStorage.getItem("save"));

  const costume_container = document.createElement("div");
  costume_container.className = `d-inbl costu-cont-${device}`;

  const costume_name = document.createElement("label");
  costume_name.className = `costu-labelname-${device}`;
  costume_name.textContent = COSTUME.txt;

  const costume_img = document.createElement("img");
  costume_img.className = `costu-img-${device}`;
  costume_img.src = COSTUME.img;

  const costume_cost_icon = document.createElement("img");
  costume_cost_icon.className = `costu-money-${device}`;
  costume_cost_icon.src = money_img;

  const costume_cost = document.createElement("label");
  costume_cost.className = `costu-labmoney-${device}`;
  costume_cost.textContent = 1;

  costume_container.append(costume_img);
  costume_container.append(costume_name);
  costume_container.append(costume_cost_icon);
  costume_container.append(costume_cost);

  let found = save.waifus.filter((w) => w.id == WAIFU_ID)[0];

  if (found != undefined) {
    found = found.costumes.filter((cos) => cos == COSTUME.id)[0];
  }

  if (COSTUME.id == 0 || found != undefined) {
    costume_cost_icon.style.opacity = 0;
    costume_cost.style.opacity = 0;
    costume_img.onclick = () => {
      START_GAME(WAIFU_ID, COSTUME.id, device);
    };
  } else {
    costume_img.onclick = () => {
      BUY_COSTUME(WAIFU_ID, COSTUME.id, device);
    };
  }

  return costume_container;
};

const BUILD_COSTUMES = (page = 0, COSTUMES, WAIFU_ID, device) => {
  const container = document.getElementById("costumes-cont");
  container.textContent = "";
  for (let i = 0; i < COSTUMES.length; i++) {
    if (Math.floor(i / 3) == page) {
      container.append(CREATE_COSTUME_CARD(COSTUMES[i], WAIFU_ID, device));
    }
  }
};

export const card_modal_show = (LANG, CHARACTER, device) => {
  let pag = 0;

  INIT_WCard({ lang: LANG }).then((txt) => {
    const lang_data = CHARACTER[LANG].customes;
    TEXT = txt;
    lang = LANG;

    Swal.fire({
      html: `
     <div>
     <h1 class="txt-sw2">${CHARACTER.name} [ <a href="${CHARACTER.l_model}">${CHARACTER.c_model}</a> ]</h1>
   </div>
   <br>
 
   <div >
     <label class="txt-sw2" for="">${TEXT.stitle}</label>
   </div>
   <br>
   <div>
 
 
 
   <div id="costumes-cont">
   </div>
 
   </div>
   <br>
   <div>
     <button class="costu-btn-${device}" id="costu-btn-prev"><img class="w-100" src="${prev_img}"/></button>
     <button class="costu-btn-${device}" id="costu-btn-next"><img class="w-100" src="${next_img}"/></button>
   </div>
       `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: TEXT.cl_btn,

      customClass: {
        title: "txt-sw2",
        popup: `pop-costu pop-costu-${device}`,
        confirmButton: "btn-sw2-confirm",
        cancelButton: "btn-sw2-cancel",
      },
    });

    document.getElementById("costu-btn-prev").onclick = () => {
      if (pag > 0) {
        pag--;
        BUILD_COSTUMES(pag, lang_data, device);
      }
    };

    document.getElementById("costu-btn-next").onclick = () => {
      if (pag < Math.floor(lang_data.length / 3) - 1) {
        pag++;
        BUILD_COSTUMES(pag, lang_data, device);
      }
    };

    BUILD_COSTUMES(pag, lang_data, CHARACTER.id, device);
  });
};
