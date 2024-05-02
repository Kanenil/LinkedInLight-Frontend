import React, { useEffect } from "react"
import { getDateTime, getLongMonth } from "../../../../utils/date"
import ProfileService from "../../../../services/profileService"
import StartEndDateForm from "../../forms/StartEndDateForm"
import useForm from "../../../../hooks/useForm"
import EditModalForm from "../../forms/EditModalForm"
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup"
import ModalCheckFormGroup from "../../forms/ModalCheckFormGroup"
import ModalInputFormGroup from "../../forms/ModalInputFormGroup"
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup"
import {
	DEGREES_STORE,
	FIELD_STORE,
	SCHOOLS_STORE,
} from "../../../../constants/stores"
import { useAlertContext } from "../../../../providers/AlertProvider"
import { useTranslation } from "react-i18next"

const AddEducation = ({ onClose, onSave, onChange, id }) => {
	const initialValues = {
		options: {
			school: JSON.parse(localStorage.getItem(SCHOOLS_STORE) || "[]"),
			degree: JSON.parse(localStorage.getItem(DEGREES_STORE) || "[]"),
			fieldOfStudy: JSON.parse(localStorage.getItem(FIELD_STORE) || "[]"),
		},
		values: {
			school: "",
			degree: "",
			fieldOfStudy: "",
			startDateYear: "",
			startDateMonth: "",
			endDateYear: "",
			endDateMonth: "",
			grade: "",
			description: "",
			currentlyStudying: false,
		},
		errors: {
			school: true,
			degree: true,
			fieldOfStudy: true,
			endDate: null,
			startDate: null,
		},
	}
	const {
		options,
		values,
		errors,
		isSubmitted,
		handleChangeSelect,
		onChangeInput,
		onSubmit,
		setErrors,
		setValues,
		setIsSubmitted,
	} = useForm(initialValues, onChange)
	const { success } = useAlertContext()
	const { t } = useTranslation()

	useEffect(() => {
		if (id) {
			ProfileService.getEducation(id)
				.then(({ data }) => {
					const education = data

					const startDate = new Date(education.startDate)
					const endDate = education.endDate ? new Date(education.endDate) : null

					setValues({
						...education,
						startDateMonth: getLongMonth(startDate.getMonth()),
						startDateYear: startDate.getFullYear(),
						endDateMonth: endDate ? getLongMonth(endDate.getMonth()) : "",
						endDateYear: endDate ? endDate.getFullYear() : "",
					})

					setErrors({
						school: false,
						fieldOfStudy: false,
						degree: false,
					})
				})
				.catch(() => onClose())
		}
	}, [id])

	const onSaveClick = async () => {
		if (!values.startDateYear || !values.startDateMonth) {
			setErrors({
				...errors,
				startDate: t("validation.required"),
			})
			setIsSubmitted(true)
			return
		}

		const model = {
			id: id ?? 0,
			school: values.school,
			degree: values.degree,
			fieldOfStudy: values.fieldOfStudy,
			startDate: getDateTime(1, values.startDateMonth, values.startDateYear),
			endDate: getDateTime(1, values.endDateMonth, values.endDateYear),
			grade: values.grade,
			description: values.description,
			currentlyStudying: getDateTime(1, values.endDateMonth, values.endDateYear)
				? values.currentlyStudying
				: true,
		}

		if (id) {
			await ProfileService.updateEducation(model, id)
		} else {
			await ProfileService.addEducation(model)
		}

		success(
			t("alert.onSuccess", { name: t("profile.modal.education.title1") }),
			5,
		)
		onSave()
	}

	const onRemoveClick = async () => {
		await ProfileService.removeEducation(id)
		success(
			t("alert.onRemoved", { name: t("profile.modal.education.title1") }),
			5,
		)

		onSave()
	}

	return (
		<EditModalForm
			onSubmit={e => onSubmit(e, onSaveClick)}
			onClose={onClose}
			onRemove={onRemoveClick}
			isEdit={id ?? false}
			header={t(`profile.modal.${id ? "edit" : "add"}`, {
				title: t("profile.modal.education.title"),
			})}
			removeTitle={t("profile.modal.education.title")}
		>
			<h3 className='font-jost text-[#2D2A33] text-sm'>
				{t("validation.requiredField")}
			</h3>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title={t("profile.modal.education.school")}
				value={values.school}
				options={options.school}
				containerWidth={665}
				placeHolder={t("profile.modal.education.schoolPlaceholder")}
				error={isSubmitted && errors["school"]}
				hasTools={false}
				clearOnSelect={false}
				onChange={e => handleChangeSelect(e, "school", SCHOOLS_STORE)}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title={t("profile.modal.education.degree")}
				value={values.degree}
				options={options.degree}
				containerWidth={665}
				placeHolder={t("profile.modal.education.degreePlaceholder")}
				error={isSubmitted && errors["degree"]}
				hasTools={false}
				clearOnSelect={false}
				onChange={e => handleChangeSelect(e, "degree", DEGREES_STORE)}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title={t("profile.modal.education.field")}
				value={values.fieldOfStudy}
				options={options.fieldOfStudy}
				containerWidth={665}
				placeHolder={t("profile.modal.education.fieldPlaceholder")}
				error={isSubmitted && errors["fieldOfStudy"]}
				hasTools={false}
				clearOnSelect={false}
				onChange={e => handleChangeSelect(e, "fieldOfStudy", FIELD_STORE)}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<StartEndDateForm
				values={values}
				setValues={setValues}
				setErrors={setErrors}
				errors={errors}
				onChange={onChange}
				isEndDateDisabled={values.currentlyStudying}
			/>

			<ModalCheckFormGroup
				className='pb-[10px] pr-[20px] gap-[5px]'
				name='currentlyStudying'
				onChange={onChangeInput}
				value={values.currentlyStudying}
				title={t("profile.modal.education.currentlyStudying")}
			/>

			<ModalInputFormGroup
				title={t("profile.modal.education.grade")}
				name='grade'
				type='text'
				value={values.grade}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
			/>

			<ModalTextareaFormGroup
				title={t("profile.modal.education.description")}
				name='description'
				className='pb-[10px] pr-[20px] gap-[5px]'
				onChange={onChangeInput}
				value={values.description}
				rows={7}
			/>
		</EditModalForm>
	)
}
export default AddEducation
