import {useAuthorize} from "../../../hooks/authorize";
import {useSelector} from "react-redux";
import {general} from "../../../constants/general";
import {useNavigate} from "react-router";

const Home = () => {
    useAuthorize();

    const navigator = useNavigate();
    const user = useSelector(state => state.CurrentUser);

    const logout = () => {
        localStorage.removeItem(general.token)
        localStorage.removeItem(general.currentUser)
        navigator('/login')
    }

    return (
        <>
            Welcome, {user.firstName} {user.lastName}!
            <button onClick={logout}>Logout</button>
        </>
    )
}
export default Home;