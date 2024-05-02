import EyeIcon from "../../../elements/icons/EyeIcon"
import Slider from "../../shared/Slider"
import { useEffect, useState } from "react"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import { asyncFilter } from "../../../utils/converters"
import ProfileService from "../../../services/profileService"
import { useQueryClient } from "@tanstack/react-query"
import useMobileDetector from "../../../hooks/useMobileDetector"
import Button from "../../../elements/buttons/Button"
import { useNavigate } from "react-router"
import { Trans, useTranslation } from "react-i18next"

const suggestions = [
	{
		id: "one",
		to: "edit/experience",
		width: 220,
		condition: async function (queryClient, user) {
			const { data } = await queryClient.fetchQuery({
				queryFn: ({ queryKey }) =>
					ProfileService.getExperiencesByProfileUrl(queryKey[1]),
				queryKey: ["experiences", user.profileUrl],
			})
			return data.filter(val => val.currentlyWorking).length === 0
		},
	},
	{
		id: "two",
		to: "edit/intro",
		width: 220,
		condition: "industry",
	},
	{
		id: "three",
		to: "edit/image",
		width: 220,
		condition: "image",
	},
	{
		id: "four",
		to: "edit/skill",
		width: 220,
		condition: async function (queryClient, user) {
			const { data } = await queryClient.fetchQuery({
				queryFn: ({ queryKey }) =>
					ProfileService.getSkillsByProfileUrl(queryKey[1]),
				queryKey: ["skills", user.profileUrl],
			})
			return data.length === 0
		},
	},
	{
		id: "five",
		to: "edit/general-information",
		width: 220,
		condition: "about",
	},
]

const SliderItem = ({ id, to }) => {
	const navigator = useNavigate()
	const { t } = useTranslation()

	return (
		<div className='bg-[#F3F5F9] border-[1px] border-[#24459A33] w-[220px] h-[160px] font-jost text-black py-4 px-2.5 rounded-lg'>
			<h1 className='font-medium text-sm'>
				{t(`profileStatus.suggestions.${id}.title`)}
			</h1>

			<h3 className='min-h-[48px] mt-2.5 text-xs font-light'>
				<Trans
					i18nKey={`profileStatus.suggestions.${id}.description`}
					components={{ strong: <strong className='font-medium' /> }}
				/>
			</h3>

			<div className='flex justify-center mt-4 mb-4'>
				<Button
					variant='tertiary'
					className='bg-transparent'
					rounded='full'
					onClick={() => navigator(to)}
				>
					{t(`profileStatus.suggestions.${id}.button`)}
				</Button>
			</div>
		</div>
	)
}

const ProfileStatus = ({ user, isOwner }) => {
	const { t } = useTranslation()

	const [filteredSuggestions, setFilteredSuggestions] = useState([])
	const queryClient = useQueryClient()

	useEffect(() => {
		if (user) {
			asyncFilter(suggestions, async suggestion => {
				if (typeof suggestion.condition === "function")
					return await suggestion.condition(queryClient, user)

				return await new Promise(resolve => {
					const userValue = user[suggestion.condition]
					resolve(
						userValue === "" || userValue === null || userValue?.length === 0,
					)
				})
			}).then(resp => {
				setFilteredSuggestions(resp)
			})
		}
	}, [user])

	const maxLevel = suggestions.length

	const { isMobile } = useMobileDetector()

	return (
		<ConditionalWrapper condition={filteredSuggestions.length > 0 && isOwner}>
			<div className='rounded-lg bg-white overflow-hidden px-6 md:px-10 py-8'>
				<div>
					<h1 className='font-jost font-medium text-2xl text-[#2D2A33]'>
						{t("profileStatus.title")}
					</h1>

					<div className='flex flex-row items-center gap-2.5 mt-2'>
						<EyeIcon className='h-4' />

						<h3 className='text-sm font-roboto font-light text-[#7D7D7D]'>
							{t("profileStatus.visibleForMe")}
						</h3>
					</div>

					<div className='pt-4'>
						<div className='flex flex-row font-roboto font-medium '>
							<h1 className='text-[#2D2A33]'>{t("profileStatus.level")}:</h1>

							<h3 className='ml-6 text-[#24459A]'>
								{maxLevel - filteredSuggestions.length}
							</h3>

							<h3 className='ml-auto text-[#24459A]'>
								{maxLevel - filteredSuggestions.length}/{maxLevel}
							</h3>
						</div>

						<div className='mt-2.5 flex flex-row gap-4'>
							{Array.from(
								Array(maxLevel - filteredSuggestions.length).keys(),
							).map(val => (
								<div
									key={`fill-level-${val}`}
									className='h-2 w-full bg-[#24459A]'
								/>
							))}
							{Array.from(
								Array(
									maxLevel - (maxLevel - filteredSuggestions.length),
								).keys(),
							).map(value => (
								<div
									key={`level-${value}`}
									className='h-2 w-full bg-[#E5E9F4]'
								/>
							))}
						</div>

						<h3 className='mt-2.5 font-jost font-light'>
							<Trans
								i18nKey='profileStatus.description'
								components={{ strong: <strong className='font-medium' /> }}
							/>
						</h3>
					</div>
				</div>

				<ConditionalWrapper condition={filteredSuggestions.length > 0}>
					<Slider
						className='mt-2.5'
						perPage={isMobile ? 1 : 3}
						onReset={user}
						containerClass='flex flex-row gap-6 w-fit [&>*:nth-child(n+1)]:ml-3.5 md:[&>*:nth-child(n+1)]:ml-0'
					>
						{filteredSuggestions.map((suggestion, index) => (
							<SliderItem key={`suggestion-${index}`} {...suggestion} />
						))}
					</Slider>
				</ConditionalWrapper>
			</div>
		</ConditionalWrapper>
	)
}
export default ProfileStatus
