import Logo from "../../elements/Logo/Logo";
import LoopIcon from "../../elements/LoopIcon/LoopIcon";
import {Link} from "react-router-dom";
import BellIcon from "../../elements/BellIcon/BellIcon";
import HomeIcon from "../../elements/HomeIcon/HomeIcon";
import JobsIcon from "../../elements/JobsIcon/JobsIcon";
import GroupsIcon from "../../elements/GroupsIcon/GroupsIcon";
import MessagesIcon from "../../elements/MessagesIcon/MessagesIcon";
import ArrowDownIcon from "../../elements/ArrowDownIcon/ArrowDownIcon";
import CalculatorIcon from "../../elements/CalculatorIcon/CalculatorIcon";
import AccountButton from "../AccountButton/AccountButton";

const InHeader = () => {
    return (
        <header className="absolute top-0 left-0 z-40 w-full sticky" style={{boxShadow: "0px 2px 6px 0px #24459A33"}}>
            <div className="bg-white flex flex-row justify-center py-2.5">
                <Logo className="fill-[#2D2A33] h-10"/>

                <div className="ml-10 my-auto relative">
                    <input type="text" placeholder="Search"
                           className="border-[1px] border-[#2D2A33] rounded-xl w-[300px] pl-10 text-xs"/>

                    <LoopIcon className="absolute left-4 top-2.5 fill-[#2D2A33] h-3"/>
                </div>

                <div className="flex flex-row justify-end w-[440px] gap-4">
                    <Link to='/in' className="p-2">
                        <HomeIcon/>
                    </Link>

                    <Link to='/in' className="p-2">
                        <GroupsIcon/>
                    </Link>

                    <Link to='/in' className="p-2">
                        <JobsIcon/>
                    </Link>

                    <Link to='/in' className="p-2">
                        <MessagesIcon number={1}/>
                    </Link>

                    <Link to='/in' className="p-2">
                        <BellIcon/>
                    </Link>
                </div>

                <div className="flex flex-row ml-10">
                    <button className="flex flex-row items-end border-l-2 border-[#24459A73] px-10">
                        <CalculatorIcon className="w-8 h-8 my-auto fill-[#2D2A33]"/>
                        <ArrowDownIcon className="ml-1 w-3.5 fill-[#24459A]"/>
                    </button>

                    <AccountButton />
                </div>
            </div>
        </header>
    )
}
export default InHeader;