import UserProfileSection from "./sections/UserProfileSection";
import ProfileStatus from "./sections/ProfileStatus";
import AnalyticsSection from "./sections/AnalyticsSection";
import AboutMeSection from "./sections/AboutMeSection";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import ActivitySection from "./sections/ActivitySection";
import LanguagesSection from "./sections/LanguagesSection";
import ExperienceSection from "./sections/ExperienceSection";
import RightEditSection from "./sections/RightEditSection";
import PeopleMayKnow from "./sections/PeopleMayKnow";
import {peopleMayKnow} from "../../pages/profile/mock";
import React from "react";
import EducationSection from "./sections/EducationSection";

const StandardProfilePage = ({ user }) => {
    return (
        <main className='bg-[#E7E7E7]'>
            <div className="flex flex-row my-8 mx-auto w-[1170px]">
                <div className="w-8/12">
                    <div className="rounded-t-lg overflow-hidden">
                        <div className="flex flex-col gap-2.5">
                            <UserProfileSection user={user} />
                            <ProfileStatus user={user}/>
                            <AnalyticsSection user={user}/>
                            <AboutMeSection user={user}/>
                            <ConditionalWrapper condition={user?.posts.length > 0}>
                                <ActivitySection
                                    title="Activity"
                                    buttonTitle="Create a post"
                                    blocks={[
                                        {
                                            name: 'Posts', content: user?.posts
                                        }
                                    ]}
                                    activeBlock={'Posts'}
                                />
                            </ConditionalWrapper>
                            <LanguagesSection user={user}/>
                            <EducationSection user={user}/>
                            <ConditionalWrapper condition={user?.experiences.length > 0}>
                                <ExperienceSection
                                    title="Experience"
                                    addButtonTitle="Add experience"
                                    companies={user?.experiences}
                                />
                            </ConditionalWrapper>
                        </div>
                    </div>
                </div>
                <div className="w-4/12 ml-10">
                    <RightEditSection/>

                    <PeopleMayKnow peopleMayKnow={peopleMayKnow.slice(0, 5)}/>
                </div>
            </div>
        </main>
    )
}
export default StandardProfilePage;