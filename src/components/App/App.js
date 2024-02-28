import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routes} from "../../constants/routes";
import LogIn from "../../pages/general/LogIn";
import SignIn from "../../pages/general/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path={routes.logIn} element={<LogIn />} />
          <Route path={routes.signIn} element={<SignIn />} />

          <Route path="/" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
