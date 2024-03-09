import {BrowserRouter, Route, Routes} from "react-router-dom";
import {routes} from "../../constants/routes";
import Profile from "../../pages/user/Profile";
import Home from "../../pages/general/Home";
import Layout from "../Layout/Layout";
import SignUp from "../../pages/general/SignUp";
import SignIn from "../../pages/general/SignIn";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path='profile' element={<Profile/>}/>

                        <Route index element={<Home/>}/>
                    </Route>

                    <Route path={routes.signUp} element={<SignUp/>}/>
                    <Route path={routes.signIn} element={<SignIn/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;
