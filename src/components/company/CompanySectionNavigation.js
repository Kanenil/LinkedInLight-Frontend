import CompanyNavButton from "./CompanyNavButton"
import Show from "../../elements/shared/Show"
import CompanyPostsSection from "./posts/CompanyPostsSection"
import React, { useState } from "react"
import CompanyFollowersSection from "./CompanyFollowersSection"
import noPosts from "../../assets/no-posts.png"
import { useTranslation } from "react-i18next"

const links = ["company.posts.title", "company.followers2"]

const CompanySectionNavigation = ({
	company,
	isAdmin,
	searchParams,
	isFollower,
	isContentAdmin,
}) => {
	const [selected, setSelected] = useState(links[0])
	const { t } = useTranslation()

	if (
		!isFollower &&
		!isAdmin &&
		!company.visibleForAll &&
		!searchParams[0].get("preview")
	)
		return (
			<section className='flex flex-col gap-5'>
				<div className='w-full h-full rounded-lg overflow-hidden bg-white p-6'>
					<div className='my-auto mx-auto font-jost text-[#2D2A33] text-center'>
						<div
							className='mx-auto h-[200px] w-[200px]'
							style={{ backgroundImage: `url(${noPosts})` }}
						/>
						<h1 className='text-xl mt-2'>{t("company.hidden.title")}</h1>
						<h3 className='text-[#7D7D7D] [&>strong]:font-medium text-sm mt-2'>
							{t("company.hidden.description", {
								companyName: company.companyName,
							})}
						</h3>
					</div>
				</div>
			</section>
		)

	return (
		<>
			<div className='flex flex-row items-center justify-center'>
				{links.map(link => (
					<CompanyNavButton
						key={`companyNavButton-${link}`}
						onClick={() => setSelected(link)}
						isActive={selected === link}
					>
						{t(link)}
					</CompanyNavButton>
				))}
			</div>

			<Show>
				<Show.When isTrue={selected === links[0]}>
					<CompanyPostsSection
						isAdmin={isAdmin}
						isContentAdmin={isContentAdmin}
						company={company}
						searchParams={searchParams}
					/>
				</Show.When>

				<Show.When isTrue={selected === links[1]}>
					<CompanyFollowersSection company={company} />
				</Show.When>
			</Show>
		</>
	)
}
export default CompanySectionNavigation
