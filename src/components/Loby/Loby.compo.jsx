import { useParams } from "react-router-dom";
import { useDevice } from "../../context/Device";
import User_Bar from "../UserBar/User_Bar";
import Waifus from "../Waifu Card/Waifu";
import "../../style/less/Components/Loby.less"
import money_img from "../../assets/icons/money.png";

export default function Loby_Compo({ data }) {

  const device = useDevice();
  const lang = useParams().lang;

  const save = JSON.parse( sessionStorage.getItem("save"));
  return <div>
    <User_Bar/>
    <div>

    <div class={`ub-money-cont-${device}`}>
      <div>
        <img class={`ub-money-img-${device}`} src={money_img} alt="" />
        <label id="user-money" class={`ub-money-${device}`}>{ save.money }</label>
      </div>
    </div>
  </div>


    <Waifus/>
  </div>;
}

{/* <script setup>
import { useRoute } from "vue-router";
import INIT from "@/components/Loby";
import { computed, ref } from "vue";
import {IS_MOBILE} from "@/router/middewares";
import User_Bar from "@/components/User_Bar/User_Bar.vue";
import WaifuCards from "@/components/Waifu Card/W_Card.vue";

const routes = useRoute().params;
const PAGE_RESO = ref(IS_MOBILE());
const PAGECONTENT = ref({});

const loader = computed(() =>  {
  INIT({ lang: routes.lang }).then((res) => (PAGECONTENT.value = res));
});

window.onresize = () => {
  PAGE_RESO.value = IS_MOBILE();
};

const save = sessionStorage.getItem("save");

if(save == null){
  window.location.href = `${BASE_URL}/#/${routes.lang}/`;
}


</script>

<template>

  <User_Bar :place="'loby'" :reso="PAGE_RESO"></User_Bar>
  <WaifuCards :lang="routes.lang"></WaifuCards>
  {{ loader }}
</template>

<style lang="less">

</style> */}
