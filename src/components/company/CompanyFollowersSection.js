import Show from "../../elements/shared/Show";
import noPosts from "../../assets/no-posts.png";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import CompanyService from "../../services/companyService";
import Loader from "../shared/Loader";
import FollowerItem from "./items/FollowerItem";

const CompanyFollowersSection = ({company}) => {
    const {data: followers, isLoading} = useQuery({
        queryFn: ({queryKey}) => CompanyService.followers(queryKey[1]),
        queryKey: ['followers', company.id],
        select: ({data}) => data
    })

    if(isLoading)
        return <Loader/>

    return (
        <section className="flex flex-col gap-5">
            <Show>
                <Show.When isTrue={followers.length > 0}>
                    <div className="flex flex-col md:flex-row gap-5">
                        {
                            followers.map(follower => (
                                <FollowerItem key={`follower-${follower.id}`} {...follower}/>
                            ))
                        }
                    </div>
                </Show.When>

                <Show.Else>
                    <div className="w-full h-full rounded-lg overflow-hidden bg-white p-6">
                        <div className="my-auto mx-auto font-jost text-[#2D2A33] text-center">
                            <div className="mx-auto h-[200px] w-[200px]" style={{backgroundImage: `url(${noPosts})`}}/>
                            <h1 className="text-xl mt-2">Currently nobody following</h1>
                            <h3 className="text-[#7D7D7D] [&>strong]:font-medium text-sm mt-2">
                                There is no followers on this company
                            </h3>
                        </div>
                    </div>
                </Show.Else>
            </Show>
        </section>
    )
}
export default CompanyFollowersSection;