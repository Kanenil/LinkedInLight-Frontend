import React from "react"
import { sections } from "../../constants/sections"

const LeftProfileSection = ({ user, isOwner, isPreview = false }) => {
	return (
		<div className='rounded-t-lg overflow-hidden'>
			<div className='flex flex-col gap-2.5'>
				{sections.map((section, index) =>
					React.cloneElement(section.children, {
						key: `sections-${index}`,
						user,
						isOwner,
						isPreview,
					}),
				)}
			</div>
		</div>
	)
}
export default LeftProfileSection
