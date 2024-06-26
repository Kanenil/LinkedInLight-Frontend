import { useTranslation } from "react-i18next"
import Button from "../../elements/buttons/Button"
import useOverflow from "../../hooks/useOverflow"
import classNames from "classnames"
import { useNavigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import Loader from "../shared/Loader"
import { imageUrl } from "../../utils/converters"
import { useSearchParams } from "react-router-dom"
import searchService from "../../services/searchService"
import { getTimeDuration } from "../../utils/date"
import { useEffect, useState } from "react"
import jobPostingService from "../../services/jobPostingService"

const Content = ({ companies, search }) => {
	const { t } = useTranslation()
	const { isOverflow, containerRef, contentRef } = useOverflow()
	const navigator = useNavigate()
	const [, setSearchParams] = useSearchParams()
	const [filteredData, setFilteredData] = useState([])

	const { data, isLoading } = useQuery({
		queryKey: ["allPostedJobs"],
		queryFn: () => searchService.jobSearch(),
		select: ({ data }) => data.jobs,
		staleTime: 1000,
	})

	useEffect(() => {
		;(async () => {
			if (!data) return

			const jobList = await Promise.all(
				data.map(async job => {
					const { data: applicants } =
						await jobPostingService.getApplicantsCount(job.id)
					return { ...job, applicants }
				}),
			)
			setFilteredData(jobList)
		})()
	}, [data])

	return (
		<div className='flex flex-col w-full bg-white border-[#B4BFDD] border-[1px] rounded-lg'>
			<div className='flex flex-row font-jost items-center p-5 border-b-[1px] border-b-[#B4BFDD]'>
				<h1 className='text-lg'>{t("jobs.jobsForYou")}</h1>

				{companies.length > 0 && (
					<Button
						variant='primaryText'
						className='text-lg ml-auto'
						onClick={() => {
							navigator("?publish=true")
						}}
					>
						{t("jobs.publishJob")}
					</Button>
				)}
			</div>
			<div
				ref={containerRef}
				className={classNames(
					"flex flex-col max-h-[70vh]",
					isOverflow && "overflow-y-auto",
				)}
			>
				<div ref={contentRef} className='flex flex-col gap-4 p-5'>
					{isLoading ? (
						<Loader />
					) : (
						filteredData.map(job => (
							<button
								onClick={() =>
									setSearchParams({ search: job.title, selected: job.id })
								}
								key={job.id}
								className={classNames("flex flex-row gap-4")}
							>
								<div className='my-auto max-w-20'>
									<img
										src={imageUrl(job.companyImage)}
										alt={job.companyId}
										className='object-contain rounded-lg'
									/>
								</div>

								<div className='flex flex-col w-full text-start'>
									<h1 className='font-jost text-lg'>{job.title}</h1>
									<p className='font-jost text-[#6E7191]'>{job.companyName}</p>
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
						))
					)}
				</div>
			</div>
		</div>
	)
}
export default Content
