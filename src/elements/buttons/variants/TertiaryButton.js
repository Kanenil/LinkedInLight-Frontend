import classNames from "classnames"
import { twMerge } from "tailwind-merge"

const TertiaryButton = ({
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
				"inline-flex items-center justify-center gap-1 text-sm font-jost font-medium text-[#556DA9] hover:text-[#556DA9] bg-white hover:bg-[#E5F2FC] border-[#24459A] border-[1px] hover:border-[#24459A] hover:border-[1.5px] py-1.5 px-6 transition duration-500 ease-in-out",
				className,
			),
			`rounded-${rounded}`,
		)}
	>
		{children}
	</button>
)

export default TertiaryButton
