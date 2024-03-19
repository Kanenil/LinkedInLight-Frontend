import {useEffect, useState} from "react";
import {profileService} from "../../../services/profileService";
import UserProfile from "../../../components/UserProfile/UserProfile";
import ProfileStatus from "../../../components/ProfileStatus/ProfileStatus";
import Analytics from "../../../components/Analytics/Analytics";
import ExperienceSection from "../../../components/ExperienceSection/ExperienceSection";
import ActivitySection from "../../../components/ActivitySection/ActivitySection";
import PeopleMayKnow from "../../../components/PeopleMayKnow/PeopleMayKnow";
import RightEditSection from "../../../components/RightEditSection/RightEditSection";
import {useDispatch, useSelector} from "react-redux";
import ConditionalWrapper from "../../../elements/ConditionalWrapper/ConditionalWrapper";
import {peopleMayKnow} from "./mock";
import {useLocation, useParams} from "react-router";

// {
//     "firstName": "Oleksandr",
//     "lastName": "Burda",
//     "additionalName": null,
//     "email": "oleksandrburda2004@gmail.com",
//     "headline": null,
//     "currentPosition": null,
//     "industry": null,
//     "country": null,
//     "city": null,
//     "about": null,
//     "image": null,
//     "background": null,
//     "isBanned": false,
//     "openToWork": false,
//     "openToHire": false,
//     "profileUrl": "",
//     "birthday": "0001-01-01T00:00:00",
//     "isRecruiter": false,
//     "experiences": [],
//     "educations": [],
//     "skills": [],
//     "languages": [],
//     "posts": []
// }

const Profile = () => {
    const [user, setUser] = useState();
    const [editModal, setEditModal] = useState("");
    const currentUser = useSelector(state => state.CurrentUser);
    const dispatch = useDispatch();
    const {blockId} = useParams();
    const location = useLocation();


    useEffect(() => {
        if (!currentUser || !currentUser.email) {
            profileService.profile().then(({data}) => {
                dispatch({
                    type: 'SET_USER',
                    current_user: data
                });
                setUser(data);
            }).catch()
        } else {
            setUser(currentUser);
        }
    }, [])

    useEffect(() => {
        setEditModal(location.pathname.includes("edit") ? blockId : "");
    }, [blockId, location])

    return (
        <main className='bg-[#E7E7E7]'>
            <div className="flex flex-row my-8 mx-auto w-[1170px]">
                <div className="w-8/12">
                    <div className="rounded-t-lg overflow-hidden">
                        <div className="flex flex-col gap-2.5">
                            <UserProfile user={user} isEditImage={editModal === "image"}/>
                            <ProfileStatus user={user}/>
                            <Analytics user={user}/>
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
                            <ConditionalWrapper condition={user?.skills.length > 0}>
                                <ExperienceSection
                                    title="Skills"
                                    addButtonTitle="Add skill"
                                    companies={user?.skills}
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
export default Profile;