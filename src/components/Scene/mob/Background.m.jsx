import { useEffect } from "react";
import { disableScroll } from "../../../assets/scroll_manager";
import MEMORY from "../../../store/manager";
import "../../../style/less/Components/Scene_Background.less";

export default function Background_M({ bc_data }) {
  disableScroll();

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
      <div
        id="bc"
        style={{ "background-image": `url(${bc_data.img})`, ...bc_data.style }}
        className="bc-mob"
      ></div>
    </>
  );
}
