import XMarkIcon from "../../../../elements/icons/XMarkIcon"
import React from "react"
import Button from "../../../../elements/buttons/Button"
import { useTranslation } from "react-i18next"

const ConfirmAction = ({ onClose, onConfirm, action, title }) => {
	const { t } = useTranslation()

	return (
		<div
			className='flex flex-col gap-1 bg-white p-5 w-screen mt-[30vh] md:mt-0 md:w-[351px]'
			style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
		>
			<div className='flex flex-row py-2.5'>
				<h1 className='font-jost font-semibold text-[#2D2A33] text-xl'>
					{t(title)}
				</h1>

				<button onClick={onClose} className='ml-auto'>
					<XMarkIcon className='fill-[#7D7D7D] h-4' />
				</button>
			</div>

			<h3 className='border-t-[0.5px] border-[#24459A80] pt-6 pb-4 text-sm'>
				{t(action)}
			</h3>

			<div className='flex justify-end pt-2.5 pb-1 gap-2'>
				<Button
					className='w-fit py-1'
					variant='tertiary'
					rounded='full'
					onClick={onClose}
				>
					{t("modal.cancel")}
				</Button>

				<Button
					className='w-fit py-1'
					variant='primary'
					rounded='full'
					onClick={onConfirm}
				>
					{t("modal.confirm")}
				</Button>
			</div>
		</div>
	)
}
export default ConfirmAction
