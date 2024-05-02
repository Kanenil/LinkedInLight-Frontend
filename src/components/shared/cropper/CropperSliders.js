import { useImageCropContext } from "../../../providers/ImageCropProvider"
import MinusIcon from "../../../elements/icons/MinusIcon"
import PlusIcon from "../../../elements/icons/PlusIcon"
import React from "react"
import { useTranslation } from "react-i18next"

export const ZoomSlider = () => {
	const {
		zoom,
		setZoom,
		handleZoomIn,
		handleZoomOut,
		max_zoom,
		min_zoom,
		zoom_step,
	} = useImageCropContext()
	const { t } = useTranslation()

	return (
		<div className='flex flex-col gap-2.5 p-2.5 w-full'>
			<h1 className='font-jost font-light text-black'>
				{t("profile.modal.image.zoom")}
			</h1>

			<div className='flex flex-row p-2.5 gap-2.5 items-center'>
				<button onClick={handleZoomOut}>
					<MinusIcon className='w-5 fill-[#7D88A4]' />
				</button>
				<input
					type='range'
					className='w-full styled-slider slider-progress'
					name='volju'
					min={min_zoom}
					max={max_zoom}
					step={zoom_step}
					value={zoom}
					onChange={e => {
						setZoom(Number(e.target.value))
					}}
				/>
				<button onClick={handleZoomIn}>
					<PlusIcon className='h-5 fill-[#7D88A4]' />
				</button>
			</div>
		</div>
	)
}

export const RotationSlider = () => {
	const {
		rotation,
		setRotation,
		max_rotation,
		min_rotation,
		rotation_step,
		handleRotateAntiCw,
		handleRotateCw,
	} = useImageCropContext()
	const { t } = useTranslation()

	return (
		<div className='flex flex-col gap-2.5 p-2.5 w-full'>
			<h1 className='font-jost font-light text-black'>
				{t("profile.modal.image.straighten")}
			</h1>

			<div className='flex flex-row p-2.5 gap-2.5 items-center'>
				<button onClick={handleRotateAntiCw}>
					<MinusIcon className='w-5 fill-[#7D88A4]' />
				</button>
				<input
					type='range'
					name='volju'
					min={min_rotation}
					max={max_rotation}
					step={rotation_step}
					value={rotation}
					className='w-full styled-slider slider-progress'
					onChange={e => {
						setRotation(Number(e.target.value))
					}}
				/>
				<button onClick={handleRotateCw}>
					<PlusIcon className='h-5 fill-[#7D88A4]' />
				</button>
			</div>
		</div>
	)
}
