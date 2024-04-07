import defaultBg from "../../../assets/default-background.jpg";
import CameraIcon from "../../../elements/icons/CameraIcon";
import defaultImage from "../../../assets/default-image.jpg";
import OpenToButton from "../../../elements/buttons/OpenToButton";
import ProfileButton from "../../../elements/buttons/ProfileButton";
import React, {useState} from "react";
import Modal from "../../shared/modals/Modal";
import AddToProfile from "../../shared/modals/profile/AddToProfile";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import {Link} from "react-router-dom";
import {APP_ENV} from "../../../env";
import PencilButton from "../../../elements/buttons/PencilButton";
import Show from "../../../elements/shared/Show";

const ImageSector = ({user, isOwner}) => {
    const backgroundUrl = user?.background ? APP_ENV.UPLOADS_URL + "/" + user?.background : defaultBg;
    const imageUrl = user?.image ? APP_ENV.UPLOADS_URL + "/" + user?.image : defaultImage;

    return (
        <div className="relative w-full h-48" style={{background: `url(${backgroundUrl})`}}>
            <ConditionalWrapper condition={isOwner}>
                <Link to="edit/background"
                      className="absolute flex justify-center items-center rounded-full bg-white w-10 h-10 top-3 right-5">
                    <CameraIcon/>
                </Link>
            </ConditionalWrapper>

            <Show>
                <Show.When isTrue={isOwner}>
                    <Link to="edit/image"
                          className="absolute left-16 overflow-hidden -bottom-12 h-32 w-32 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                        <img className="object-contain" src={imageUrl} alt="image"/>
                    </Link>
                </Show.When>

                <Show.Else>
                    <div
                        className="absolute left-16 overflow-hidden -bottom-12 h-32 w-32 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                        <img className="object-contain" src={imageUrl} alt="image"/>
                    </div>
                </Show.Else>
            </Show>
        </div>
    )
}

const InformationSector = ({user, isOwner}) => {
    const [isVisible, setIsVisible] = useState(false)

    const closeModal = () => {
        setIsVisible(false);
    }

    return (
        <React.Fragment>
            <div className="ml-10 mr-8 mt-5 mb-4">
                <ConditionalWrapper condition={isOwner}>
                    <div className="flex justify-end mb-2">
                        <PencilButton to='edit/intro'/>
                    </div>
                </ConditionalWrapper>
                <div className={`flex flex-row ${!isOwner ? 'mt-6' : ''}`}>
                    <h1 className="font-bold text-2xl text-[#2D2A33]">{user?.firstName} {user?.lastName}</h1>

                    <ConditionalWrapper condition={user?.currentPosition}>
                        <h1 className="ml-auto font-jost text-[#2D2A33] font-bold mt-auto">{user?.currentPosition}</h1>
                    </ConditionalWrapper>
                </div>
                <ConditionalWrapper condition={user?.headline}>
                    <h1 className="font-jost font-light text-[#2D2A33] mt-1">
                        {user?.headline}
                    </h1>
                </ConditionalWrapper>
                <div className="flex flex-row mt-1.5 font-jost text-sm">
                    <h3 className="text-[#7F7F7F]">{user?.city}, {user?.country}</h3>

                    <button className="ml-6 text-[#24459A] font-medium hover:underline">
                        Contact information
                    </button>
                </div>
                <div className="flex flex-row mt-1 font-jost text-[#24459A] text-sm">
                    <h3 className="font-medium">Contacts:</h3>

                    <h4 className="ml-4">*****</h4>
                </div>
                <ConditionalWrapper condition={isOwner}>
                    <div className="flex flex-row gap-4 mt-4">
                        <OpenToButton/>
                        <ProfileButton onClickHandler={() => setIsVisible(true)} title="Add profile section"/>
                        <button
                            className="border-[#7D88A4] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#7D88A4] text-sm">
                            More
                        </button>
                    </div>
                </ConditionalWrapper>
            </div>
            <Modal isOpen={isVisible} onClose={closeModal} position="mt-10 mx-auto">
                <AddToProfile onClose={closeModal}/>
            </Modal>
        </React.Fragment>
    )
}

const UserProfileSection = ({user, isOwner}) => {
    return (
        <div className="flex flex-col bg-white rounded-b-lg">
            <ImageSector user={user} isOwner={isOwner}/>

            <InformationSector user={user} isOwner={isOwner}/>
        </div>
    )
}
export default UserProfileSection;