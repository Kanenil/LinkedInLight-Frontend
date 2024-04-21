import {APP_ENV} from "../../../env";
import defaultImage from "../../../assets/default-image.jpg";
import {getSendingTime} from "../../../utils/date";
import {CheckIcon} from "@heroicons/react/16/solid";
import Show from "../../../elements/shared/Show";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import {DocumentIcon} from "@heroicons/react/24/outline";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import MessageOptionButton from "../options/MessageOptionButton";
import ChatService from "../../../services/chatService";
import Modal from "../../shared/modals/Modal";
import ConfirmAction from "../../shared/modals/shared/ConfirmAction";
import classNames from "classnames";

function parseString(inputString) {
    let parsedString = inputString.replace(/\\r/g, '\t');

    parsedString = parsedString.replace(/\\n/g, '<br>');

    parsedString = parsedString.replace(
        /(http[s]?:\/\/\S+)/g,
        `<a href="$1" class="hover:underline">$1</a> <br><span class="text-red-800">(We do not recommend navigating to pages you are not familiar with.)</span>`
    );

    return parsedString;
}


const DoubleCheck = ({className = 'w-4 h-4'}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M1.5 12.5L5.57574 16.5757C5.81005 16.8101 6.18995 16.8101 6.42426 16.5757L9 14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16 7L12 11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7 12L11.5757 16.5757C11.8101 16.8101 12.1899 16.8101 12.4243 16.5757L22 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    )
}

const MessageItem = ({message, chat, participant, isMobile = false}) => {
    const [confirmModal, setConfirmModal] = useState(false);
    const [isForMe, setIsForMe] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editMessage, setEditMessage] = useState(message.content || '');

    const fileExt = message.attachedFileName.split('.').pop() || '';
    const isImage = fileExt.match(/(jpg|jpeg|png|gif)$/i)?.length > 0;

    if(message.sender.id === participant.id)
        return (
            <div className="flex flex-row gap-3">
                <div className="pl-1">
                    <div
                        className="rounded-full bg-gray-500 h-10 w-10 flex items-center justify-center border-2 border-black overflow-hidden">
                        <img
                            className="w-full h-full"
                            src={message.sender?.image ? APP_ENV.UPLOADS_URL + "/" + message.sender?.image : defaultImage}
                            alt="image"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <ConditionalWrapper condition={fileExt}>
                        <Show>
                            <Show.When isTrue={isImage}>
                                <div
                                    className={classNames("rounded-lg border-[1px] border-[#B4BFDD] flex items-center justify-center overflow-hidden",{
                                        "h-32 w-32 md:h-56 md:w-56": !isMobile,
                                        "h-24 h-24": isMobile
                                    })}>
                                    <img
                                        className="object-contain"
                                        src={APP_ENV.UPLOADS_URL + "/" + message.attachedFileName}
                                        alt="attachedImage"
                                    />
                                </div>
                            </Show.When>

                            <Show.Else>
                                <Link to={`${APP_ENV.UPLOADS_URL}/${message.attachedFileName}`} target="_blank" className="flex flex-row gap-3 rounded-lg overflow-hidden items-center bg-gray-500 max-w-[20vw]">
                                    <div className="bg-gray-300 px-2 py-2">
                                        <DocumentIcon className="w-8 h-8"/>
                                    </div>

                                    <div className="pr-2">
                                        <h3 className="font-jost text-xl text-white truncate break-words">{message.attachedFileName}</h3>
                                    </div>
                                </Link>
                            </Show.Else>
                        </Show>
                    </ConditionalWrapper>


                    <div className={classNames("flex-shrink border-[1px] border-[#B4BFDD] rounded-xl p-2", {
                        "max-w-[20vw]":isMobile,
                        "max-w-[40vw] md:max-w-[20vw]": !isMobile
                    })}>
                        <h3 className="font-jost text-wrap break-words" dangerouslySetInnerHTML={{__html: parseString(message.content)}}/>
                    </div>
                </div>

                <ConditionalWrapper condition={message.isEdited}>
                    <span className="text-gray-500 mt-auto text-xs">edited</span>
                </ConditionalWrapper>

                <h3 className="font-jost font-light text-sm mt-auto">
                    {getSendingTime(new Date(message?.sentAt))}
                </h3>

                <div className="mt-auto">
                    <Show>
                        <Show.When isTrue={message.isRead}>
                            <DoubleCheck className="w-6 h-6 stroke-black"/>
                        </Show.When>
                        <Show.Else>
                            <CheckIcon className="w-6 h-6"/>
                        </Show.Else>
                    </Show>
                </div>
            </div>
        )

    const onDelete = async () => {
        setConfirmModal(false);

        await ChatService.deleteMessage(message.id, chat.id, isForMe);
    }

    const onClose = () => {
        setConfirmModal(false)
    }

    const onTryDelete = (forMe) => {
        setIsForMe(forMe);
        setConfirmModal(true);
    }

    const onEdit = async (e) => {
        e.preventDefault();
        setIsEdit(false);

        await ChatService.editMessage({
            content: editMessage,
            attachedFileName: message.attachedFileName,
            senderId: message.senderId,
            receiverId: message.receiverId,
            chatId: message.chatId
        }, message.id);
    }

    return (
        <div className="ml-auto flex flex-row gap-3">
            <ConditionalWrapper condition={!isMobile}>
                <MessageOptionButton onDelete={onTryDelete} onEdit={() => setIsEdit(prev => !prev)}/>
                <Modal isOpen={confirmModal} onClose={onClose}>
                    <ConfirmAction onClose={onClose} onConfirm={onDelete} title="Delete message?" action="You won't be able to undo this action after confirming!"/>
                </Modal>
            </ConditionalWrapper>

            <div className="mt-auto">
                <Show>
                    <Show.When isTrue={message.isRead}>
                        <DoubleCheck className="w-6 h-6 stroke-black"/>
                    </Show.When>
                    <Show.Else>
                        <CheckIcon className="w-6 h-6"/>
                    </Show.Else>
                </Show>
            </div>

            <h3 className="font-jost font-light text-sm mt-auto">
                {getSendingTime(new Date(message?.sentAt))}
            </h3>
            <ConditionalWrapper condition={message.isEdited}>
                <span className="ml-auto text-gray-500 mt-auto text-xs">edited</span>
            </ConditionalWrapper>

            <div className="flex flex-col gap-1">
                <ConditionalWrapper condition={fileExt}>
                    <Show>
                        <Show.When isTrue={isImage}>
                            <div
                                className={classNames("rounded-lg border-[1px] border-[#B4BFDD] flex items-center justify-center overflow-hidden",{
                                    "h-32 w-32 md:h-56 md:w-56": !isMobile,
                                    "h-24 h-24": isMobile
                                })}>
                                <img
                                    className="object-contain"
                                    src={APP_ENV.UPLOADS_URL + "/" + message.attachedFileName}
                                    alt="attachedImage"
                                />
                            </div>
                        </Show.When>

                        <Show.Else>
                            <Link to={`${APP_ENV.UPLOADS_URL}/${message.attachedFileName}`} target="_blank" className="flex flex-row gap-3 rounded-lg overflow-hidden items-center bg-gray-500 max-w-[20vw]">
                                <div className="bg-gray-300 px-2 py-2">
                                    <DocumentIcon className="w-8 h-8"/>
                                </div>

                                <div className="pr-2">
                                    <h3 className="font-jost md:text-xl text-white truncate break-words">{message.attachedFileName}</h3>
                                </div>
                            </Link>
                        </Show.Else>
                    </Show>
                </ConditionalWrapper>

                <Show>
                    <Show.When isTrue={isEdit}>
                        <form onSubmit={onEdit} className="flex flex-col gap-1">
                            <textarea
                                value={editMessage}
                                onChange={(e) => setEditMessage(e.target.value)}
                                className="w-full h-full rounded-xl border-gray-300 border-[1px] text-sm inline block"
                                placeholder="Edited message..."
                            />
                            {editMessage.length === 0 && (
                                <p className="mt-2 text-[#9E0F20] text-xs">Message can not be empty!</p>
                            )}

                            <div className="flex flex-row justify-end gap-2">
                                <button
                                    type="button"
                                    className={`font-jost py-1 px-5 rounded-full border-[1px] border-[#24459A] text-[#556DA9] border-[1.5px] hover:border-[#24459A] hover:bg-[#E4EAFF] hover:text-[#24459A] transition duration-300 ease-in-out text-sm`}
                                    onClick={() => setIsEdit(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={editMessage.length === 0}
                                    type="submit"
                                    className="w-fit text-white text-sm bg-blue-800 px-6 py-1 rounded-2xl hover:bg-blue-600 transition duration-300 ease-in-out disabled:bg-blue-800">
                                    Save
                                </button>
                            </div>
                        </form>
                    </Show.When>

                    <Show.Else>
                        <div className={classNames("flex-shrink bg-[#EEF1FB] rounded-xl p-2", {
                            "max-w-[20vw]":isMobile,
                            "max-w-[40vw] md:max-w-[20vw]": !isMobile
                        })}>
                            <h3 className="font-jost text-wrap break-words" dangerouslySetInnerHTML={{__html: parseString(message.content)}}/>
                        </div>
                    </Show.Else>
                </Show>
            </div>

            <div className="pr-1">
                <div
                    className="rounded-full bg-gray-500 h-10 w-10 flex items-center justify-center border-2 border-black overflow-hidden">
                    <img
                        className="w-full h-full"
                        src={message.sender?.image ? APP_ENV.UPLOADS_URL + "/" + message.sender?.image : defaultImage}
                        alt="image"
                    />
                </div>
            </div>
        </div>
    )
}
export default MessageItem;