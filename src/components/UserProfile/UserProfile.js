import defaultBg from "../../assets/default-background.jpg";
import CameraIcon from "../../elements/CameraIcon/CameraIcon";
import defaultImage from "../../assets/default-image.jpg";
import PencilIcon from "../../elements/PencilIcon/PencilIcon";
import OpenToButton from "../OpenToButton/OpenToButton";
import ProfileButton from "../ProfileButton/ProfileButton";
import React, {useState} from "react";
import Modal from "../Modal/Modal";
import {Link} from "react-router-dom";
import AddToProfile from "../AddToProfile/AddToProfile";

const ImageSector = ({user}) => {
    const background = user?.background ? user?.background : defaultBg;
    const image = user?.image ? user?.image : defaultImage;

    return (
        <div className="relative w-full h-48" style={{background: `url(${background})`}}>
            <button
                className="absolute flex justify-center items-center rounded-full bg-white w-10 h-10 top-3 right-5">
                <CameraIcon/>
            </button>

            <button
                className="absolute left-16 overflow-hidden -bottom-12 h-32 w-32 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                <img className="object-contain" src={image} alt="image"/>
            </button>
        </div>
    )
}

const InformationSector = ({ user }) => {
    const [isVisible, setIsVisible] = useState(false)

    const openModal = () => {
        setIsVisible(true);
    };

    const closeModal = () => {
        setIsVisible(false);
    }

    return (
        <React.Fragment>
            <div className="ml-10 mr-8 mt-14 mb-4">
                <div className="flex flex-row">
                    <h1 className="font-bold text-2xl text-[#2D2A33]">{user?.firstName} {user?.lastName}</h1>

                    <button className="ml-6">
                        <PencilIcon className="fill-[#24459A] stroke-[#24459A] w-5"/>
                    </button>

                    <h1 className="ml-auto font-jost text-[#2D2A33] font-bold mt-auto">Company</h1>
                </div>
                <h1 className="font-jost font-light text-[#2D2A33] mt-1">
                    student at IT STEP Academy
                </h1>
                <div className="flex flex-row mt-1.5 font-jost text-sm">
                    <h3 className="text-[#7F7F7F]">Ternopil City, Ukraine</h3>

                    <button className="ml-6 text-[#24459A] font-medium hover:underline">
                        Contact information
                    </button>
                </div>
                <div className="flex flex-row mt-1 font-jost text-[#24459A] text-sm">
                    <h3 className="font-medium">Contacts:</h3>

                    <h4 className="ml-4">*****</h4>
                </div>
                <div className="flex flex-row gap-4 mt-4">
                    <OpenToButton/>
                    <ProfileButton onClickHandler={openModal} title="Add profile section"/>
                    <button
                        className="border-[#7D88A4] border-[1px] rounded-full py-1.5 px-6 font-jost text-[#7D88A4] text-sm">
                        More
                    </button>
                </div>
            </div>
            <Modal isOpen={isVisible} onClose={closeModal} position="mt-10 mx-auto">
                <AddToProfile onClose={closeModal} />
            </Modal>
        </React.Fragment>

    )
}

const UserProfile = ({user}) => {
    return (
        <div className="flex flex-col bg-white rounded-b-lg">
            <ImageSector user={user} />

            <InformationSector user={user} />
        </div>
    )
}
export default UserProfile;