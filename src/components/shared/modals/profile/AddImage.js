import illustration from "../../../../assets/image-add-illustration.svg"
import Dropzone from "../../Dropzone"
import React, { useEffect, useState } from "react"
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper"
import CircularArrowIcon from "../../../../elements/icons/CircularArrowIcon"
import ProfileService from "../../../../services/profileService"
import Cropper from "../../cropper/Cropper"
import { useImageCropContext } from "../../../../providers/ImageCropProvider"
import { readFile } from "../../../../utils/cropImage"
import { RotationSlider, ZoomSlider } from "../../cropper/CropperSliders"
import ModalHeader from "../ModalHeader"
import { imageUrlToBase64 } from "../../../../utils/converters"
import { APP_ENV } from "../../../../env"
import { useQuery } from "@tanstack/react-query"
import { useAlertContext } from "../../../../providers/AlertProvider"
import Show from "../../../../elements/shared/Show"
import useMobileDetector from "../../../../hooks/useMobileDetector"
import XMarkIcon from "../../../../elements/icons/XMarkIcon"
import Button from "../../../../elements/buttons/Button"

const AddImage = ({ onClose, onSave, onChange, isBackground = false }) => {
	const { data } = useQuery({
		queryFn: () => ProfileService.getProfile(),
		queryKey: ["profile"],
		select: ({ data }) => data,
	})
	const { image, setImage, rotation, setRotation, getProcessedImage } =
		useImageCropContext()
	const [error, setError] = useState("")
	const { success } = useAlertContext()

	const handleFileChange = async ({ target: { files } }) => {
		const file = files && files[0]
		if (!file) return

		onChange()
		const imageDataUrl = await readFile(file)

		const img = new Image()
		img.src = imageDataUrl
		img.onload = () => {
			setError("")

			if (isBackground && img.width < 800) {
				setError("Background width must be at least 800px!")
				return
			}

			setImage(imageDataUrl)
		}
	}

	const handleDone = async () => {
		const avatar = await getProcessedImage()

		const reader = new FileReader()
		reader.readAsDataURL(avatar)
		reader.onloadend = () => {
			const base64data = reader.result
			ProfileService.changeImage(base64data, isBackground).then(() => {
				onSave()
				success(
					`${isBackground ? "Background image" : "Image"} successfully saved.`,
					5,
				)
				setImage(null)
			})
		}
	}

	useEffect(() => {
		const handleImageResponse = imageURL => {
			imageUrlToBase64(imageURL, resp => {
				setImage(resp)
			})
		}

		const { image, background } = data || {}

		if (!isBackground && image) {
			handleImageResponse(`${APP_ENV.UPLOADS_URL}/${image}`)
		} else if (isBackground && background) {
			handleImageResponse(`${APP_ENV.UPLOADS_URL}/${background}`)
		} else {
			setImage(null)
		}
	}, [data, isBackground])

	const { isMobile } = useMobileDetector()

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
		<Show>
			<Show.When isTrue={!isMobile}>
				<div
					className='flex flex-col gap-2.5 py-5 px-8 w-[750px]'
					style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
				>
					<ModalHeader
						title={
							image
								? isBackground
									? "Edit background"
									: "Edit image "
								: isBackground
								? "Add background"
								: "Add image"
						}
						onClose={onClose}
						withBorder={false}
					/>

					<ConditionalWrapper condition={!image}>
						<Dropzone
							onFileSelect={handleFileChange}
							className='flex flex-col items-center  border-t-[0.5px] border-[#24459A80] pb-2.5'
						>
							<img
								className='w-fit h-fit'
								src={illustration}
								alt='illustration'
							/>

							<h3 className='font-jost font-light text-sm py-1 text-center'>
								At <strong>Job for You</strong>, we embrace your authenticity!
								Take a photo or upload an existing one to make your profile as
								realistic as possible. We support your unique presentation,
								without editing or filters – here, it's all about you!
							</h3>
						</Dropzone>

						<div className='flex justify-end pt-2.5 pb-1'>
							<div className='flex flex-col items-end gap-2.5'>
								<input
									id='upload'
									className='hidden'
									onChange={handleFileChange}
									accept='image/png, image/jpg, image/jpeg'
									type='file'
									multiple={false}
								/>
								<Button
									rounded='full'
									variant='primary'
									onClick={() => document.getElementById("upload").click()}
								>
									Upload image
								</Button>
								<ConditionalWrapper condition={error}>
									<h3 className='text-red-500 text-sm'>{error}</h3>
								</ConditionalWrapper>
							</div>
						</div>
					</ConditionalWrapper>
					<ConditionalWrapper condition={image}>
						<div className='flex flex-col items-center overflow-hidden bg-[#D9D9D9]'>
							<Cropper
								cropShape={isBackground ? "rect" : "round"}
								aspect={isBackground ? 4 : 1}
							/>
						</div>

						<div className='flex flex-row justify-end gap-2.5 pt-2.5 pb-1 px-4'>
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

						<div className='flex flex-row gap-2.5 py-1'>
							<ZoomSlider />

							<RotationSlider />
						</div>

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
									accept='image/png, image/jpg, image/jpeg'
									type='file'
									multiple={false}
								/>

								<Button rounded='full' variant='primary' onClick={handleDone}>
									Save image
								</Button>
							</div>

							<ConditionalWrapper condition={error}>
								<h3 className='text-red-500 text-sm'>{error}</h3>
							</ConditionalWrapper>
						</div>
					</ConditionalWrapper>
				</div>
			</Show.When>

			<Show.Else>
				<Show>
					<Show.When isTrue={!!image}>
						<div className='flex flex-col px-6 py-6 bg-white h-[100dvh] w-screen'>
							<div className='flex flex-row py-2.5'>
								<h1 className='font-jost font-semibold text-[#2D2A33] text-2xl'>
									{isBackground ? "Edit background" : "Edit image"}
								</h1>

								<button onClick={onClose} className='ml-auto'>
									<XMarkIcon className='fill-[#7D7D7D] h-6' />
								</button>
							</div>

							<div className='flex flex-col items-center overflow-hidden bg-[#D9D9D9]'>
								<Cropper
									cropShape={isBackground ? "rect" : "round"}
									aspect={isBackground ? 4 : 1}
								/>
							</div>

							<div className='flex flex-col gap-2.5 py-1'>
								<ZoomSlider />

								<RotationSlider />
							</div>

							<div className='flex flex-row justify-end gap-2.5 pt-2.5 pb-1 px-4'>
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

							<div className='flex flex-col items-center mt-7 pt-2.5 pb-1 gap-2.5'>
								<div className='flex justify-center w-full items-start gap-5'>
									<Button
										rounded='full'
										variant='tertiary'
										className='py-1'
										onClick={() =>
											document.querySelector("#changeImage").click()
										}
									>
										Change image
									</Button>
									<input
										id='changeImage'
										className='hidden'
										onChange={handleFileChange}
										accept='image/png, image/jpg, image/jpeg'
										type='file'
										multiple={false}
									/>

									<Button rounded='full' variant='primary' onClick={handleDone}>
										Save image
									</Button>
								</div>

								<ConditionalWrapper condition={error}>
									<h3 className='text-red-500 text-sm'>{error}</h3>
								</ConditionalWrapper>
							</div>
						</div>
					</Show.When>

					<Show.Else>
						<div onClick={onClose} className='flex h-screen'>
							<div
								onClick={e => e.stopPropagation()}
								className='mt-auto flex flex-col rounded-t-lg w-screen bg-white px-6 py-6'
							>
								<button
									className='mx-auto w-[40px] bg-[#24459A] h-1 rounded-full mb-5'
									onClick={onClose}
								/>

								<h1 className='font-jost font-semibold text-[#2D2A33] text-xl'>
									{isBackground ? "Add background" : "Add image"}
								</h1>

								<button
									onClick={() => document.querySelector("#changeImage").click()}
									className='mt-5 mb-10 flex flex-row gap-6'
								>
									<div className='my-auto'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='53'
											height='56'
											viewBox='0 0 53 56'
											fill='none'
										>
											<path
												d='M42.75 38.5H39V34.75C39 34.4185 38.8683 34.1005 38.6339 33.8661C38.3995 33.6317 38.0815 33.5 37.75 33.5C37.4185 33.5 37.1005 33.6317 36.8661 33.8661C36.6317 34.1005 36.5 34.4185 36.5 34.75V38.5H32.75C32.4185 38.5 32.1005 38.6317 31.8661 38.8661C31.6317 39.1005 31.5 39.4185 31.5 39.75C31.5 40.0815 31.6317 40.3995 31.8661 40.6339C32.1005 40.8683 32.4185 41 32.75 41H36.5V44.75C36.5 45.0815 36.6317 45.3995 36.8661 45.6339C37.1005 45.8683 37.4185 46 37.75 46C38.0815 46 38.3995 45.8683 38.6339 45.6339C38.8683 45.3995 39 45.0815 39 44.75V41H42.75C43.0815 41 43.3995 40.8683 43.6339 40.6339C43.8683 40.3995 44 40.0815 44 39.75C44 39.4185 43.8683 39.1005 43.6339 38.8661C43.3995 38.6317 43.0815 38.5 42.75 38.5ZM27.75 38.5H12.75C12.4185 38.5 12.1005 38.3683 11.8661 38.1339C11.6317 37.8995 11.5 37.5815 11.5 37.25V14.75C11.5 14.4185 11.6317 14.1005 11.8661 13.8661C12.1005 13.6317 12.4185 13.5 12.75 13.5H35.25C35.5815 13.5 35.8995 13.6317 36.1339 13.8661C36.3683 14.1005 36.5 14.4185 36.5 14.75V29.75C36.5 30.0815 36.6317 30.3995 36.8661 30.6339C37.1005 30.8683 37.4185 31 37.75 31C38.0815 31 38.3995 30.8683 38.6339 30.6339C38.8683 30.3995 39 30.0815 39 29.75V14.75C39 13.7554 38.6049 12.8016 37.9017 12.0983C37.1984 11.3951 36.2446 11 35.25 11H12.75C11.7554 11 10.8016 11.3951 10.0983 12.0983C9.39509 12.8016 9 13.7554 9 14.75V37.25C9 38.2446 9.39509 39.1984 10.0983 39.9017C10.8016 40.6049 11.7554 41 12.75 41H27.75C28.0815 41 28.3995 40.8683 28.6339 40.6339C28.8683 40.3995 29 40.0815 29 39.75C29 39.4185 28.8683 39.1005 28.6339 38.8661C28.3995 38.6317 28.0815 38.5 27.75 38.5Z'
												fill='#24459A'
											/>
											<path
												d='M20.2498 22.252C21.9756 22.252 23.3748 20.8528 23.3748 19.127C23.3748 17.4011 21.9756 16.002 20.2498 16.002C18.5239 16.002 17.1248 17.4011 17.1248 19.127C17.1248 20.8528 18.5239 22.252 20.2498 22.252Z'
												fill='#24459A'
											/>
											<path
												d='M15.6127 26.3639L14.0002 27.9889V36.0014H34.0002V27.9889L28.6377 22.6139C28.5215 22.4967 28.3833 22.4037 28.231 22.3403C28.0786 22.2768 27.9153 22.2441 27.7502 22.2441C27.5852 22.2441 27.4218 22.2768 27.2695 22.3403C27.1172 22.4037 26.979 22.4967 26.8627 22.6139L20.2502 29.2389L17.3877 26.3639C17.2715 26.2467 17.1333 26.1537 16.981 26.0903C16.8286 26.0268 16.6653 25.9941 16.5002 25.9941C16.3352 25.9941 16.1718 26.0268 16.0195 26.0903C15.8672 26.1537 15.7289 26.2467 15.6127 26.3639Z'
												fill='#24459A'
											/>
										</svg>
									</div>

									<div className='flex flex-col gap-1.5 font-jost text-[#2D2A33] text-start'>
										<h1 className='font-semibold'>Select from gallery</h1>

										<h3 className='font-light text-sm'>
											Upload a photo to make your profile as real as possible.
											We support your unique representation, without editing or
											filters - it's all about you here!
										</h3>
									</div>
								</button>
								<ConditionalWrapper condition={error}>
									<h3 className='text-red-500 text-sm'>{error}</h3>
								</ConditionalWrapper>
								<input
									id='changeImage'
									className='hidden'
									onChange={handleFileChange}
									accept='image/png, image/jpg, image/jpeg'
									type='file'
									multiple={false}
								/>
							</div>
						</div>
					</Show.Else>
				</Show>
			</Show.Else>
		</Show>
	)
}
export default AddImage
