import moment from "moment";

const getMonths = () => {
    return Array.from({length: 12}, (item, i) => {
        return new Date(0, i).toLocaleString('en-US', {month: 'long'})
    });
}

const getShortMonth = (number) => {
    return new Date(0, number).toLocaleString('en-US', {month: 'short'})
}

const getLongMonth = (number) => {
    return new Date(0, number).toLocaleString('en-US', {month: 'long'})
}

const getYears = (from = new Date()) => {
    const current = from.getFullYear();

    const years = [];
    for (let year = current; year >= current - 100; year--) {
        years.push(year);
    }

    return years;
}

const getDateTime = (day = 1, month, year) => {
    const date = new Date(`${month} ${day}, ${year}`);
    const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
        date.getUTCDate(), date.getUTCHours() + (date.getTimezoneOffset() / -60),
        date.getUTCMinutes(), date.getUTCSeconds());

    return day && month && year ? new Date(now_utc) : null;
}

const getSendingTime = (date) => {
    const today = moment();

    return today.startOf('day').diff(date, "hours") > 0 ? moment(date).format('D MMM HH:mm') : moment(date).format('HH:mm')
};

const getTimeDuration = (endTime) => {
    let start = moment.utc(endTime)
    let end = moment.utc();

    let duration = moment.duration(
        end.diff(start)
    );

    let days = duration.days();
    let hours = duration.hours();
    let minutes = duration.minutes();
    let secs = duration.seconds();

    return days >= 1? `${days} days`:
        hours >= 1? `${hours} hr` : minutes >= 1? `${minutes} min`: `${secs} sec`
};

export {getMonths, getYears, getDateTime, getShortMonth, getLongMonth, getSendingTime, getTimeDuration}