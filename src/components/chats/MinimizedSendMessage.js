import React, {useRef, useState} from "react";
import {FaceSmileIcon, GifIcon, PaperClipIcon, PhotoIcon} from "@heroicons/react/24/outline";
import ChatService from "../../services/chatService";

const MinimizedSendMessage = ({selectedChat, getParticipant}) => {
    const messageRef = useRef();
    const [sending, setSending] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        const {value} = messageRef.current;

        if (value) {
            setSending(true);
            ChatService.sendMessage({
                content: value,
                receiverId: getParticipant(selectedChat).id,
                chatId: selectedChat.id,
            }).then(() => {
                e.target.reset();
                setSending(false);
            })
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col mt-auto px-2 pb-1">
            <textarea
                ref={messageRef}
                className="w-full h-[120px] rounded-xl text-sm border-[#B4BFDD] border-[1px] resize-none"
                placeholder="Type message..."
            />

            <div className="flex flex-row gap-3 items-center">
                <FaceSmileIcon className="text-gray w-12 h-12 inline-block"/>
                <div className="transform -rotate-90">
                    <PaperClipIcon
                        className="text-gray w-[22px] h-[22px] inline-block transform rotate-45"/>
                </div>
                <GifIcon className="text-gray w-12 h-12 inline-block"/>
                <PhotoIcon className="text-gray w-12 h-12 inline-block"/>

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