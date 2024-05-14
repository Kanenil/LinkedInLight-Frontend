import { useTranslation } from "react-i18next"
import Button from "../../elements/buttons/Button"
import useOverflow from "../../hooks/useOverflow"
import classNames from "classnames"
import { useNavigate } from "react-router"
import { useQuery } from "@tanstack/react-query"
import jobPostingService from "../../services/jobPostingService"
import Loader from "../shared/Loader"
import { imageUrl } from "../../utils/converters"
import { useSearchParams } from "react-router-dom"

const Content = ({ companies, search }) => {
	const { t } = useTranslation()
	const { isOverflow, containerRef, contentRef } = useOverflow()
	const navigator = useNavigate()
	const [_, setSearchParams] = useSearchParams()

	const { data, isLoading } = useQuery({
		queryKey: ["allPostedJobs"],
		queryFn: () => jobPostingService.allPostedJobs(),
		select: ({ data }) => data,
		staleTime: 1000,
	})

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
						data.map(job => (
							<button
								onClick={() =>
									setSearchParams({ search: job.title, selected: job.id })
								}
								key={job.id}
								className={classNames("flex flex-row gap-4")}
							>
								<div className='my-auto'>
									<img
										src={imageUrl(job.company.logoImg)}
										alt={job.companyId}
										className='object-contain rounded-lg'
									/>
								</div>

								<div className='flex flex-col gap-1 justify-start text-start'>
									<h1 className='font-jost text-lg'>{job.title}</h1>
									<p className='font-jost text-[#6E7191]'>{job.companyName}</p>
									<p className='font-jost text-[#6E7191]'>{job.location}</p>
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
