import useForm from "../../../../hooks/useForm"
import React, { useEffect } from "react"
import { getDateTime, getLongMonth } from "../../../../utils/date"
import RecommendedProfileService from "../../../../services/recommendedProfileService"
import ModalCheckFormGroup from "../../forms/ModalCheckFormGroup"
import StartEndDateForm from "../../forms/StartEndDateForm"
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup"
import ModalInputFormGroup from "../../forms/ModalInputFormGroup"
import EditModalForm from "../../forms/EditModalForm"
import { useAlertContext } from "../../../../providers/AlertProvider"
import { useTranslation } from "react-i18next"

const AddProject = ({ onClose, onSave, onChange, id }) => {
	const initialValues = {
		options: {},
		values: {
			name: "",
			description: "",
			associatedWith: "",
			startDateYear: "",
			startDateMonth: "",
			endDateYear: "",
			endDateMonth: "",
			currentlyWorking: false,
			projectContributors: [],
		},
		errors: {
			name: true,
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
			RecommendedProfileService.getProject(id)
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
						name: false,
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
				!values.currentlyWorking
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
			name: values.name,
			associatedWith: values.associatedWith,
			startDate: getDateTime(1, values.startDateMonth, values.startDateYear),
			endDate: getDateTime(1, values.endDateMonth, values.endDateYear),
			currentlyWorking: getDateTime(1, values.endDateMonth, values.endDateYear)
				? values.currentlyWorking
				: true,
			description: values.description,
			applicationUserId: "",
			projectContributors: [],
		}

		if (id) {
			await RecommendedProfileService.updateProject(model, id)
		} else {
			await RecommendedProfileService.addProject(model)
		}

		success(
			t("alert.onSuccess", { name: t("profile.modal.project.title1") }),
			5,
		)
		onSave()
	}

	const onRemoveClick = async () => {
		await RecommendedProfileService.removeProject(id)
		success(
			t("alert.onRemoved", { name: t("profile.modal.project.title1") }),
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
				title: t("profile.modal.project.title"),
			})}
			removeTitle={t("profile.modal.project.title")}
		>
			<h3 className='font-jost text-[#2D2A33] text-sm'>
				{t("validation.requiredField")}
			</h3>

			<ModalInputFormGroup
				title={t("profile.modal.project.name")}
				name='name'
				type='text'
				value={values.name}
				error={errors.name && isSubmitted}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<ModalInputFormGroup
				title={t("profile.modal.project.associated")}
				name='associatedWith'
				type='text'
				value={values.associatedWith}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
			/>

			<ModalTextareaFormGroup
				title={t("profile.modal.project.description")}
				name='description'
				className='pb-[10px] pr-[20px] gap-[5px]'
				onChange={onChangeInput}
				value={values.description}
				rows={7}
			/>

			<ModalCheckFormGroup
				className='pb-[10px] pr-[20px] gap-[5px]'
				name='currentlyWorking'
				onChange={onChangeInput}
				value={values.currentlyWorking}
				title={t("profile.modal.project.currentlyWorking")}
			/>

			<StartEndDateForm
				values={values}
				setValues={setValues}
				setErrors={setErrors}
				errors={errors}
				onChange={onChange}
				endTitle={t("profile.modal.project.endDate")}
				isEndDateDisabled={values.currentlyWorking}
			/>
		</EditModalForm>
	)
}
export default AddProject
