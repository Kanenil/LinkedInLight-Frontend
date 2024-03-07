import logo from "../../assets/logo.svg"
import {Link} from "react-router-dom";
import {routes} from "../../constants/routes";

const Header = () => {
    return (
        <header className="grid grid-cols-2 py-4">
            <div className="mx-auto pr-36">
                <img className="pb-3 border-b-[1px]" src={logo} alt="logo"/>
            </div>
            <ul className="flex gap-[1.875rem] border-t-[1px] ml-[50px]">
                <li className="relative group my-auto">
                    <Link className="text-white text-lg font-normal" to="people">
                        People
                    </Link>
                </li>
                <li className="relative group my-auto">
                    <Link className="text-white text-lg font-normal" to="learning">
                        Learning
                    </Link>
                </li>
                <li className="relative group my-auto">
                    <Link className="text-white text-lg font-normal" to="jobs">
                        Jobs
                    </Link>
                </li>
                <li className="relative group my-auto border-l-2 pl-[30px]">
                    <Link className="text-white text-lg font-normal" to={routes.signIn}>
                        Sign In
                    </Link>
                </li>
                <li className="relative group my-auto">
                    <Link className="text-white text-lg font-bold rounded-full bg-[#2D2A33] py-[8px] px-[15px]" to={routes.signUp}>
                        Sign Up
                    </Link>
                </li>
            </ul>
        </header>
    )
}
export default Header;