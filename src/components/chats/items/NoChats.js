import noDataImage from "../../../assets/empty-chat.png";
import React from "react";

const NoChats = () => {
    return (
        <div className="flex flex-col w-full">
            <img src={noDataImage} alt="noData"></img>
            <div className="text-center text-lg text-blue-800">
                No messages right now
            </div>
            <div className="my-8 text-sm text-center text-gray-400 w-2/3 mx-auto mb-16">
                Communicate and start discussions to make progress in your professional
                development.
            </div>
        </div>
    )
}
export default NoChats;