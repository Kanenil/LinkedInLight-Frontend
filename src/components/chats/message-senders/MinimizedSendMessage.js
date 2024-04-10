import React, {useState} from "react";
import {FaceSmileIcon, GifIcon, PaperClipIcon, PhotoIcon} from "@heroicons/react/24/outline";
import ChatService from "../../../services/chatService";
import SelectMessageFile from "./SelectMessageFile";

const MinimizedSendMessage = ({selectedChat, getParticipant}) => {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const participant = getParticipant(selectedChat);

    const onSubmit = (e) => {
        e.preventDefault();

        if (message) {
            setSending(true);
            ChatService.sendMessage({
                content: message,
                receiverId: participant.id,
                chatId: selectedChat.id,
            }).then(() => {
                setMessage('');
                setSending(false);
            })
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col mt-auto px-2 pb-1">
            <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full h-[120px] rounded-xl text-sm border-[#B4BFDD] border-[1px] resize-none"
                placeholder="Type message..."
            />

            <div className="flex flex-row gap-3 items-center">
                <FaceSmileIcon className="text-gray w-12 h-12 inline-block"/>
                <SelectMessageFile accept=".doc, .docx, .pdf, .txt, .csv, .xls, .xlsx, .ppt, .pptx, .zip, .rar, .tar.gz" chat={selectedChat} participant={participant} setMessage={setMessage} disabled={!selectedChat || sending} message={message}>
                    <div className="transform -rotate-90">
                        <PaperClipIcon
                            className="text-gray w-[22px] h-[22px] inline-block transform rotate-45"/>
                    </div>
                </SelectMessageFile>
                <GifIcon className="text-gray w-12 h-12 inline-block"/>
                <SelectMessageFile chat={selectedChat} participant={participant} setMessage={setMessage} disabled={!selectedChat || sending} message={message}>
                    <PhotoIcon className="text-gray w-6 h-6 inline-block"/>
                </SelectMessageFile>

                <button
                    disabled={sending}
                    type="submit"
                    className="flex-shrink w-full text-white bg-blue-800 px-6 py-1 rounded-2xl hover:bg-blue-600 transition duration-300 ease-in-out disabled:bg-blue-800">
                    Send
                </button>
            </div>
        </form>
    )
}
export default MinimizedSendMessage;