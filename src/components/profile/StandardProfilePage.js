import UserProfileSection from "./sections/UserProfileSection";
import ProfileStatus from "./sections/ProfileStatus";
import AnalyticsSection from "./sections/AnalyticsSection";
import AboutMeSection from "./sections/AboutMeSection";
import ActivitySection from "./sections/ActivitySection";
import LanguagesSection from "./sections/LanguagesSection";
import ExperienceSection from "./sections/ExperienceSection";
import RightEditSection from "./sections/RightEditSection";
import PeopleMayKnow from "./sections/PeopleMayKnow";
import {peopleMayKnow} from "../../pages/profile/mock";
import React, {useEffect} from "react";
import EducationSection from "./sections/EducationSection";
import {useLocation, useNavigate} from "react-router";
import CertificationsSection from "./sections/CertificationsSection";

const StandardProfilePage = ({ user }) => {
    const location = useLocation();
    const navigator = useNavigate();

    useEffect(() => {
        if (location.state && location.state) {
            const targetId = location.state;
            let iteration = 0;

            const waitForOffsetTop = () => {
                const el = document.getElementById(targetId);
                if (el && el.offsetTop > 0) {
                    window.scrollTo(0, el.offsetTop - 60); // 60 px - sticky header
                    iteration = 5;
                    navigator('', {state: null})
                } else if (iteration < 5) {
                    setTimeout(waitForOffsetTop, 30);
                    iteration++;
                }
            };

            waitForOffsetTop();
        }
    }, [location])

    const sections = [
        {
            children: <UserProfileSection />,
            props: {
                user
            }
        },
        {
            children: <ProfileStatus />,
            props: {
                user
            }
        },
        {
            children: <AnalyticsSection />,
            props: {
                user
            }
        },
        {
            children: <AboutMeSection />,
            props: {
                user
            }
        },
        {
            children: <ActivitySection />,
            props: {
                user
            }
        },
        {
            children: <LanguagesSection />,
            props: {
                user
            }
        },
        {
            children: <EducationSection />,
            props: {
                user
            }
        },
        {
            children: <ExperienceSection />,
            props: {
                user
            }
        },
        {
            children: <CertificationsSection />,
            props: {
                user
            }
        },
    ]

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
                                        ...section.props
                                    })
                                )
                            }
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