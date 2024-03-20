import Logo from "../../../elements/shared/Logo";
import {Link} from "react-router-dom";
import ArrowDownIcon from "../../../elements/icons/ArrowDownIcon";

const links = [
    {title: "General", link: "/"},
    {title: "Support", link: "/"},
    {title: "User Agreement", link: "/"},
    {title: "Brand Policy", link: "/"},
    {title: "Privacy Policy", link: "/"},
    {title: "Copyright Policy", link: "/"},
    {title: "Community Guidelines", link: "/"}
]

const AuthFooter = () => {
    return (
        <div className="flex flex-row gap-[30px] justify-center py-3.5">
            <div className="flex flex-row w-36">
                <Logo className="fill-[#2D2A33] h-3.5"/>

                <div className="flex flex-row gap-1 ml-2 items-center">
                    <h4 className="font-light text-[#2D2A33] text-xs">© 2024</h4>
                </div>
            </div>

            {links.map((link, index) => <Link key={`footer-${index}`} className="font-light text-[#2D2A33] text-xs" to={link.link}>{link.title}</Link>)}

            <div className="flex flex-row font-light text-[#2D2A33] text-xs cursor-pointer">
                <span className="pr-2.5">Language</span>

                <ArrowDownIcon className="fill-[#2D2A33] w-3.5"/>
            </div>
        </div>
    )
}
export default AuthFooter;