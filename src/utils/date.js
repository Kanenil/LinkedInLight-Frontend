import moment from "moment"
import i18next from "i18next"
import "moment/locale/uk"

const getMonths = () => {
	return Array.from({ length: 12 }, (item, i) => {
		return new Date(0, i).toLocaleString(i18next.language, {
			month: "long",
		})
	})
}

const getShortMonth = number => {
	return new Date(0, number).toLocaleString(i18next.language, {
		month: "short",
	})
}

const getLongMonth = number => {
	return new Date(0, number).toLocaleString(i18next.language, { month: "long" })
}

const getYears = (from = new Date()) => {
	const current = from.getFullYear()

	const years = []
	for (let year = current; year >= current - 100; year--) {
		years.push(year)
	}

	return years
}

const getDateTime = (day = 1, month, year) => {
	year = year ?? new Date().getFullYear()
	const date = moment(
		`${day.toString()} ${month} ${year.toString()}`,
		"D MMMM YYYY",
		i18next.language,
	).format()

	return date
}

const getSendingTime = date => {
	const today = moment()
	const dateUtc = moment.utc(date).format("YYYY-MM-DD HH:mm:ss")
	const stillUtc = moment.utc(dateUtc).toDate()
	const local = moment(stillUtc).local().format("YYYY-MM-DD HH:mm:ss")

	return today.startOf("day").diff(local, "hours") > 0
		? moment(local).format("D MMM HH:mm")
		: moment(local).format("HH:mm")
}

const getTimeDuration = endTime => {
	let start = moment.utc(endTime).locale(i18next.language)
	let end = moment.utc().locale(i18next.language)

	let duration = moment.duration(end.diff(start))

	return duration.humanize()
}

export {
	getMonths,
	getYears,
	getDateTime,
	getShortMonth,
	getLongMonth,
	getSendingTime,
	getTimeDuration,
}
