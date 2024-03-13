import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";
import SignUp from "../../pages/general/SignUp";
import SignIn from "../../pages/general/SignIn";
import Profile from "../../pages/user/Profile";
import Home from "../../pages/general/Home";
import Layout from "../Layout/Layout";
import Chats from "../../pages/chat/Chats";
import AuthLayout from "../Layout/AuthLayout";
import ConfirmEmail from "../../pages/general/ConfirmEmail";
import InLayout from "../Layout/InLayout";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/in" element={<InLayout/>}>
            <Route index element={<Profile/>}/>

            <Route path="profile" element={<Profile />} />
            <Route path="chats" element={<Chats />} />
          </Route>

          <Route path="/auth" element={<AuthLayout/>}>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="confirm-email" element={<ConfirmEmail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
