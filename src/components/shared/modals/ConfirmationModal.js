import React, {useState} from "react";
import Modal from "./Modal";
import ConfirmChanges from "./shared/ConfirmChanges";
import {useNavigate} from "react-router";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";

const ConfirmationModal = ({ children, isOpen, onSaveCallback, ...props }) => {
    const [modalState, setModalState] = useState({
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
            hasUserInformationChanged: false,
            isModalClosed: true
        })
    }

    const onCloseConfirm = () => {
        setModalState({
            ...modalState,
            isClosing: false,
        })
    }

    const closeModal = () => {
        setModalState({
            ...modalState,
            ...(modalState.hasUserInformationChanged ? {isClosing: true} : {
                isModalClosed: true,
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
            hasUserInformationChanged: false,
            isModalClosed: true
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
        <ConditionalWrapper condition={isOpen}>
            <Modal isOpen={isOpen} closeModal={modalState.isModalClosed} hideOnClose={false} onClose={closeModal}
                   position="mt-10 mx-auto">
                {React.cloneElement(children, eventHandlers)}
                <Modal childModal={true} isOpen={modalState.isClosing} onClose={onCloseConfirm} position="mt-24 mx-auto">
                    <ConfirmChanges onConfirm={onConfirm} onClose={onCloseConfirm}/>
                </Modal>
            </Modal>
        </ConditionalWrapper>
    )
}
export default ConfirmationModal;