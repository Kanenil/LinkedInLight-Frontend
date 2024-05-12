import { useQuery } from "@tanstack/react-query"
import SearchService from "../../../../services/searchService"
import useOverflow from "../../../../hooks/useOverflow"
import { APP_ENV } from "../../../../env"
import defaultImage from "../../../../assets/default-image.jpg"
import { Link } from "react-router-dom"
import React, { forwardRef, useState } from "react"
import { useTranslation } from "react-i18next"
import ToggleInput from "../../forms/ToggleInput"

const Search = forwardRef(({ search, setIsComponentVisible }, ref) => {
	const { t } = useTranslation()

	const [searchSettings, setSearchSettings] = useState({
		people: true,
		company: true,
		job: true,
	})

	const onSearchChange = e => {
		setSearchSettings({
			...searchSettings,
			[e.target.name]: e.target.checked,
		})
	}

	const { data } = useQuery({
		queryKey: ["search", search],
		queryFn: ({ queryKey }) => SearchService.search(queryKey[1]),
		select: ({ data }) => data,
		staleTime: 1000,
		enabled: !!search,
	})
	const { contentRef, containerRef, isOverflow } = useOverflow()

	const { userList, companyList } = data ?? {}

	return (
		<div
			className='flex flex-col w-screen md:w-[500px]'
			ref={ref}
			style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
		>
			<div
				id='container'
				ref={containerRef}
				className={`max-h-[500px] md:max-h-[300px] overflow-x-hidden overflow-y-${
					isOverflow ? "scroll" : "hidden"
				}`}
			>
				<div ref={contentRef} className='flex flex-col gap-2.5 py-5'>
					<div className='flex flex-col gap-2 px-4 pb-3 border-b-[#B4BFDD] border-b-[1px]'>
						<div className='grid grid-cols-2'>
							<h1 className='font-jost text-lg'>{t("search.forPeople")}</h1>

							<ToggleInput
								name='people'
								value={searchSettings.people}
								onChange={onSearchChange}
								className='w-fit'
								withText={false}
							/>
						</div>

						<div className='grid grid-cols-2'>
							<h1 className='font-jost text-lg'>{t("search.forCompany")}</h1>

							<ToggleInput
								name='company'
								value={searchSettings.company}
								onChange={onSearchChange}
								className='w-fit'
								withText={false}
							/>
						</div>

						<div className='grid grid-cols-2'>
							<h1 className='font-jost text-lg'>{t("search.forJob")}</h1>

							<ToggleInput
								name='job'
								value={searchSettings.job}
								onChange={onSearchChange}
								className='w-fit'
								withText={false}
							/>
						</div>
					</div>

					{search ? (
						<>
							{searchSettings.people && userList?.length > 0 && (
								<div className='flex flex-col gap-2'>
									<h1 className='font-jost text-xl px-4'>
										{t("search.users")}
									</h1>

									{userList?.map(user => (
										<Link
											to={`/j4y/${user.profileUrl}`}
											onClick={() => setIsComponentVisible(false)}
											className='flex flex-row gap-3 hover:bg-gray-50 px-4'
											key={`user-${user.id}`}
										>
											<div className='overflow-hidden h-12 w-12 rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
												<img
													className='object-contain'
													src={
														user?.image
															? APP_ENV.UPLOADS_URL + "/" + user?.image
															: defaultImage
													}
													alt=''
												/>
											</div>

											<div className='flex flex-col gap-1'>
												<h1 className='font-jost font-medium'>
													{user.firstName} {user.lastName}
												</h1>

												<h3>{user.headline}</h3>
											</div>
										</Link>
									))}
								</div>
							)}

							{searchSettings.company && companyList?.length > 0 && (
								<div className='flex flex-col gap-2'>
									<h1 className='font-jost text-xl px-4'>
										{t("search.companies")}
									</h1>

									{companyList?.map(company => (
										<Link
											to={`/j4y/company/${company.id}`}
											onClick={() => setIsComponentVisible(false)}
											className='flex flex-row gap-3 items-center hover:bg-gray-50 px-4'
											key={`company-${company.id}`}
										>
											<div className='overflow-hidden mx-h-12 max-w-16 bg-white border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
												<img
													className='object-contain'
													src={
														company?.logoImg
															? APP_ENV.UPLOADS_URL + "/" + company?.logoImg
															: defaultImage
													}
													alt=''
												/>
											</div>

											<div className='flex flex-col gap-1'>
												<h1 className='font-jost text-lg font-medium'>
													{company.companyName}
												</h1>
											</div>
										</Link>
									))}
								</div>
							)}
						</>
					) : (
						<h3 className='font-jost px-4'>{t("search.enterSomething")}</h3>
					)}
				</div>
			</div>
		</div>
	)
})
export default Search
