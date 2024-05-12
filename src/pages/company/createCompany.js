import React from "react"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router"
import { Helmet } from "react-helmet-async"
import ModalInputFormGroup from "../../components/shared/forms/ModalInputFormGroup"
import { APP_ENV } from "../../env"
import { slugify } from "../../utils/converters"
import CompanyService from "../../services/companyService"
import ModalSelectFormGroup from "../../components/shared/forms/ModalSelectFormGroup"
import ModalCheckFormGroup from "../../components/shared/forms/ModalCheckFormGroup"
import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Dropzone from "../../components/shared/Dropzone"
import Show from "../../elements/shared/Show"
import { readFile } from "../../utils/cropImage"
import { useAlertContext } from "../../providers/AlertProvider"
import Button from "../../elements/buttons/Button"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useFormik } from "formik"
import * as yup from "yup"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../components/shared/Loader"
import { Trans, useTranslation } from "react-i18next"

const CreateCompanySchema = yup.object({
	companyName: yup.string().required("validation.required"),
	linkedinUrl: yup.string().required("validation.required"),
	industry: yup.object().required("validation.required"),
	organizationType: yup.object().required("validation.required"),
	organizationSize: yup.object().required("validation.required"),
	websiteUrl: yup.string().notRequired(),
	logoImg: yup.string().notRequired(),
	tagline: yup.string().notRequired(),
	terms: yup.bool().isTrue("validation.required"),
})

const initValues = {
	companyName: "",
	linkedinUrl: "",
	industry: "",
	organizationType: "",
	organizationSize: "",
	websiteUrl: "",
	logoImg: "",
	tagline: "",
	terms: false,
}

const CreateCompany = () => {
	const navigator = useNavigate()
	const { success } = useAlertContext()
	const { t } = useTranslation()

	const { data: industries, isLoading: industriesLoading } = useQuery({
		queryFn: () => CompanyService.getIndustries(),
		queryKey: ["allIndustries"],
		select: ({ data }) =>
			data.map(val => ({
				label: val.name,
				value: val.id,
			})),
	})

	const { data: types, isLoading: typesLoading } = useQuery({
		queryFn: () => CompanyService.getTypes(),
		queryKey: ["allTypes"],
		select: ({ data }) =>
			data.map(val => ({
				label: val,
				value: val,
			})),
	})

	const { data: sizes, isLoading: sizesLoading } = useQuery({
		queryFn: () => CompanyService.getSizes(),
		queryKey: ["allSizes"],
		select: ({ data }) =>
			data.map(val => ({
				label: val,
				value: val,
			})),
	})

	const onSubmitFormik = values => {
		const model = {
			id: 0,
			companyName: values.companyName,
			linkedinUrl: values.linkedinUrl,
			websiteUrl: values.websiteUrl,
			organizationSize: values.organizationSize.value,
			organizationType: values.organizationType.value,
			logoImg: values.logoImg,
			tagline: values.tagline,
			applicationUserId: "",
			industryId: values.industry.value,
		}

		CompanyService.create(model)
			.then(() => {
				navigator(-1)
				success(t("company.newCompany.companyCreated"), 5)
			})
			.catch(err => {
				if (err.response.data === "This URL already exists")
					setErrors({
						...errors,
						linkedinUrl: "company.newCompany.urlExists",
					})
			})
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: CreateCompanySchema,
		onSubmit: onSubmitFormik,
	})

	const {
		values,
		errors,
		handleSubmit,
		handleChange,
		setValues,
		touched,
		setErrors,
	} = formik

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
		<React.Fragment>
			<Helmet>
				<title>{t("company.newCompany.title")}</title>
			</Helmet>
			<main className='flex-grow bg-[#E7E7E7]'>
				<section className='bg-white'>
					<div className='flex flex-col gap-3 py-2.5 ml-4 md:mx-auto md:w-[1170px]'>
						<button
							onClick={() => navigator(-1)}
							className='flex flex-row items-center gap-5 w-fit hover:underline'
						>
							<ArrowLeftIcon className='text-[#24459A] w-7 h-7' />

							<span className='font-jost font-medium text-2xl'>
								{t("company.newCompany.back")}
							</span>
						</button>

						<h3 className='font-jost text-[#2D2A33] text-lg'>
							<Trans
								i18nKey='company.newCompany.description'
								components={{ strong: <strong className='font-medium' /> }}
							/>
						</h3>
					</div>
				</section>

				<section className='flex flex-col mx-auto md:container lg:w-[1170px] mt-7 mb-16'>
					<h3 className='text-[#2D2A33] font-jost font-light text-sm'>
						{t("validation.requiredField")}
					</h3>

					<div className='flex flex-col md:flex-row mt-1.5'>
						{industriesLoading || typesLoading || sizesLoading ? (
							<div className='h-full'>
								<Loader />
							</div>
						) : (
							<form
								onSubmit={handleSubmit}
								className='w-full md:w-7/12 flex flex-col gap-2.5 p-4 rounded-lg bg-white'
							>
								<ModalInputFormGroup
									title={t("company.newCompany.companyName") + " *"}
									name='companyName'
									type='text'
									value={values.companyName}
									onChange={e => {
										setValues(prev => ({
											...prev,
											linkedinUrl: slugify(e.target.value),
											companyName: e.target.value,
										}))
									}}
									placeholder={t("company.newCompany.companyNamePlaceholder")}
									className='gap-[5px]'
									error={touched.companyName && errors.companyName}
									errorChildren={
										<p className='mt-2 text-[#9E0F20] text-xs'>
											{t(errors.companyName)}
										</p>
									}
								/>

								<ModalInputFormGroup
									title={APP_ENV.FRONTEND_URL + "/j4y/company/"}
									name='linkedinUrl'
									type='text'
									value={values.linkedinUrl}
									onChange={handleChange}
									placeholder={t("company.newCompany.addUrl")}
									className='gap-[5px]'
									error={touched.linkedinUrl && errors.linkedinUrl}
									errorChildren={
										<p className='mt-2 text-[#9E0F20] text-xs'>
											{t(errors.linkedinUrl)}
										</p>
									}
								/>

								<ModalSelectFormGroup
									className='gap-[5px]'
									title={t("company.newCompany.industry") + " *"}
									value={values.industry.label || ""}
									options={industries}
									containerWidth={300}
									containerHeightMax={200}
									placeHolder={t("company.newCompany.industryPlaceholder")}
									error={touched.industry && errors.industry}
									hasTools={false}
									onEnterSelect={false}
									isAbsolute={true}
									clearOnSelect={false}
									onChange={e =>
										setValues(prev => ({
											...prev,
											industry: e,
										}))
									}
									errorChildren={
										<h3 className='mt-2 text-[#9E0F20] text-xs'>
											{t(errors.industry)}
										</h3>
									}
								/>

								<ModalSelectFormGroup
									className='gap-[5px]'
									title={t("company.newCompany.organizationType") + " *"}
									value={values.organizationType?.label || ""}
									options={types}
									containerWidth={300}
									containerHeightMax={200}
									placeHolder={t("company.newCompany.selectFromList")}
									error={touched.organizationType && errors.organizationType}
									hasTools={false}
									onEnterSelect={false}
									isAbsolute={true}
									clearOnSelect={false}
									onChange={e =>
										setValues(prev => ({
											...prev,
											organizationType: e,
										}))
									}
									errorChildren={
										<h3 className='mt-2 text-[#9E0F20] text-xs'>
											{t(errors.organizationType)}
										</h3>
									}
								/>

								<ModalSelectFormGroup
									className='gap-[5px]'
									title={t("company.newCompany.organizationSize") + " *"}
									value={values.organizationSize?.label || ""}
									options={sizes}
									containerWidth={300}
									containerHeightMax={200}
									placeHolder={t("company.newCompany.selectFromList")}
									error={touched.organizationSize && errors.organizationSize}
									hasTools={false}
									onEnterSelect={false}
									isAbsolute={true}
									clearOnSelect={false}
									onChange={e =>
										setValues(prev => ({
											...prev,
											organizationSize: e,
										}))
									}
									errorChildren={
										<h3 className='mt-2 text-[#9E0F20] text-xs'>
											{t(errors.organizationSize)}
										</h3>
									}
								/>

								<ModalInputFormGroup
									title={t("company.newCompany.website")}
									name='websiteUrl'
									type='url'
									value={values.websiteUrl}
									onChange={handleChange}
									placeholder={t("company.newCompany.websitePlaceholder")}
									className='gap-[5px]'
								/>

								<Show>
									<Show.When isTrue={!!values.logoImg}>
										<div>
											<h1 className='font-jost text-[#2D2A33]'>
												{t("company.newCompany.logo")}
											</h1>

											<div className='flex flex-row rounded-lg border-dashed border-[1px] border-[#24459A] bg-[#F0F1F3] py-5'>
												<div className='flex items-center max-w-[150px] max-h-[150px]'>
													<img
														className='object-contain'
														src={values.logoImg}
														alt=''
													/>
												</div>

												<button
													type='button'
													onClick={() =>
														setValues(prev => ({ ...prev, logoImg: "" }))
													}
													className='ml-auto mb-auto mr-4 hover:text-gray-600'
												>
													<XMarkIcon className='w-6 h-6' />
												</button>
											</div>
										</div>
									</Show.When>

									<Show.Else>
										<label htmlFor='logo'>
											<h1 className='font-jost text-[#2D2A33]'>
												{t("company.newCompany.logo")}
											</h1>
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
														{t("company.newCompany.uploadLogo")}
													</span>
												</div>

												<h3 className='font-extralight font-jost mt-2.5'>
													{t("company.newCompany.uploadLogoDescription")}
												</h3>
											</Dropzone>
											{errors.logoImg && (
												<h3 className='mt-2 text-[#9E0F20] text-xs'>
													{errors.logoImg}
												</h3>
											)}
										</label>
									</Show.Else>
								</Show>

								<ModalInputFormGroup
									title={t("company.newCompany.tagline")}
									name='tagline'
									type='text'
									value={values.tagline}
									onChange={handleChange}
									placeholder=''
									className='gap-[5px]'
								/>

								<ModalCheckFormGroup
									className='gap-[5px]'
									name='terms'
									onChange={handleChange}
									value={values.terms}
									error={touched.terms && errors.terms}
									errorChildren={
										<h3 className='mt-2 text-[#9E0F20] text-xs'>
											{t(errors.terms)}
										</h3>
									}
									title={t("company.newCompany.terms")}
								/>

								<div className='ml-auto pt-4 pb-1'>
									<Button type='submit' variant='primary' rounded='full'>
										{t("company.newCompany.create")}
									</Button>
								</div>
							</form>
						)}

						<div className='w-full md:w-5/12 mt-6 md:mt-0 md:ml-6 flex flex-col h-fit rounded-lg overflow-hidden border-[1px] border-[#B4BFDD]'>
							<div className='border-b-[1px] border-b-[#24459A] px-5 py-3.5 bg-white'>
								<h3 className='text-lg text-[#2D2A33] font-jost font-semibold'>
									{t("company.newCompany.preview")}
								</h3>
							</div>

							<div className='px-5 pt-5 pb-6 bg-[#F0F1F3]'>
								<div className='flex flex-col gap-2.5 p-5 border-[1px] border-[#E7E7E7] bg-white rounded-xl'>
									<Show>
										<Show.When isTrue={!!values.logoImg}>
											<div className='flex items-center max-w-[150px] max-h-[150px]'>
												<img
													className='object-contain'
													src={values.logoImg}
													alt=''
												/>
											</div>
										</Show.When>

										<Show.Else>
											<div className='flex items-center justify-center w-[80px] h-[80px] bg-[#F0F1F3]'>
												<h3 className='text-[#2D2A33] font-semibold font-jost'>
													{t("company.newCompany.logo")}
												</h3>
											</div>
										</Show.Else>
									</Show>

									<div className='flex flex-col gap-1.5 font-jost text-[#2D2A33]'>
										<h1 className='font-semibold text-lg'>
											{values.companyName.length > 0
												? values.companyName
												: t("company.newCompany.companyName")}
										</h1>

										<h2 className='font-light break-words text-wrap'>
											{values.tagline.length > 0
												? values.tagline
												: t("company.newCompany.tagline")}
										</h2>

										<h1 className='text-[#BBBBBB] font-light'>
											{values.industry?.label?.length > 0
												? values.industry.label
												: t("company.newCompany.industry")}
										</h1>
									</div>

									<div>
										<Button
											variant='primary'
											rounded='full'
											className='items-center gap-2.5 text-sm px-4'
										>
											<PlusIcon className='w-4 h-4 text-white stroke-2' />
											{t("company.follow")}
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</React.Fragment>
	)
}
export default CreateCompany
