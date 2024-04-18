import {Link} from "react-router-dom";
import {routes} from "../../../constants/routes";
import Logo from "../../../elements/shared/Logo";
import {useTranslation} from "react-i18next";
import UserSignInIcon from "../../../elements/icons/UserSignInIcon";
import BurgerMenuIcon from "../../../elements/icons/BurgerMenuIcon";

const Header = () => {
    const {t} = useTranslation();

    return (
        <header className="flex flex-row sm:mx-auto md:mx-auto sm:container md:w-[1170px] md:px-1.5 py-4 px-5 md:pl-5">
            <Link to='/'>
                <Logo className="pb-3 mr-auto border-b-[1px] fill-white h-10 md:h-16"/>
            </Link>
            <div className="flex flex-row gap-4 ml-auto md:hidden">
                <Link className="text-white text-lg font-bold rounded-full bg-[#2D2A33] hover:bg-[#24459A] py-[8px] px-[15px] transition duration-300 ease-in-out" to="/auth">
                    <UserSignInIcon className="fill-white h-6"/>
                </Link>
                <button>
                    <BurgerMenuIcon className="fill-white h-6"/>
                </button>
            </div>
            <ul className="hidden md:flex gap-[1.875rem] ml-auto">
                <div className="absolute md:w-[63vw] lg:w-[45vw] h-[1px] bg-white right-0"></div>
                <li className="relative group my-auto">
                    <Link className="text-white text-lg font-normal" to="people">
                        {t('header.People')}
                    </Link>
                </li>
                <li className="relative group my-auto">
                    <Link className="text-white text-lg font-normal" to="learning">
                        {t('header.Learning')}
                    </Link>
                </li>
                <li className="relative group my-auto">
                    <Link className="text-white text-lg font-normal" to="jobs">
                        {t('header.Jobs')}
                    </Link>
                </li>
                <li className="relative group my-auto border-l-2 pl-[30px]">
                    <Link className="text-white text-lg font-normal" to={routes.signIn}>
                        {t('header.SignIn')}
                    </Link>
                </li>
                <li className="relative group my-auto">
                    <Link className="text-white text-lg font-bold rounded-full bg-[#2D2A33] hover:bg-[#24459A] py-[8px] px-[15px] transition duration-300 ease-in-out" to={routes.signUp}>
                        {t('header.SignUp')}
                    </Link>
                </li>
            </ul>
        </header>
    )
}
export default Header;