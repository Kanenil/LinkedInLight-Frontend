import { XMarkIcon } from "@heroicons/react/24/outline"
import { forwardRef } from "react"
import { useNavigate } from "react-router"
import { PlusIcon } from "@heroicons/react/24/solid"

import Button from "../../../../elements/buttons/Button"
import { useQuery } from "@tanstack/react-query"
import CompanyService from "../../../../services/companyService"
import Loader from "../../Loader"
import Show from "../../../../elements/shared/Show"
import ProfileService from "../../../../services/profileService"

const options = [
	{
		title: "Attract top talent",
		description: "Find and hire qualified candidates for your business",
	},
	{
		title: "Promote your services",
		description: "Tell people about your business and offer your services",
	},
	{
		title: "Post a job for free",
		description: "Present your job opening to a wide range of candidates",
	},
	{
		title: "Place an ad",
		description: "Attract customer attention with advertising on our website",
	},
	{
		title: "Learn and grow",
		description:
			"Get access to useful materials and courses for professional development",
	},
]

const StartCompany = forwardRef(({ setIsComponentVisible }, ref) => {
	const { data: companies, isLoading } = useQuery({
		queryFn: () => CompanyService.getCurrentUserCompanies(),
		queryKey: ["currentUserCompanies"],
		select: ({ data }) => data,
	})
	const { data: administratedCompany, isLoading: administratedLoading } =
		useQuery({
			queryFn: () => ProfileService.administratedCompany(),
			queryKey: ["administratedCompany"],
			select: ({ data }) => data,
			retry: false,
		})

	const navigator = useNavigate()

	return (
		<div
			className='flex flex-col gap-2.5 px-6 py-5 h-[100dvh] w-screen md:w-[593px] md:h-fit'
			ref={ref}
			style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
		>
			<div className='py-2.5 flex flex-row border-b-[#24459A] border-b-[0.5px]'>
				<h1 className='text-[#2D2A33] text-2xl font-jost font-semibold'>
					For business
				</h1>

				<button
					onClick={() => setIsComponentVisible(false)}
					className='ml-auto text-[#7D7D7D] hover:text-gray-700'
				>
					<XMarkIcon className='w-8 h-8' />
				</button>
			</div>

			<Show>
				<Show.When isTrue={isLoading || administratedLoading}>
					<Loader />
				</Show.When>

				<Show.When
					isTrue={
						!isLoading &&
						!administratedLoading &&
						(companies.length > 0 || !!administratedCompany)
					}
				>
					<div className='flex flex-col pb-2.5 rounded-lg overflow-hidden'>
						<div className='bg-[#F7F7F7] p-2.5'>
							<h1 className='text-[#2D2A33] font-jost font-medium text-lg'>
								Manage your companies or create new
							</h1>
						</div>

						<div className='flex flex-col border-[#F7F7F7] border-[1px] gap-1 px-2.5 py-1.5'>
							<Button
								onClick={() => {
									setIsComponentVisible(false)
									navigator(`/j4y/company/${administratedCompany?.id}`)
								}}
								variant='primaryText'
								className='group items-center justify-start gap-2.5 text-[#7D88A4] hover:text-[#24459A] text-lg font-normal'
							>
								{administratedCompany?.companyName}
							</Button>
							{companies?.map((company, index) => (
								<Button
									key={`company-${company.id}-${index}`}
									onClick={() => {
										setIsComponentVisible(false)
										navigator(`/j4y/company/${company.id}`)
									}}
									variant='primaryText'
									className='group items-center justify-start gap-2.5 text-[#7D88A4] hover:text-[#24459A] text-lg font-normal'
								>
									{company.companyName}
								</Button>
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
								Create new company
							</Button>
						</div>
					</div>
				</Show.When>

				<Show.Else>
					<div className='flex flex-col pb-2.5 rounded-lg overflow-hidden'>
						<div className='bg-[#F7F7F7] p-2.5'>
							<h1 className='text-[#2D2A33] font-jost font-medium text-lg'>
								Explore more for business
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
								Create a company
							</Button>
						</div>
					</div>
				</Show.Else>
			</Show>
		</div>
	)
})
export default StartCompany
