import useForm from "../../../../hooks/useForm"
import React, { useEffect } from "react"
import { getDateTime, getLongMonth } from "../../../../utils/date"
import AdditionalProfileService from "../../../../services/additionalProfileService"
import ModalInputFormGroup from "../../forms/ModalInputFormGroup"
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup"
import ModalCheckFormGroup from "../../forms/ModalCheckFormGroup"
import StartEndDateForm from "../../forms/StartEndDateForm"
import EditModalForm from "../../forms/EditModalForm"
import { useAlertContext } from "../../../../providers/AlertProvider"
import { useTranslation } from "react-i18next"

const AddVolunteerExperience = ({ onClose, onSave, onChange, id }) => {
	const initialValues = {
		options: {},
		values: {
			organization: "",
			role: "",
			cause: "",
			startDateYear: "",
			startDateMonth: "",
			endDateYear: "",
			endDateMonth: "",
			currentlyVolunteering: false,
			description: "",
		},
		errors: {
			organization: true,
			role: true,
			endDate: null,
			startDate: null,
		},
	}
	const {
		values,
		errors,
		isSubmitted,
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
			AdditionalProfileService.getVolunteerExperience(id)
				.then(({ data }) => {
					const startDate = new Date(data.startDate)
					const endDate = data.endDate ? new Date(data.endDate) : null

					setValues({
						...data,
						startDateMonth: getLongMonth(startDate.getMonth()),
						startDateYear: startDate.getFullYear(),
						endDateMonth: endDate ? getLongMonth(endDate.getMonth()) : "",
						endDateYear: endDate ? endDate.getFullYear() : "",
					})

					setErrors({
						organization: false,
					})
				})
				.catch(() => onClose())
		}
	}, [id])

	const onSaveClick = async () => {
		let savedErrors = {
			startDate:
				!values.startDateYear || !values.startDateMonth
					? t("validation.required")
					: null,
			endDate:
				(!values.endDateYear || !values.endDateMonth) &&
				!values.currentlyVolunteering
					? t("validation.required")
					: null,
		}

		if (Object.values(savedErrors).some(error => error)) {
			setErrors({
				...errors,
				...savedErrors,
			})
			setIsSubmitted(true)
			return
		}

		const model = {
			id: id ?? 0,
			organization: values.organization,
			cause: values.cause,
			role: values.role,
			startDate: getDateTime(1, values.startDateMonth, values.startDateYear),
			endDate:
				getDateTime(1, values.endDateMonth, values.endDateYear) ?? new Date(),
			currentlyVolunteering: getDateTime(
				1,
				values.endDateMonth,
				values.endDateYear,
			)
				? values.currentlyVolunteering
				: true,
			description: values.description,
			applicationUserId: "",
		}

		if (id) {
			await AdditionalProfileService.updateVolunteerExperience(model, id)
		} else {
			await AdditionalProfileService.addVolunteerExperience(model)
		}

		success(
			t("alert.onSuccess", { name: t("profile.modal.volunteer.title1") }),
			5,
		)
		onSave()
	}

	const onRemoveClick = async () => {
		await AdditionalProfileService.removeVolunteerExperience(id)
		success(
			t("alert.onRemoved", { name: t("profile.modal.volunteer.title1") }),
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
				title: t("profile.modal.volunteer.title"),
			})}
			removeTitle={t("profile.modal.volunteer.title")}
		>
			<h3 className='font-jost text-[#2D2A33] text-sm'>
				{t("validation.requiredField")}
			</h3>

			<ModalInputFormGroup
				title={t("profile.modal.volunteer.organization")}
				name='organization'
				type='text'
				value={values.organization}
				error={errors.organization && isSubmitted}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<ModalInputFormGroup
				title={t("profile.modal.volunteer.role")}
				name='role'
				type='text'
				value={values.role}
				error={errors.role && isSubmitted}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<ModalInputFormGroup
				title={t("profile.modal.volunteer.cause")}
				name='cause'
				type='text'
				value={values.cause}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
			/>

			<ModalCheckFormGroup
				className='pb-[10px] pr-[20px] gap-[5px]'
				name='currentlyVolunteering'
				onChange={onChangeInput}
				value={values.currentlyVolunteering}
				title={t("profile.modal.volunteer.currentlyVolunteering")}
			/>

			<StartEndDateForm
				values={values}
				setValues={setValues}
				setErrors={setErrors}
				errors={errors}
				onChange={onChange}
				endTitle={t("profile.modal.volunteer.endDate")}
				isEndDateDisabled={values.currentlyVolunteering}
				isExpected={false}
			/>

			<ModalTextareaFormGroup
				title={t("profile.modal.volunteer.description")}
				name='description'
				className='pb-[10px] pr-[20px] gap-[5px]'
				onChange={onChangeInput}
				value={values.description}
				rows={7}
			/>
		</EditModalForm>
	)
}
export default AddVolunteerExperience
