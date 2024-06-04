import { HashRouter, Route, Routes , redirect } from "react-router-dom";
import SCENE from "../pages/Scene";
import DISCLAIM from "../pages/Disclaim";
import Lang_Middleware from "../middleware/Lang.mid";
import Disclaim_Middleware from "../middleware/Disclaim.mid";
import Redirect from "../middleware/Redirect";
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

          <Route path="*" element={<Redirect to={"en/disclaim/"}/>} />
        </Routes>
      </HashRouter>
    </>
  );
}
