import React from "react";
import RightEditSection from "./sections/RightEditSection";
import PeopleMayKnow from "./sections/PeopleMayKnow";
import {peopleMayKnow} from "../../pages/profile/mock";
import {sections} from "../../constants/sections";
import {useScrollToLocation} from "../../hooks/useScrollToLocation";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";

const StandardProfilePage = ({ user, isOwner }) => {
    useScrollToLocation();

    return (
        <main className='bg-[#E7E7E7]'>
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

                    <PeopleMayKnow peopleMayKnow={peopleMayKnow.slice(0, 5)}/>
                </div>
            </div>
        </main>
    )
}
export default StandardProfilePage;