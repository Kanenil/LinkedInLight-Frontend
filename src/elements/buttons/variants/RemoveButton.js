import classNames from "classnames"
import { twMerge } from "tailwind-merge"
import { XMarkIcon } from "@heroicons/react/24/solid"

const RemoveButton = ({
	onClick,
	children,
	type = "button",
	rounded,
	className,
	disabled,
}) => (
	<button
		type={type}
		onClick={onClick}
		disabled={disabled}
		className={classNames(
			twMerge(
				"inline-flex items-center justify-center gap-1 text-sm font-jost font-medium text-white bg-[#3967DB] border-[1.5px] hover:border-[#24459A] py-1.5 px-4 transition duration-500 ease-in-out",
				className,
			),
			`rounded-${rounded}`,
		)}
	>
		{children}

		<XMarkIcon className='w-4 h-4 stroke-[3px]' />
	</button>
)

export default RemoveButton
