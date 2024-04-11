import {useQuery} from "@tanstack/react-query";
import SearchService from "../../../../services/searchService";
import Show from "../../../../elements/shared/Show";
import useOverflow from "../../../../hooks/useOverflow";
import {APP_ENV} from "../../../../env";
import defaultImage from "../../../../assets/default-image.jpg";
import {Link} from "react-router-dom";
import React, {forwardRef} from "react";

const Search = forwardRef(({search, setIsComponentVisible}, ref,) => {
    const {data} = useQuery({
        queryKey: ['search', search],
        queryFn: ({queryKey}) => SearchService.search(queryKey[1]),
        select: ({data}) => data,
        staleTime: 1000,
        enabled: !!search
    });
    const {contentRef, containerRef, isOverflow} = useOverflow();

    const {userList, companyList} = data ?? {};

    return (
        <div className="flex flex-col w-[350px]"
             ref={ref}
             style={{boxShadow: "0px 0px 8px 2px #00000066"}}>
            <div id="container" ref={containerRef} className={`max-h-[300px] overflow-x-hidden overflow-y-${isOverflow ? 'scroll' : 'hidden'}`}>
                <div ref={contentRef} className="flex flex-col gap-2.5 py-5">
                    <h1 className="font-jost text-xl px-4">Users</h1>

                    <Show>
                        <Show.When isTrue={userList && userList.length > 0}>
                            <div className="flex flex-col gap-2.5">
                                {
                                    userList?.map(user => (
                                        <Link
                                            to={`/j4y/${user.profileUrl}`}
                                            onClick={() => setIsComponentVisible(false)}
                                            className="flex flex-row gap-3 hover:bg-gray-50 px-4"
                                            key={`user-${user.id}`}
                                        >
                                            <div
                                                className="overflow-hidden h-12 w-12 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                                                <img className="object-contain"
                                                     src={user?.image ? APP_ENV.UPLOADS_URL + "/" + user?.image : defaultImage}
                                                     alt="image"/>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <h1 className="font-jost font-medium">{user.firstName} {user.lastName}</h1>

                                                <h3>{user.headline}</h3>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </Show.When>

                        <Show.Else>
                            <h3 className="font-jost px-4">Nothing found.</h3>
                        </Show.Else>
                    </Show>

                    <h1 className="font-jost text-xl px-4">Companies</h1>

                    <Show>
                        <Show.When isTrue={companyList && companyList.length > 0}>

                        </Show.When>

                        <Show.Else>
                            <h3 className="font-jost px-4">Nothing found.</h3>
                        </Show.Else>
                    </Show>
                </div>
            </div>
        </div>
    )
})
export default Search;