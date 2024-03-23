import React, {useEffect} from 'react'
import ConfirmationModal from "../shared/modals/ConfirmationModal";
import EditGeneralInformation from "../shared/modals/profile/EditGeneralInformation";
import AddLanguage from "../shared/modals/profile/AddLanguage";
import AddImage from "../shared/modals/profile/AddImage";
import {useImageCropContext} from "../../providers/ImageCropProvider";
import {imageUrlToBase64} from "../../utils/converters";
import {APP_ENV} from "../../env";
import AddEducation from "../shared/modals/profile/AddEducation";
import AddExperience from "../shared/modals/profile/AddExperience";

const EditModalPage = ({user, editModal, id, onSaveCallback}) => {
    const {setImage} = useImageCropContext();

    const modals = [
        {
            route: ["general-information"],
            children: <EditGeneralInformation/>,
            props: {}
        },
        {
            route: ["language"],
            children: <AddLanguage/>,
            props: {
                id
            }
        },
        {
            route: ["background", "image"],
            children: <AddImage/>,
            props: {
                isBackground: editModal === "background"
            }
        },
        {
            route: ["education"],
            children: <AddEducation/>,
            props: {
                id
            }
        },
        {
            route: ["experience"],
            children: <AddExperience/>,
            props: {
                id
            }
        },
    ]

    useEffect(() => {
        if (editModal === "image" && user?.image) {
            imageUrlToBase64(APP_ENV.UPLOADS_URL + "/" + user?.image, (resp) => {
                setImage(resp)
            })
        } else if (editModal === "background" && user?.background) {
            imageUrlToBase64(APP_ENV.UPLOADS_URL + "/" + user?.background, (resp) => {
                setImage(resp)
            })
        }
    }, [editModal, user?.background, user?.image])

    return (
        <React.Fragment>
            {
                modals
                    .filter(modal => modal.route.includes(editModal))
                    .map(modal =>
                        <ConfirmationModal
                            key={`modal-${modal.route[0]}`}
                            isOpen={true}
                            onSaveCallback={onSaveCallback}
                            children={modal.children}
                            {...modal.props}
                        />
                    )
            }
        </React.Fragment>
    )
}
export default EditModalPage;