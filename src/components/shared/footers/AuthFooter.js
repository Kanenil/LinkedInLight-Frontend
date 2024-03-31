import Logo from "../../../elements/shared/Logo";
import {Link} from "react-router-dom";
import LanguageSelector from "../../../elements/shared/LanguageSelector";
import {useTranslation} from "react-i18next";

const AuthFooter = () => {
    const { t } = useTranslation();

    const authRoutes = t("footer.authRoutes", { returnObjects: true });

    return (
        <div className="flex flex-row gap-[30px] justify-center py-3.5">
            <div className="flex flex-row w-36">
                <Logo className="fill-[#2D2A33] h-3.5"/>

                <div className="flex flex-row gap-1 ml-2 items-center">
                    <h4 className="font-light text-[#2D2A33] text-xs">© 2024</h4>
                </div>
            </div>

            {authRoutes.map((link, index) => <Link key={`footer-${index}`} className="font-light text-[#2D2A33] text-xs" to={link.url}>{link.name}</Link>)}

            <LanguageSelector fill="[#2D2A33]" text="[#2D2A33]" font="light" className="text-xs" width="3.5"/>
        </div>
    )
}
export default AuthFooter;