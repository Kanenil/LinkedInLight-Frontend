import { useTranslation } from "react-i18next"
import Button from "../../elements/buttons/Button"
import useOverflow from "../../hooks/useOverflow"
import classNames from "classnames"

const JobSearch = ({ search, selected }) => {
	const { t } = useTranslation()

	const { isOverflow, containerRef, contentRef } = useOverflow()

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
						<div ref={contentRef} className='flex flex-col gap-4 p-5'></div>
					</div>
				</div>

				<div className='w-6/12 bg-white border-[#B4BFDD] border-[1px] rounded-r-lg'></div>
			</div>
		</main>
	)
}

export default JobSearch
