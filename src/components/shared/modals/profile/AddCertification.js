import {
	CERTIFICATIONS_STORE,
	COMPANIES_STORE,
} from "../../../../constants/stores"
import useForm from "../../../../hooks/useForm"
import React, { useEffect } from "react"
import { getDateTime, getLongMonth } from "../../../../utils/date"
import EditModalForm from "../../forms/EditModalForm"
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup"
import StartEndDateForm from "../../forms/StartEndDateForm"
import ModalInputFormGroup from "../../forms/ModalInputFormGroup"
import RecommendedProfileService from "../../../../services/recommendedProfileService"
import { useAlertContext } from "../../../../providers/AlertProvider"
import { useTranslation } from "react-i18next"

const AddCertification = ({ onClose, onSave, onChange, id }) => {
	const initialValues = {
		options: {
			name: JSON.parse(localStorage.getItem(CERTIFICATIONS_STORE) || "[]"),
			issuingOrganization: JSON.parse(
				localStorage.getItem(COMPANIES_STORE) || "[]",
			),
		},
		values: {
			name: "",
			issuingOrganization: "",
			startDateYear: "",
			startDateMonth: "",
			endDateYear: "",
			endDateMonth: "",
			credentialId: "",
			credentialURL: "",
		},
		errors: {
			name: true,
			issuingOrganization: true,
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
			RecommendedProfileService.getCertification(id)
				.then(({ data }) => {
					const certification = data

					const startDate = new Date(certification.issueDate)
					const endDate = certification.expirationDate
						? new Date(certification.expirationDate)
						: null

					setValues({
						...certification,
						startDateMonth: getLongMonth(startDate.getMonth()),
						startDateYear: startDate.getFullYear(),
						endDateMonth: endDate ? getLongMonth(endDate.getMonth()) : "",
						endDateYear: endDate ? endDate.getFullYear() : "",
					})

					setErrors({
						name: false,
						issuingOrganization: false,
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
				!values.endDateYear || !values.endDateMonth
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
			issuingOrganization: values.issuingOrganization,
			issueDate: getDateTime(1, values.startDateMonth, values.startDateYear),
			expirationDate: getDateTime(1, values.endDateMonth, values.endDateYear),
			credentialId: values.credentialId,
			credentialURL: values.credentialURL,
			applicationUserId: "",
		}

		if (id) {
			await RecommendedProfileService.updateCertification(model, id)
		} else {
			await RecommendedProfileService.addCertification(model)
		}

		success(
			t("alert.onSuccess", { name: t("profile.modal.certification.title1") }),
			5,
		)
		onSave()
	}

	const onRemoveClick = async () => {
		await RecommendedProfileService.removeCertification(id)
		success(
			t("alert.onRemoved", { name: t("profile.modal.certification.title1") }),
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
				title: t("profile.modal.certification.title"),
			})}
			removeTitle={t("profile.modal.certification.title")}
		>
			<h3 className='font-jost text-[#2D2A33] text-sm'>
				{t("validation.requiredField")}
			</h3>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title={t("profile.modal.certification.name")}
				value={values.name}
				options={options.name}
				containerWidth={665}
				placeHolder={t("profile.modal.certification.namePlaceholder")}
				error={isSubmitted && errors["name"]}
				hasTools={false}
				clearOnSelect={false}
				onChange={e => handleChangeSelect(e, "name", CERTIFICATIONS_STORE)}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title={t("profile.modal.certification.issuing")}
				value={values.issuingOrganization}
				options={options.issuingOrganization}
				containerWidth={665}
				placeHolder={t("profile.modal.certification.issuingPlaceholder")}
				error={isSubmitted && errors["issuingOrganization"]}
				hasTools={false}
				clearOnSelect={false}
				onChange={e =>
					handleChangeSelect(e, "issuingOrganization", COMPANIES_STORE)
				}
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
				startTitle={t("profile.modal.certification.issue")}
				endTitle={t("profile.modal.certification.expiration")}
				isEndDateDisabled={false}
			/>

			<ModalInputFormGroup
				title={t("profile.modal.certification.credentialId")}
				name='credentialId'
				type='text'
				value={values.credentialId}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
			/>

			<ModalInputFormGroup
				title={t("profile.modal.certification.credentialUrl")}
				name='credentialURL'
				type='url'
				value={values.credentialURL}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
			/>
		</EditModalForm>
	)
}
export default AddCertification
