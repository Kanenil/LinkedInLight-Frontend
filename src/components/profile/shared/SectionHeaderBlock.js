import PencilButton from "../../../elements/buttons/PencilButton"
import React from "react"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import Button from "../../../elements/buttons/Button"

const SectionHeaderBlock = ({
	title,
	buttonTitle,
	onPencilClickTo,
	link,
	margin = "",
	isOwner,
}) => {
	return (
		<div className={`flex flex-row font-jost ${margin}`}>
			<h1 className='font-medium text-2xl text-[#2D2A33]'>{title}</h1>

			<ConditionalWrapper condition={isOwner}>
				<PencilButton to={onPencilClickTo} className='hidden md:block ml-3.5' />

				<div className='flex flex-row items-center gap-3 ml-auto'>
					<PencilButton
						to={onPencilClickTo}
						className='block md:hidden ml-3.5'
					/>

					<Button
						variant='tertiary'
						className='bg-transparent'
						rounded='full'
						onClick={() => navigator(link)}
					>
						{buttonTitle}
					</Button>
				</div>
			</ConditionalWrapper>
		</div>
	)
}
export default SectionHeaderBlock
