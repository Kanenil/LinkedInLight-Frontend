import React, { useEffect, useState } from "react"
import Cropper from "../../cropper/Cropper"
import CircularArrowIcon from "../../../../elements/icons/CircularArrowIcon"
import { RotationSlider, ZoomSlider } from "../../cropper/CropperSliders"
import { useImageCropContext } from "../../../../providers/ImageCropProvider"
import ModalHeader from "../ModalHeader"
import { readFile } from "../../../../utils/cropImage"
import Show from "../../../../elements/shared/Show"
import { DocumentIcon } from "@heroicons/react/24/outline"
import Button from "../../../../elements/buttons/Button"

const MessageWithFile = ({
	onSave,
	onClose,
	onChange,
	message,
	setMessage,
	file,
	setFile,
	accept,
}) => {
	const { setRotation, rotation, setImage } = useImageCropContext()
	const [error, setError] = useState(false)
	const isImage = file.type.includes("image")

	useEffect(() => {
		onChange()
	}, [])

	const handleFileChange = async ({ target: { files } }) => {
		const file = files && files[0]
		if (!file) return

		if (file.type.includes("image")) {
			onChange()
			const imageDataUrl = await readFile(file)

			const img = new Image()
			img.src = imageDataUrl
			img.onload = () => {
				setImage(imageDataUrl)
			}
		} else {
			setFile(file)
		}
	}

	const onSubmit = () => {
		if (!message) return setError(true)

		onSave()
	}

	/*generated with Input range slider CSS style generator (version 20211225)
    https://toughengineer.github.io/demo/slider-styler*/
	for (let e of document.querySelectorAll(
		'input[type="range"].slider-progress',
	)) {
		e.style.setProperty("--value", e.value)
		e.style.setProperty("--min", e.min == "" ? "0" : e.min)
		e.style.setProperty("--max", e.max == "" ? "100" : e.max)
		e.addEventListener("input", () => e.style.setProperty("--value", e.value))
	}

	return (
		<div
			className='flex flex-col gap-2.5 py-5 px-8 bg-white w-screen h-[100dvh] md:h-full md:w-[750px]'
			style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
		>
			<ModalHeader
				title='Message with file'
				onClose={onClose}
				withBorder={false}
			/>

			<Show>
				<Show.When isTrue={isImage}>
					<div className='flex flex-col items-center overflow-hidden bg-[#D9D9D9]'>
						<Cropper cropShape='rect' aspect={1} />
					</div>

					<div className='flex flex-row justify-end items-center gap-2.5 pt-2.5 pb-1 px-4'>
						<button
							onClick={() => setRotation(rotation + 90)}
							className='flex items-center justify-center border-[1px] border-[#7D88A4] rounded-full w-8 h-8'
						>
							<CircularArrowIcon className='fill-[#7D88A4] h-4' />
						</button>

						<button
							onClick={() => setRotation(rotation - 90)}
							className='flex items-center justify-center border-[1px] border-[#7D88A4] rounded-full w-8 h-8'
						>
							<CircularArrowIcon
								className='fill-[#7D88A4] h-4'
								style={{ transform: "rotateY(-180deg)" }}
							/>
						</button>
					</div>

					<div className='flex flex-col md:flex-row gap-2.5 py-1'>
						<ZoomSlider />

						<RotationSlider />
					</div>
				</Show.When>

				<Show.Else>
					<div className='flex flex-row gap-3 rounded-lg overflow-hidden items-center bg-gray-500'>
						<div className='bg-gray-300 px-2 py-2'>
							<DocumentIcon className='w-8 h-8' />
						</div>

						<h3 className='font-jost text-xl text-white'>{file.name}</h3>
					</div>
				</Show.Else>
			</Show>

			<textarea
				value={message}
				onChange={e => {
					setMessage(e.target.value)
					setError(false)
				}}
				className='w-full h-[120px] rounded-xl border-gray-300 border-[1px] resize-none inline block'
				placeholder='Type message...'
			/>
			{error && (
				<p className='mt-2 text-[#9E0F20] text-xs'>This field is required.</p>
			)}

			<div className='flex flex-col items-end pt-2.5 pb-1 gap-2.5'>
				<div className='flex justify-end items-start gap-5'>
					<Button
						rounded='full'
						variant='tertiary'
						className='py-1'
						onClick={() => document.querySelector("#changeImage").click()}
					>
						Change image
					</Button>
					<input
						id='changeImage'
						className='hidden'
						onChange={handleFileChange}
						accept={accept}
						type='file'
					/>
					<Button rounded='full' variant='primary' onClick={onSubmit}>
						Send
					</Button>
				</div>
			</div>
		</div>
	)
}
export default MessageWithFile
