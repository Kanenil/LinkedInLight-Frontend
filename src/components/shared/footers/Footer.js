import Logo from "../../../elements/shared/Logo";
import {Link} from "react-router-dom";
import LanguageSelector from "../../../elements/shared/LanguageSelector";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    const generalRoutes = t("footer.generalRoutes", { returnObjects: true });
    const businessRoutes = t("footer.businessRoutes", { returnObjects: true });
    const talentRoutes = t("footer.talentRoutes", { returnObjects: true });
    const directoriesRoutes = t("footer.directoriesRoutes", { returnObjects: true });
    const contactRoutes = t("footer.contactRoutes", { returnObjects: true });
    const legalRoutes = t("footer.legalRoutes", { returnObjects: true });

    return (
        <footer className="flex flex-col" style={{background: "linear-gradient(90deg, rgba(88, 83, 89, 0.6) 0%, rgba(45, 42, 51, 0.8) 100%)"}}>
            <div className="hidden md:flex md:flex-row md:flex-wrap md:justify-center md:gap-7 md:pt-2.5 pb-2">
                <div className="py-7 ml-4 h-fit -order-1">
                    <Logo className="fill-white h-16 pb-5 border-b-[1px] border-white"/>
                </div>


                <div className="block md:hidden pt-8 px-4 pb-2.5 order-1">
                    <div className="text-white font-raleway">
                        <h1 className="text-lg font-bold">{t('footer.aboutUs')}</h1>

                        <h3 className="mt-1">{t('footer.about')} <span className="font-medium">Job for You</span></h3>
                    </div>
                </div>


                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4 order-2">
                    <div className="hidden md:block text-white font-raleway">
                        <h1 className="text-lg font-bold">{t('footer.aboutUs')}</h1>

                        <h3 className="mt-1">{t('footer.about')} <span className="font-medium">Job for You</span></h3>
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.general')}</h1>

                        {generalRoutes.map((route, index) =>
                            <Link key={`generalRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4 order-4">
                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.business')}</h1>

                        {businessRoutes.map((route, index) =>
                            <Link key={`businessRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.talent')}</h1>

                        {talentRoutes.map((route, index) =>
                            <Link key={`talentRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5 order-3">
                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.directories')}</h1>

                        {directoriesRoutes.map((route, index) =>
                            <Link key={`directoriesRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="block md:hidden pt-8 px-4 pb-2.5 order-6">
                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.contact')}</h1>

                        {contactRoutes.map((route, index) =>
                            <Link key={`contactRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4 order-5">
                    <div className="hidden md:block text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.contact')}</h1>

                        {contactRoutes.map((route, index) =>
                            <Link key={`contactRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.legal')}</h1>

                        {legalRoutes.map((route, index) =>
                            <Link key={`legalRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <LanguageSelector/>
                </div>
            </div>

            <div className="grid grid-cols-2 md:hidden px-4 pb-2">
                <div className="pt-7 ml-4 h-fit">
                    <Logo className="fill-white h-16 pb-5 border-b-[1px] border-white"/>
                </div>

                <div className="block md:hidden pt-8 px-4 pb-2.5">
                    <div className="text-white font-raleway">
                        <h1 className="text-lg font-bold">{t('footer.aboutUs')}</h1>

                        <h3 className="mt-1">{t('footer.about')} <span className="font-medium">Job for You</span></h3>
                    </div>
                </div>


                <div className="pt-3 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="hidden md:block text-white font-raleway">
                        <h1 className="text-lg font-bold">{t('footer.aboutUs')}</h1>

                        <h3 className="mt-1">{t('footer.about')} <span className="font-medium">Job for You</span></h3>
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.general')}</h1>

                        {generalRoutes.map((route, index) =>
                            <Link key={`generalRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.business')}</h1>

                        {businessRoutes.map((route, index) =>
                            <Link key={`businessRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.talent')}</h1>

                        {talentRoutes.map((route, index) =>
                            <Link key={`talentRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.contact')}</h1>

                        {contactRoutes.map((route, index) =>
                            <Link key={`contactRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-3 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.directories')}</h1>

                        {directoriesRoutes.map((route, index) =>
                            <Link key={`directoriesRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <div className="hidden md:block text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.contact')}</h1>

                        {contactRoutes.map((route, index) =>
                            <Link key={`contactRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">{t('footer.legal')}</h1>

                        {legalRoutes.map((route, index) =>
                            <Link key={`legalRoutes-${index}`} to={route.url}>{route.name}</Link>
                        )}
                    </div>

                    <LanguageSelector/>
                </div>
            </div>


            <div className="bg-[#2D2A33]">
                <div className="flex gap-2.5 justify-center items-center my-1 py-0.5 text-white text-sm">
                    <span>©</span>
                    <span className="font-medium">2024</span>
                    <Logo className="fill-white h-4"/>
                </div>
            </div>
        </footer>
    )
}
export default Footer;