import {useQuery} from "@tanstack/react-query";
import ChatService from "../../../services/chatService";
import classNames from "classnames";
import {APP_ENV} from "../../../env";
import defaultImage from "../../../assets/default-image.jpg";
import {getSendingTime} from "../../../utils/date";
import React, {useState} from "react";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import ChatOptionButton from "../options/ChatOptionButton";
import ConfirmAction from "../../shared/modals/shared/ConfirmAction";
import Modal from "../../shared/modals/Modal";

const ChatItem = ({chat, getParticipant, selectedChat, setSelectedChat}) => {
    const [confirmModal, setConfirmModal] = useState(false);
    const [isForMe, setIsForMe] = useState(false);

    const {data, isLoading} = useQuery({
        queryFn: ({queryKey}) => ChatService.unreadMessages(queryKey[1]),
        queryKey: ['unreadMessages', chat.id],
        select: ({data}) => data,
    });

    const participant = getParticipant(chat);
    const isSelected = selectedChat ? selectedChat.id === chat.id : false;

    const lastMessage = chat.messages[chat.messages.length - 1];

    const onChange = (value) => {
        setIsForMe(value);
        setConfirmModal(true);
    }

    const onClose = () => {
        setConfirmModal(false);
    }

    const onConfirm = async () => {
        ChatService.deleteChat(chat.id, isForMe).then(() => {
            setConfirmModal(false);
            setSelectedChat(null);
        });
    }

    return (
        <div className="flex flex-row mb-4">
            <div
                onClick={() => setSelectedChat(chat)}
                className={classNames("hover:bg-[#EEF1FB] rounded-lg transition-colors duration-300 transform cursor-pointer w-full", {
                    'bg-[#EEF1FB]': isSelected
                })}
            >
                <div className="flex">
                    <div className="pl-1">
                        <div
                            className="rounded-full bg-gray-500 h-12 w-12 flex items-center justify-center border-2 border-black overflow-hidden">
                            <img
                                className="w-full h-full"
                                src={participant.image ? APP_ENV.UPLOADS_URL + "/" + participant?.image : defaultImage}
                                alt="noData"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col ml-5 font-jost">
                        <div
                            className="text-md">{participant.firstName} {participant.lastName}</div>
                        <div className="flex flex-row gap-2">
                            <div className="text-gray-400 text-sm max-w-52 truncate text-ellipsis">
                                {lastMessage?.content}
                            </div>
                            {lastMessage && (
                                <div className="text-gray-400 text-sm">
                                    {getSendingTime(new Date(lastMessage?.sentAt))}
                                </div>
                            )}
                        </div>
                    </div>

                    {
                        !isLoading && data > 0 && (
                            <div className="ml-2 flex items-center rounded-full w-6 h-6 bg-[#24459A]">
                                <h1 className="text-[12px] mx-auto font-bold text-white">{data}</h1>
                            </div>
                        )
                    }
                </div>
            </div>
            <ConditionalWrapper condition={isSelected}>
                <ChatOptionButton onChange={onChange}/>
                <Modal isOpen={confirmModal} onClose={onClose}>
                    <ConfirmAction onClose={onClose} onConfirm={onConfirm} title={`Delete chat ${isForMe?'for you':'for everyone'}?`} action="You won't be able to undo this action after confirming!"/>
                </Modal>
            </ConditionalWrapper>
        </div>
    )
}
export default ChatItem;