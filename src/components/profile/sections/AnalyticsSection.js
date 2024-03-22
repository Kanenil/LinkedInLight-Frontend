import React from "react"
import EyeIcon from "../../../elements/icons/EyeIcon";
import PeopleIcon from "../../../elements/icons/PeopleIcon";
import AnalyticIcon from "../../../elements/icons/AnalyticIcon";
import ShowAllLink from "../../../elements/links/ShowAllLink";

const analyticsItems = [
    {icon: <PeopleIcon />, title: "1 profile views", description: "Discover who's viewed your profile"},
    {icon: <AnalyticIcon />, title: "1 post views", description: "To increase the number of contacts, add posts"},
]

const AnalyticsSection = ({ user }) => {

    const AnalyticItem = ({ icon, title, description }) => {
        return (
            <div className="flex flex-row w-[230px] gap-2.5 py-4">
                {icon}

                <div className="flex flex-col font-jost text-[#2D2A33] gap-2.5">
                    <h1 className="font-medium text-lg">{title}</h1>

                    <h3 className="font-light">{description}</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-lg bg-white overflow-hidden pt-8">
            <div className="mx-10">
                <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">Analytics</h1>

                <div className="flex flex-row items-center gap-2.5 mt-2">
                    <EyeIcon className="h-4"/>

                    <h3 className="text-sm font-roboto font-light text-[#7D7D7D]">This section is
                        only visible to you</h3>
                </div>
            </div>

            <div className="flex flex-row gap-7 py-2 mx-10 mt-2.5">
                {analyticsItems.map((item, index) =>
                    <AnalyticItem key={`analyticsItems-${index}`} {...item} />
                )}
            </div>

            <ShowAllLink to="/in" title="Show all analytics" />
        </div>
    )
}
export default AnalyticsSection;