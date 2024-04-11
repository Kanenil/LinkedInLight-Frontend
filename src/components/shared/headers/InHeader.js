import Logo from "../../../elements/shared/Logo";
import LoopIcon from "../../../elements/icons/LoopIcon";
import {Link} from "react-router-dom";
import BellIcon from "../../../elements/icons/BellIcon";
import HomeIcon from "../../../elements/icons/HomeIcon";
import JobsIcon from "../../../elements/icons/JobsIcon";
import GroupsIcon from "../../../elements/icons/GroupsIcon";
import MessagesIcon from "../../../elements/icons/MessagesIcon";
import ArrowDownIcon from "../../../elements/icons/ArrowDownIcon";
import CalculatorIcon from "../../../elements/icons/CalculatorIcon";
import AccountButton from "../../../elements/buttons/AccountButton";
import {useTranslation} from "react-i18next";
import {useQuery} from "@tanstack/react-query";
import ChatService from "../../../services/chatService";

const InHeader = () => {
    const {t} = useTranslation();
    const {data} = useQuery({
        queryFn: () => ChatService.allUnreadMessages(),
        queryKey: ['allUnreadMessages'],
        select: ({data}) => data,
    })

    return (
        <header className="absolute top-0 left-0 z-40 w-full sticky" style={{boxShadow: "0px 2px 6px 0px #24459A33"}}>
            <div className="bg-white flex flex-row justify-center py-2.5">
                <Link to="/j4y">
                    <Logo className="fill-[#2D2A33] h-10"/>
                </Link>

                <div className="ml-10 my-auto relative">
                    <input type="text" placeholder={t('header.search')}
                           className="border-[1px] border-[#2D2A33] rounded-xl w-[300px] pl-10 text-xs"/>

                    <LoopIcon className="absolute left-4 top-2.5 fill-[#2D2A33] h-3"/>
                </div>

                <div className="flex flex-row justify-end w-[440px] gap-4">
                    <Link to='/j4y' className="p-2">
                        <HomeIcon/>
                    </Link>

                    <Link to='/j4y/my-network' className="p-2">
                        <GroupsIcon/>
                    </Link>

                    <Link to='/j4y' className="p-2">
                        <JobsIcon/>
                    </Link>

                    <Link to='/j4y/chats' className="p-2">
                        <MessagesIcon number={data || null}/>
                    </Link>

                    <Link to='/j4y' className="p-2">
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