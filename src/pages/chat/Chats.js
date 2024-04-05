import {useState} from "react";
import WriteInIcon from "../../elements/icons/WriteInIcon";
import noDataImage from "../../assets/empty-chat.png";
import {
    AdjustmentsHorizontalIcon,
    FaceSmileIcon,
    GifIcon,
    MagnifyingGlassIcon,
    PaperClipIcon,
    PhotoIcon
} from "@heroicons/react/24/outline";
import ChatsSection from "../../components/chats/ChatsSection";

// Test data for chat, delete after adding API methods
let todayDate = new Date();

let dayBeforeYesterday = new Date(todayDate);
dayBeforeYesterday.setDate(todayDate.getDate() - 2);

const chatMessagesUser1 = [];

const chatMessagesUser2 = [];

const testChatsList = [];
/////
const getSendingTime = (date) => {
    const today = new Date();

    const localTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    if (today.toDateString() === date.toDateString()) {
        return localTime;
    } else {
        const daysAgo = Math.floor((today - date) / (1000 * 3600 * 24));
        return `${daysAgo} days ago`;
    }
};

const Chats = () => {
    const [selectedChat, setSelectedChat] = useState();
    const [allChats, setAllChats] = useState(testChatsList);

    const messages = (chat) => {
        if (!chat) {
            return (
                <div className="w-full text-center mt-64 text-white">
                    There is no messages in this chat right now...
                </div>
            );
        } else {
            // Gettin data from DB using API must be here
            // Test setting
            const messagesData =
                selectedChat.id === 1 ? chatMessagesUser1 : chatMessagesUser2;
            //
            return messagesData.map((message) => {
                if (message.isMe) {
                    return (
                        <div className="p-2 flex justify-end">
                            <div className="inline-block bg-blue-900 max-w-1/2 rounded-xl text-white">
                                <div className="pb-3 pt-1 pl-2 pr-3">{message.text}</div>
                                <div className="flex justify-end p-2 text-xs text-blue-300">
                                    {getSendingTime(message.sendingTime)}
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="p-2">
                            <div className="inline-block">
                                <div
                                    className="rounded-full bg-gray-500 h-12 w-12 flex items-center justify-center overflow-hidden">
                                    <img
                                        className="w-full h-full"
                                        src={selectedChat.user.avatar}
                                        alt="noData"
                                    ></img>
                                </div>
                            </div>
                            <div className="inline-block bg-white max-w-1/2 rounded-xl">
                                <div className="pb-3 pt-1 pl-2 pr-3">{message.text}</div>
                                <div className="flex justify-end p-2 text-xs text-blue-300">
                                    {getSendingTime(message.sendingTime)}
                                </div>
                            </div>
                        </div>
                    );
                }
            });
        }
    };


    return (
        <div className="flex-grow my-8 mx-auto w-[1170px]">
            <div className="flex relative border-[1px] border-gray rounded-t-3xl overflow-hidden h-[70px]">
                <div className="w-1/3 h-screen inline-block border-r-gray border-r-[1px] overflow-hidden relative">
                    <div className="inline-block absolute left-10 top-6">Messages</div>
                    <div className="inline-block absolute text-3xl font-mono inline-flex right-24 top-3">
                        ...
                    </div>
                    <WriteInIcon className="fill-black w-16 h-16 inline-block absolute right-0 top-6"/>
                </div>
                <div className="w-2/3 h-screen inline-block relative">
                    <input
                        className="pl-[50px] relative absolute h-[50px] w-75 border-gray-300 border-[1px] top-[10px] left-10 rounded-2xl"
                        placeholder="Search messages"
                    ></input>
                    <MagnifyingGlassIcon
                        className="w-[23px] h-[23px] absolute top-[23px] left-[60px] text-gray-500"/>
                    <AdjustmentsHorizontalIcon
                        className="w-[28px] h-[28px] absolute top-[22px] left-[250px] text-gray-500"/>
                </div>
            </div>
            <div className="flex relative border-[1px] border-gray rounded-b-3xl overflow-hidden">
                <div className="w-1/3 h-screen inline-block border-r-gray border-r-[1px]">
                    <ChatsSection/>
                </div>
                <div className="w-2/3 h-screen inline-block relative">
                    <div className="text-lg m-3">New message</div>
                    <input
                        className="mx-3 rounded-xl"
                        placeholder="Enter name or few names"
                    ></input>
                    <div className="w-full border-t-[1px] border-t-gray h-40 absolute bottom-0">
                          <textarea
                              className="w-[65%] my-5 mx-7 h-[120px] rounded-xl border-gray-300 border-[1px] resize-none inline block"
                              placeholder="Type message"
                          ></textarea>
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
                        <div
                            className="absolute top-16 left-[75%] text-white bg-blue-800 px-16 py-1 rounded-2xl hover:bg-blue-600 transition duration-300 ease-in-out">
                            Send
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Chats;
