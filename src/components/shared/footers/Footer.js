import Logo from "../../../elements/shared/Logo";
import {
    businessRoutes,
    contactRoutes,
    directoriesRoutes,
    generalRoutes,
    legalRoutes,
    talentRoutes
} from "../../../constants/routes";
import {Link} from "react-router-dom";
import LanguageSelector from "../../../elements/shared/LanguageSelector";

const Footer = () => {
    return (
        <footer className="flex flex-col" style={{background: "linear-gradient(90deg, rgba(88, 83, 89, 0.6) 0%, rgba(45, 42, 51, 0.8) 100%)"}}>
            <div className="flex flex-row justify-center gap-7 pt-2.5 pb-2">
                <div className="py-7 ml-4">
                    <Logo className="fill-white h-16 pb-5 border-b-[1px] border-white"/>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="text-white font-raleway">
                        <h1 className="text-lg font-bold">About</h1>

                        <h3 className="mt-1">About <span className="font-medium">Job for You</span></h3>
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">General</h1>

                        {generalRoutes.map((route, index) =>
                            <Link key={`generalRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">Business Solutions</h1>

                        {businessRoutes.map((route, index) =>
                            <Link key={`businessRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">Talent</h1>

                        {talentRoutes.map((route, index) =>
                            <Link key={`talentRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5">
                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">Business Solutions</h1>

                        {directoriesRoutes.map((route, index) =>
                            <Link key={`directoriesRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">Contact</h1>

                        {contactRoutes.map((route, index) =>
                            <Link key={`contactRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-white font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">Legal</h1>

                        {legalRoutes.map((route, index) =>
                            <Link key={`legalRoutes-${index}`} to={route.route}>{route.name}</Link>
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