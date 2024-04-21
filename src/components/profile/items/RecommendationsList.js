import React, {useState} from "react";
import Show from "../../../elements/shared/Show";
import classNames from "classnames";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import RecommendationItem from "./RecommendationItem";

const lists = [
    {
        title: 'Received',
        data: 'receivedRecommendations'
    },
    {
        title: 'Given',
        data: 'givenRecommendations'
    },
    {
        title: 'Pending',
        data: 'pendingRecommendations'
    },
]

const NavButton = ({children, isActive, onClick}) => {
    return (
        <button
            className={classNames("border-b-[1px] font-jost text-lg w-[105px] md:w-[150px] py-1.5 text-[#585359]", {
                "border-b-[#24459A] font-semibold": isActive,
                "border-b-[#24459A]/50": !isActive
            })}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

const RecommendationsList = ({data: array}) => {
    const [selected, setSelected] = useState(lists[0].data);

    return (
        <>
            <div className="flex flex-row mt-4">
                {lists.map(({data, title}) => (
                    <ConditionalWrapper key={data} condition={data !== 'pendingRecommendations' || (data === 'pendingRecommendations' && array[data].length > 0)}>
                        <NavButton
                            onClick={() => setSelected(data)}
                            isActive={selected === data}
                        >
                            {title}
                        </NavButton>
                    </ConditionalWrapper>
                ))}
            </div>

            <div className="mt-5 flex flex-col gap-3">
                <Show>
                    {
                        lists.map(({data}) => (
                            <Show.When key={`recommended-section-${data}`} isTrue={selected === data}>
                                {array[data].map(recommendation => (
                                    <RecommendationItem
                                        key={`${data}-recommendation-${recommendation.id}`}
                                        {...recommendation}
                                    />
                                ))}
                            </Show.When>
                        ))
                    }
                </Show>
            </div>
        </>
    )
}
export default RecommendationsList;