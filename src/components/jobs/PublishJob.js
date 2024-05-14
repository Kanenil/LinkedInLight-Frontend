import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import * as yup from "yup"
import { useFormik } from "formik"

import Button from "../../elements/buttons/Button"
import ScrollWrapper from "../shared/ScrollWrapper"
import jobPostingService from "../../services/jobPostingService"
import companyService from "../../services/companyService"
import { useSearchParams } from "react-router-dom"
import { useAlertContext } from "../../providers/AlertProvider"
import StageOne from "./stages/StageOne"

const stages = Array.from({ length: 3 }, (_, i) => i + 1)

const PublishJobSchema = yup.object({
	id: yup.number().default(0),
	textForPost: yup.string(),
	title: yup.string().required("validation.required"),
	description: yup.string(),
	postedAt: yup.string(),
	companyId: yup.number().required("validation.required"),
	company: yup.object(),
	recruiterId: yup.string(),
	location: yup.string().required("validation.required"),
	employmentType: yup.object().required("validation.required"),
	experienceLevel: yup.object().required("validation.required"),
	function: yup.string(),
	sendEmailsToRecruiter: yup.bool(),
	industryId: yup.number(),
	companyImage: yup.string(),
	skills: yup.array(),
})

const PublishJob = ({ companies, userId }) => {
	const { t } = useTranslation()
	const [searchParams, setSearchParams] = useSearchParams()
	const { success } = useAlertContext()

	const jobId = searchParams.get("jobId")

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
		employmentType: {}, //
		experienceLevel: {}, //
		function: "",
		sendEmailsToRecruiter: false,
		industryId: 0,
		companyImage: companies[0].logoImg,
		skills: [],
	})

	useEffect(() => {
		if (jobId) {
			;(async () => {
				const { data: job } = await jobPostingService.getJobPostingById(jobId)
				const { data: company } = await companyService.getCompany(job.companyId)

				const companyData = {
					...company,
					companyName: company.name,
					industryId: company.industryId,
					logoImg: company.logoImg,
				}

				const employmentType = employmentTypes.find(
					et => et.value === job.employmentType,
				)
				const experienceLevel = experienceLevels.find(
					el => el.value === job.experienceLevel,
				)

				const jobSkillsList = job.jobSkills.map(js => ({
					label: js.skill.name,
					value: js.skill.id,
				}))

				const jobData = {
					...job,
					company: companyData,
					employmentType,
					experienceLevel,
					skills: jobSkillsList,
				}

				setValues(jobData)
			})()
		}
	}, [])

	const onSubmitFormik = async values => {
		const createModel = {
			id: values.id,
			textForPost: `${values.title};${values.location}`,
			title: values.title,
			description: values.description,
			postedAt: new Date().toISOString(),
			companyId: values.companyId,
			recruiterId: values.recruiterId,
			location: values.location,
			employmentType: values.employmentType?.value,
			experienceLevel: values.experienceLevel?.value,
			function: "",
			sendEmailsToRecruiter: values.sendEmailsToRecruiter,
			industryId: values.company.industryId,
			companyImage: values.companyImage,
		}

		if (jobId) {
			await jobPostingService.updateJobPosting(createModel)

			try {
				const jobSkills = values.skills.map(skill => ({
					skillId: skill.value,
					skill: {
						id: skill.value,
						name: skill.label,
					},
					jobPostingId: values.id,
				}))
				await jobPostingService.newJobsSkills(jobSkills)
			} catch (error) {
				console.log(error)
			}

			success(t("jobs.publish.updateSuccess"), 10)
			return
		}

		const { data: posting } = await jobPostingService.newJobPosting(createModel)

		const { data: jobs } = await jobPostingService.getAllJobPostingByCompany(
			values.companyId,
		)
		const jobPostingId = jobs.pop().id

		const jobSkills = values.skills.map(skill => ({
			skillId: skill.value,
			skill: {
				id: skill.value,
				name: skill.label,
			},
			jobPostingId,
		}))

		await jobPostingService.newJobsSkills(jobSkills)

		searchParams.set("jobId", posting.id)
		setSearchParams(searchParams)

		success(t("jobs.publish.success"), 10)
	}

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
						onClick={() =>
							setStage(prev =>
								s === 1 || (s >= 1 && searchParams.get("jobId")) ? s : prev,
							)
						}
						className={`cursor-pointer flex flex-col items-center border-[#B4BFDD]  justify-center w-8 h-8  bg-white ${
							s === stage
								? "border-[1px] border-b-transparent text-black"
								: "border-[1px] text-[#7D88A4]"
						}`}
					>
						{s}
					</div>
				))}
			</div>
			<div className='flex-grow bg-white border-[#B4BFDD] border-[1px] rounded-lg'>
				<div className='flex flex-row gap-4 p-6 font-jost border-b-[#B4BFDD] border-b-[1px]'>
					<h1 className='text-xl font-bold'>
						{t("jobs.publish.stage", { stage })}
					</h1>

					<h3 className='text-xl'>{stagesNames[stage - 1]}</h3>
				</div>

				<ScrollWrapper maxHeight='65vh'>
					{stage === 1 && (
						<StageOne
							values={values}
							setValues={setValues}
							companies={companies}
							errors={errors}
							touched={touched}
							handleChange={handleChange}
						/>
					)}
				</ScrollWrapper>
			</div>
			<div className='flex flex-row justify-center items-center'>
				<Button
					variant='primary'
					type='submit'
					className='rounded-bl-lg bg-[#517CE3] hover:bg-[#3d5999] min-w-[200px]'
				>
					{t("jobs.publish.save")}
				</Button>
				<Button
					variant='primary'
					className='rounded-br-lg min-w-[200px]'
					disabled={stage === 3}
					onClick={() => {
						if (searchParams.get("jobId")) {
							setStage(prev => prev + 1)
						}
					}}
				>
					{t("jobs.publish.continue")}
				</Button>
			</div>
		</form>
	)
}
export default PublishJob
