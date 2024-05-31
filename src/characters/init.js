import KurumiTokisaki from "./Kurumi_Tokisaki/params.json";
import Korra from "./Korra/params.json";

import KurumiTokisaki_costumes_en from "./Kurumi_Tokisaki/en/costumes.json";
import KurumiTokisaki_costumes_sp from "./Kurumi_Tokisaki/sp/costumes.json";

import Korra_costumes_en from "./Kurumi_Tokisaki/en/costumes.json";
import Korra_costumes_sp from "./Kurumi_Tokisaki/sp/costumes.json";

export default [
  {
    ...KurumiTokisaki,
    en: KurumiTokisaki_costumes_en,
    sp: KurumiTokisaki_costumes_sp,
  },
  {
    ...Korra,
    en: Korra_costumes_en,
    sp: Korra_costumes_sp,
  },
];
