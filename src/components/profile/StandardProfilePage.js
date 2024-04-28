import React from "react"
import RightEditSection from "./sections/RightEditSection"
import PeopleMayKnow from "./sections/PeopleMayKnow"
import { sections } from "../../constants/sections"
import { useScrollToLocation } from "../../hooks/useScrollToLocation"
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper"
import useMobileDetector from "../../hooks/useMobileDetector"
import Show from "../../elements/shared/Show"
import LeftProfileSection from "./LeftProfileSection"

const StandardProfilePage = ({ user, isOwner }) => {
	useScrollToLocation()

	const { isMobile } = useMobileDetector()

	return (
		<main className='bg-[#E7E7E7] flex-grow'>
			<div className='flex flex-col sm:flex-row mb-20 sm:my-8 sm:mx-auto sm:container md:w-[1170px]'>
				<div className='sm:w-8/12'>
					<LeftProfileSection user={user} isOwner={isOwner} />
				</div>
				<div className='mt-5 sm:mt-0 sm:w-4/12 sm:ml-10'>
					<ConditionalWrapper condition={isOwner}>
						<RightEditSection />
					</ConditionalWrapper>

					<PeopleMayKnow />
				</div>
			</div>
			{/* <Show>
				<Show.When isTrue={!isMobile}></Show.When>

				<Show.Else>
					<div className='flex flex-col gap-2.5 mb-24'>
						{sections.map((section, index) =>
							React.cloneElement(section.children, {
								key: `sections-${index}`,
								user,
								isOwner,
							}),
						)}
					</div>
				</Show.Else>
			</Show> */}
		</main>
	)
}
export default StandardProfilePage
