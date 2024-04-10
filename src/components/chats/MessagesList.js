import moment from 'moment';
import React, {memo} from "react";
import MessageItem from "./items/MessageItem";

const MessagesList = memo(({messages, chat, participant, isMobile = false}) => {
    const msgDates = new Set();

    const formatMsgDate = (created_date) => {

        const today = moment().startOf('day');
        const msgDate = moment(created_date);
        let dateDay = '';

        if(msgDate.isSame(today, 'day')){
            dateDay = 'Today';
        }
        else if (msgDate.isSame(today.clone().subtract(1, 'days'), 'day')){
            dateDay = 'Yesterday';
        }
        else{
            dateDay = msgDate.format('DD.MM.YY');
        }

        return dateDay
    }

    const renderMsgDate = (message, prevMessage) => {
        const dateTimeStamp = moment(message.sentAt, 'YYYY-MM-DD').valueOf();
        let nextMsgdateTimeStamp = '';
        if(prevMessage){
            nextMsgdateTimeStamp = moment(prevMessage.sentAt, 'YYYY-MM-DD').valueOf();
        }

        if(msgDates.has(dateTimeStamp) || (nextMsgdateTimeStamp && nextMsgdateTimeStamp === dateTimeStamp)){
            return null
        }
        else{
            msgDates.add(dateTimeStamp);

            return (
                <div className="py-2 flex justify-center items-center">
                    <span className="font-jost text-lg font-medium">
                        {formatMsgDate(message.sentAt)}
                    </span>
                </div>
            )
        }
    }

    return (
        messages?.map((message, index) => (
            <React.Fragment key={`message-${message.id}`}>
                {renderMsgDate(message, messages[index-1])}
                <MessageItem key={index} isMobile={isMobile} chat={chat} message={message} participant={participant} />
            </React.Fragment>
        ))
    )
})
export default MessagesList;