import home_img from "../../assets/icons/home.png";
import save_img from "../../assets/icons/save.png";
import load_img from "../../assets/icons/load.png";

import User_Button from "./User_Button";
import "../../style/less/Components/User_Bar.less";
import { load_game_modal } from "../Modals/loadGame.modal";
import { save_game_modal } from "../Modals/save.modal";
import { home_modal } from "../Modals/home.modal";

import { useParams } from "react-router-dom";


export default function User_Bar() {
const lang = useParams().lang;

  const buttons = [
    {
      image: home_img,
      cb: home_modal,
      params: lang
    },
    {
      image: save_img,
      cb: save_game_modal,
      params: lang
    },
    {
      image: load_img,
      cb: load_game_modal,
      params: lang
    },
  ];

  const create_buttons = (buttons) => {
    const elem = [];

    buttons.map((btn) => {
      elem.push(
        <User_Button cb={btn.cb} params={btn.params} image={btn.image} />
      );
    });

    return elem;
  };
  return <div>{create_buttons(buttons)}</div>;
}

{
  /* <script setup>
import Button from "./Button.vue/";
const props = defineProps({
  place: String,
  reso: String,
});

import home_img from "@/assets/icons/home.png";
import save_img from "@/assets/icons/save.png";
import load_img from "@/assets/icons/load.png";
import back_img from "@/assets/icons/back.png";
import money_img from "@/assets/icons/money.png";
import { save_game_modal } from "../Modals/save.modal";

const components = [
  ["home", home_img],
  [save_game_modal, save_img],
  ["load", load_img],
];
if (props.place == "game") {
  components.push(["back", back_img]);
}

const save =  JSON.parse(sessionStorage.getItem("save"));

</script>

<template>
  <div>
    <template v-for="btn in components">
      <Button :img="btn[1]" :action="btn[0]" :reso="reso"></Button>
    </template>
  </div>

  <div>
    <div :class="`ub-money-cont-${reso}`">
      <div>
        <img :class="`ub-money-img-${reso}`" :src="money_img" alt="" />
        <h3 :class="`ub-money-${reso}`">{{ save.money }}</h3>
      </div>
    </div>
  </div>


</template>

<style lang="less">
@import "@/style/less/Components/User_Bar.less";
@import "@/style/less/Components/Modals/LoadModal.less";
</style> */
}
