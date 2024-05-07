import EditModalForm from "../../forms/EditModalForm"
import { useFormik } from "formik"
import defaultImage from "../../../../assets/default-image.jpg"
import React, { useEffect } from "react"
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup"
import { PencilIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"
import * as yup from "yup"
import { readFile } from "../../../../utils/cropImage"
import Show from "../../../../elements/shared/Show"
import CompanyService from "../../../../services/companyService"
import { useSearchParams } from "react-router-dom"
import { imageUrlToBase64 } from "../../../../utils/converters"
import { APP_ENV } from "../../../../env"
import { useTranslation } from "react-i18next"

const CreatePostSchema = yup.object({
	content: yup.string().required("Content is required"),
	image: yup.string(),
})

const initValues = {
	content: "",
	image: "",
}

const CreatePost = ({ onClose, onSave, onChange, company }) => {
	const { t } = useTranslation()

	const [searchParams] = useSearchParams()

	const onSubmitFormik = async values => {
		if (searchParams.has("id")) {
			CompanyService.editPost({
				...values,
				id: searchParams.get("id"),
				postedAt: new Date().toISOString(),
				visibility: "Everybody",
				companyId: company.id,
			}).then(onSave)
		} else {
			CompanyService.createPost({
				...values,
				id: 0,
				postedAt: new Date().toISOString(),
				visibility: "Everybody",
				companyId: company.id,
				postedById: "",
			}).then(onSave)
		}
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: CreatePostSchema,
		onSubmit: onSubmitFormik,
	})

	const { values, errors, touched, handleSubmit, handleChange, setValues } =
		formik

	useEffect(() => {
		if (searchParams.has("id")) {
			CompanyService.post(searchParams.get("id")).then(({ data }) => {
				setValues(prev => ({
					...prev,
					content: data.content,
					postedById: data.postedById,
				}))

				if (data.image) {
					imageUrlToBase64(`${APP_ENV.UPLOADS_URL}/${data.image}`, resp => {
						setValues(prev => ({
							...prev,
							oldImage: data.image,
							image: resp,
						}))
					})
				}
			})
		}
	}, [searchParams])

	const onImageChange = async ({ target: { files } }) => {
		const file = files && files[0]
		if (!file) return

		if (file.type.includes("image")) {
			onChange()
			const imageDataUrl = await readFile(file)

			await setValues(prev => ({
				...prev,
				image: imageDataUrl,
			}))
		}
	}

	return (
		<EditModalForm
			header={t("company.posts.publish")}
			withBorder={false}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className='flex flex-row mt-5 md:mt-0'>
				<div className='flex items-center my-auto max-h-[70px] max-w-[70px] bg-white'>
					<img
						className='object-contain'
						src={
							company.logoImg
								? `${APP_ENV.UPLOADS_URL}/${company.logoImg}`
								: defaultImage
						}
						alt='company-logo'
					/>
				</div>

				<div className='ml-auto font-jost text-[#2D2A33]'>
					<h1 className='text-lg font-bold text-end'>{company.companyName}</h1>
					<h3 className='font-extralight break-words text-wrap'>
						{t("company.posts.everybodyCanWatch")}
					</h3>
				</div>
			</div>

			<div className='mt-4'>
				<ModalTextareaFormGroup
					value={values.content}
					onChange={e => {
						handleChange(e)
						onChange()
					}}
					name='content'
					className='mx-1'
					areaClass='text-lg border-0 focus:ring-0'
					rows={4}
					placeholder={t("company.posts.shareYourThoughts")}
				/>
				{touched.content && errors.content && (
					<p className='mt-2 text-[#9E0F20] text-xs'>
						{t("validation.required")}
					</p>
				)}
			</div>

			<Show>
				<Show.When isTrue={!!values.image}>
					<div className='inline-flex gap-3 ml-auto'>
						<label
							className='cursor-pointer bg-[#C6CCDA] rounded-lg p-1'
							htmlFor='image'
						>
							<PencilIcon className='text-white w-5 h-5' />
							<input
								id='image'
								onChange={onImageChange}
								className='hidden'
								type='file'
								accept='image/png, image/jpg, image/jpeg'
							/>
						</label>

						<button
							className='bg-[#C6CCDA] rounded-lg p-1'
							onClick={() =>
								setValues(async prev => await { ...prev, image: "" })
							}
						>
							<XMarkIcon className='text-white w-5 h-5 stroke-2' />
						</button>
					</div>
					<div className='flex items-center border-[0.5px] border-[#7D88A4]/50 rounded-lg overflow-hidden my-auto w-full h-fit bg-white'>
						<img
							className='object-contain'
							src={values.image}
							alt='company-logo'
						/>
					</div>
				</Show.When>

				<Show.Else>
					<div className='flex flex-row'>
						<label className='cursor-pointer' htmlFor='image'>
							<PhotoIcon className='text-[#2D2A33] w-8 h-8' />
							<input
								id='image'
								onChange={onImageChange}
								className='hidden'
								type='file'
								accept='image/png, image/jpg, image/jpeg'
							/>
						</label>
					</div>
				</Show.Else>
			</Show>
		</EditModalForm>
	)
}
export default CreatePost
