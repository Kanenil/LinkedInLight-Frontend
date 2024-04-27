import useComponentVisible from "../../hooks/useComponentVisible"
import { Link } from "react-router-dom"
import ConditionalWrapper from "../shared/ConditionalWrapper"
import useMobileDetector from "../../hooks/useMobileDetector"
import Modal from "../../components/shared/modals/Modal"
import React, { useEffect } from "react"
import Button from "./Button"
import ProfileService from "../../services/profileService"
import { useState } from "react"
import { asyncFilter } from "../../utils/converters"

const statuses = [
	{
		title: "Finding a new work",
		description: "Show recruiters and others that you're open to work",
		to: "edit/job-opportunity",
		condition: async () => {
			try {
				return !(await ProfileService.getOpenToWork())
			} catch (err) {
				return true
			}
		},
	},
	{
		title: "Hiring",
		description: "Share that you're hiring and attract qualified candidates",
		to: " ",
		condition: true,
	},
	{
		title: "Providing services",
		description: "Showcase services you offer so new client can discover you",
		to: " ",
		condition: true,
	},
]

const ChoiceItem = ({ title, description, to, onClick }) => {
	return (
		<Link
			to={to}
			onClick={onClick}
			className='py-1 px-5 md:w-[240px] font-roboto text-[#2D2A33] hover:bg-[#F5F8FF]'
		>
			<h1 className='font-medium text-base md:text-sm'>{title}</h1>
			<h3 className='font-light font-jost text-base md:text-sm'>
				{description}
			</h3>
		</Link>
	)
}

const OpenToButton = () => {
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible(false)

	const [filteredStatuses, setFilteredStatuses] = useState([])

	useEffect(() => {
		asyncFilter(statuses, async status => {
			if (typeof status.condition === "function")
				return await status.condition()

			return await new Promise(resolve => {
				resolve(status.condition)
			})
		}).then(resp => {
			setFilteredStatuses(resp)
		})
	}, [])

	const { isMobile } = useMobileDetector()

	const onClose = () => {
		setIsComponentVisible(false)
	}

	return (
		<div ref={ref} className='relative'>
			<Button
				onClick={() => setIsComponentVisible(val => !val)}
				variant='primary'
				rounded='full'
			>
				Open to
			</Button>
			<ConditionalWrapper condition={isComponentVisible && !isMobile}>
				<div
					className='absolute flex flex-col gap-1 bg-white left-0 rounded-r-lg rounded-b-lg top-10 py-2 z-20'
					style={{ boxShadow: "0px 1px 6px 0px #00000040" }}
				>
					{filteredStatuses.map((status, index) => (
						<ChoiceItem key={`OpenToStatus-${index}`} {...status} />
					))}
				</div>
			</ConditionalWrapper>
			<ConditionalWrapper condition={isComponentVisible && isMobile}>
				<Modal isOpen={isComponentVisible} isRounded={false}>
					<div onClick={onClose} className='flex h-screen'>
						<div
							onClick={e => e.stopPropagation()}
							className='mt-auto flex flex-col rounded-t-lg w-screen bg-white px-6 py-6'
						>
							<button
								className='mx-auto w-[40px] bg-[#24459A] h-1 rounded-full mb-5'
								onClick={onClose}
							/>

							{filteredStatuses.map((status, index) => (
								<ChoiceItem
									key={`OpenToStatus-${index}`}
									{...status}
									onClick={onClose}
								/>
							))}
						</div>
					</div>
				</Modal>
			</ConditionalWrapper>
		</div>
	)
}
export default OpenToButton
