import defaultBg from "../../assets/default-background.jpg";
import CameraIcon from "../../elements/CameraIcon/CameraIcon";
import defaultImage from "../../assets/default-image.jpg";
import PencilIcon from "../../elements/PencilIcon/PencilIcon";
import OpenToButton from "../OpenToButton/OpenToButton";
import ProfileButton from "../ProfileButton/ProfileButton";
import React, {useEffect, useState} from "react";
import Modal from "../Modal/Modal";
import AddToProfile from "../AddToProfile/AddToProfile";
import ConditionalWrapper from "../../elements/ConditionalWrapper/ConditionalWrapper";
import AddImage from "../AddImage/AddImage";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import ConfirmChanges from "../ConfirmChanges/ConfirmChanges";
import ImageCropProvider, {useImageCropContext} from "../../providers/ImageCropProvider";
import {APP_ENV} from "../../env";
import {imageUrlToBase64} from "../../utils/converters";

const ImageSector = ({user, isEditImage, isEditBackground}) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const {image, setImage} = useImageCropContext();

    const backgroundUrl = user?.background ? APP_ENV.UPLOADS_URL + "/" + user?.background : defaultBg;
    const imageUrl = user?.image ? APP_ENV.UPLOADS_URL + "/" + user?.image : defaultImage;

    const navigator = useNavigate();

    useEffect(() => {
        if (isEditImage && user?.image) {
            imageUrlToBase64(APP_ENV.UPLOADS_URL + "/" + user?.image)
                .then(data => {
                    setImage(data)
                })
                .catch(err => console.log(err))
        } else if (isEditBackground && user?.background) {
            imageUrlToBase64(APP_ENV.UPLOADS_URL + "/" + user?.background)
                .then(data => {
                    setImage(data)
                })
                .catch(err => console.log(err))
        }
    }, [isEditImage, isEditBackground])

    const onConfirm = () => {
        navigator('/in');
        setIsClosing(false);
        setImage(undefined);
    }

    const onCloseConfirm = () => {
        setIsClosing(false);
    }

    const closeModal = () => {
        if (image) {
            setIsClosing(true);
        } else {
            setIsClose(true);
            navigator('/in');
        }
    }

    return (

        <div className="relative w-full h-48" style={{background: `url(${backgroundUrl})`}}>
            <Link to="edit/background"
                  className="absolute flex justify-center items-center rounded-full bg-white w-10 h-10 top-3 right-5">
                <CameraIcon/>
            </Link>
            <Modal isOpen={isEditBackground} closeModal={isClose} hideOnClose={false} onClose={closeModal}
                   position="mt-10 mx-auto">
                <AddImage isBackground={true} onClose={closeModal}/>
                <Modal childModal={true} isOpen={isClosing} onClose={onCloseConfirm} position="mt-24 mx-auto">
                    <ConfirmChanges onConfirm={onConfirm} onClose={onCloseConfirm}/>
                </Modal>
            </Modal>

            <Link to="edit/image"
                  className="absolute left-16 overflow-hidden -bottom-12 h-32 w-32 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]">
                <img className="object-contain" src={imageUrl} alt="image"/>
            </Link>
            <Modal isOpen={isEditImage} closeModal={isClose} hideOnClose={false} onClose={closeModal}
                   position="mt-10 mx-auto">
                <AddImage onClose={closeModal}/>
                <Modal childModal={true} isOpen={isClosing} onClose={onCloseConfirm} position="mt-24 mx-auto">
                    <ConfirmChanges onConfirm={onConfirm} onClose={onCloseConfirm}/>
                </Modal>
            </Modal>
        </div>

    )
}

const InformationSector = ({user}) => {
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

                    <ConditionalWrapper condition={user?.company}>
                        <h1 className="ml-auto font-jost text-[#2D2A33] font-bold mt-auto">{user?.company}</h1>
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
                <AddToProfile onClose={closeModal}/>
            </Modal>
        </React.Fragment>
    )
}

const UserProfile = ({user, isEditImage, isEditBackground}) => {
    return (
        <ImageCropProvider>
            <div className="flex flex-col bg-white rounded-b-lg">
                <ImageSector user={user} isEditImage={isEditImage} isEditBackground={isEditBackground}/>

                <InformationSector user={user}/>
            </div>
        </ImageCropProvider>
    )
}
export default UserProfile;