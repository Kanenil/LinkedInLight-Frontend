import {useAuthorize} from "../../../hooks/authorize";

const Home = () => {
    useAuthorize();

    return (
        <>Welcome dear user!</>
    )
}
export default Home;