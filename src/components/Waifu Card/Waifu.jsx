import CHARACTERS from "../../characters/init";
import Waifu_Card from "./Waifu_Card";
import "../../style/less/Components/Modals/Card.less"

export default function Waifus(){

    const build_waifu_cards =()=>{
        const elem =[];

        CHARACTERS.map(char => {
            elem.push(<Waifu_Card CHAR={char} />)
        })

        return elem
    }
    return <div>
        {build_waifu_cards()}
    </div>
}