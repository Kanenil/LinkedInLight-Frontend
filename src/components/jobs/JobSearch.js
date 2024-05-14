import { useTranslation } from "react-i18next"
import Button from "../../elements/buttons/Button"
import useOverflow from "../../hooks/useOverflow"
import classNames from "classnames"
import { useQuery } from "@tanstack/react-query"
import searchService from "../../services/searchService"
import Loader from "../shared/Loader"
import { imageUrl } from "../../utils/converters"
import { useEffect, useState } from "react"
import { getTimeDuration } from "../../utils/date"
import { ClockIcon } from "@heroicons/react/24/outline"
import jobPostingService from "../../services/jobPostingService"
import { Link, useSearchParams } from "react-router-dom"
import MDEditor from "@uiw/react-md-editor"
import ScrollWrapper from "../shared/ScrollWrapper"

const JobSearch = ({ search, selected }) => {
	const { t } = useTranslation()
	const [selectedJob, setSelectedJob] = useState(null)
	const [filteredData, setFilteredData] = useState([])
	const [searchParams, setSearchParams] = useSearchParams()

	const { isOverflow, containerRef, contentRef } = useOverflow()

	const { data, isLoading } = useQuery({
		queryKey: ["search", search],
		queryFn: ({ queryKey }) => searchService.search(queryKey[1]),
		select: ({ data }) => data,
		staleTime: 1000,
	})

	useEffect(() => {
		jobPostingService.getJobPostingById(selected).then(async ({ data }) => {
			const { data: applicants } = await jobPostingService.getApplicantsCount(
				data.id,
			)
			const { data: applied } = await jobPostingService.ifApplied(data.id)

			console.log(applied)

			setSelectedJob({ ...data, applicants, applied: !applied })
		})
	}, [selected])

	useEffect(() => {
		;(async () => {
			if (!data) return

			const jobList = await Promise.all(
				data.jobList.map(async job => {
					const { data: applicants } =
						await jobPostingService.getApplicantsCount(job.id)
					return { ...job, applicants }
				}),
			)
			setFilteredData(jobList)
		})()
	}, [data])

	const employmentTypes = t("profile.modal.jobPreferences.employmentTypes", {
		returnObjects: true,
	})

	const experienceLevels = t("jobs.publish.experienceLevels", {
		returnObjects: true,
	})

	const dot = (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='3'
			height='3'
			viewBox='0 0 3 3'
			fill='none'
		>
			<path
				d='M0 1.51205C0 1.23092 0.0883534 0.993976 0.26506 0.801205C0.449799 0.600402 0.698795 0.5 1.01205 0.5C1.33333 0.5 1.58635 0.596386 1.77108 0.789157C1.95582 0.981928 2.04819 1.22289 2.04819 1.51205C2.04819 1.78514 1.95582 2.01807 1.77108 2.21084C1.58635 2.40361 1.33333 2.5 1.01205 2.5C0.698795 2.5 0.449799 2.40361 0.26506 2.21084C0.0883534 2.01807 0 1.78514 0 1.51205Z'
				fill='#2D2A33'
			/>
		</svg>
	)

	return (
		<main className='flex flex-col gap-2 flex-grow bg-[#E7E7E7]'>
			<div className='w-full bg-white'>
				<div className='flex flex-row mx-auto gap-4 w-full md:container lg:w-[1170px] p-5'>
					<Button variant='primary' rounded='full'>
						{t("jobs.jobs")}
					</Button>

					<Button variant='tertiary' rounded='full'>
						{t("jobs.publishDate")}
					</Button>

					<Button variant='tertiary' rounded='full'>
						{t("jobs.experienceLevel")}
					</Button>

					<Button variant='tertiary' rounded='full'>
						{t("jobs.company")}
					</Button>
				</div>
			</div>

			<div className='flex flex-col flex-grow md:flex-row my-8 mx-auto w-full md:container lg:w-[1170px]'>
				<div className='w-6/12 bg-white border-[#B4BFDD] border-[1px] rounded-l-lg'>
					<div className='flex flex-row font-jost items-center p-5 border-b-[1px] border-b-[#B4BFDD]'>
						<h1 className='text-lg'>{search}</h1>
					</div>
					<div
						ref={containerRef}
						className={classNames(
							"flex flex-col max-h-[70vh]",
							isOverflow && "overflow-y-auto",
						)}
					>
						<div ref={contentRef} className='flex flex-col gap-4'>
							{isLoading ? (
								<Loader />
							) : (
								<>
									{filteredData.map(job => (
										<button
											key={job.id}
											onClick={() => {
												searchParams.set("selected", job.id)
												setSearchParams(searchParams)
											}}
											className={classNames(
												"flex flex-row gap-4 text-start",
												+selected === job.id && "bg-[#EEF1FB]",
											)}
										>
											<div className='my-auto'>
												<img
													src={imageUrl(job.companyImage)}
													alt={job.companyId}
													className='w-full h-full object-contain rounded-lg'
												/>
											</div>

											<div className='flex flex-col w-full'>
												<h1 className='font-jost text-lg'>{job.title}</h1>
												<p className='font-jost text-[#6E7191]'>
													{job.companyName}
												</p>
												<p className='font-jost text-sm text-[#6E7191]'>
													{job.location}
													{" " + t("jobs.easyApply")}
												</p>
												<span className='mt-5 flex flex-row mr-2 font-jost text-xs text-[#6E7191]'>
													{getTimeDuration(job.postedAt)}
													{" " + t("jobs.easyApply")}
													<p className='ml-auto text-[#556DA9]'>
														{t("candidates", { count: job.applicants })}
													</p>
												</span>
											</div>
										</button>
									))}
								</>
							)}
						</div>
					</div>
				</div>

				<ScrollWrapper
					maxHeight={undefined}
					className='h-[72.5vh]'
					containerClassName='w-6/12 bg-white border-[#B4BFDD] border-[1px] rounded-r-lg'
				>
					<div className='flex flex-col'>
						{selectedJob && (
							<>
								<div className='flex flex-col font-jost p-5 border-b-[1px] border-b-[#B4BFDD]'>
									<h1 className='text-lg'>{selectedJob?.title}</h1>

									<div className='flex flex-row gap-4'>
										<p className='font-jost text-[#6E7191]'>
											{selectedJob?.location}
										</p>

										<p className='font-jost text-[#6E7191] flex flex-row'>
											{getTimeDuration(selectedJob?.postedAt)}
											{" " + t("jobs.easyApply")}
										</p>

										<p className='text-[#556DA9]'>
											{t("candidates", { count: selectedJob.applicants })}
										</p>
									</div>
								</div>
								<div className='flex flex-col gap-5 font-jost p-5 border-b-[1px] border-b-[#B4BFDD]'>
									<div className='flex flex-row gap-2'>
										<ClockIcon className='h-6 w-6 text-[#2D2A33]' />

										<p className='flex flex-row gap-2 items-center font-jost text-black'>
											{
												employmentTypes.find(
													v => v.value === selectedJob.employmentType,
												).label
											}
											{dot}
											{
												experienceLevels.find(
													v => v.value === selectedJob.experienceLevel,
												).label
											}
										</p>
									</div>

									<div className='flex flex-row gap-2'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='18'
											height='20'
											viewBox='0 0 18 20'
											fill='none'
											className='w-6 h-6'
										>
											<path
												d='M17.3346 20H0.667969V2.5C0.667969 1.12167 1.78964 0 3.16797 0H14.8346C16.213 0 17.3346 1.12167 17.3346 2.5V20ZM2.33464 18.3333H15.668V2.5C15.668 2.04083 15.2938 1.66667 14.8346 1.66667H3.16797C2.7088 1.66667 2.33464 2.04083 2.33464 2.5V18.3333ZM14.0013 4.16667H9.0013V5.83333H14.0013V4.16667ZM14.0013 9.16667H9.0013V10.8333H14.0013V9.16667ZM14.0013 14.1667H9.0013V15.8333H14.0013V14.1667ZM7.33464 3.33333H4.0013V6.66667H7.33464V3.33333ZM7.33464 8.33333H4.0013V11.6667H7.33464V8.33333ZM7.33464 13.3333H4.0013V16.6667H7.33464V13.3333Z'
												fill='#2D2A33'
											/>
										</svg>

										<p className='font-jost text-black'>
											{t(
												`organization.size.${selectedJob?.company?.organizationSize}`,
											)}
										</p>
									</div>

									<div className='flex flex-row gap-2'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='19'
											viewBox='0 0 20 19'
											fill='none'
											className='w-6 h-6'
										>
											<path
												d='M3.33399 5.00045C3.00545 5.00131 2.68 4.93702 2.37647 4.81129C2.07294 4.68555 1.79735 4.50088 1.56565 4.26795L0.278986 3.12295C0.113889 2.97576 0.0140269 2.76901 0.00136818 2.54818C-0.0112905 2.32736 0.0642913 2.11055 0.211486 1.94545C0.358682 1.78036 0.565433 1.68049 0.786257 1.66783C1.00708 1.65518 1.22389 1.73076 1.38899 1.87795L2.70982 3.05629C2.78543 3.1412 2.87762 3.20974 2.98072 3.25769C3.08381 3.30565 3.19563 3.33199 3.30928 3.33512C3.42294 3.33824 3.53604 3.31807 3.64161 3.27585C3.74718 3.23363 3.84299 3.17025 3.92315 3.08962L6.92649 0.230453C7.08798 0.0866778 7.29904 0.0113017 7.51507 0.0202451C7.73111 0.0291884 7.93521 0.121751 8.08427 0.278382C8.23333 0.435013 8.31567 0.643448 8.31391 0.859662C8.31215 1.07588 8.22641 1.28294 8.07482 1.43712L5.08399 4.28212C4.8538 4.51097 4.58076 4.6922 4.28048 4.81546C3.9802 4.93871 3.65857 5.00158 3.33399 5.00045ZM20.0007 3.33379C20.0007 3.11277 19.9129 2.90081 19.7566 2.74453C19.6003 2.58825 19.3883 2.50045 19.1673 2.50045H10.834C10.613 2.50045 10.401 2.58825 10.2447 2.74453C10.0885 2.90081 10.0007 3.11277 10.0007 3.33379C10.0007 3.5548 10.0885 3.76676 10.2447 3.92304C10.401 4.07932 10.613 4.16712 10.834 4.16712H19.1673C19.3883 4.16712 19.6003 4.07932 19.7566 3.92304C19.9129 3.76676 20.0007 3.5548 20.0007 3.33379ZM5.08399 10.9488L8.07482 8.10379C8.1583 8.02947 8.22597 7.93912 8.27382 7.83811C8.32166 7.73711 8.3487 7.62751 8.35332 7.51584C8.35794 7.40417 8.34006 7.29272 8.30072 7.1881C8.26139 7.08349 8.20142 6.98785 8.12437 6.90689C8.04732 6.82593 7.95477 6.76129 7.85223 6.71683C7.74969 6.67236 7.63926 6.64898 7.5275 6.64807C7.41574 6.64716 7.30494 6.66874 7.20168 6.71152C7.09843 6.75431 7.00485 6.81742 6.92649 6.89712L3.92649 9.75629C3.76785 9.90798 3.55681 9.99264 3.33732 9.99264C3.11783 9.99264 2.90679 9.90798 2.74815 9.75629L1.42315 8.43545C1.26598 8.28365 1.05548 8.19966 0.836985 8.20156C0.618488 8.20346 0.409478 8.2911 0.254971 8.4456C0.100464 8.60011 0.0128234 8.80912 0.0109247 9.02762C0.00902603 9.24612 0.0930214 9.45662 0.24482 9.61379L1.56565 10.9346C2.03205 11.4011 2.66392 11.6644 3.32357 11.667C3.98322 11.6697 4.61719 11.4115 5.08732 10.9488H5.08399ZM20.0007 10.0005C20.0007 9.77944 19.9129 9.56748 19.7566 9.4112C19.6003 9.25492 19.3883 9.16712 19.1673 9.16712H10.834C10.613 9.16712 10.401 9.25492 10.2447 9.4112C10.0885 9.56748 10.0007 9.77944 10.0007 10.0005C10.0007 10.2215 10.0885 10.4334 10.2447 10.5897C10.401 10.746 10.613 10.8338 10.834 10.8338H19.1673C19.3883 10.8338 19.6003 10.746 19.7566 10.5897C19.9129 10.4334 20.0007 10.2215 20.0007 10.0005ZM5.08399 17.6155L8.07149 14.7705C8.15496 14.6961 8.22264 14.6058 8.27048 14.5048C8.31833 14.4038 8.34537 14.2942 8.34999 14.1825C8.35461 14.0708 8.33672 13.9594 8.29739 13.8548C8.25806 13.7502 8.19808 13.6545 8.12103 13.5736C8.04399 13.4926 7.95144 13.428 7.8489 13.3835C7.74636 13.339 7.63593 13.3156 7.52417 13.3147C7.4124 13.3138 7.3016 13.3354 7.19835 13.3782C7.0951 13.421 7.00151 13.4841 6.92315 13.5638L3.92315 16.423C3.84299 16.5036 3.74718 16.567 3.64161 16.6092C3.53604 16.6514 3.42294 16.6716 3.30928 16.6685C3.19563 16.6653 3.08381 16.639 2.98072 16.591C2.87762 16.5431 2.78543 16.4745 2.70982 16.3896L1.38899 15.2113C1.22389 15.0641 1.00708 14.9885 0.786257 15.0012C0.565433 15.0138 0.358682 15.1137 0.211486 15.2788C0.0642913 15.4439 -0.0112905 15.6607 0.00136818 15.8815C0.0140269 16.1023 0.113889 16.3091 0.278986 16.4563L1.56565 17.6013C2.03205 18.0678 2.66392 18.3311 3.32357 18.3337C3.98322 18.3364 4.61719 18.0782 5.08732 17.6155H5.08399ZM20.0007 16.6671C20.0007 16.4461 19.9129 16.2341 19.7566 16.0779C19.6003 15.9216 19.3883 15.8338 19.1673 15.8338H10.834C10.613 15.8338 10.401 15.9216 10.2447 16.0779C10.0885 16.2341 10.0007 16.4461 10.0007 16.6671C10.0007 16.8881 10.0885 17.1001 10.2447 17.2564C10.401 17.4127 10.613 17.5005 10.834 17.5005H19.1673C19.3883 17.5005 19.6003 17.4127 19.7566 17.2564C19.9129 17.1001 20.0007 16.8881 20.0007 16.6671Z'
												fill='black'
											/>
										</svg>

										<p className='font-jost text-black'>
											{t("jobs.skills") + ": "}
											{selectedJob?.jobSkills
												.map(skill => skill.skill.name)
												.join(", ")}
										</p>
									</div>
									{selectedJob?.applied && (
										<div className='flex flex-row gap-6'>
											<Button
												variant='primary'
												rounded='full'
												className='min-w-[200px]'
											>
												{t("jobs.easySend")}
											</Button>
											<Button
												variant='primary'
												rounded='full'
												className='bg-[#517CE3] hover:bg-[#3d5999] min-w-[200px]'
											>
												{t("jobs.send")}
											</Button>
										</div>
									)}
								</div>
								<div className='flex flex-col font-jost p-5 border-b-[1px] border-b-[#B4BFDD]'>
									<h1 className='text-lg'>{t("jobs.hiringTeam")}</h1>

									<div className='flex flex-row gap-5'>
										<div className='rounded-full h-16 w-16 mt-5 border-[1px] border-black overflow-hidden'>
											<img
												src={imageUrl(selectedJob.recruiter.image)}
												alt={selectedJob.recruiterId}
											/>
										</div>

										<div className='flex flex-col gap-1.5 mt-5'>
											<span className='flex flex-row gap-8'>
												<Link
													to={`/j4y/${selectedJob.recruiter.profileUrl}`}
													className='font-jost text-black hover:text-[#4a4848]'
												>
													{`${selectedJob.recruiter.firstName} ${selectedJob.recruiter.lastName}`}
												</Link>

												<p className='font-jost text-[#556DA9]'>
													{t("jobs.manager")}
												</p>
											</span>

											<p className='font-jost text-[#7D7D7D]'>
												{t("jobs.published")}
											</p>
										</div>
									</div>
								</div>

								<div
									className='flex flex-col font-jost gap-2 p-5'
									data-color-mode='light'
								>
									<h1 className='text-lg'>{t("jobs.jobDescription")}</h1>

									<MDEditor.Markdown
										source={selectedJob?.description}
										className='font-jost text-black bg-white'
									/>
								</div>
							</>
						)}
					</div>
				</ScrollWrapper>
			</div>
		</main>
	)
}

export default JobSearch
