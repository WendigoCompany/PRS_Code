import Swal from "sweetalert2";
import { useDevice } from "../../context/Device";
import { useParams } from "react-router-dom";
import "../../style/less/Components/Home.less"
import { new_game_modal } from "../Modals/newgame.modal";
import { load_game_modal } from "../Modals/loadGame.modal";



export default function Home_Compo({ data }) {
  const device = useDevice();
  const lang = useParams().lang;

  return (
    <div>
        <h1 class={`title-${device}`}>{data.global.title}</h1>

        <div class={`btn-cont-${device}`}>
        <button
          onClick={()=>{
            new_game_modal( lang)
          }}
          class={`btn-out-success btn-page-${device}`}
        >
          {data.global.nwbtn}
        </button>
        <br />
        <button
          onClick={()=>{load_game_modal( lang)}}
          class={`btn-out-warning mat-1 btn-page-${device}`}
        >
          {data.global.loadbtn}
        </button>
      </div> 


      {/* <h1 class="`title-${device}`">{data.global.title}</h1>

      <div class="`btn-cont-${device} text-center`">
        <button
          onClick="new_game_modal( routes.lang)"
          class="`btn btn btn-outline-success btn-page-${device}`"
        >
          {data.global.nwbtn}
        </button>
        <br />
        <button
          onClick="load_game_modal( routes.lang)"
          class="`btn btn btn-outline-warning btn-page-${device}`"
        >
          {data.global.loadbtn}
        </button>
      </div> 
      
      */}
    </div>
  );
}

// <script setup>
// import { useRoute } from "vue-router";
// import INIT from "@/components/Home";
// import { computed, ref } from "vue";
// import { IS_MOBILE } from "@/router/middewares";
// import {load_game_modal  } from "@/components/Modals/loadGame.modal";
// import { new_game_modal} from "@/components/Modals/newgame.modal"
// const routes = useRoute().params;
// const device = ref(IS_MOBILE());
// const data.global = ref({});

// const loader = computed(() => {
//   INIT({ lang: routes.lang }).then((res) => (data.global.value = res));
// });

// window.onresize = () => {
//   device.value = IS_MOBILE();
// };
// </script>

// <template>
//   <h1 :class="`title-${device}`">{{ data.global.title }}</h1>

//   <div :class="`btn-cont-${device} text-center`">
//     <button
//     @click="new_game_modal( routes.lang)"
//     :class="`btn btn btn-outline-success btn-page-${device}`">
//       {{data.global.nwbtn}}
//     </button>
//     <br />
//     <button
//     @click="load_game_modal( routes.lang)"
//     :class="`btn btn btn-outline-warning btn-page-${device}`">
//     {{data.global.loadbtn}}
//     </button>
//   </div>

//   {{ loader }}
// </template>

// <style lang="less">
// @import "@/style/less/Components/Home.less";
// @import "@/style/less/Components/Modals/LoadModal.less";

// </style>
