import { HashRouter, Route, Routes, redirect } from "react-router-dom";
import SCENE from "../pages/Scene";
import DISCLAIM from "../pages/Disclaim";
import Redirect from "../middleware/Redirect";
import HOME from "../pages/Home";
import LOBY from "../pages/Loby";
import Token from "../pages/Token";
import GAME from "../pages/Game";

export default function Router() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/:lang/disclaim/" element={<DISCLAIM />}></Route>
          <Route path="/:lang/scene/:id" element={<SCENE />}></Route>

          <Route path="/:lang/home/" element={<HOME />}></Route>

          <Route path="/:lang/loby/" element={<LOBY />}></Route>

          <Route path="/:lang/game/:id" element={<GAME />}></Route>

          {/* <Route path="/load/:token" element={<Token />}></Route> */}
          <Route path="/load/" element={<Token />}></Route>

          <Route path="*" element={<Redirect to={"en/disclaim/"} />} />
        </Routes>
      </HashRouter>
    </>
  );
}
