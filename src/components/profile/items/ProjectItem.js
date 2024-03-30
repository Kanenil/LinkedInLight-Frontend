import React, {useState} from "react";
import {getShortMonth} from "../../../utils/date";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import PencilButton from "../../../elements/buttons/PencilButton";

const ProjectItem = ({editPath, isShowMore = true, startDate, endDate, currentlyWorking, associatedWith, description, name}) => {
    const [showMore, setShowMore] = useState(false);

    const start = new Date(startDate);
    const end = new Date(endDate);

    const period = (
        `${getShortMonth(start.getMonth())} ${start.getFullYear()} - ${currentlyWorking ? "Present" : `${getShortMonth(end.getMonth())} ${end.getFullYear()}`}`
    )

    return (
        <div className="mt-2.5 py-2.5 flex flex-row gap-5">
            <div className="pb-[5px] font-jost">
                <h1 className="font-medium text-[#2D2A33]">{ name }</h1>
                <h3 className="font-light font-normal text-[#2D2A33] text-sm">{ associatedWith }</h3>

                <h3 className="font-light text-[#556DA9] text-sm">{ period }</h3>

                <ConditionalWrapper condition={description}>
                    <h3 className="font-light font-normal text-[#2D2A33] mt-2.5 text-sm break-all text-wrap">
                        <ConditionalWrapper condition={isShowMore}>
                            <ConditionalWrapper condition={description.length > 142 && !showMore}>
                                {description.substring(0, 142)}
                                <button onClick={() => setShowMore(true)} className="hover:text-blue-400">...see more</button>
                            </ConditionalWrapper>
                            <ConditionalWrapper condition={showMore || description.length <= 142}>
                                {description}
                            </ConditionalWrapper>
                        </ConditionalWrapper>
                        <ConditionalWrapper condition={!isShowMore}>
                            {description}
                        </ConditionalWrapper>
                    </h3>
                </ConditionalWrapper>
            </div>

            <ConditionalWrapper condition={editPath}>
                <PencilButton className="ml-auto" to={editPath} />
            </ConditionalWrapper>
        </div>
    )
}
export default ProjectItem;