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

const InHeader = () => {
    return (
        <header style={{boxShadow: "0px 2px 6px 0px #24459A33"}}>
            <div className="flex flex-row justify-center py-2.5">
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

                    <button className="flex flex-row items-end border-l-2 border-[#24459A73] pl-10">
                        <button className="w-8 h-8 overflow-hidden rounded-full my-auto border-2 border-[#2D2A33]">
                            <img alt="image" className="object-contain"
                                 src="https://s3-alpha-sig.figma.com/img/adf3/551d/03f8cffc7cfa03c88b9cc4e171bb507b?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cWJWA~0U7zuLhbYZLyGEF9wbs8sNUmC3yO1638PuEsmQrtfed8TjheV0Ha0GqMf7iG~k84JJVaeLr9r~DPC~C-dV5V93n-cyoxtvykWEl2r38YEx0EHdAuWuxDUQOs7QgfcYJxoaoFy8gB14QIW9F8RzZE5Gos6WmgLlrxdZorZlSXODbL5tbjuWV93TT~F33dLXY-WiQr4vMiB5ECaSntAU8oMDnqZKo5y8qDtuSSZdPDgFx8wiambH799aeSo7ruSfSWmqPrnbMabjMDCU5m8tIwkgD5D1J7oyqa2B~7hOsYIfAGfRIsush18wrB~s1oWrLZnyKvjU1QRq8tp6~w__"/>
                        </button>

                        <ArrowDownIcon className="ml-1 w-3.5 fill-[#24459A]"/>
                    </button>
                </div>
            </div>
        </header>
    )
}
export default InHeader;