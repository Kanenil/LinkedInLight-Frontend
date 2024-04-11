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
import {useQueries} from "@tanstack/react-query";
import React, {useRef, useState} from "react";
import {useDebounceCallback} from "usehooks-ts";
import Modal from "../modals/Modal";
import Search from "../modals/search/Search";
import {headerQuery} from "../../../constants/combinedQueries";

const SearchInput = ({onFocus, setIsVisible, setSearch, searchRef}) => {
    const {t} = useTranslation();

    const debounced = useDebounceCallback((val) => {
        setIsVisible(true);
        setSearch(val);
    }, 200);

    return (
        <React.Fragment>
            <div className="ml-10 my-auto relative">
                <input type="text"
                       placeholder={t('header.search')}
                       className="border-[1px] border-[#2D2A33] rounded-xl w-[300px] pl-10 text-xs"
                       ref={searchRef}
                       onChange={e => debounced(e.target.value)}
                       onFocus={onFocus}
                />

                <LoopIcon className="absolute left-4 top-2.5 fill-[#2D2A33] h-3"/>
            </div>
        </React.Fragment>
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
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const searchRef = useRef();

    const onFocus = () => {
        setIsVisible(true);
    }

    return (
        <React.Fragment>
            <Modal isOpen={isVisible} position="mt-16"
                   style={{left: Math.round(searchRef.current?.getBoundingClientRect().left) || 0}}
                   isFixed={true}
                   onClose={() => setIsVisible(false)}>
                <Search search={search}/>
            </Modal>
            <header className="absolute top-0 left-0 z-40 w-full sticky"
                    style={{boxShadow: "0px 2px 6px 0px #24459A33"}}>
                <div className="bg-white flex flex-row justify-center py-2.5">
                    <Link to="/j4y">
                        <Logo className="fill-[#2D2A33] h-10"/>
                    </Link>

                    <SearchInput
                        searchRef={searchRef}
                        onFocus={onFocus}
                        setIsVisible={setIsVisible}
                        setSearch={setSearch}
                    />

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
                        <button className="flex flex-row items-end border-l-2 border-[#24459A73] px-10">
                            <CalculatorIcon className="w-8 h-8 my-auto fill-[#2D2A33]"/>
                            <ArrowDownIcon className="ml-1 w-3.5 fill-[#24459A]"/>
                        </button>

                        <AccountButton/>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}
export default InHeader;