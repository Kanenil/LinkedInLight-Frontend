import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";
import SignUp from "../../pages/general/SignUp";
import SignIn from "../../pages/general/SignIn";
import Profile from "../../pages/user/Profile";
import Home from "../../pages/general/Home";
import Layout from "../Layout/Layout";
import Chats from "../../pages/chat/Chats";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="profile" element={<Profile />} />
            <Route path={routes.chats} element={<Chats />} />

            <Route index element={<Home />} />
          </Route>

          <Route path={routes.signUp} element={<SignUp />} />
          <Route path={routes.signIn} element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
