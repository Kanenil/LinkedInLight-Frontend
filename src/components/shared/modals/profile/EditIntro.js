import EditModalForm from "../../forms/EditModalForm"
import React, { useEffect } from "react"
import ModalInputFormGroup from "../../forms/ModalInputFormGroup"
import { Link } from "react-router-dom"
import AdditionalProfileService from "../../../../services/additionalProfileService"
import { authService } from "../../../../services/authService"
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup"
import { useAlertContext } from "../../../../providers/AlertProvider"
import { useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import * as yup from "yup"

const IntroSchema = yup.object({
	id: yup.string(),
	firstName: yup.string().required("This field is required!"),
	lastName: yup.string().required("This field is required!"),
	additionalName: yup.string(),
	country: yup.string().required("This field is required!"),
	headline: yup.string(),
	city: yup.string().required("This field is required!"),
	image: yup.string().default(""),
	address: yup.string(),
	lastPosition: yup.string(),
	isClosed: yup.bool(),
	isHibernated: yup.bool(),
	profileUrl: yup.string(),
})

const initValues = {
	id: "",
	firstName: "",
	lastName: "",
	additionalName: "",
	country: "",
	headline: "",
	city: "",
	image: "",
	address: "",
	lastPosition: "",
	isClosed: false,
	isHibernated: false,
	profileUrl: "",
}

const EditIntro = ({ onClose, onSave, onChange }) => {
	const { success } = useAlertContext()

	const onSubmitFormik = async values => {
		await AdditionalProfileService.updateIntro(values)

		success("Intro successfully saved.", 5)
		onSave()
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: IntroSchema,
		onSubmit: onSubmitFormik,
	})

	const { values, errors, touched, handleSubmit, handleChange, setValues } =
		formik

	const { data: countries } = useQuery({
		queryFn: () => authService.countries(),
		queryKey: ["countries"],
		select: ({ data }) =>
			data.map(val => ({
				value: val.name,
				label: val.name,
			})),
	})

	const { data: cities, refetch } = useQuery({
		queryFn: ({ queryKey }) => authService.cities(queryKey[1]),
		queryKey: ["cities", values.country],
		select: ({ data }) =>
			Array.from(new Set(data.map(val => val.name))).map(name => ({
				value: name,
				label: name,
			})),
		enabled: !!values.country,
	})

	useEffect(() => {
		AdditionalProfileService.getIntro()
			.then(({ data }) => {
				setValues({
					...data,
					additionalName: data.additionalName ?? "",
					address: data.address ?? "",
					headline: data.headline ?? "",
					image: data.headline ?? "",
					lastPosition: data.lastPosition ?? "",
				})
				onChange()
			})
			.catch(() => onClose())
	}, [])

	useEffect(() => {
		if (values.country) refetch()
	}, [values.country])

	return (
		<EditModalForm
			onSubmit={handleSubmit}
			onClose={onClose}
			onRemove={null}
			isEdit={false}
			header={"Edit intro"}
		>
			<h3 className='font-jost text-[#2D2A33] text-sm'>
				Required fields are marked with *
			</h3>

			<ModalInputFormGroup
				title='First name *'
				name='firstName'
				type='text'
				value={values.firstName}
				error={errors.firstName && touched}
				onChange={handleChange}
				className='pb-[10px] pr-[20px] gap-[5px]'
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>{errors.lastName}</h3>
				}
			/>

			<ModalInputFormGroup
				title='Last name *'
				name='lastName'
				type='text'
				value={values.lastName}
				error={errors.lastName && touched}
				onChange={handleChange}
				className='pb-[10px] pr-[20px] gap-[5px]'
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>{errors.lastName}</h3>
				}
			/>

			<ModalInputFormGroup
				title='Additional Name'
				name='additionalName'
				type='text'
				value={values.additionalName}
				onChange={handleChange}
				className='pb-[10px] pr-[20px] gap-[5px]'
			/>

			<ModalInputFormGroup
				title='Headline'
				name='headline'
				type='text'
				value={values.headline}
				onChange={handleChange}
				className='pb-[10px] pr-[20px] gap-[5px]'
			/>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title='Country *'
				value={values.country}
				options={countries ?? []}
				containerWidth={300}
				containerHeightMax={150}
				placeHolder='ex: USA'
				error={errors.country}
				hasTools={false}
				isAbsolute={true}
				clearOnSelect={false}
				onEnterSelect={false}
				onChange={e => {
					setValues(prev => ({
						...prev,
						country: e.label,
						city: "",
					}))
				}}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>{errors.country}</h3>
				}
			/>

			<ModalSelectFormGroup
				className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
				title='City *'
				value={values.city || ""}
				options={cities ?? []}
				containerWidth={300}
				containerHeightMax={150}
				placeHolder='ex: Washington'
				error={errors.city}
				hasTools={false}
				isAbsolute={true}
				clearOnSelect={false}
				onEnterSelect={false}
				onChange={e =>
					setValues(prev => ({
						...prev,
						city: e.label,
					}))
				}
				errorChildren={
					<h3 className='mt-2 text-[#9E0F20] text-xs'>{errors.city}</h3>
				}
			/>

			<ModalInputFormGroup
				title='Last Position'
				name='lastPosition'
				type='text'
				value={values.lastPosition}
				onChange={handleChange}
				className='pb-[10px] pr-[20px] gap-[5px]'
			/>

			<div className='flex flex-col pt-[5px] pr-[15px] pb-[10px] gap-[5px]'>
				<h1 className='font-jost text-[#2D2A33] text-lg font-semibold'>
					Contact information
				</h1>

				<h3 className='font-jost text-sm text-[#2D2A33] font-light'>
					Here you can add or edit your URL, email etc.
				</h3>

				<Link
					to='edit/contact-information'
					className='text-[#24459A] font-medium hover:underline'
				>
					Contact information
				</Link>
			</div>
		</EditModalForm>
	)
}
export default EditIntro
