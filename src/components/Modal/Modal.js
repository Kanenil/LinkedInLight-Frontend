import {useEffect} from "react";

const Modal = ({ isVisible, setIsVisible, onClose, children }) => {
    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };

    useEffect(() => {
        if(isVisible === true) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    }, [isVisible])

    return (
        isVisible && (
            <>
                <div
                    className="bg-[#1A44ADCC]/50 fixed top-0 right-0 left-0 bottom-0 z-50"
                />

                <div className="fixed top-0 right-0 left-0 h-screen w-screen z-50 flex justify-content-center" onClick={handleClose}>
                    <div
                        className="items-center my-auto mx-auto bg-white min-w-2xl rounded-lg overflow-hidden h-[342px] w-[840px]" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </>
        )
    );
}
export default Modal;