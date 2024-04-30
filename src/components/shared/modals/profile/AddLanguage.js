import React, { useEffect } from "react"
import useForm from "../../../../hooks/useForm"
import EditModalForm from "../../forms/EditModalForm"
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup"
import AdditionalProfileService from "../../../../services/additionalProfileService"
import { useAlertContext } from "../../../../providers/AlertProvider"
import { useTranslation } from "react-i18next"

const AddLanguage = ({ onClose, onSave, onChange, id }) => {
	const { t } = useTranslation()

	const initialValues = {
		options: {
			language: [],
			proficiency: t("profile.modal.language.proficiencies", {
				returnObjects: true,
			}),
		},
		values: {
			language: "",
			proficiency: "",
		},
		errors: {
			language: true,
			proficiency: true,
		},
	}
	const {
		options,
		values,
		errors,
		isSubmitted,
		handleChangeSelect,
		onSubmit,
		setErrors,
		setValues,
		setOptions,
	} = useForm(initialValues, onChange)
	const { success } = useAlertContext()

	const onSaveClick = async () => {
		const languageId = options.language.find(
			val => val.label === values.language,
		).value

		if (id) {
			await AdditionalProfileService.updateLanguage({
				id,
				languageId: languageId,
				language: {
					name: values.language,
					id: languageId,
				},
				proficiency: values.proficiency,
			})
		} else {
			await AdditionalProfileService.addLanguage({
				proficiency: values.proficiency,
				languageId: languageId,
				language: {
					name: values.language,
					id: languageId,
				},
			})
		}

		success(
			t("alert.onSuccess", { name: t("profile.modal.language.title1") }),
			5,
		)
		onSave()
	}

	const onRemoveClick = async () => {
		await AdditionalProfileService.removeLanguage(id)
		success(
			t("alert.onRemoved", { name: t("profile.modal.language.title1") }),
			5,
		)

		onSave()
	}

	useEffect(() => {
		AdditionalProfileService.getAllLanguages().then(({ data }) => {
			setOptions(prev => ({
				...prev,
				language: data.map(val => ({ value: val.id, label: val.name })),
			}))
		})

		if (id) {
			AdditionalProfileService.getLanguages().then(({ data }) => {
				const language = data.filter(val => val.id === +id)?.[0]

				if (!language) {
					onClose()
					return
				}

				setValues({
					language: language.language.name,
					proficiency: language.proficiency,
				})

				setErrors({
					language: false,
					proficiency: false,
				})
			})
		}
	}, [id])

	return (
		<EditModalForm
			onSubmit={e => onSubmit(e, onSaveClick)}
			onClose={onClose}
			onRemove={onRemoveClick}
			isEdit={id ?? false}
			header={t(`profile.modal.${id ? "edit" : "add"}`, {
				title: t("profile.modal.language.title"),
			})}
			removeTitle={t("profile.modal.language.title")}
		>
			<h3 className='font-jost text-[#2D2A33] text-sm'>
				{t("validation.requiredField")}
			</h3>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title={t("profile.modal.language.language")}
				value={values.language}
				options={options.language}
				containerWidth={300}
				placeHolder={t("profile.modal.language.selectList")}
				error={isSubmitted && errors["language"]}
				hasTools={false}
				clearOnSelect={false}
				onEnterSelect={false}
				onChange={e => handleChangeSelect(e, "language")}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title={t("profile.modal.language.proficiency")}
				value={values.proficiency}
				options={options.proficiency}
				containerWidth={300}
				containerHeightMax={200}
				placeHolder={t("profile.modal.language.selectList")}
				error={isSubmitted && errors["proficiency"]}
				hasTools={true}
				clearOnSelect={false}
				searchAble={false}
				onChange={e => handleChangeSelect(e, "proficiency")}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>
		</EditModalForm>
	)
}
export default AddLanguage
