import {APP_ENV} from "../../../env";
import defaultImage from "../../../assets/default-image.jpg";
import React from "react";
import Show from "../../../elements/shared/Show";
import {Link} from "react-router-dom";
import AddButton from "../../../elements/buttons/AddButton";

const RecommendationItem = ({status, requester, content, relationship, requestMessage, id, ...data}) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-5">
                <div
                    className="overflow-hidden h-14 w-14 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                    <img className="object-contain"
                         src={requester?.image ? APP_ENV.UPLOADS_URL + "/" + requester?.image : defaultImage}
                         alt="image"/>
                </div>

                <div className="flex flex-col gap-1">
                    <h1 className="font-jost font-medium">{requester.firstName} {requester.lastName}</h1>

                    <h3>{requester.lastPosition}</h3>

                    <h3 className="font-light text-sm">{relationship}</h3>
                </div>
            </div>

            <div className="md:ml-20 w-fit">
                <Show>
                    <Show.When isTrue={status === 'Pending'}>
                        <AddButton to=' ' withIcon={false} className="mb-4 px-5">
                            Give recommendation
                        </AddButton>

                        <div
                            className="border-r-[1px] border-l-[1px] px-3 py-2 rounded-lg border-[#24459A] text-[#2D2A33] font-jost"
                        >
                            {requestMessage}
                        </div>

                        <div className="mt-5 font-jost font-light text-sm">
                            <h3 className="text-[#2D2A33]">Write a recommendation for {requester.firstName} {requester.lastName}</h3>
                            <Link to='' className="text-[#7D7D7D]">
                                www.job4you.com/in/user-name-01
                            </Link>
                        </div>
                    </Show.When>

                    <Show.Else>
                        <div
                            className="border-r-[1px] border-l-[1px] px-3 py-2 rounded-lg border-[#24459A] text-[#2D2A33] font-jost"
                        >
                            {content}
                        </div>
                    </Show.Else>
                </Show>
            </div>
        </div>
    )
}
export default RecommendationItem;