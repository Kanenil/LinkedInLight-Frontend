import { XMarkIcon } from "@heroicons/react/24/outline"
import { forwardRef } from "react"
import { useNavigate } from "react-router"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useTranslation } from "react-i18next"

import Button from "../../../../elements/buttons/Button"

const StartCompany = forwardRef(({ setIsComponentVisible }, ref) => {
	const { t } = useTranslation()
	const navigator = useNavigate()

	const options = t("company.startCompany.options", { returnObjects: true })

	return (
		<div
			className='flex flex-col gap-2.5 px-6 py-5 h-[100dvh] w-screen md:w-[593px] md:h-fit'
			ref={ref}
			style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
		>
			<div className='py-2.5 flex flex-row border-b-[#24459A] border-b-[0.5px]'>
				<h1 className='text-[#2D2A33] text-2xl font-jost font-semibold'>
					{t("company.startCompany.title")}
				</h1>

				<button
					onClick={() => setIsComponentVisible(false)}
					className='ml-auto text-[#7D7D7D] hover:text-gray-700'
				>
					<XMarkIcon className='w-8 h-8' />
				</button>
			</div>

			<div className='flex flex-col pb-2.5 rounded-lg overflow-hidden'>
				<div className='bg-[#F7F7F7] p-2.5'>
					<h1 className='text-[#2D2A33] font-jost font-medium text-lg'>
						{t("company.startCompany.exploreMore")}
					</h1>
				</div>

				<div className='flex flex-col border-[#F7F7F7] border-[1px] gap-1 px-2.5 py-1.5'>
					{options.map((option, index) => (
						<div
							key={`option-${index}`}
							className='flex flex-col font-jost text-[#2D2A33]'
						>
							<h1 className='font-medium text-lg'>{option.title}</h1>

							<h3 className='font-light text-sm'>{option.description}</h3>
						</div>
					))}
				</div>

				<div className='border-[#F7F7F7] border-[1px] p-2.5 rounded-b-lg'>
					<Button
						onClick={() => {
							setIsComponentVisible(false)
							navigator("/j4y/company/new")
						}}
						variant='primaryText'
						className='group items-center gap-2.5 text-[#7D88A4] hover:text-[#24459A] text-lg font-normal'
					>
						<PlusIcon className='text-[#7D88A4] group-hover:text-[#24459A] h-5 transition duration-500 ease-in-out' />
						{t("company.startCompany.createCompany")}
					</Button>
				</div>
			</div>
		</div>
	)
})
export default StartCompany
