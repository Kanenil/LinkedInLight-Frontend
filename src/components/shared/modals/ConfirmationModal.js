import React, {useState} from "react";
import Modal from "./Modal";
import ConfirmChanges from "./shared/ConfirmChanges";
import {useNavigate} from "react-router";

const ConfirmationModal = ({ children, isOpen, onSaveCallback, ...props }) => {
    const [modalState, setModalState] = useState({
        editModal: "",
        isClosing: false,
        isModalClosed: false,
        hasUserInformationChanged: false,
    });
    const navigator = useNavigate();

    const onConfirm = () => {
        navigator('/in');
        setModalState({
            ...modalState,
            isClosing: false,
            hasUserInformationChanged: false
        })
    }

    const onCloseConfirm = () => {
        setModalState({
            ...modalState,
            isClosing: false
        })
    }

    const closeModal = () => {
        setModalState({
            ...modalState,
            ...(modalState.hasUserInformationChanged ? {isClosing: true} : {
                isClose: true,
                hasUserInformationChanged: false
            })
        })

        if (!modalState.hasUserInformationChanged)
            navigator('/in');
    }

    const onSave = () => {
        setModalState({
            ...modalState,
            isClosing: false,
            hasUserInformationChanged: false
        })
        navigator('/in');
        onSaveCallback();
    }

    const eventHandlers = {
        onClose: closeModal,
        onSave: onSave,
        onChange: () => setModalState({
            ...modalState,
            hasUserInformationChanged: true
        }),
        ...props
    };

    return (
        <Modal isOpen={isOpen} closeModal={modalState.isClose} hideOnClose={false} onClose={closeModal}
               position="mt-10 mx-auto">
            {React.cloneElement(children, eventHandlers)}
            <Modal childModal={true} isOpen={modalState.isClosing} onClose={onCloseConfirm} position="mt-24 mx-auto">
                <ConfirmChanges onConfirm={onConfirm} onClose={onCloseConfirm}/>
            </Modal>
        </Modal>
    )
}
export default ConfirmationModal;