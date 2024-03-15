import React, {useEffect, useState} from "react";
import ConditionalWrapper from "../../elements/ConditionalWrapper/ConditionalWrapper";

const Modal = ({ isOpen = false, onClose, position = "my-auto mx-auto", children }) => {
    const [isVisible, setIsVisible] = useState(isOpen);

    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen])

    useEffect(() => {
        if(isVisible === true) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [isVisible])

    return (
        <ConditionalWrapper condition={isVisible}>
            <React.Fragment>
                <div
                    className="bg-[#1A44ADCC]/50 fixed top-0 right-0 left-0 bottom-0 z-50"
                />

                <div className="fixed top-0 right-0 left-0 h-screen w-screen z-50 flex justify-content-center" onClick={handleClose}>
                    <div
                        className={`${position} items-center bg-white min-w-2xl rounded-lg overflow-hidden h-fit w-fit`} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </React.Fragment>
        </ConditionalWrapper>
    );
}
export default Modal;