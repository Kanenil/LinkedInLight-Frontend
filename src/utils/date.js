
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

    return day && month && year ? new Date(now_utc): null;
}

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

export {getMonths, getYears, getDateTime, getShortMonth, getLongMonth, getSendingTime}