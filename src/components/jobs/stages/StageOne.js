import { useTranslation } from "react-i18next"
import ModalSelectFormGroup from "../../shared/forms/ModalSelectFormGroup"
import CompanyItem from "../CompanyItem"
import ModalInputFormGroup from "../../shared/forms/ModalInputFormGroup"
import MDEditor, { commands } from "@uiw/react-md-editor"
import SkillsEditor from "../SkillsEditor/SkillsEditor"
import profileService from "../../../services/profileService"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../shared/Loader"

const stringify = obj => obj?.companyName || ""

const StageOne = ({
	values,
	companies,
	errors,
	touched,
	setValues,
	handleChange,
}) => {
	const { t } = useTranslation()

	const employmentTypes = t("profile.modal.jobPreferences.employmentTypes", {
		returnObjects: true,
	})

	const experienceLevels = t("jobs.publish.experienceLevels", {
		returnObjects: true,
	})

	const { data: skills, isLoading: skillsLoading } = useQuery({
		queryFn: () => profileService.getAllSkills(),
		queryKey: ["allSkills"],
		select: ({ data }) =>
			data.map(val => ({
				label: val.name,
				value: val.id,
			})),
	})

	if (skillsLoading) return <Loader />

	return (
		<>
			<div className='grid grid-cols-2'>
				<div className='flex flex-col gap-4 px-6 py-4'>
					<ModalSelectFormGroup
						className='w-[400px]'
						title={t("jobs.publish.company")}
						value={stringify(values.company)}
						options={companies}
						containerWidth={400}
						placeHolder=''
						isAbsolute={true}
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
						name='title'
						type='text'
						value={values.title}
						error={errors.title && touched.title}
						onChange={handleChange}
						className='w-[400px]'
						errorChildren={
							<h3 className='mt-2 text-[#9E0F20] text-xs'>
								{t("validation.required")}
							</h3>
						}
					/>
				</div>

				<div className='flex flex-col gap-4 px-6 pb-4'>
					<ModalInputFormGroup
						title={t("jobs.publish.location")}
						name='location'
						type='text'
						value={values.location}
						error={errors.location && touched.location}
						onChange={handleChange}
						className='w-[400px]'
						errorChildren={
							<h3 className='mt-2 text-[#9E0F20] text-xs'>
								{t("validation.required")}
							</h3>
						}
					/>
				</div>

				<div className='flex flex-col gap-4 px-6 pb-4'>
					<ModalSelectFormGroup
						className='w-[400px]'
						title={t("jobs.publish.employmentType")}
						value={values.employmentType?.label}
						options={employmentTypes}
						containerWidth={400}
						placeHolder=''
						error={errors.employmentType && touched.employmentType}
						hasTools={false}
						isAbsolute={true}
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

				<div className='flex flex-col gap-4 px-6 pb-4'>
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
						isAbsolute={true}
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
					commands={[
						commands.bold,
						commands.italic,
						commands.strikethrough,
						commands.hr,
						commands.divider,
						commands.orderedListCommand,
						commands.unorderedListCommand,
						commands.checkedListCommand,
					]}
					extraCommands={[]}
					visibleDragbar={false}
					onChange={value =>
						setValues(prev => ({ ...prev, description: value }))
					}
				/>
			</div>

			<div className='px-6 py-4'>
				<h1 className='font-jost text-[#2D2A33] mb-2'>
					{t("jobs.publish.addSkills")}
				</h1>

				<SkillsEditor
					setSkills={values => {
						setValues(prev => ({ ...prev, skills: values }))
					}}
					skillsList={skills}
					skills={values.skills}
					buttonTitle={t("jobs.publish.addSkill")}
				/>
			</div>

			<div className='px-6 py-4'>
				<h1 className='font-jost text-[#2D2A33] mb-2'>
					{t("jobs.publish.whereGetApplicants")}
				</h1>

				<div className='flex flex-row items-center gap-10'>
					<div className='flex flex-col gap-1'>
						<div className='inline-flex gap-4'>
							<input
								type='radio'
								id='toRecruiterWebsite'
								className='w-5 h-5'
								name='sendEmailsToRecruiter'
								checked={values.sendEmailsToRecruiter === false}
								onChange={e =>
									setValues(prev => ({
										...prev,
										sendEmailsToRecruiter: false,
									}))
								}
							/>
							<label
								htmlFor='toRecruiterWebsite'
								className='font-jost text-[#2D2A33]'
							>
								{t("jobs.publish.websiteToRecruiter")}
							</label>
						</div>
					</div>

					<div className='flex flex-col gap-1'>
						<div className='inline-flex gap-4'>
							<input
								type='radio'
								id='toRecruiterEmail'
								name='sendEmailsToRecruiter'
								className='w-5 h-5'
								checked={values.sendEmailsToRecruiter}
								onChange={e =>
									setValues(prev => ({
										...prev,
										sendEmailsToRecruiter: true,
									}))
								}
							/>
							<label
								htmlFor='toRecruiterEmail'
								className='font-jost text-[#2D2A33]'
							>
								{t("jobs.publish.sendEmailsToRecruiter")}
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default StageOne
