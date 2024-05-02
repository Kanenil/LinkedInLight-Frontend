import FormSelector from "./FormSelector"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import React, { useEffect } from "react"
import { getDateTime, getMonths, getYears } from "../../../utils/date"
import { useTranslation } from "react-i18next"

const StartEndDateForm = ({
	values,
	setValues,
	errors,
	setErrors,
	onChange,
	isEndDateDisabled,
	startTitle = "profile.modal.shared.startDate",
	endTitle = "profile.modal.shared.endDate",
	isExpected = true,
}) => {
	const months = getMonths()
	const years = getYears()
	const endYears = isExpected
		? getYears(new Date(new Date().getFullYear() + 10, 1))
		: getYears(new Date(new Date().getFullYear(), 1))
	const { t } = useTranslation()

	useEffect(() => {
		if (isEndDateDisabled) {
			setValues({
				...values,
				endDateYear: "",
				endDateMonth: "",
			})
		}
	}, [isEndDateDisabled])

	useEffect(() => {
		const startDate = getDateTime(
			1,
			values.startDateMonth,
			values.startDateYear,
		)
		const endDate = getDateTime(1, values.endDateMonth, values.endDateYear)

		if (startDate && endDate && startDate > endDate && !isEndDateDisabled) {
			setErrors(values => {
				return {
					...values,
					endDate: t("profile.modal.shared.notEarlier"),
				}
			})
			return
		}

		if (!values.endDateYear && values.endDateMonth) {
			setErrors({
				...errors,
				endDate: t("profile.modal.shared.enter", {
					value: t("profile.modal.shared.year"),
				}),
			})
		} else if (values.endDateYear && !values.endDateMonth) {
			setErrors({
				...errors,
				endDate: t("profile.modal.shared.enter", {
					value: t("profile.modal.shared.month"),
				}),
			})
		} else {
			setErrors(values => {
				return {
					...values,
					endDate: null,
				}
			})
		}

		if (startDate > new Date() && !endDate) {
			setErrors(values => {
				return {
					...values,
					startDate: t("profile.modal.shared.notFuture"),
				}
			})
		}
	}, [
		values.startDateYear,
		values.startDateMonth,
		values.endDateYear,
		values.endDateMonth,
	])

	return (
		<React.Fragment>
			<div className='pb-[10px] pr-[20px] gap-[5px]'>
				<h1 className='font-jost text-[#2D2A33]'>{t(startTitle)}</h1>

				<div className='flex flex-row gap-2.5 w-full'>
					<FormSelector
						name='startDateMonth'
						title={t("profile.modal.shared.month")}
						value={values.startDateMonth}
						handleChange={e => {
							setValues({
								...values,
								startDateMonth: e.target.value,
							})

							setErrors({
								...errors,
								startDate: !values.startDateYear
									? t("profile.modal.shared.enter", {
											value: t("profile.modal.shared.year"),
									  })
									: null,
							})

							onChange()
						}}
						margin='w-full'
						error={errors["startDate"]}
						touched={errors["startDate"]}
						options={months}
					/>

					<FormSelector
						name='startDateYear'
						title={t("profile.modal.shared.year")}
						value={values.startDateYear}
						handleChange={e => {
							setValues({
								...values,
								startDateYear: e.target.value,
							})

							setErrors({
								...errors,
								startDate: !values.startDateMonth
									? t("profile.modal.shared.enter", {
											value: t("profile.modal.shared.month"),
									  })
									: null,
							})

							onChange()
						}}
						margin='w-full'
						error={errors["startDate"]}
						touched={errors["startDate"]}
						options={years}
					/>
				</div>

				<ConditionalWrapper condition={errors["startDate"]}>
					<h3 className='mt-2 text-[#9E0F20] text-xs'>{errors["startDate"]}</h3>
				</ConditionalWrapper>
			</div>

			<div className='pb-[10px] pr-[20px] gap-[5px]'>
				<h1 className='font-jost text-[#2D2A33]'>{t(endTitle)}</h1>

				<div className='flex flex-row gap-2.5 w-full'>
					<FormSelector
						name='endDateMonth'
						title={t("profile.modal.shared.month")}
						value={values.endDateMonth}
						disabled={isEndDateDisabled}
						handleChange={e => {
							setValues({
								...values,
								endDateMonth: e.target.value,
							})

							if (!values.endDateYear) {
								setErrors({
									...errors,
									endDate: t("profile.modal.shared.enter", {
										value: t("profile.modal.shared.year"),
									}),
								})
							}

							onChange()
						}}
						margin='w-full'
						error={errors["endDate"]}
						touched={errors["endDate"]}
						options={months}
					/>

					<FormSelector
						name='endDateYear'
						title={t("profile.modal.shared.year")}
						value={values.endDateYear}
						disabled={isEndDateDisabled}
						handleChange={e => {
							setValues({
								...values,
								endDateYear: e.target.value,
							})
						}}
						margin='w-full'
						error={errors["endDate"]}
						touched={errors["endDate"]}
						options={endYears}
					/>
				</div>

				<ConditionalWrapper condition={errors["endDate"]}>
					<h3 className='mt-2 text-[#9E0F20] text-xs'>{errors["endDate"]}</h3>
				</ConditionalWrapper>
			</div>
		</React.Fragment>
	)
}
export default StartEndDateForm
