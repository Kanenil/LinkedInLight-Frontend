import classNames from "classnames"
import { twMerge } from "tailwind-merge"

const PrimaryButton = ({
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
					"inline-flex justify-center text-sm font-jost text-white bg-[#24459A] hover:bg-[#112861] disabled:bg-[#BABABA] py-1.5 px-6 transition duration-500 ease-in-out",
					className,
				),
				`rounded-${rounded}`,
			)}
		>
			{children}
		</button>
	)
}

export default PrimaryButton
