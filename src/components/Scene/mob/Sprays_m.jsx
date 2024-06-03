import { useEffect } from "react";
import Spray from "./Spray";
import MEMORY from "../../../store/manager";
import AnimationComponent from "./Animation";

const MAX_SPRAYS = 3;

export default function Sprays_M({ sp_data }) {
  // const packs = [];

  // const prepare_image = (img) => {
  //   if (Array.isArray(img.img)) {
  //     img.img.map((wim, i) => {
  //       packs[parseInt(img.tags[i]) - 1] = {
  //         url: img.img[i],
  //         style: img.style[i],
  //       };
  //     });
  //   } else {
  //   }
  // };

  // prepare_image(sp_data);

  // const show_sprays =()=>{
  //   const elements = [];
  //   packs.map(pack => {

  //   })
  // }

  const packs = MEMORY.get("sp");


  const SPRAY_COMPONENT = () => {
    if (sp_data.type == "basic") {
      return <>{create_sprays()}</>;
    }else if(sp_data.type == "anima"){
      return <><AnimationComponent sp_data={sp_data}/></>;
    }
  };



  const create_sprays = () => {
    const elem = [];
    for (let i = 0; i < MAX_SPRAYS; i++) {
      elem.push(
        <div className="sp-cont-ins" id={`spray-${i}`}>
          <Spray id={i} data={packs[i]}></Spray>
        </div>
      );
    }

    return elem;
  };
  return (
    <>
  {SPRAY_COMPONENT()}
    </>
  );
}
