import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "../../pages/auth/SignUp";
import SignIn from "../../pages/auth/SignIn";
import Profile from "../../pages/profile";
import Home from "../../pages/home";
import Layout from "../shared/layouts/Layout";
import Chats from "../../pages/chat/Chats";
import AuthLayout from "../shared/layouts/AuthLayout";
import ConfirmEmail from "../../pages/auth/ConfirmEmail";
import InLayout from "../shared/layouts/InLayout";
import {HelmetProvider} from "react-helmet-async";

const App = () => {
    return (
        <div className="App">
            <HelmetProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<Home/>}/>
                        </Route>

                        <Route path="/in" element={<InLayout/>}>
                            <Route index element={<Profile/>}/>
                            <Route path="edit/:blockId" element={<Profile/>}/>

                            <Route path="profile" element={<Profile/>}/>
                            <Route path="chats" element={<Chats/>}/>
                        </Route>

                        <Route path="/auth" element={<AuthLayout/>}>
                            <Route path="sign-up" element={<SignUp/>}/>
                            <Route path="sign-in" element={<SignIn/>}/>
                            <Route path="confirm-email" element={<ConfirmEmail/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </HelmetProvider>
        </div>
    );
};

export default App;
