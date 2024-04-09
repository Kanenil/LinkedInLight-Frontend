import moment from 'moment';
import React, {memo} from "react";
import MessageItem from "./MessageItem";

function groupedDays(messages) {
    return messages.reduce((acc, el, i) => {
        const messageDay = moment(el.created_at).format('YYYY-MM-DD');
        if (acc[messageDay]) {
            return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
        }
        return { ...acc, [messageDay]: [el] };
    }, {});
}

function generateItems(messages) {
    const days = groupedDays(messages);
    const sortedDays = Object.keys(days).sort(
        (x, y) => moment(y, 'YYYY-MM-DD').unix() - moment(x, 'YYYY-MM-DD').unix()
    );
    const items = sortedDays.reduce((acc, date) => {
        const sortedMessages = days[date].sort(
            (x, y) => new Date(y.created_at) - new Date(x.created_at)
        );
        return acc.concat([...sortedMessages, { type: 'day', date, id: date }]);
    }, []);
    return items;
}

const MessagesList = memo(({messages, participant}) => {
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
            dateDay = msgDate.format('D.M.YY');
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
                <MessageItem key={index} message={message} participant={participant} />
            </React.Fragment>
        ))
    )
})
export default MessagesList;