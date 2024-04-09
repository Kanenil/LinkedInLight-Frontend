import {FaceSmileIcon, GifIcon, PaperClipIcon, PhotoIcon} from "@heroicons/react/24/outline";
import {useRef, useState} from "react";
import ChatService from "../../services/chatService";

const SendMessage = ({selectedChat, getParticipant}) => {
    const messageRef = useRef();
    const [sending, setSending] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        const {value} = messageRef.current;

        if(value) {
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
        <form onSubmit={onSubmit} className="w-full border-t-[1px] border-t-gray h-40 relative">
            <textarea
                ref={messageRef}
                className="w-[65%] my-5 mx-7 h-[120px] rounded-xl border-gray-300 border-[1px] resize-none inline block"
                placeholder="Type message"
            />

            <div className="absolute top-5 left-[75%]">
                <FaceSmileIcon className="text-gray w-[25px] h-[25px] inline-block"/>
                <div className="transform rotate-90 inline-block mx-5">
                    <div className="transform rotate-180">
                        <PaperClipIcon
                            className="text-gray w-[22px] h-[22px] inline-block transform rotate-45"/>
                    </div>
                </div>
                <GifIcon className="text-gray w-[25px] h-[25px] inline-block"/>
                <PhotoIcon className="text-gray w-[25px] h-[25px] inline-block mx-5"/>
            </div>

            <button
                disabled={!selectedChat || sending}
                type="submit"
                className="absolute top-16 left-[75%] text-white bg-blue-800 px-16 py-1 rounded-2xl hover:bg-blue-600 transition duration-300 ease-in-out disabled:bg-blue-800">
                Send
            </button>
        </form>
    )
}
export default SendMessage;