import React, {useState} from 'react'
import ConfirmationModal from "../../shared/modals/ConfirmationModal";
import MessageWithFile from "../../shared/modals/chat/MessageWithFile";
import {useImageCropContext} from "../../../providers/ImageCropProvider";
import {readFile} from "../../../utils/cropImage";
import ChatService from "../../../services/chatService";

const SelectMessageFile = ({children, chat, message, participant, setMessage, accept = "image/png, image/jpg, image/jpeg", disabled = false}) => {
    const id = crypto.randomUUID();
    const [selectedFile, setSelectedFile] = useState(null);
    const {setImage, getProcessedImage} = useImageCropContext();

    const onSelect = async (e) => {
        const [file] = e.target.files;
        if(!file) return;

        setSelectedFile(file);

        try {
            const imageDataUrl = await readFile(file);
            const img = new Image();
            img.src = imageDataUrl;
            img.onload = () => {
                setImage(imageDataUrl);
            };
        } catch (err) {
            console.log(err)
        }
    }

    const onSave = () => {
        if(selectedFile.type.includes('image')) {
            getProcessedImage().then(image => {
                ChatService.sendMessage({
                    content: message,
                    attachedFileName: id,
                    receiverId: participant.id,
                    chatId: chat.id,
                    attachment: image
                }).then(() => {
                    setSelectedFile(null);
                    setMessage('');
                })
            })
        } else {
            ChatService.sendMessage({
                content: message,
                attachedFileName: id,
                receiverId: participant.id,
                chatId: chat.id,
                attachment: selectedFile
            }).then(() => {
                setSelectedFile(null);
                setMessage('');
            })
        }
    }

    const onClose = () => {
        setSelectedFile(null);
        document.body.classList.remove("modal-open");
    }

    return (
        <React.Fragment>
            <input disabled={disabled} className="hidden" onChange={onSelect} type="file" accept={accept} id={id}/>
            <label className={disabled ? '' : 'cursor-pointer'} htmlFor={id}>
                {children}
            </label>
            <ConfirmationModal isOpen={!!selectedFile} onSaveCallback={onSave}
                               position="mx-auto my-auto"
                               onCloseCallback={onClose}>
                <MessageWithFile message={message} setFile={setSelectedFile} accept={accept} setMessage={setMessage} file={selectedFile}/>
            </ConfirmationModal>
        </React.Fragment>
    )
}
export default SelectMessageFile;