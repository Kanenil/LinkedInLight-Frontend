import Logo from "../../../elements/shared/Logo";
import {Link} from "react-router-dom";
import BellIcon from "../../../elements/icons/BellIcon";
import HomeIcon from "../../../elements/icons/HomeIcon";
import JobsIcon from "../../../elements/icons/JobsIcon";
import GroupsIcon from "../../../elements/icons/GroupsIcon";
import MessagesIcon from "../../../elements/icons/MessagesIcon";
import AccountButton from "../../../elements/buttons/AccountButton";
import {useQueries} from "@tanstack/react-query";
import React from "react";
import {headerQuery} from "../../../constants/combinedQueries";
import SearchInput from "./SearchInput";
import HeaderModal from "./HeaderModal";
import HeaderProvider, {useHeaderContext} from "../../../providers/HeaderProvider";
import CompanyButton from "../../../elements/buttons/CompanyButton";
import useMobileDetector from "../../../hooks/useMobileDetector";
import Show from "../../../elements/shared/Show";
import classNames from "classnames";

const MobileHeader = ({pendingRequests, unReadMessages}) => {
    const {isComponentVisible: searchEnabled, modal} = useHeaderContext();

    return (
        <>
            <header
                className={classNames("flex flex-row gap-3 px-5 pt-7 pb-4", {
                    "absolute top-0 left-0 z-40 w-full sticky bg-white": searchEnabled && modal === 'search'
                })}
                style={{boxShadow: "0px 2px 6px 0px #24459A33"}}
            >
                <SearchInput/>

                <div className="flex flex-row">
                    <CompanyButton/>

                    <AccountButton/>
                </div>
            </header>
            <nav
                className="fixed flex w-full z-20 flex-row justify-center p-5 gap-10 bottom-0 bg-white"
                style={{boxShadow: "0px 2px 6px 0px #24459A33"}}
            >
                <Link to='/j4y' className="p-2">
                    <HomeIcon className="fill-[#2D2A33] h-5"/>
                </Link>

                <Link to='/j4y/my-network' className="p-2">
                    <GroupsIcon number={pendingRequests?.length > 0 && pendingRequests.length}/>
                </Link>

                <Link to='/j4y/chats' className="p-2">
                    <MessagesIcon number={unReadMessages || null}/>
                </Link>

                <Link to='/j4y' className="p-2">
                    <JobsIcon/>
                </Link>

                <Link to='/j4y' className="p-2">
                    <BellIcon/>
                </Link>
            </nav>
        </>
    )
}

const InHeader = () => {
    const {unReadMessages, pendingRequests} = useQueries({
        queries: headerQuery().map((value) => ({
            ...value
        })),
        combine: (results) => {
            return {
                unReadMessages: results[0].data ?? 0,
                pendingRequests: results[1].data ?? 0
            }
        },
    });

    const {isMobile} = useMobileDetector();


    return (
        <HeaderProvider>
            <HeaderModal/>
            <Show>
                <Show.When isTrue={!isMobile}>
                    <header className="absolute top-0 left-0 z-40 w-full sticky"
                            style={{boxShadow: "0px 2px 6px 0px #24459A33"}}>
                        <div className="bg-white flex flex-row justify-center py-2.5">
                            <Link to="/j4y">
                                <Logo className="fill-[#2D2A33] h-10"/>
                            </Link>

                            <SearchInput/>

                            <div className="flex flex-row justify-end w-[440px] gap-4">
                                <Link to='/j4y' className="p-2">
                                    <HomeIcon/>
                                </Link>

                                <Link to='/j4y/my-network' className="p-2">
                                    <GroupsIcon number={pendingRequests?.length > 0 && pendingRequests.length}/>
                                </Link>

                                <Link to='/j4y' className="p-2">
                                    <JobsIcon/>
                                </Link>

                                <Link to='/j4y/chats' className="p-2">
                                    <MessagesIcon number={unReadMessages || null}/>
                                </Link>

                                <Link to='/j4y' className="p-2">
                                    <BellIcon/>
                                </Link>
                            </div>

                            <div className="flex flex-row ml-10">
                                <CompanyButton/>

                                <AccountButton/>
                            </div>
                        </div>
                    </header>
                </Show.When>

                <Show.Else>
                    <MobileHeader pendingRequests={pendingRequests} unReadMessages={unReadMessages}/>
                </Show.Else>
            </Show>
        </HeaderProvider>
    )
}
export default InHeader;