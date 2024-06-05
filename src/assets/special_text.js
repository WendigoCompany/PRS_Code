export const prepare_special_text = (text, device) => {
    const arr = text.split("<br>");
    const elemets = [];
  
    arr.map((tx) => {
      elemets.push(<p className={`text-${device} t-center`}>{tx}</p>);
    });
  
    return elemets;
  };