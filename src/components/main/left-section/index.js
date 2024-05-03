import { useEffect, useState } from "react"

import MyCompanies from "./MyCompaniesSection"
import ProfileSection from "./ProfileSection"
import classNames from "classnames"

const LeftSection = ({ profile }) => {
	const [scrollPosition, setScrollPosition] = useState(0)

	const handleScroll = () => {
		const position = window.pageYOffset
		setScrollPosition(position)
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true })

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	return (
		<div
			className={classNames(
				"hidden md:block md:w-4/12 relative mb-3 md:mb-0",
				scrollPosition > 40 && "-top-20",
			)}
		>
			<div className='md:fixed flex flex-col gap-2'>
				<ProfileSection profile={profile} />

				<MyCompanies />
			</div>
		</div>
	)
}
export default LeftSection
