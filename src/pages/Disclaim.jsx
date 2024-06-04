import { useEffect, useState } from "react";
import INIT from "../inits/Disclaim.init";
import {  useParams } from "react-router-dom";
import Disclaim_Compo from "../components/Disclaim/Disclaim.compo";


const DATA ={};

export default function DISCLAIM() {
  const [loaded, setLoaded] = useState(false);
  const params = useParams();
  useEffect(() => {
    INIT({ lang: params.lang }).then((resp) => {
      DATA.global = resp;
      setLoaded(true);
    });
  }, []);

  return <>{
    loaded ? <Disclaim_Compo data={DATA}/> : ""
  }</>
}
