import { useState } from "react"
import { useTranslation } from "react-i18next"
import * as yup from "yup"
import { useFormik } from "formik"
import MDEditor from "@uiw/react-md-editor"

import Button from "../../elements/buttons/Button"
import ModalSelectFormGroup from "../shared/forms/ModalSelectFormGroup"
import ModalInputFormGroup from "../shared/forms/ModalInputFormGroup"
import CompanyItem from "./CompanyItem"
import ScrollWrapper from "../shared/ScrollWrapper"

const stages = Array.from({ length: 3 }, (_, i) => i + 1)

const PublishJobSchema = yup.object({
	id: yup.number().default(0),
	textForPost: yup.string(),
	title: yup.string(),
	description: yup.string(),
	postedAt: yup.string(),
	companyId: yup.number().required("validation.required"),
	company: yup.object(),
	recruiterId: yup.string(),
	location: yup.string(),
	employmentType: yup.string(),
	experienceLevel: yup.string(),
	function: yup.string(),
	sendEmailsToRecruiter: yup.bool(),
	industryId: yup.number(),
	companyImage: yup.string(),
})

const stringify = obj => obj?.companyName || ""

const PublishJob = ({ companies, userId }) => {
	const { t } = useTranslation()

	const [stage, setStage] = useState(1)

	const stagesNames = t("jobs.publish.stages", { returnObjects: true })

	const employmentTypes = t("profile.modal.jobPreferences.employmentTypes", {
		returnObjects: true,
	})

	const experienceLevels = t("jobs.publish.experienceLevels", {
		returnObjects: true,
	})

	const initValues = PublishJobSchema.cast({
		id: 0, //
		textForPost: "", //
		title: "",
		description: "",
		postedAt: new Date().toISOString(),
		companyId: companies[0].id,
		company: companies[0],
		recruiterId: userId,
		location: "", //
		employmentType: "", //
		experienceLevel: "", //
		function: "",
		sendEmailsToRecruiter: false,
		industryId: 0,
		companyImage: companies[0].logoImg,
	})

	const onSubmitFormik = values => {}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: PublishJobSchema,
		onSubmit: onSubmitFormik,
	})

	const {
		values,
		errors,
		handleSubmit,
		handleChange,
		setValues,
		touched,
		setErrors,
	} = formik

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col my-8 mx-auto w-full md:container lg:w-[1170px]'
		>
			<div className='flex flex-row justify-center items-center -mb-[1px] z-10'>
				{stages.map(s => (
					<div
						key={s}
						className={`flex flex-col items-center border-[#B4BFDD]  justify-center w-8 h-8  bg-white ${
							s === stage
								? "border-[1px] border-b-transparent text-black"
								: "border-[1px] text-[#7D88A4]"
						}`}
					>
						{s}
					</div>
				))}
			</div>
			<ScrollWrapper className='flex-grow bg-white border-[#B4BFDD] border-[1px] rounded-lg'>
				<div className='flex flex-row gap-4 p-6 font-jost border-b-[#B4BFDD] border-b-[1px]'>
					<h1 className='text-xl font-bold'>
						{t("jobs.publish.stage", { stage })}
					</h1>

					<h3 className='text-xl'>{stagesNames[stage - 1]}</h3>
				</div>

				<div className='grid grid-cols-2'>
					<div className='flex flex-col gap-4 px-6 py-4'>
						<ModalSelectFormGroup
							className='w-[400px]'
							title={t("jobs.publish.company")}
							value={stringify(values.company)}
							options={companies}
							containerWidth={400}
							placeHolder=''
							error={errors.companyId && touched.companyId}
							hasTools={false}
							clearOnSelect={false}
							onChange={e => {
								setValues(prev => ({
									...prev,
									company: e,
									companyId: e.id,
									companyImage: e.logoImg,
								}))
							}}
							item={<CompanyItem />}
							searchFunc={search => el => {
								return el.companyName.toLowerCase().indexOf(search) >= 0
							}}
							errorChildren={
								<h3 className='mt-2 text-[#9E0F20] text-xs'>
									{t("validation.required")}
								</h3>
							}
						/>
					</div>

					<div className='flex flex-col gap-4 px-6 py-4'>
						<ModalInputFormGroup
							title={t("jobs.publish.positionName")}
							name='textForPost'
							type='text'
							value={values.textForPost}
							onChange={handleChange}
							className='w-[400px]'
						/>
					</div>

					<div className='flex flex-col gap-4 px-6 py-4'>
						<ModalInputFormGroup
							title={t("jobs.publish.location")}
							name='location'
							type='text'
							value={values.location}
							onChange={handleChange}
							className='w-[400px]'
						/>
					</div>

					<div className='flex flex-col gap-4 px-6 py-4'>
						<ModalSelectFormGroup
							className='w-[400px]'
							title={t("jobs.publish.employmentType")}
							value={values.employmentType?.label}
							options={employmentTypes}
							containerWidth={400}
							placeHolder=''
							error={errors.employmentType && touched.employmentType}
							hasTools={false}
							clearOnSelect={false}
							onChange={e =>
								setValues(prev => ({
									...prev,
									employmentType: e,
								}))
							}
							errorChildren={
								<h3 className='mt-2 text-[#9E0F20] text-xs'>
									{t("validation.required")}
								</h3>
							}
						/>
					</div>

					<div className='flex flex-col gap-4 px-6 py-4'>
						<ModalSelectFormGroup
							className='w-[400px]'
							title={t("jobs.publish.experienceLevel")}
							value={values.experienceLevel?.label}
							options={experienceLevels}
							containerWidth={400}
							placeHolder=''
							error={errors.experienceLevel && touched.experienceLevel}
							hasTools={false}
							clearOnSelect={false}
							onChange={e =>
								setValues(prev => ({
									...prev,
									experienceLevel: e,
								}))
							}
							errorChildren={
								<h3 className='mt-2 text-[#9E0F20] text-xs'>
									{t("validation.required")}
								</h3>
							}
						/>
					</div>
				</div>

				<div className='px-6 py-4'>
					<h1 className='font-jost text-[#2D2A33]'>
						{t("jobs.publish.description")}
					</h1>

					<MDEditor
						height='250px'
						data-color-mode='light'
						preview='edit'
						value={values.description}
						onChange={value =>
							setValues(prev => ({ ...prev, description: value }))
						}
					/>
				</div>
			</ScrollWrapper>
			<div className='flex flex-row justify-center items-center'>
				<Button
					variant='primary'
					type='submit'
					className='rounded-bl-lg bg-[#517CE3] hover:bg-[#3d5999] min-w-[200px]'
				>
					{t("jobs.publish.save")}
				</Button>
				<Button variant='primary' className='rounded-br-lg min-w-[200px]'>
					{t("jobs.publish.continue")}
				</Button>
			</div>
		</form>
	)
}
export default PublishJob
