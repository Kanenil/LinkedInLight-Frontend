import React, {useState} from "react";
import Modal from "./Modal";
import ConfirmChanges from "./shared/ConfirmChanges";
import {useNavigate} from "react-router";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import useMobileDetector from "../../../hooks/useMobileDetector";

const ConfirmationModal = ({ children, isOpen, onSaveCallback, onCloseCallback = null, position = "mt-0 md:mt-10 mx-auto", ...props }) => {
    const [modalState, setModalState] = useState({
        isClosing: false,
        isModalClosed: false,
        hasUserInformationChanged: false,
    });
    const navigator = useNavigate();
    const {isMobile} = useMobileDetector();

    const onConfirm = () => {
        if (onCloseCallback) {
            setModalState({
                isClosing: false,
                isModalClosed: false,
                hasUserInformationChanged: false,
            })

            onCloseCallback();
        }
        else {
            navigator(-1);

            setModalState({
                ...modalState,
                isClosing: false,
                hasUserInformationChanged: false,
                isModalClosed: true
            })
        }
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

        if (!modalState.hasUserInformationChanged && !onCloseCallback)
            navigator(-1);

        if (!modalState.hasUserInformationChanged && onCloseCallback) {
            setModalState({
                isClosing: false,
                isModalClosed: false,
                hasUserInformationChanged: false,
            })

            onCloseCallback();
        }
    }

    const onSave = () => {
        setModalState({
            ...modalState,
            isClosing: false,
            hasUserInformationChanged: false,
            isModalClosed: true
        })
        if (onCloseCallback)
            onCloseCallback();
        else
            navigator(-1);
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
            <Modal isOpen={isOpen} isRounded={!isMobile} closeModal={modalState.isModalClosed} hideOnClose={false} onClose={closeModal}
                   position={position}>
                {React.cloneElement(children, eventHandlers)}
                <Modal childModal={true} isOpen={modalState.isClosing} onClose={onCloseConfirm} position="mt-24 mx-auto">
                    <ConfirmChanges onConfirm={onConfirm} onClose={onCloseConfirm}/>
                </Modal>
            </Modal>
        </ConditionalWrapper>
    )
}
export default ConfirmationModal;