import {Link} from "react-router-dom";
import {routes} from "../../../constants/routes";
import Logo from "../../../elements/shared/Logo";
import {useTranslation} from "react-i18next";

const Header = () => {
    const {t} = useTranslation();

    return (
        <header className="grid grid-cols-2 py-4">
            <div className="mx-auto pr-36">
                <Link to='/'>
                    <Logo className="pb-3 border-b-[1px] fill-white h-16"/>
                </Link>
            </div>
            <ul className="flex gap-[1.875rem] border-t-[1px] ml-[50px]">
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