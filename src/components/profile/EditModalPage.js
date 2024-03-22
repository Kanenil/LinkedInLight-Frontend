import React, {useEffect} from 'react'
import ConfirmationModal from "../shared/modals/ConfirmationModal";
import EditGeneralInformation from "../shared/modals/profile/EditGeneralInformation";
import AddNewLanguage from "../shared/modals/profile/AddNewLanguage";
import AddImage from "../shared/modals/profile/AddImage";
import {useImageCropContext} from "../../providers/ImageCropProvider";
import {imageUrlToBase64} from "../../utils/converters";
import {APP_ENV} from "../../env";

const EditModalPage = ({user, editModal, onSaveCallback}) => {
    const {setImage} = useImageCropContext();

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
            <ConfirmationModal
                isOpen={editModal === "general-information"}
                onSaveCallback={onSaveCallback}
                children={<EditGeneralInformation/>}
            />
            <ConfirmationModal
                isOpen={editModal === "new-language"}
                onSaveCallback={onSaveCallback}
                children={<AddNewLanguage/>}
            />
            <ConfirmationModal
                isOpen={['background', 'image'].includes(editModal)}
                onSaveCallback={onSaveCallback}
                children={<AddImage/>}
                isBackground={editModal === "background"}
            />
        </React.Fragment>
    )
}
export default EditModalPage;