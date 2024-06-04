import { useLocation, useParams } from "react-router-dom";
import { useDevice } from "../../context/Device";
import { BASEURL } from "../../assets/page_importants";
import "../../style/less/Components/Disclaim.less"


export default function Disclaim_Compo({ data }) {
  const device = useDevice();
  let origin
  const params = useParams();
   try {
    origin = sessionStorage.getItem("origin").substring(1);
   } catch (error) {
    origin = BASEURL + params.lang + "/home";
   }

  const YES = () => {
    sessionStorage.setItem("disclaim", "");
    sessionStorage.removeItem("origin");
    window.location.href = BASEURL + origin;
  };

  const NO = () => {
    window.location.href = "https://www.google.com/";
  };

  return (
    <div>
      <h1 class={`title-${device}`}>DISCLAIM</h1>

      <div>
      <p class={`text-${device} t-center`}>{data.global.text}</p>
      </div>

      <div class={`btn-cont-${device} t-center`}>
        <button
          onClick={YES}
          class={`btn-success btn-page-${device}`}
        >
          {data.global.yes_button}
        </button>
        <button
          onClick={NO}
          class={`btn-danger btn-page-${device}`}
        >
          {data.global.no_button}
        </button>
      </div>
    </div>
  );
}

{
  /* <script setup>
import { useRoute } from "vue-router";
import INIT from "@/components/Disclaim/";
import { computed, ref } from "vue";
import { IS_MOBILE , } from "@/router/middewares";
import { BASE_URL } from "@/router/routes.params";


const routes = useRoute().params;
const device = ref(IS_MOBILE());
const data.global = ref({});

const loader = computed(() => {
  INIT({ lang: routes.lang }).then((res) => (data.global.value = res));
});

window.onresize = () => {
  device.value = IS_MOBILE();
};

const origin = sessionStorage.getItem("origin") || `/#/${routes.lang}/`;


const YES =()=>{
  sessionStorage.setItem("disclaim", "")  
   window.location.href = BASE_URL + origin;
   sessionStorage.removeItem("origin")
}


const NO =()=>{
 window.location.href = "https://www.google.com/";
}
</script>

<template>
  <h1 :class="`title-${device}`">DISCLAIM</h1>
  <p :class="`text-${device} text-center`">{{ data.global.text }}</p>

  <div :class="`btn-cont-${device} text-center`">
    <button @click="YES()" :class="`btn btn-outline-success btn-page-${device}`">
      {{ data.global.yes_button }}
    </button>
    <button @click="NO()" :class="`btn btn-outline-danger btn-page-${device}`">
      {{ data.global.no_button }}
    </button>
  </div>
  {{ loader }}
</template>

<style lang="less">
@import "@/style/less/Components/Disclaim.less";
</style> */
}
