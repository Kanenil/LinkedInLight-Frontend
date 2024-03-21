import React, {useEffect, useState} from "react";
import {profileService} from "../../services/profileService";
import UserProfileSection from "../../components/profile/UserProfileSection";
import ProfileStatus from "../../components/profile/ProfileStatus";
import AnalyticsSection from "../../components/profile/AnalyticsSection";
import ExperienceSection from "../../components/profile/ExperienceSection";
import ActivitySection from "../../components/profile/ActivitySection";
import PeopleMayKnow from "../../components/profile/PeopleMayKnow";
import RightEditSection from "../../components/profile/RightEditSection";
import {useDispatch, useSelector} from "react-redux";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {peopleMayKnow} from "./mock";
import {useLocation, useNavigate, useParams} from "react-router";
import {Helmet} from "react-helmet-async";
import Modal from "../../components/shared/modals/Modal";
import ConfirmChanges from "../../components/shared/modals/shared/ConfirmChanges";
import EditGeneralInformation from "../../components/shared/modals/profile/EditGeneralInformation";
import AboutMeSection from "../../components/profile/AboutMeSection";
import AddNewLanguage from "../../components/shared/modals/profile/AddNewLanguage";
import LanguagesSection from "../../components/profile/LanguagesSection";

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
    const [isClosing, setIsClosing] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const currentUser = useSelector(state => state.CurrentUser);
    const dispatch = useDispatch();
    const {blockId} = useParams();
    const location = useLocation();
    const navigator = useNavigate();

    const getAndSaveUserState = () => {
        profileService.profile().then(({data}) => {
            dispatch({
                type: 'SET_USER',
                current_user: data
            });
            setUser(data);
        }).catch()
    }

    useEffect(() => {
        if (!currentUser || !currentUser.email) {
            getAndSaveUserState();
        } else {
            setUser(currentUser);
        }
    }, [currentUser])

    useEffect(() => {
        setEditModal(location.pathname.includes("edit") ? blockId : "");
    }, [blockId, location]);

    const onConfirm = () => {
        navigator('/in');
        setIsClosing(false);
        setIsChanged(false);
    }

    const onCloseConfirm = () => {
        setIsClosing(false);
    }

    const closeModal = () => {
        if (isChanged) {
            setIsClosing(true);
        } else {
            setIsClose(true);
            setIsChanged(false);
            navigator('/in');
        }
    }

    const onSave = () => {
        getAndSaveUserState();
        navigator('/in');
        setIsClosing(false);
        setIsChanged(false);
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <main className='bg-[#E7E7E7]'>
                <div className="flex flex-row my-8 mx-auto w-[1170px]">
                    <div className="w-8/12">
                        <div className="rounded-t-lg overflow-hidden">
                            <div className="flex flex-col gap-2.5">
                                <UserProfileSection user={user} isEditBackground={editModal === "background"} isEditImage={editModal === "image"} />
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
            <Modal isOpen={editModal === "general-information"} closeModal={isClose} hideOnClose={false} onClose={closeModal}
                   position="mt-10 mx-auto">
                <EditGeneralInformation onClose={closeModal} onSave={onSave} onChange={() => setIsChanged(true)}/>
                <Modal childModal={true} isOpen={isClosing} onClose={onCloseConfirm} position="mt-24 mx-auto">
                    <ConfirmChanges onConfirm={onConfirm} onClose={onCloseConfirm}/>
                </Modal>
            </Modal>
            <Modal isOpen={editModal === "new-language"} closeModal={isClose} hideOnClose={false} onClose={closeModal}
                   position="mt-10 mx-auto">
                <AddNewLanguage onClose={closeModal} onSave={onSave} onChange={() => setIsChanged(true)}/>
                <Modal childModal={true} isOpen={isClosing} onClose={onCloseConfirm} position="mt-24 mx-auto">
                    <ConfirmChanges onConfirm={onConfirm} onClose={onCloseConfirm}/>
                </Modal>
            </Modal>
        </React.Fragment>
    )
}
export default Profile;