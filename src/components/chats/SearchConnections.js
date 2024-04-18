import React, {useRef, useState} from "react";
import {useDebounceCallback} from "usehooks-ts";
import {useQuery} from "@tanstack/react-query";
import ChatService from "../../services/chatService";
import useComponentVisible from "../../hooks/useComponentVisible";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";

const SearchConnections = ({selectCallback}) => {
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const [search, setSearch] = useState("");
    const searchRef = useRef();
    const debounced = useDebounceCallback((val) => {
        setIsComponentVisible(!!val);
        setSearch(val);
    }, 1000);
    const connectionsQuery = useQuery({
        queryKey: ['search-connections', search],
        queryFn: ({queryKey}) => ChatService.searchConnections(queryKey[1]),
        select: ({data}) => data,
        staleTime: 1000,
        enabled: !!search
    });

    const onSelect = (val) => {
        setSearch('');
        searchRef.current.value = '';
        selectCallback(val);
    }

    return (
        <div className="mx-auto md:ml-auto flex flex-row gap-4 items-center relative" ref={ref}>
            <h1 className="text-lg font-medium">New message</h1>
            <input
                className="rounded-xl font-light"
                placeholder="Enter name or few names"
                ref={searchRef}
                onChange={e => debounced(e.target.value)}
                onFocus={() => setIsComponentVisible(true)}
            />
            {
                connectionsQuery.data && isComponentVisible && connectionsQuery.data.length > 0 && (
                    <div
                        className="absolute -bottom-12 right-0 bg-gray-300 p-1 border-gray-500 rounded-lg border-[1px] w-[200px] z-20">
                        {
                            connectionsQuery.data.map(user => (
                                <button key={user.id} onClick={() => onSelect(user)}
                                        className="flex flex-row gap-3 w-full text-left rounded-sm text-white font-light font-jost hover:font-semibold hover:underline">
                                    <div className="w-8 h-8 overflow-hidden rounded-full my-auto border-2 border-[#2D2A33]">
                                        <img alt="image" className="object-contain"
                                             src={user.image ? APP_ENV.UPLOADS_URL + "/" + user?.image : defaultImage}/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span>{user.firstName} {user.lastName}</span>
                                        <span>{user.lastPosition}</span>
                                    </div>
                                </button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
export default SearchConnections;