import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routes} from "../../constants/routes";
import LogIn from "../../pages/general/LogIn";
import SignIn from "../../pages/general/SignIn";
import Profile from "../../pages/user/Profile";
import Home from "../../pages/general/Home";
import Layout from "../Layout/Layout";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path={routes.logIn} element={<LogIn/>}/>
                        <Route path={routes.signIn} element={<SignIn/>}/>
                        <Route path='profile' element={<Profile/>}/>

                        <Route index element={<Home/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
