import { getActorColor } from "../../../assets/actor_color";
import { useDevice } from "../../../context/Device";

export default function DialogBox_M({ tx_data }) {
  const device = useDevice();

  const TEXT_COMPONENT = () => {
    if (tx_data != undefined) {
      return (
        <>
          <h3 className={`txt-name-${device}`} style={{color : getActorColor(tx_data.name)}}>{tx_data.name}</h3>
          <p className={`txt-dialog-${device}`}>{tx_data.dialog}</p>
        </>
      );
    }
  };


  return (
    <>
      <div
      className={`txtbox`}
        style={{
          opacity: tx_data == undefined ? 0 : 1,
        }}
      >
        {TEXT_COMPONENT()}
      </div>
    </>
  );
}
