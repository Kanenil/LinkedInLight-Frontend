import Logo from "../../elements/Logo/Logo";
import {Link} from "react-router-dom";
import ArrowDownIcon from "../../elements/ArrowDownIcon/ArrowDownIcon";
import {
    businessRoutes,
    contactRoutes,
    directoriesRoutes,
    generalRoutes,
    legalRoutes,
    talentRoutes
} from "../../constants/routes";

const InFooter = () => {
    return (
        <footer className="flex flex-col bg-[#E7E7E7]">
            <div className="flex flex-row justify-center gap-7 pt-2.5 pb-2">
                <div className="py-7 ml-4">
                    <Logo className="fill-[#606161] h-16"/>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="text-[#606161] font-raleway">
                        <h1 className="text-lg font-bold">About</h1>

                        <h3 className="mt-1">About <span className="font-medium">Job for You</span></h3>
                    </div>

                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">General</h1>

                        {generalRoutes.map((route, index) =>
                            <Link key={`generalRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">Business Solutions</h1>

                        {businessRoutes.map((route, index) =>
                            <Link key={`businessRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">Talent</h1>

                        {talentRoutes.map((route, index) =>
                            <Link key={`talentRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5">
                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">Business Solutions</h1>

                        {directoriesRoutes.map((route, index) =>
                            <Link key={`directoriesRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>
                </div>

                <div className="pt-8 px-4 pb-2.5 flex flex-col gap-4">
                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">Contact</h1>

                        {contactRoutes.map((route, index) =>
                            <Link key={`contactRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>

                    <div className="text-[#606161] font-raleway flex flex-col gap-1">
                        <h1 className="text-lg font-bold">Legal</h1>

                        {legalRoutes.map((route, index) =>
                            <Link key={`legalRoutes-${index}`} to={route.route}>{route.name}</Link>
                        )}
                    </div>

                    <div className="flex flex-row text-[#606161] font-medium cursor-pointer">
                        <span className="pr-2.5">Language</span>

                        <ArrowDownIcon className="fill-[#606161] w-5"/>
                    </div>
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