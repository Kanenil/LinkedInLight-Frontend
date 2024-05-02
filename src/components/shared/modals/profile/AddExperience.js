import { getDateTime, getLongMonth } from "../../../../utils/date"
import React, { useEffect } from "react"
import ProfileService from "../../../../services/profileService"
import StartEndDateForm from "../../forms/StartEndDateForm"
import useForm from "../../../../hooks/useForm"
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup"
import ModalCheckFormGroup from "../../forms/ModalCheckFormGroup"
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup"
import ModalInputFormGroup from "../../forms/ModalInputFormGroup"
import EditModalForm from "../../forms/EditModalForm"
import { COMPANIES_STORE, TITLES_STORE } from "../../../../constants/stores"
import { useAlertContext } from "../../../../providers/AlertProvider"
import { useTranslation } from "react-i18next"

const AddExperience = ({ onClose, onSave, onChange, id }) => {
	const initialValues = {
		options: {
			title: JSON.parse(localStorage.getItem(TITLES_STORE) || "[]"),
			company: [],
			industry: [],
		},
		values: {
			title: "",
			company: "",
			startDateYear: "",
			startDateMonth: "",
			endDateYear: "",
			endDateMonth: "",
			description: "",
			profileHeadline: "",
			currentlyWorking: false,
			industry: "",
		},
		errors: {
			title: true,
			company: true,
			industry: true,
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
		setOptions,
	} = useForm(initialValues, onChange)
	const { success } = useAlertContext()
	const { t } = useTranslation()

	useEffect(() => {
		ProfileService.getIndustries().then(({ data }) => {
			setOptions(prev => ({
				...prev,
				industry: data.map(val => ({ value: val.id, label: val.name })),
			}))
		})
		ProfileService.getCompanies().then(({ data }) => {
			setOptions(prev => ({
				...prev,
				savedCompanies: data,
				company: data.map(val => ({ value: val.id, label: val.companyName })),
			}))
		})

		if (id) {
			ProfileService.getExperience(id)
				.then(({ data }) => {
					const experience = data

					const startDate = new Date(experience.startDate)
					const endDate = experience.endDate
						? new Date(experience.endDate)
						: null

					setValues({
						...experience,
						startDateMonth: getLongMonth(startDate.getMonth()),
						startDateYear: startDate.getFullYear(),
						endDateMonth: endDate ? getLongMonth(endDate.getMonth()) : "",
						endDateYear: endDate ? endDate.getFullYear() : "",
						industry: experience.industry.name,
						company: experience.company.companyName,
					})

					setErrors({
						title: false,
						company: false,
						industry: false,
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
			title: values.title,
			company: {
				...options.savedCompanies.find(
					val => val.companyName === values.company,
				),
			},
			startDate: getDateTime(1, values.startDateMonth, values.startDateYear),
			endDate: getDateTime(1, values.endDateMonth, values.endDateYear),
			currentlyWorking: getDateTime(1, values.endDateMonth, values.endDateYear)
				? values.currentlyWorking
				: true,
			description: values.description,
			profileHeadline: values.profileHeadline,
			industry: {
				id: options.industry.find(val => val.label === values.industry).value,
				name: values.industry,
			},
		}

		if (id) {
			await ProfileService.updateExperience(model, id)
		} else {
			await ProfileService.addExperience(model)
		}

		success(
			t("alert.onSuccess", { name: t("profile.modal.experience.title1") }),
			5,
		)
		onSave()
	}

	const onRemoveClick = async () => {
		await ProfileService.removeExperience(id)
		success(
			t("alert.onRemoved", { name: t("profile.modal.experience.title1") }),
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
				title: t("profile.modal.experience.title"),
			})}
			removeTitle={t("profile.modal.experience.title")}
		>
			<h3 className='font-jost text-[#2D2A33] text-sm'>
				{t("validation.requiredField")}
			</h3>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title={t("profile.modal.experience.jobTitle")}
				value={values.title}
				options={options.title}
				containerWidth={665}
				placeHolder={t("profile.modal.experience.titlePlaceholder")}
				error={isSubmitted && errors["title"]}
				hasTools={false}
				clearOnSelect={false}
				onChange={e => handleChangeSelect(e, "title", TITLES_STORE)}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title={t("profile.modal.experience.company")}
				value={values.company}
				options={options.company}
				containerWidth={665}
				placeHolder={t("profile.modal.experience.companyPlaceholder")}
				error={isSubmitted && errors["company"]}
				hasTools={false}
				clearOnSelect={false}
				onChange={e => handleChangeSelect(e, "company")}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title={t("profile.modal.experience.industry")}
				value={values.industry}
				options={options.industry}
				containerWidth={665}
				placeHolder={t("profile.modal.experience.industryPlaceholder")}
				error={isSubmitted && errors["industry"]}
				hasTools={false}
				onEnterSelect={false}
				clearOnSelect={false}
				onChange={e => handleChangeSelect(e, "industry")}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</h3>
				}
			/>

			<ModalCheckFormGroup
				className='pb-[10px] pr-[20px] gap-[5px]'
				name='currentlyWorking'
				onChange={onChangeInput}
				value={values.currentlyWorking}
				title={t("profile.modal.experience.currentlyWorking")}
			/>

			<StartEndDateForm
				values={values}
				setValues={setValues}
				setErrors={setErrors}
				errors={errors}
				onChange={onChange}
				isEndDateDisabled={values.currentlyWorking}
				endTitle={t("profile.modal.experience.endDate")}
				isExpected={false}
			/>

			<ModalTextareaFormGroup
				title={t("profile.modal.experience.description")}
				name='description'
				className='pb-[10px] pr-[20px] gap-[5px]'
				onChange={onChangeInput}
				value={values.description}
				rows={7}
			/>

			<ModalInputFormGroup
				title={t("profile.modal.experience.headline")}
				name='profileHeadline'
				type='text'
				value={values.profileHeadline}
				onChange={onChangeInput}
				className='pb-[10px] pr-[20px] gap-[5px]'
			>
				<h3 className='font-jost text-[#2D2A33] text-sm font-light'>
					{t("profile.modal.experience.headlineDescription")}
				</h3>
			</ModalInputFormGroup>
		</EditModalForm>
	)
}
export default AddExperience
