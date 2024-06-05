import { useParams } from "react-router-dom";
import { useDevice } from "../../context/Device";
import { card_modal_show } from "../Modals/card.modal";



export default function Waifu_Card({ CHAR }) {

    const device = useDevice();
    const lang = useParams().lang;

    return (
    <>
      <div
      class={`d-inbl card-${device}`}
        onClick={() => {
          card_modal_show(lang, CHAR, device);
        }}
      >
        <img class="w-100 h-100" src={CHAR.imgs.loby_card} alt="" />
      </div>
    </>
  );
}

// <div
//       @click="card_modal_show(lang, CHAR)"
//       :class="`d-inline-block card-${PAGE_RESO}`"
//     >
//       <img class="w-100 h-100" :src="CHAR.imgs.loby_card" alt="" />
//     </div>
