import Show from "../../../elements/shared/Show";
import React from "react";
import {APP_ENV} from "../../../env";
import {useQueries} from "@tanstack/react-query";
import {companyQuery} from "../../../constants/combinedQueries";
import {Link} from "react-router-dom";

const CompanyItem = ({logoImg, companyName, industryId, id,...data}) => {
    const {industry: {name: industryName}, followers} = useQueries({
        queries: companyQuery(id, industryId).map((value) => ({
            ...value
        })),
        combine: (results) => {
            return {
                industry: results[0].data ?? {},
                followers: results[1].data ?? 0
            }
        },
    });

    return (
        <div className="flex flex-row gap-6 w-fit md:w-[45vw]">
            <Show>
                <Show.When isTrue={!!logoImg}>
                    <div className="flex items-center max-w-[65px] my-auto max-h-[65px] md:max-w-[105px] md:max-h-[105px]">
                        <img className="object-contain" src={`${APP_ENV.UPLOADS_URL}/${logoImg}`} alt="company-logo"/>
                    </div>
                </Show.When>

                <Show.Else>
                    <div
                        className="flex items-center justify-center w-[80px] h-[80px] bg-[#F0F1F3]">
                        <h3 className="text-[#2D2A33] font-semibold font-jost">logo</h3>
                    </div>
                </Show.Else>
            </Show>

            <div className="flex flex-col font-jost text-[#2D2A33]">
                <Link to={`/j4y/company/${id}`} className="font-semibold text-lg">
                    {companyName}
                </Link>

                <h2 className="font-light break-words text-wrap">
                    {industryName}
                </h2>

                <h1 className="text-[#556DA9] font-light">
                    {followers} followers
                </h1>
            </div>
        </div>
    )
}
export default CompanyItem;