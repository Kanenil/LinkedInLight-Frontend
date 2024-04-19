import React from "react";
import RightEditSection from "./sections/RightEditSection";
import PeopleMayKnow from "./sections/PeopleMayKnow";
import {sections} from "../../constants/sections";
import {useScrollToLocation} from "../../hooks/useScrollToLocation";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import useMobileDetector from "../../hooks/useMobileDetector";
import Show from "../../elements/shared/Show";

const StandardProfilePage = ({ user, isOwner }) => {
    useScrollToLocation();

    const {isMobile} = useMobileDetector();

    return (
        <main className='bg-[#E7E7E7] flex-grow'>
            <Show>
                <Show.When isTrue={!isMobile}>
                    <div className="flex flex-row my-8 mx-auto w-[1170px]">
                        <div className="w-8/12">
                            <div className="rounded-t-lg overflow-hidden">
                                <div className="flex flex-col gap-2.5">
                                    {
                                        sections.map((section, index) =>
                                            React.cloneElement(section.children, {
                                                key: `sections-${index}`,
                                                user,
                                                isOwner
                                            })
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12 ml-10">
                            <ConditionalWrapper condition={isOwner}>
                                <RightEditSection/>
                            </ConditionalWrapper>

                            <PeopleMayKnow/>
                        </div>
                    </div>
                </Show.When>

                <Show.Else>
                    <div className="flex flex-col gap-2.5 mb-24">
                        {
                            sections.map((section, index) =>
                                React.cloneElement(section.children, {
                                    key: `sections-${index}`,
                                    user,
                                    isOwner
                                })
                            )
                        }
                    </div>
                </Show.Else>
            </Show>
        </main>
    )
}
export default StandardProfilePage;