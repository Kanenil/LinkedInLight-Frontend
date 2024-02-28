import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routes} from "../../constants/routes";
import LogIn from "../../pages/general/LogIn";
import SignIn from "../../pages/general/SignIn";
import Home from "../../pages/general/Home";

function App() {
  return (
      <div className="App">
          <div></div>{/*Header*/}
          <BrowserRouter>
              <Routes>
                  <Route path={routes.logIn} element={<LogIn />} />
                  <Route path={routes.signIn} element={<SignIn />} />

                  <Route path="/" element={<Home />} />
              </Routes>
          </BrowserRouter>
          <div></div>{/*Footer*/}
      </div>
  );
}

export default App;
