import UserProfileSection from "./UserProfileSection";
import ProfileStatus from "./ProfileStatus";
import AnalyticsSection from "./AnalyticsSection";
import AboutMeSection from "./AboutMeSection";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import ActivitySection from "./ActivitySection";
import LanguagesSection from "./LanguagesSection";
import ExperienceSection from "./ExperienceSection";
import RightEditSection from "./RightEditSection";
import PeopleMayKnow from "./PeopleMayKnow";
import {peopleMayKnow} from "../../pages/profile/mock";
import React from "react";

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
                            <ConditionalWrapper condition={user?.educations.length > 0}>
                                <ExperienceSection
                                    title="Education"
                                    addButtonTitle="Add education"
                                    companies={user?.educations}
                                />
                            </ConditionalWrapper>
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

                    <PeopleMayKnow peopleMayKnow={peopleMayKnow}/>
                </div>
            </div>
        </main>
    )
}
export default StandardProfilePage;