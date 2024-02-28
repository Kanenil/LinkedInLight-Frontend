import {useAuthorize} from "../../../hooks/authorize";
import {useSelector} from "react-redux";

const Home = () => {
    useAuthorize();

    const user = useSelector(state => state.CurrentUser);

    console.log(user)

    return (
        <>Welcome, {user.firstName} {user.lastName}!</>
    )
}
export default Home;