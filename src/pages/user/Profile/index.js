import defaultImage from '../../../assets/default-image.jpg'
import {useEffect, useState} from "react";
import {profileService} from "../../../services/profileService";
import UserProfile from "../../../components/UserProfile/UserProfile";
import ProfileStatus from "../../../components/ProfileStatus/ProfileStatus";
import Analytics from "../../../components/Analytics/Analytics";
import ExperienceSection from "../../../components/ExperienceSection/ExperienceSection";
import ActivitySection from "../../../components/ActivitySection/ActivitySection";
import PeopleMayKnow from "../../../components/PeopleMayKnow/PeopleMayKnow";
import RightEditSection from "../../../components/RightEditSection/RightEditSection";

const Profile = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        profileService.profile().then(({data}) => {
            setUser(data)
        }).catch()
    }, [])

    const experience = [
        { logo: 'logo', companyName: 'Company Name', period: '2021 - 2024' },
    ]

    const education = [
        { logo: 'logo', companyName: 'IT STEP Academy', period: '2021 - 2024' },
    ]

    const blocks = [
        {name: 'Posts', content: [
                {published:'published', when: 'when', privacy: 'privacy'},
                {published:'published', when: 'when', privacy: 'privacy'},
                {published:'published', when: 'when', privacy: 'privacy'},
                {published:'published', when: 'when', privacy: 'privacy'},
            ]
        },
        {name: 'Images', content: [
                {published:'published', when: 'when', privacy: 'privacy'},
                {published:'published', when: 'when', privacy: 'privacy'},
                {published:'published', when: 'when', privacy: 'privacy'},
                {published:'published', when: 'when', privacy: 'privacy'},
            ]
        }
    ]

    const peopleMayKnow = [
        {
            username: 'User Name_01',
            position: 'Position - Company Name',
            image: defaultImage
        },
        {
            username: 'User Name_02',
            position: 'Position - Company Name',
            image: defaultImage
        },
        {
            username: 'User Name_03',
            position: 'Position - Company Name',
            image: defaultImage
        },
        {
            username: 'User Name_04',
            position: 'Position - Company Name',
            image: defaultImage
        },
        {
            username: 'User Name_05',
            position: 'Position - Company Name',
            image: defaultImage
        }
    ]

    return (
        <main className='bg-[#E7E7E7]'>
            <div className="flex flex-row my-8 mx-auto w-[1170px]">
                <div className="w-8/12">
                    <div className="rounded-t-lg overflow-hidden">
                        <div className="flex flex-col gap-2.5">
                            <UserProfile user={user} />
                            <ProfileStatus user={user} />
                            <Analytics user={user} />
                            <ActivitySection
                                title="Activity"
                                buttonTitle="Create a post"
                                blocks={blocks}
                                activeBlock={blocks[0].name}
                            />
                            <ExperienceSection
                                title="Education"
                                addButtonTitle="Add education"
                                companies={education}
                            />
                            <ExperienceSection
                                title="Experience"
                                addButtonTitle="Add experience"
                                companies={experience}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-4/12 ml-10">
                    <RightEditSection />

                    <PeopleMayKnow peopleMayKnow={peopleMayKnow} />
                </div>
            </div>
        </main>
    )
}
export default Profile;