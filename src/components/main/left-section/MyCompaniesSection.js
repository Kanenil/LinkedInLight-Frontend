import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import profileService from "../../../services/profileService"
import companyService from "../../../services/companyService"
import { useNavigate } from "react-router-dom"
import { imageUrl } from "../../../utils/converters"
import Button from "../../../elements/buttons/Button"

export const CompanyItem = ({ company, t, redirect }) => {
	const { data: industry } = useQuery({
		queryFn: () => companyService.getIndustries(),
		queryKey: ["allIndustries"],
		select: ({ data }) => data.find(val => val.id === company.industryId).name,
	})

	return (
		<div className='mt-2.5 py-2.5 border-[#24459A80] border-t-[0.5px]'>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-row gap-3'>
					{company.logoImg ? (
						<div className='flex items-center p-2 max-w-[65px] my-auto max-h-[65px] md:max-w-[80px] md:max-h-[80px]'>
							<img
								className='object-contain'
								src={imageUrl(company.logoImg)}
								alt='company-logo'
							/>
						</div>
					) : (
						<div className='flex items-center justify-center w-[80px] h-[80px] bg-[#F0F1F3]'>
							<h3 className='text-[#2D2A33] font-semibold font-jost'>logo</h3>
						</div>
					)}

					<div className='flex flex-col gap-1 font-jost text-[#2D2A33]'>
						<h1 className='font-medium '>{company.companyName}</h1>
						<h1 className='font-light text-sm'>{industry}</h1>
					</div>
				</div>
				<Button
					variant='tertiary'
					rounded='full'
					className='w-fit mx-auto my-4'
					onClick={redirect}
				>
					{t("main.viewCompany")}
				</Button>
			</div>
		</div>
	)
}

const MyCompanies = () => {
	const { t } = useTranslation()
	const navigator = useNavigate()

	const { data: companies, isLoading } = useQuery({
		queryFn: () => companyService.getCurrentUserCompanies(),
		queryKey: ["currentUserCompanies"],
		select: ({ data }) => data,
	})
	const { data: administratedCompany, isLoading: administratedLoading } =
		useQuery({
			queryFn: () => profileService.administratedCompany(),
			queryKey: ["administratedCompany"],
			select: ({ data }) => data,
			retry: false,
		})

	if (isLoading || administratedLoading) return <></>

	return (
		(companies.length !== 0 || administratedCompany) && (
			<div className='flex flex-col bg-white rounded-lg px-5 pt-5'>
				<h1 className='font-jost text-xl text-[#2D2A33] font-medium'>
					{t("main.myCompanies")}
				</h1>

				{companies.map(company => (
					<CompanyItem
						key={`company-${company.id}`}
						company={company}
						t={t}
						redirect={() => navigator(`/j4y/company/${company.id}`)}
					/>
				))}
				{administratedCompany && (
					<CompanyItem
						company={administratedCompany}
						t={t}
						redirect={() =>
							navigator(`/j4y/company/${administratedCompany.id}`)
						}
					/>
				)}
			</div>
		)
	)
}
export default MyCompanies
