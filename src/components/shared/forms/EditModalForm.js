import useOverflow from "../../../hooks/useOverflow"
import ModalHeader from "../modals/ModalHeader"
import React from "react"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import useMobileDetector from "../../../hooks/useMobileDetector"
import classNames from "classnames"
import Button from "../../../elements/buttons/Button"

const EditModalForm = ({
	header,
	onClose,
	children,
	isEdit,
	onRemove,
	onSubmit,
	removeTitle,
	saveTitle = "Save",
	withBorder = true,
}) => {
	const { isOverflow, containerRef, contentRef } = useOverflow()
	const { isMobile } = useMobileDetector()

	return (
		<form
			onSubmit={onSubmit}
			className={classNames("flex flex-col", {
				"px-6 py-6 bg-white h-[100dvh] w-screen": isMobile,
				"gap-2.5 py-5 px-8 w-[750px]": !isMobile,
			})}
			style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
		>
			<ModalHeader title={header} onClose={onClose} />

			<div
				id='container'
				ref={containerRef}
				className={classNames("overflow-x-hidden", {
					"max-h-[60dvh]": !isMobile,
					"max-h-[90dvh]": isMobile,
					"overflow-y-scroll pr-2": isOverflow,
					"overflow-y-hidden": !isOverflow,
				})}
			>
				<div className='flex flex-col gap-2.5' ref={contentRef}>
					{children}
				</div>
			</div>

			<div
				className={classNames("flex justify-end pt-2.5 pb-1 gap-5", {
					"border-t-[0.5px] border-[#24459A80]": withBorder && !isMobile,
					"mt-auto": isMobile,
				})}
			>
				<ConditionalWrapper condition={isEdit}>
					<button
						onClick={onRemove}
						type='button'
						className={classNames(
							"mr-auto text-[#24459A] font-medium hover:underline",
							{
								"w-full": isMobile,
							},
						)}
					>
						Remove {removeTitle}
					</button>
				</ConditionalWrapper>

				<Button
					type='submit'
					className={isMobile ? "w-full" : ""}
					rounded='full'
					variant='primary'
				>
					{saveTitle}
				</Button>
			</div>
		</form>
	)
}
export default EditModalForm
