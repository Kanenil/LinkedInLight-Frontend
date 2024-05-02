import React from "react"
import PencilButton from "../../../elements/buttons/PencilButton"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import AdditionalProfileService from "../../../services/additionalProfileService"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

const LanguagesSection = ({ user, isOwner }) => {
	const { t } = useTranslation()

	const { data, isLoading } = useQuery({
		queryFn: ({ queryKey }) =>
			AdditionalProfileService.getLanguagesByProfileUrl(queryKey[1]),
		queryKey: ["language", user.profileUrl],
		select: ({ data }) => data,
		enabled: !!user.profileUrl,
	})

	if (isLoading) return

	const dot = (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='11'
			height='10'
			viewBox='0 0 11 10'
			fill='none'
		>
			<path
				d='M0 5.06024C0 3.65462 0.441767 2.46988 1.3253 1.50602C2.249 0.502008 3.49398 0 5.06024 0C6.66667 0 7.93173 0.481928 8.85542 1.44578C9.77912 2.40964 10.241 3.61446 10.241 5.06024C10.241 6.4257 9.77912 7.59036 8.85542 8.55422C7.93173 9.51807 6.66667 10 5.06024 10C3.49398 10 2.249 9.51807 1.3253 8.55422C0.441767 7.59036 0 6.4257 0 5.06024Z'
				fill='#24459A'
			/>
		</svg>
	)

	const proficiencies = t("profile.modal.language.proficiencies", {
		returnObjects: true,
	})

	return (
		<ConditionalWrapper condition={data.length > 0}>
			<section
				id='languages'
				className='rounded-lg bg-white overflow-hidden pt-8 pb-8'
			>
				<div className='px-6 md:px-10'>
					<div className='flex flex-row items-center gap-[20px]'>
						<h1 className='font-jost font-medium text-2xl text-[#2D2A33]'>
							{t("languagesSection.title")}
						</h1>

						<ConditionalWrapper condition={isOwner}>
							<PencilButton
								className='ml-auto md:ml-0'
								to='details/languages'
							/>
						</ConditionalWrapper>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 justify-start mt-2.5 gap-[25px] py-[5px]'>
						{data.map((language, index) => (
							<div
								className='inline-flex items-center gap-5'
								key={`languages-${language.name}-${index}`}
							>
								<div className='hidden md:block'>{dot}</div>

								<div className='flex flex-col border-b-[0.5px] border-[#24459A80] text-[#2D2A33] gap-[5px] pb-2.5 w-full'>
									<h1 className='font-jost font-medium'>
										{language.language.name}
									</h1>

									<h3 className='font-jost text-sm font-light'>
										{
											proficiencies.find(v => v.value === language.proficiency)
												.label
										}
									</h3>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</ConditionalWrapper>
	)
}
export default LanguagesSection
