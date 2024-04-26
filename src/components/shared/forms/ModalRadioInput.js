import React, { memo } from "react"
import { twMerge } from "tailwind-merge"

const ModalRadioInput = memo(
	({
		title,
		name,
		onChange,
		value,
		condition,
		disabled,
		className,
		children,
	}) => {
		const id = crypto.randomUUID()

		return (
			<div className='flex flex-row items-center gap-2'>
				<input
					id={id}
					name={name}
					checked={value.toString() === condition.toString()}
					value={condition}
					type='radio'
					onChange={onChange}
					disabled={disabled}
					className={twMerge(
						"border-[#7D7D7D] hover:border-[#2D2A33] checked:border-[1px] checked:border-[#2D2A33] focus:ring-transparent checked:focus:bg-[#24459A] checked:bg-[#24459A] checked:hover:bg-[#24459A]",
						className,
					)}
					style={{ backgroundImage: "none" }}
				/>

				<label htmlFor={id} className='font-jost text-[#2D2A33]'>
					{children || title}
				</label>
			</div>
		)
	},
)
export default ModalRadioInput
