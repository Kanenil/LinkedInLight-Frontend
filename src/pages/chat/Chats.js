import { useState } from "react";
// Test data for chat, delete after adding API methods
let todayDate = new Date();

let dayBeforeYesterday = new Date(todayDate);
dayBeforeYesterday.setDate(todayDate.getDate() - 2);

const chatMessagesUser1 = [
  {
    id: 1,
    isMe: true,
    text: "Hello!!!",
    sendingTime: new Date(),
  },
  {
    id: 2,
    isMe: false,
    text: "Hello you too, how are you",
    sendingTime: new Date(),
  },
  {
    id: 3,
    isMe: true,
    text: "Let's code",
    sendingTime: new Date(),
  },
  {
    id: 4,
    isMe: false,
    text: "Let's go, welcome to test chat",
    sendingTime: new Date(),
  },
];

const chatMessagesUser2 = [
  {
    id: 1,
    isMe: true,
    text: "Hello!!!",
    sendingTime: dayBeforeYesterday,
  },
  {
    id: 2,
    isMe: false,
    text: "Hello, welcome to second conversation of test chat",
    sendingTime: dayBeforeYesterday,
  },
  {
    id: 3,
    isMe: true,
    text: "Nice to see you here",
    sendingTime: dayBeforeYesterday,
  },
  {
    id: 4,
    isMe: false,
    text: "Let's code",
    sendingTime: dayBeforeYesterday,
  },
];

const testChatsList = [
  {
    id: 1,
    user: {
      name: "test user 1",
      avatar:
        "https://as1.ftcdn.net/v2/jpg/01/63/11/70/1000_F_163117064_syJkTuCddASYjvl4WqyRmnuy8cDXpoQY.jpg",
    },
    lastMessage: {
      text: "Hello World, hello all You!!!",
      sendingTime: new Date(),
    },
  },
  {
    id: 2,
    user: {
      name: "test user 2",
      avatar:
        "https://img.freepik.com/free-photo/stunning-square-portrait-adorable-cute-cat_181624-37290.jpg",
    },
    lastMessage: {
      text: "Hello World, hello all You!!!",
      sendingTime: dayBeforeYesterday,
    },
  },
];
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
                <div className="rounded-full bg-gray-500 h-12 w-12 flex items-center justify-center overflow-hidden">
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

  const chats = allChats.map((chat) => {
    return (
      <div
        onClick={() => setSelectedChat(chat)}
        className="border-b-gray-200 border-b-[1px] pt-2 hover:bg-gray-200 transition-colors duration-300 transform cursor-pointer"
      >
        <div className="flex">
          <div className="inline-block">
            <div className="rounded-full bg-gray-500 h-12 w-12 flex items-center justify-center overflow-hidden">
              <img
                className="w-full h-full"
                src={chat.user.avatar}
                alt="noData"
              ></img>
            </div>
          </div>

          <div className="inline-block ml-5">
            <div className="text-md">{chat.user.name}</div>
            <div className="text-gray-400 text-sm">{chat.lastMessage.text}</div>
          </div>
        </div>
        <div className="flex justify-end pr-2 text-xs text-blue-300">
          {getSendingTime(chat.lastMessage.sendingTime)}
        </div>
      </div>
    );
  });
  return (
    <div className="flex relative">
      <div className="w-1/3 h-screen inline-block">{chats}</div>
      <div className="bg-blue-500 w-2/3 h-screen inline-block">
        {messages(selectedChat)}
        <textarea
          className="w-full h-10 bg-white absolute bottom-0 border-0"
          placeholder="Type message..."
        ></textarea>
      </div>
    </div>
  );
};

export default Chats;
