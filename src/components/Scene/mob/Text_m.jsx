export default function DialogBox_M({ tx_data }) {
  const TEXT_COMPONENT = () => {
    if (tx_data != undefined) {
      return (
        <>
          <h3>{tx_data.name}</h3>
          <p>{tx_data.dialog}</p>
        </>
      );
    }
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          opacity: tx_data == undefined ? 0 : 1,
          zIndex: 100,
          left: "2.5%",
          bottom: "0%",
          width: "95%",
          height: "23%",
          transition: "opacity .3s",
          "background-color": "black",
          "padding-top": ".5%",
          "padding-left": "1%",
        }}
      >
        {TEXT_COMPONENT()}
      </div>
    </>
  );
}
