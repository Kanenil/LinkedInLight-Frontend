import { useTranslation } from "react-i18next"
import Button from "../../elements/buttons/Button"
import useOverflow from "../../hooks/useOverflow"
import Loader from "../../components/shared/Loader"
import classNames from "classnames"
import useAdministratedCompanies from "../../hooks/useAdministratedCompanies"
import { useNavigate } from "react-router"

const Content = () => {
	const { t } = useTranslation()
	const { companies, isLoading } = useAdministratedCompanies()
	const { isOverflow, containerRef, contentRef } = useOverflow()
	const navigator = useNavigate()

	if (isLoading) return <Loader />

	return (
		<div className='flex flex-col w-9/12 bg-white border-[#B4BFDD] border-[1px] rounded-r-lg'>
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
				<div ref={contentRef} className='flex flex-col gap-4 p-5'></div>
			</div>
		</div>
	)
}
export default Content
