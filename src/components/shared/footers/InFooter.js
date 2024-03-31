import Logo from "../../../elements/shared/Logo";
import {Link} from "react-router-dom";
import LanguageSelector from "../../../elements/shared/LanguageSelector";
import {useTranslation} from "react-i18next";

const InFooter = () => {
    const { t } = useTranslation();

    const generalRoutes = t("footer.generalRoutes", { returnObjects: true });
    const businessRoutes = t("footer.businessRoutes", { returnObjects: true });
    const talentRoutes = t("footer.talentRoutes", { returnObjects: true });
    const directoriesRoutes = t("footer.directoriesRoutes", { returnObjects: true });
    const contactRoutes = t("footer.contactRoutes", { returnObjects: true });
    const legalRoutes = t("footer.legalRoutes", { returnObjects: true });

    return (
        <footer className="flex flex-col bg-[#E7E7E7]">
            <div className="flex flex-row justify-center gap-7 pt-2.5 pb-2">
                <div className="py-7 ml-4">
                    <Logo className="fill-[#606161] h-16"/>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="text-[#606161] font-raleway">
                        <h1 className="text-lg font-bold">{t('footer.aboutUs')}</h1>

                        <h3 className="mt-1">{t('footer.about')} <span className="font-medium">Job for You</span></h3>
                    </div>

                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.general')}</h1>

                        {generalRoutes.map((route, index) =>
                            <Link key={`generalRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.business')}</h1>

                        {businessRoutes.map((route, index) =>
                            <Link key={`businessRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.talent')}</h1>

                        {talentRoutes.map((route, index) =>
                            <Link key={`talentRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5">
                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.directories')}</h1>

                        {directoriesRoutes.map((route, index) =>
                            <Link key={`directoriesRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.contact')}</h1>

                        {contactRoutes.map((route, index) =>
                            <Link key={`contactRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.legal')}</h1>

                        {legalRoutes.map((route, index) =>
                            <Link key={`legalRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <LanguageSelector fill="[#606161]" text="[#606161]"/>
                </div>
            </div>

            <div className="bg-white">
                <div className="flex gap-2.5 justify-center items-center my-1 py-0.5 text-[#606161] text-sm">
                    <span>©</span>
                    <span>2024</span>
                    <Logo className="fill-[#606161] h-4"/>
                </div>
            </div>
        </footer>
    )
}
export default InFooter;