import { useEffect } from "react";
import Spray from "./Spray";
import MEMORY from "../../../store/manager";

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
  useEffect(() => {
    // const img = new Image();
    // img.onload = () => {
    //   try {
    //     setTimeout(() => {
    //       document.getElementById("bc").style.opacity = 1;
    //     }, 500);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // img.src = bc_data.img;

    packs.map((pack , i) => {
      // if (pack.url == undefined || pack.url == null) {
      //   // bc_data.style = { display: "none" };
      //   document.getElementById(`spray-${i}`).style.opacity = 0; 
      //   setTimeout(() => {
      //     document.getElementById(`spray-${i}`).style.display = "none";
      //   }, 300);
      // } else if (pack.url == "same") {
      //   // pack = MEMORY.get("bc");
      // } else {
      //   // MEMORY.set("bc", { img: bc_data.img, style: bc_data.style });
      // }
    });
  }, [sp_data]);

  const create_sprays = () => {
    const elem = [];
    for (let i = 0; i < MAX_SPRAYS; i++) {
      elem.push(
        <div className="sp-cont-ins" id={`spray-${i}`}>
          <Spray id={i} data ={packs[i]}></Spray>
        </div>
      );
    }

    return elem
  };
  return (
    <>
      <div>
        {sp_data.type == "basic" ? (
          <>
            {/* <div className="sp-cont-ins">
              <Spray></Spray>
            </div>
            <div className="sp-cont-ins">
              <Spray></Spray>
            </div> */}
            {create_sprays()}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
