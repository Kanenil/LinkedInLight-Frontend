import Button from "../../../elements/buttons/Button"
import { imageUrl } from "../../../utils/converters"
import defaultCompanyLogo from "../../../assets/default-company-image.jpg"
import { getTimeDuration } from "../../../utils/date"
import { Trans, useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

const MainPostItem = ({
	type,
	companyName,
	postedAt,
	content,
	companyLogo,
	id,
	image,
}) => {
	const { t } = useTranslation()
	const navigator = useNavigate()

	return (
		<div className='w-full h-fit rounded-lg overflow-hidden bg-white p-6'>
			<div className='flex flex-row pb-2 border-b-[1px] border-b-[#24459A]/50'>
				<div className='flex items-center max-h-[50px] max-w-[50px] bg-white'>
					<img
						className='object-contain'
						src={imageUrl(companyLogo, defaultCompanyLogo)}
						alt='company-logo'
					/>
				</div>

				<div className='flex flex-col mx-6 font-jost text-[#2D2A33]'>
					<h1 className='text-lg font-bold'>{companyName}</h1>

					<div className='inline-flex gap-3 items-center'>
						<h3 className='text-[#7D7D7D] text-sm'>
							{getTimeDuration(postedAt)}
						</h3>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-3 mt-4'>
				<h1 className='font-jost font-light text-[#2D2A33] break-words text-wrap'>
					{type === "JobPosting" ? (
						<>
							<Trans
								i18nKey='jobs.weHiring'
								values={{
									position: content.split(";")[0],
									region: content.split(";")[1],
								}}
								components={{
									span: <span className='text-[#24459A] font-medium' />,
								}}
							/>
							<div className='mt-4 flex flex-row gap-4 items-center p-4 border-[0.5px] border-[#7D88A4]/50 rounded-lg overflow-hidden my-auto w-full h-fit bg-white'>
								<img
									className='object-contain'
									src={imageUrl(companyLogo, defaultCompanyLogo)}
									alt='company-logo'
								/>

								<div className='flex flex-col flex-grow font-jost text-[#2D2A33]'>
									<h1 className='font-semibold'>{content.split(";")[0]}</h1>
									<h3 className='text-sm font-light text-[#7D7D7D]'>
										{t("jobs.jobAt", { company: companyName })}
									</h3>
								</div>

								<Button
									onClick={() => {
										navigator(
											`/j4y/jobs?selected=${id}&search=${
												content.split(";")[0]
											}`,
										)
									}}
									variant='tertiary'
									rounded='full'
									className='text-xs'
								>
									{t("jobs.checkDetails")}
								</Button>
							</div>
						</>
					) : (
						content
					)}
				</h1>

				{image && (
					<div className='flex justify-center items-center border-[0.5px] border-[#7D88A4]/50 rounded-lg overflow-hidden my-auto w-full h-fit bg-white'>
						<img className='object-contain' src={imageUrl(image)} alt='post' />
					</div>
				)}
			</div>
		</div>
	)
}

export default MainPostItem
