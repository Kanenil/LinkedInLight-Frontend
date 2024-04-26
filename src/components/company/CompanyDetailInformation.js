import InformationIcon from "../../elements/icons/InformationIcon"
import PuzzlesIcon from "../../elements/icons/PuzzlesIcon"

const CompanyDetailInformation = ({ company, industry }) => {
	return (
		<section className='flex flex-col gap-5'>
			<div className='w-full h-full rounded-lg overflow-hidden bg-white p-6'>
				<div className='flex flex-col gap-2.5'>
					<div className='flex flex-row gap-5 items-center'>
						<InformationIcon className='h-5 fill-[#24459A]' />

						<h1 className='font-jost font-medium text-[#2D2A33] text-lg md:text-2xl'>
							General information
						</h1>
					</div>

					<div className='flex flex-col sm:flex-row'>
						<div className='w-full sm:w-4/6'>
							<h3 className='text-[#2D2A33] font-jost font-light text-sm'>
								{company.description ||
									"Company did not write their description"}
							</h3>
						</div>
						<div className='w-full sm:w-2/6 sm:border-l-[#24459a50] sm:border-l-[1px] rounded-l-lg p-4'>
							<div className='flex flex-col gap-2.5'>
								<div className='flex flex-row items-center gap-2.5'>
									<PuzzlesIcon className='h-5 fill-[#24459A]' />

									<h1 className='font-jost font-medium text-[#2D2A33] text-2xl'>
										Preview
									</h1>
								</div>

								<div className='flex flex-col gap-2'>
									<div className='w-full border-b-[1px] border-b-[#24459a50] font-jost text-[#2D2A33] py-2'>
										<h1 className='font-medium'>Industry</h1>

										<h3 className='font-light text-sm'>{industry}</h3>
									</div>

									<div className='w-full border-b-[1px] border-b-[#24459a50] font-jost text-[#2D2A33] py-2'>
										<h1 className='font-medium'>Company size</h1>

										<h3 className='font-light text-sm'>
											{company.organizationSize}
										</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default CompanyDetailInformation
