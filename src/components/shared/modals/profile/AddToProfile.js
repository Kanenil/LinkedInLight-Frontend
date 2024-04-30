import React, { useState } from "react"
import XMarkIcon from "../../../../elements/icons/XMarkIcon"
import ChevronDownIcon from "../../../../elements/icons/ChevronDownIcon"
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper"
import UnderlinedLink from "../../../../elements/links/UnderlinedLink"
import useMobileDetector from "../../../../hooks/useMobileDetector"
import Show from "../../../../elements/shared/Show"
import { useTranslation } from "react-i18next"

const AddToProfile = ({ onClose }) => {
	const [selected, setSelected] = useState(-1)
	const { t } = useTranslation()

	const blocks = [
		{
			id: 0,
			title: t("profile.modal.addToProfile.main.title"),
			content: [
				{ title: t("profile.modal.addToProfile.main.image"), to: "edit/image" },
				{
					title: t("profile.modal.addToProfile.main.general"),
					to: "edit/general-information",
				},
				{
					title: t("profile.modal.addToProfile.main.education"),
					to: "edit/education",
				},
				{
					title: t("profile.modal.addToProfile.main.experience"),
					to: "edit/experience",
				},
				{
					title: t("profile.modal.addToProfile.main.skills"),
					to: "edit/skill",
				},
			],
		},
		{
			id: 1,
			title: t("profile.modal.addToProfile.recommended.title"),
			content: [
				{
					title: t("profile.modal.addToProfile.recommended.certificates"),
					to: "edit/certification",
				},
				{
					title: t("profile.modal.addToProfile.recommended.projects"),
					to: "edit/project",
				},
				{
					title: t("profile.modal.addToProfile.recommended.courses"),
					to: "edit/course",
				},
				{
					title: t("profile.modal.addToProfile.recommended.recommendations"),
					to: "edit/request-recommendation",
				},
			],
		},
		{
			id: 2,
			title: t("profile.modal.addToProfile.additional.title"),
			content: [
				{
					title: t("profile.modal.addToProfile.additional.volunteerExperience"),
					to: "edit/volunteer-experience",
				},
				{
					title: t("profile.modal.addToProfile.additional.languages"),
					to: "edit/language",
				},
				// {
				// 	title: t("profile.modal.addToProfile.additional.contact"),
				// 	to: "edit/contact-information",
				// },
			],
		},
	]

	const SectionItem = ({
		title,
		content,
		isOpened,
		onClickHandler,
		onLinkClick,
	}) => {
		return (
			<React.Fragment>
				<button
					onClick={onClickHandler}
					className='flex flex-row items-center pt-2.5 pb-1 border-t-[0.5px] border-[#24459A80]'
				>
					<h1 className='font-jost text-[#2D2A33] text-xl md:text-lg'>
						{title}
					</h1>

					<ChevronDownIcon
						className='ml-auto fill-[#7D7D7D] w-4 md:w-3.5'
						style={{ transform: `rotate(${isOpened ? 180 : 0}deg)` }}
					/>
				</button>
				<ConditionalWrapper condition={isOpened}>
					{content.map((data, index) => (
						<UnderlinedLink
							key={`${title}-content-${index}`}
							to={data.to}
							onClick={onLinkClick}
							className='mb-2 text-lg md:text-base'
						>
							{data.title}
						</UnderlinedLink>
					))}
				</ConditionalWrapper>
			</React.Fragment>
		)
	}

	const onChangeSelected = id => {
		setSelected(val => (val === id ? -1 : id))
	}

	const { isMobile } = useMobileDetector()

	return (
		<Show>
			<Show.When isTrue={!isMobile}>
				<div
					className='flex flex-col gap-2 p-5 w-[500px]'
					style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
				>
					<div className='flex flex-row py-2.5'>
						<h1 className='font-jost font-semibold text-[#2D2A33] text-xl'>
							{t("profile.modal.addToProfile.title")}
						</h1>

						<button onClick={onClose} className='ml-auto'>
							<XMarkIcon className='fill-[#7D7D7D] h-4' />
						</button>
					</div>

					{blocks.map((block, index) => (
						<SectionItem
							onClickHandler={() => onChangeSelected(block.id)}
							isOpened={selected === block.id}
							key={`blockSectionItem-${index}`}
							onLinkClick={onClose}
							{...block}
						/>
					))}
				</div>
			</Show.When>

			<Show.Else>
				<div className='flex flex-col px-6 py-6 bg-white h-[100dvh] w-screen'>
					<div className='flex flex-row py-2.5'>
						<h1 className='font-jost font-semibold text-[#2D2A33] text-2xl'>
							{t("profile.modal.addToProfile.title")}
						</h1>

						<button onClick={onClose} className='ml-auto'>
							<XMarkIcon className='fill-[#7D7D7D] h-6' />
						</button>
					</div>

					{blocks.map((block, index) => (
						<SectionItem
							onClickHandler={() => onChangeSelected(block.id)}
							isOpened={selected === block.id}
							key={`blockSectionItem-${index}`}
							onLinkClick={onClose}
							{...block}
						/>
					))}
				</div>
			</Show.Else>
		</Show>
	)
}
export default AddToProfile
