import { Link } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import React, { useEffect } from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import Show from "../../../elements/shared/Show"
import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Dropzone from "../../shared/Dropzone"
import { readFile } from "../../../utils/cropImage"
import { imageUrlToBase64 } from "../../../utils/converters"
import { APP_ENV } from "../../../env"
import ModalInputFormGroup from "../../shared/forms/ModalInputFormGroup"
import ModalTextareaFormGroup from "../../shared/forms/ModalTextareaFormGroup"
import CompanyService from "../../../services/companyService"
import { useAlertContext } from "../../../providers/AlertProvider"
import Button from "../../../elements/buttons/Button"
import { companyPageQuery } from "../../../constants/combinedQueries"
import { useQueryClient } from "@tanstack/react-query"

const HeaderEditSchema = yup.object({
	companyName: yup.string().required("Content is required"),
	linkedinUrl: yup.string().required("Url is required"),
	logoImg: yup.string(),
	tagline: yup.string(),
})

const initValues = {
	companyName: "",
	linkedinUrl: "",
	logoImg: "",
	tagline: "",
}

const HeaderEditPage = ({ company }) => {
	const { success } = useAlertContext()
	const queryClient = useQueryClient()

	useEffect(() => {
		setValues(prev => ({
			...prev,
			companyName: company.companyName,
			linkedinUrl: company.linkedinUrl,
			tagline: company.tagline,
		}))
		if (company.logoImg) {
			imageUrlToBase64(`${APP_ENV.UPLOADS_URL}/${company.logoImg}`, resp => {
				setValues(prev => ({
					...prev,
					oldImage: company.logoImg,
					logoImg: resp,
				}))
			})
		}
	}, [company])

	const onSubmitFormik = async values => {
		CompanyService.editCompany({
			...company,
			companyName: values.companyName,
			linkedinUrl: values.linkedinUrl,
			logoImg: values.logoImg,
			tagline: values.tagline,
		})
			.then(() => {
				success("Information successfully saved", 5)
				queryClient.invalidateQueries(
					...companyPageQuery(company.id).map(value => value.queryFn),
				)
			})
			.catch(err => {
				const { data } = err.response

				if (data.includes("URL already exists"))
					setErrors({
						...errors,
						linkedinUrl: data,
					})
				else console.log(err)
			})
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: HeaderEditSchema,
		onSubmit: onSubmitFormik,
	})

	const { values, errors, handleSubmit, handleChange, setErrors, setValues } =
		formik

	const onFileSelect = async e => {
		let imageDataUrl = null

		if (e.target) {
			const file = e.target.files && e.target.files[0]
			if (!file) return

			imageDataUrl = await readFile(file)
		} else {
			imageDataUrl = await readFile(e)
		}

		const img = new Image()
		img.src = imageDataUrl
		img.onload = () => {
			setValues(prev => ({
				...prev,
				logoImg: imageDataUrl,
			}))
		}
	}

	return (
		<form onSubmit={handleSubmit} className='bg-white rounded-lg py-6'>
			<div className='inline-flex w-full gap-5 pb-2 px-10 border-b-[1px] border-b-[#24459A]/50'>
				<Link to={`/j4y/company/${company.id}/edit`} className='my-auto'>
					<ArrowLeftIcon className='text-[#24459A] stroke-2 w-5 h-5' />
				</Link>

				<h1 className='font-jost text-xl text-[#2D2A33] font-medium'>
					Edit page header
				</h1>
			</div>

			<div className='flex flex-col rounded-lg gap-5 p-2 mx-4 mt-4 md:mx-20'>
				<div className='flex flex-col gap-1 font-jost text-start mb-3'>
					<h1 className='text-[#2D2A33] font-medium text-lg'>
						Update information about your company
					</h1>
				</div>

				<Show>
					<Show.When isTrue={!!values.logoImg}>
						<div>
							<h1 className='font-jost text-[#2D2A33]'>Logo</h1>

							<div className='flex flex-row rounded-lg border-dashed border-[1px] border-[#24459A] bg-[#F0F1F3] py-5'>
								<div className='flex items-center max-w-[150px] max-h-[150px]'>
									<img className='object-contain' src={values.logoImg} />
								</div>

								<button
									type='button'
									onClick={() => setValues(prev => ({ ...prev, logoImg: "" }))}
									className='ml-auto mb-auto mr-4 hover:text-gray-600'
								>
									<XMarkIcon className='w-6 h-6' />
								</button>
							</div>
						</div>
					</Show.When>

					<Show.Else>
						<label htmlFor='logo'>
							<h1 className='font-jost text-[#2D2A33]'>Logo</h1>
							<input
								id='logo'
								onChange={onFileSelect}
								className='hidden'
								type='file'
								accept='image/jpeg, image/jpg, image/png'
							/>

							<Dropzone
								onFileSelect={onFileSelect}
								className='flex flex-col rounded-lg justify-center items-center border-dashed border-[1px] border-[#24459A] bg-[#F0F1F3] py-5'
							>
								<div className='flex flex-row items-center gap-3'>
									<ArrowDownTrayIcon className='w-6 h-6 text-[#24459A]' />

									<span className='text-[#2D2A33] font-jost text-lg'>
										Upload logo
									</span>
								</div>

								<h3 className='font-extralight font-jost mt-2.5'>
									Upload the file to preview
								</h3>
							</Dropzone>
							{errors.logo && (
								<h3 className='mt-2 text-[#9E0F20] text-xs'>
									{errors.logoImg}
								</h3>
							)}
						</label>
					</Show.Else>
				</Show>

				<ModalInputFormGroup
					title='Company name'
					name='companyName'
					type='text'
					value={values.companyName}
					onChange={handleChange}
					className='gap-[5px]'
				/>

				<div className='flex flex-col gap-1'>
					<label
						htmlFor='linkedinUrl'
						className='font-jost text-[#2D2A33] [&>strong]:font-medium'
					>
						General URL-address <strong>J4Y</strong>
					</label>

					<div className='flex flex-row items-center gap-2'>
						<p className='font-jost text-[#7D7D7D] font-light'>
							{APP_ENV.FRONTEND_URL + "/j4y/company/"}
						</p>

						<ModalInputFormGroup
							name='linkedinUrl'
							type='text'
							value={values.linkedinUrl}
							onChange={handleChange}
							placeholder='Add URL'
							className='w-full'
						/>
					</div>

					{errors.linkedinUrl && (
						<h3 className='mt-2 text-[#9E0F20] text-xs'>
							{errors.linkedinUrl}
						</h3>
					)}
				</div>

				<ModalTextareaFormGroup
					title='Tagline'
					name='tagline'
					type='text'
					value={values.tagline}
					onChange={handleChange}
					rows={4}
					className='gap-[5px]'
				/>
			</div>

			<div className='flex justify-end mt-5'>
				<Button
					disabled={
						!!(
							errors.logoImg ||
							errors.companyName ||
							errors.tagline ||
							errors.linkedinUrl
						)
					}
					type='submit'
					variant='primary'
					rounded='full'
					className='mr-6 px-5'
				>
					Save changes
				</Button>
			</div>
		</form>
	)
}
export default HeaderEditPage
