import useComponentVisible from "../../../hooks/useComponentVisible"
import React, { useRef } from "react"
import BurgerMenuIcon from "../../../elements/icons/BurgerMenuIcon"
import { useTranslation } from "react-i18next"

const options = [
	{ label: "company.post.edit", value: "edit" },
	{ label: "company.post.delete", value: "delete" },
]

const PostOptionButton = ({ onDelete, onEdit }) => {
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible(false)
	const dropdownContentRef = useRef(null)
	const menuRef = useRef()
	const { t } = useTranslation()

	const onChange = async e => {
		const { value } = e

		const changeOptions = {
			delete: onDelete,
			edit: onEdit,
		}

		changeOptions[value]()
		setIsComponentVisible(false)
	}

	return (
		<div className='my-auto' ref={ref}>
			<button
				ref={menuRef}
				onClick={() => setIsComponentVisible(prev => !prev)}
			>
				<BurgerMenuIcon className='fill-[#2D2A33] h-3' />
			</button>
			<div
				ref={dropdownContentRef}
				className={`${
					isComponentVisible ? "" : "hidden"
				} z-20 absolute w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
				style={{
					top: ref.current ? ref.current.offsetTop + 20 : 0,
					left: ref.current
						? ref.current.getBoundingClientRect().left - 100
						: 0,
				}}
			>
				<div className='py-1'>
					{options.map((option, index) => (
						<button
							onClick={() => onChange(option)}
							key={index}
							className='w-full flex items-end px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
						>
							{t(option.label)}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
export default PostOptionButton
