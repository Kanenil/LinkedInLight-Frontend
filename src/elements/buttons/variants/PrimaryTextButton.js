import classNames from "classnames"
import { twMerge } from "tailwind-merge"

const PrimaryTextButton = ({
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
					"inline-flex justify-center text-xl font-jost font-bold text-[#24459A] hover:text-[#112861] py-1.5 px-6 transition duration-500 ease-in-out",
					className,
				),
				`rounded-${rounded}`,
			)}
		>
			{children}
		</button>
	)
}

export default PrimaryTextButton
