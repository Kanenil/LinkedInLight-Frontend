import classNames from "classnames"
import { twMerge } from "tailwind-merge"
import { PlusIcon } from "@heroicons/react/24/solid"
import { CheckIcon } from "@heroicons/react/24/outline"

const SelectableButton = ({
	onClick,
	children,
	type = "button",
	rounded,
	className,
	disabled,
	active = false,
}) => (
	<button
		type={type}
		onClick={onClick}
		disabled={disabled}
		className={classNames(
			twMerge(
				"inline-flex items-center justify-center gap-1 text-sm font-jost font-medium border-[1px] border-[#2D2A33] py-1.5 px-4 transition duration-500 ease-in-out",
				className,
			),
			`rounded-${rounded}`,
			{
				"border-[1.5px] bg-[#3967DB] text-white hover:border-[#24459A]": active,
				"border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9]":
					!active,
			},
		)}
	>
		{children}

		{active ? (
			<CheckIcon className='w-4 h-4 stroke-[3px]' />
		) : (
			<PlusIcon className='w-4 h-4' />
		)}
	</button>
)

export default SelectableButton
