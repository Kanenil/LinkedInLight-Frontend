import { useQueries } from "@tanstack/react-query"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import React, { useEffect, useState } from "react"
import { companiesQuery } from "../../../constants/combinedQueries"
import classNames from "classnames"
import Show from "../../../elements/shared/Show"
import CompanyItem from "../items/CompanyItem"

const NavButton = ({ children, isActive, onClick }) => {
	return (
		<button
			className={classNames(
				"border-b-[1px] font-jost text-lg w-[105px] md:w-[150px] py-1.5 text-[#585359]",
				{
					"border-b-[#24459A] font-semibold": isActive,
					"border-b-[#24459A]/50": !isActive,
				},
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

const CompaniesSection = ({ user, isOwner }) => {
	const { userCompanies, followingCompanies, isLoading } = useQueries({
		queries: companiesQuery(user).map(value => ({
			...value,
		})),
		combine: results => {
			return {
				userCompanies: results[0].data ?? [],
				followingCompanies: results[1].data ?? [],
				isLoading: results.some(v => v.isLoading),
			}
		},
	})
	const [isMyCompanies, setIsMyCompanies] = useState(true)

	useEffect(() => {
		if (!isLoading) {
			setIsMyCompanies(userCompanies.length > 0)
		}
	}, [isLoading, userCompanies.length])

	if (isLoading) return <></>

	const toggleSelect = () =>
		setIsMyCompanies(prev =>
			userCompanies.length > 0 && followingCompanies.length > 0 ? !prev : prev,
		)

	return (
		<ConditionalWrapper
			condition={userCompanies.length > 0 || followingCompanies.length > 0}
		>
			<div id='companies' className='rounded-lg bg-white py-8 px-6 md:px-10'>
				<div className='flex flex-row font-jost'>
					<h1 className='font-medium text-2xl text-[#2D2A33]'>Companies</h1>
				</div>

				<div className='flex flex-row mt-4'>
					{userCompanies.length > 0 && (
						<NavButton onClick={toggleSelect} isActive={isMyCompanies}>
							{isOwner ? "My" : "Own"}
						</NavButton>
					)}
					{followingCompanies.length > 0 && (
						<NavButton onClick={toggleSelect} isActive={!isMyCompanies}>
							Following
						</NavButton>
					)}
				</div>

				<div className='mt-5 flex flex-col md:grid md:grid-cols-2 gap-4'>
					<Show>
						<Show.When isTrue={isMyCompanies}>
							{userCompanies.map(company => (
								<CompanyItem key={`myCompanies-${company.id}`} {...company} />
							))}
						</Show.When>

						<Show.Else>
							{followingCompanies.map(company => (
								<CompanyItem
									key={`followingCompanies-${company.id}`}
									{...company}
								/>
							))}
						</Show.Else>
					</Show>
				</div>
			</div>
		</ConditionalWrapper>
	)
}
export default CompaniesSection
