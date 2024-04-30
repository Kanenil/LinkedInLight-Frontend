import useForm from "../../../../hooks/useForm"
import React, { useEffect } from "react"
import RecommendedProfileService from "../../../../services/recommendedProfileService"
import ModalInputFormGroup from "../../forms/ModalInputFormGroup"
import EditModalForm from "../../forms/EditModalForm"
import { useAlertContext } from "../../../../providers/AlertProvider"
import { useTranslation } from "react-i18next"

const AddCourse = ({ onClose, onSave, onChange, id }) => {
	const initialValues = {
		options: {},
		values: {
			name: "",
			number: "",
			associatedWith: "",
		},
		errors: {
			name: true,
		},
	}
	const {
		values,
		onChangeInput,
		onSubmit,
		setErrors,
		setValues,
		errors,
		isSubmitted,
	} = useForm(initialValues, onChange)
	const { success } = useAlertContext()
	const { t } = useTranslation()

	useEffect(() => {
		if (id) {
			RecommendedProfileService.getCourse(id)
				.then(({ data }) => {
					setValues({
						...data,
					})
					setErrors({
						name: false,
					})
				})
				.catch(() => onClose())
		}
	}, [id])

	const onSaveClick = async () => {
		const model = {
			id: id ?? 0,
			name: values.name,
			number: values.number,
			associatedWith: values.associatedWith,
			applicationUserId: "",
		}

		if (id) {
			await RecommendedProfileService.updateCourse(model, id)
		} else {
			await RecommendedProfileService.addCourse(model)
		}

		success(t("alert.onSuccess", { name: t("profile.modal.course.title1") }), 5)
		onSave()
	}

	const onRemoveClick = async () => {
		await RecommendedProfileService.removeCourse(id)
		success(t("alert.onRemoved", { name: t("profile.modal.course.title1") }), 5)

		onSave()
	}

	return (
		<EditModalForm
			onSubmit={e => onSubmit(e, onSaveClick)}
			onClose={onClose}
			onRemove={onRemoveClick}
			isEdit={id ?? false}
			header={t(`profile.modal.${id ? "edit" : "add"}`, {
				title: t("profile.modal.course.title"),
			})}
			removeTitle={t("profile.modal.course.title")}
		>
			<h3 className='font-jost text-[#2D2A33] text-sm'>
				{t("validation.requiredField")}
			</h3>

			<ModalInputFormGroup
				title={t("profile.modal.course.name")}
				name='name'
				type='text'
				value={values.name}
				error={errors.name && isSubmitted}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.requiredField")}
					</h3>
				}
			/>

			<ModalInputFormGroup
				title={t("profile.modal.course.number")}
				name='number'
				type='text'
				value={values.number}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
			/>

			<ModalInputFormGroup
				title={t("profile.modal.course.associated")}
				name='associatedWith'
				type='text'
				value={values.associatedWith}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
			/>
		</EditModalForm>
	)
}
export default AddCourse
