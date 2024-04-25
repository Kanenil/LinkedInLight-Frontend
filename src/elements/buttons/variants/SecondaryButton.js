import classNames from "classnames"
import { twMerge } from "tailwind-merge"

const SecondaryButton = ({
	onClick,
	children,
	type = "button",
	rounded,
	className,
	disabled,
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={classNames(
				twMerge(
					"inline-flex justify-center text-lg font-jost font-medium border-[1px] border-[#2D2A33] py-1.5 px-6 transition duration-500 ease-in-out",
					className,
				),
				`rounded-${rounded}`,
			)}
		>
			{children}
		</button>
	)
}

export default SecondaryButton
