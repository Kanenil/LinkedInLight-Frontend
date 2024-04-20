import React from "react"
import ConditionalWrapper from "../shared/ConditionalWrapper"
import { Link } from "react-router-dom"
import { PlusIcon } from "@heroicons/react/24/solid"

const AddButton = ({
	className,
	to,
	onClick,
	children,
	withIcon = true,
	...props
}) => {
	return (
		<React.Fragment>
			<ConditionalWrapper condition={to}>
				<Link
					className={`group flex flex-row gap-2.5 items-center mt-[5px] w-fit px-2.5 py-[5px] text-sm rounded-full border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:text-[#556DA9] active:text-[#24459A] active:border-[#24459A] active:border-[1.5px]  active:bg-[#E4EAFF] ${className}`}
					to={to}
					onClick={onClick}
					{...props}
				>
					{withIcon && (
						<PlusIcon className='text-[#7D88A4] group-hover:text-[#556DA9] group-active:text-[#24459A] h-3' />
					)}

					{children}
				</Link>
			</ConditionalWrapper>
			<ConditionalWrapper condition={onClick && !to}>
				<button
					className={`group flex flex-row gap-2.5 items-center mt-[5px] w-fit px-2.5 py-[5px] text-sm rounded-full border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:text-[#556DA9] active:text-[#24459A] active:border-[#24459A] active:border-[1.5px]  active:bg-[#E4EAFF] ${className}`}
					onClick={onClick}
					{...props}
				>
					{withIcon && (
						<PlusIcon className='text-[#7D88A4] group-hover:text-[#556DA9] group-active:text-[#24459A] h-3' />
					)}

					{children}
				</button>
			</ConditionalWrapper>
		</React.Fragment>
	)
}

const AddButtonVariant2 = ({ className, iconClass, children, ...props }) => {
	return (
		<button
			className={`${className} text-white rounded-full flex flex-row gap-2.5 items-center px-3 py-1 bg-[#3967DB] hover:bg-[#24459A] transition duration-500 ease-in-out`}
			{...props}
		>
			<PlusIcon className={iconClass ? iconClass : "w-5 h-5"} />

			{children}
		</button>
	)
}

const AddButtonVariant3 = ({ className, children, ...props }) => {
	return (
		<button
			className={`${className} text-white rounded-full flex flex-row gap-2.5 items-center px-3 py-1 bg-[#3967DB] hover:bg-[#24459A] transition duration-500 ease-in-out`}
			{...props}
		>
			{children}
		</button>
	)
}

const AddButtonVariant4 = ({ className, children, ...props }) => {
	return (
		<Link
			to={props.to}
			className={`${className} group flex flex-row gap-2.5 items-center mt-[5px] w-fit px-2.5 py-[5px] text-[#7D88A4] hover:text-[#24459A]`}
			{...props}
		>
			<PlusIcon className='text-[#7D88A4] group-hover:text-[#24459A] h-5' />

			{children}
		</Link>
	)
}

export { AddButtonVariant2, AddButtonVariant3, AddButtonVariant4 }

export default AddButton
