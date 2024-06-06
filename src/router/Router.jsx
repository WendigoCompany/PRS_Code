import { HashRouter, Route, Routes, redirect } from "react-router-dom";
import SCENE from "../pages/Scene";
import DISCLAIM from "../pages/Disclaim";
import Lang_Middleware from "../middleware/Lang.mid";
import Disclaim_Middleware from "../middleware/Disclaim.mid";
import Redirect from "../middleware/Redirect";
import HOME from "../pages/Home";
import Save_Middleware from "../middleware/Save.mid";
import LOBY from "../pages/Loby";
import Token from "../pages/Token";
import GAME from "../pages/Game";

export default function Router() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/:lang/disclaim/"
            element={
              <Lang_Middleware>
                <DISCLAIM />
              </Lang_Middleware>
            }
          ></Route>
          <Route
            path="/:lang/scene/:id"
            element={
              <Lang_Middleware>
                <Disclaim_Middleware>
                  <SCENE />
                </Disclaim_Middleware>
              </Lang_Middleware>
            }
          ></Route>

          <Route
            path="/:lang/home/"
            element={
              <Lang_Middleware>
                <Disclaim_Middleware>
                  <HOME />
                </Disclaim_Middleware>
              </Lang_Middleware>
            }
          ></Route>

          <Route
            path="/:lang/loby/"
            element={
              <Lang_Middleware>
                <Disclaim_Middleware>
                  <Save_Middleware>
                    <LOBY />
                  </Save_Middleware>
                </Disclaim_Middleware>
              </Lang_Middleware>
            }
          ></Route>

          <Route
            path="/:lang/game/:id"
            element={
              <Lang_Middleware>
                <Disclaim_Middleware>
                  <Save_Middleware>
                    <GAME />
                  </Save_Middleware>
                </Disclaim_Middleware>
              </Lang_Middleware>
            }
          ></Route>

          {/* <Route path="/load/:token" element={<Token />}></Route> */}
          <Route path="/load/" element={<Token />}></Route>

          <Route path="*" element={<Redirect to={"en/disclaim/"} />} />
        </Routes>
      </HashRouter>
    </>
  );
}
