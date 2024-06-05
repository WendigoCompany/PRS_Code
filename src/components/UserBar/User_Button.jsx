import { useDevice } from "../../context/Device";

export default function User_Button({image , cb , params={}}) {

    const device = useDevice();


  return (
    <>
      <button class={`ub-btn-${device}`} onClick={() => {cb(params)}}>
        <img class="w-100" src={image} alt="" />
      </button>
    </>
  );
}



