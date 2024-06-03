import { useEffect } from "react";
import MEMORY from "../../../store/manager";
import "../../../style/less/Components/Scene_Background.less";
import { enableScroll } from "../../../assets/scroll_manager";

export default function Background_D({ bc_data }) {
enableScroll()

  if (bc_data.img == undefined || bc_data.img == null) {
    bc_data.style = { display: "none" };
  } else if (bc_data.img == "same") {
    bc_data = MEMORY.get("bc");
  } else {
    MEMORY.set("bc", { img: bc_data.img, style: bc_data.style });
  }

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("bc").style.opacity = 1;
    }, 500);
  }, [bc_data.img]);


  


  return (
    <>
      <h3 className="bc-desk-cont">
        <img id="bc" className="bc-desk" src={bc_data.img} style={{ ...bc_data.style }} alt="" />
      </h3>
    </>
  );
}
