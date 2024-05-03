import { useQuery } from "@tanstack/react-query"
import classNames from "classnames"
import { useEffect, useState } from "react"
import companyService from "../../../services/companyService"
import { useTranslation } from "react-i18next"
import { CompanyItem } from "../left-section/MyCompaniesSection"
import { useNavigate } from "react-router"

const RightSection = ({ profile }) => {
	const { t } = useTranslation()
	const [scrollPosition, setScrollPosition] = useState(0)
	const navigator = useNavigate()

	const { data: companies, isLoading } = useQuery({
		queryFn: ({ queryKey }) => companyService.getFollowedCompanies(queryKey[1]),
		queryKey: ["followedCompanies", profile?.profileUrl],
		select: ({ data }) => data,
	})

	const handleScroll = () => {
		const position = window.pageYOffset
		setScrollPosition(position)
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true })

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	if (isLoading) return <></>

	return (
		<div
			className={classNames(
				"hidden md:block md:w-4/12 lg:w-5/12 relative mb-3 md:mb-0",
				scrollPosition > 40 && "-top-20",
			)}
		>
			<div className='md:fixed flex flex-col gap-2'>
				{companies.length !== 0 && (
					<div className='flex flex-col bg-white rounded-lg px-5 pt-5'>
						<h1 className='font-jost text-xl text-[#2D2A33] font-medium'>
							{t("main.followedCompanies")}
						</h1>

						{companies.map(company => (
							<CompanyItem
								key={`company-${company.id}`}
								company={company}
								t={t}
								redirect={() => navigator(`/j4y/company/${company.id}`)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default RightSection
