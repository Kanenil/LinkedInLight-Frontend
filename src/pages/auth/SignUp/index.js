import { useFormik } from "formik"
import { Link } from "react-router-dom"
import { routes } from "../../../constants/routes"
import { useAuth } from "../../../hooks/useAuth"
import { RegisterSchema } from "./validation"
import FormGroup from "../../../components/shared/forms/FormGroup"
import Logo from "../../../elements/shared/Logo"
import GoogleButton from "../../../elements/buttons/GoogleButton"
import AppleButton from "../../../elements/buttons/AppleButton"
import FacebookButton from "../../../elements/buttons/FacebookButton"
import { jwtDecode } from "jwt-decode"
import React, { useEffect, useMemo, useState } from "react"
import illustration from "../../../assets/signup-illustration.jpg"
import { authService } from "../../../services/authService"
import { general } from "../../../constants/general"
import { Helmet } from "react-helmet-async"
import TextDown from "../../../elements/shared/TextDown"
import { useTranslation } from "react-i18next"
import { XMarkIcon } from "@heroicons/react/24/solid"
import useMobileDetector from "../../../hooks/useMobileDetector"
import Show from "../../../elements/shared/Show"
import Button from "../../../elements/buttons/Button"

const SignUp = () => {
	const { t } = useTranslation()
	const [countries, setCountries] = useState([])
	const [cities, setCities] = useState([])
	const user = JSON.parse(localStorage.getItem(general.user) || "{}")

	useMemo(async () => {
		if (!countries.length) {
			const response = await authService.countries()

			setCountries(response.data)
		}
	}, [countries])

	const countryOptions = useMemo(() => {
		return countries.map(country => {
			return {
				label: country.name,
				value: country.name,
			}
		})
	}, [countries])

	const initValues = {
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		country: "",
		city: "",
		terms: false,
		...user,
	}

	const { googleLogin, validateEmail } = useAuth()

	const onSubmitFormik = async values => {
		await validateEmail({ ...values, setErrors })
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: RegisterSchema,
		onSubmit: onSubmitFormik,
	})

	const {
		values,
		errors,
		touched,
		handleSubmit,
		handleChange,
		setErrors,
		setValues,
	} = formik

	const googleCallback = async response => {
		const { email, family_name, given_name } = jwtDecode(response.credential)

		await googleLogin({
			username: email,
			email,
			firstName: given_name,
			lastName: family_name || "",
			token: response.credential,
		})
	}

	const { isMobile } = useMobileDetector()

	useEffect(() => {
		if (values.country.length > 0) {
			authService.cities(values.country).then(({ data }) => {
				setCities(
					data.map(val => {
						return {
							label: val.name,
							value: val.name,
						}
					}),
				)
			})
		}
	}, [values.country])

	return (
		<React.Fragment>
			<Helmet>
				<title>{t("auth.signUp")}</title>
			</Helmet>
			<Show>
				<Show.When isTrue={!isMobile}>
					<div className='flex-grow flex flex-col bg-[#E7E7E7]'>
						<div
							className='items-center my-auto mx-auto bg-white min-w-2xl rounded-lg overflow-hidden h-full w-[1140px]'
							style={{ boxShadow: "0px 1px 6px 0px #00000029" }}
						>
							<div className='flex flex-row h-full'>
								<form onSubmit={handleSubmit} className='w-1/2 p-11'>
									<Link to='/'>
										<Logo className='fill-black h-[55px] p-[5px] mx-auto' />
									</Link>

									<div className='flex flex-row mt-5'>
										<div className='flex w-full'>
											<Link
												to={routes.signIn}
												className='py-[5px] mx-auto uppercase text-[#585359] text-xs'
											>
												{t("auth.logIn")}
											</Link>
										</div>
										<div className='flex w-full border-b-[1px] border-[#585359]'>
											<Link
												to={routes.signUp}
												className='py-[5px] mx-auto uppercase text-[#585359] text-xs'
											>
												{t("auth.signUp")}
											</Link>
										</div>
									</div>

									<FormGroup
										margin='mt-[30px]'
										name='firstName'
										value={values.firstName}
										type='text'
										touched={touched.firstName}
										error={errors.firstName}
										title={t("auth.firstName")}
										handleChange={handleChange}
									/>

									<FormGroup
										margin='mt-[12px]'
										name='lastName'
										value={values.lastName}
										type='text'
										touched={touched.lastName}
										error={errors.lastName}
										title={t("auth.lastName")}
										handleChange={handleChange}
									/>

									<FormGroup
										margin='mt-[12px]'
										name='email'
										value={values.email}
										type='email'
										touched={touched.email}
										error={errors.email}
										title={t("auth.email")}
										handleChange={handleChange}
									/>

									<FormGroup
										margin='my-[12px]'
										name='password'
										value={values.password}
										type='password'
										touched={touched.password}
										error={errors.password}
										title={t("auth.createPassword")}
										handleChange={handleChange}
									/>

									<TextDown
										options={countryOptions}
										placeHolder={t("auth.selectCountry")}
										containerHeightMax={200}
										containerWidth={380}
										onEnterSelect={false}
										isAbsolute={true}
										containerClass='rounded-xl border-[1px] border-[#B4BFDD]'
										containerSizing='py-2 px-[20px]'
										onChange={e => setValues({ ...values, country: e.label })}
									/>

									<TextDown
										options={cities}
										placeHolder={t("auth.selectCity")}
										className='mt-[12px]'
										containerHeightMax={200}
										containerWidth={380}
										onEnterSelect={false}
										isAbsolute={true}
										containerClass='rounded-xl border-[1px] border-[#B4BFDD] active:bg-[#F5F8FF] active:border-[1.5px] active:border-[#24459A]'
										containerSizing='py-2 px-[20px]'
										onChange={e => setValues({ ...values, city: e.label })}
									/>

									<div className='mt-[12px]'>
										<label
											className='flex items-center cursor-pointer select-none'
											htmlFor='terms'
										>
											<div className='relative'>
												<input
													name='terms'
													value={values.terms}
													onChange={handleChange}
													className='hidden'
													type='checkbox'
													id='terms'
												/>
												<div className='box flex items-center justify-center w-[12px] h-[12px] rounded-sm border border-[#2D2A33] mr-2'>
													<span
														className={
															values.terms === false ? "opacity-0" : ""
														}
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															width='15'
															height='16'
															className='ml-1 mb-1'
															viewBox='0 0 15 16'
															fill='none'
														>
															<path
																d='M6.84173 15.9998C6.79635 15.9998 6.75147 15.9885 6.7099 15.9664C6.66833 15.9444 6.63098 15.9122 6.60018 15.8719L0.0873947 7.34121C0.0439788 7.28433 0.0151968 7.21337 0.00457124 7.137C-0.00605429 7.06063 0.00193752 6.98216 0.0275687 6.9112C0.0531998 6.84025 0.0953585 6.77988 0.148885 6.73748C0.202411 6.69509 0.264983 6.67251 0.328943 6.6725H3.46384C3.51091 6.67251 3.55743 6.68474 3.60026 6.70837C3.64309 6.73201 3.68124 6.76648 3.71213 6.80949L5.88873 9.84167C6.12396 9.2328 6.57933 8.21899 7.37841 6.98363C8.55974 5.15733 10.7571 2.47141 14.5164 0.0467428C14.5891 -0.000110954 14.6736 -0.0122714 14.7533 0.0126629C14.833 0.0375972 14.9021 0.0978135 14.947 0.181422C14.9918 0.26503 15.0091 0.365952 14.9955 0.46426C14.9818 0.562568 14.9383 0.651115 14.8733 0.712418C14.859 0.726001 13.4095 2.10818 11.7413 4.63987C10.2061 6.96965 8.16519 10.7792 7.16094 15.6973C7.1433 15.7837 7.10227 15.8604 7.04439 15.9153C6.98652 15.9702 6.91523 15.9998 6.84173 15.9998Z'
																fill='#24459A'
															/>
														</svg>
													</span>
												</div>
											</div>
											<span
												className='text-xs text-[#7D7D7D]'
												dangerouslySetInnerHTML={{ __html: t("auth.terms") }}
											/>
										</label>
									</div>

									<Button
										className='w-full my-4 text-lg font-semibold font-jakarta'
										variant='primary'
										rounded='lg'
										type='submit'
									>
										{t("auth.signUp")}
									</Button>

									<h1 className='mt-[12px] text-center uppercase text-xs text-[#7D7D7D]'>
										{t("auth.or")}
									</h1>

									<div className='flex flex-row justify-center gap-[20px] pt-[10px] pb-[20px] py-[20px] mt-[12px]'>
										<GoogleButton googleLoginCallback={googleCallback} />
										<AppleButton />
										<FacebookButton />
									</div>

									<div className='flex flex-row justify-center gap-2 mt-[12px] text-[#7D7D7D] text-sm'>
										<span
											className='font-light [&>strong]:font-semibold'
											dangerouslySetInnerHTML={{
												__html: t("auth.alreadyMember"),
											}}
										/>

										<Link className='font-bold' to={routes.signIn}>
											{t("auth.logIn")}
										</Link>
									</div>
								</form>
								<div className='w-3/4 flex justify-center items-center'>
									<img src={illustration} alt='illustration' />
								</div>
							</div>
						</div>
					</div>
				</Show.When>

				<Show.Else>
					<div className='flex-grow flex flex-col px-6 py-8'>
						<div className='flex flex-row items-center'>
							<Link to='/'>
								<Logo className='pb-3 mr-auto fill-[#2D2A33] h-10 md:h-16' />
							</Link>

							<Link
								to='/auth'
								className='ml-auto text-[#7D7D7D] hover:text-gray-700'
							>
								<XMarkIcon className='w-10 h-10' />
							</Link>
						</div>

						<div className='flex flex-col mt-10'>
							<div className='py-2 w-full border-b-[#24459A] border-b-[0.5px]'>
								<h1 className='text-[#585359] font-jost font-bold text-xl'>
									{t("auth.signUp")}
								</h1>
							</div>

							<div className='flex flex-row items-center gap-3'>
								<span className='font-jost text-lg'>{t("auth.or")}</span>
								<Link
									to={routes.signIn}
									className='text-lg text-[#24459A] font-bold'
								>
									{t("auth.backToAccount")}
								</Link>
							</div>
						</div>

						<form onSubmit={handleSubmit} className='mt-10'>
							<FormGroup
								margin='mt-[30px]'
								name='firstName'
								value={values.firstName}
								type='text'
								touched={touched.firstName}
								error={errors.firstName}
								title={t("auth.firstName")}
								handleChange={handleChange}
							/>

							<FormGroup
								margin='mt-[12px]'
								name='lastName'
								value={values.lastName}
								type='text'
								touched={touched.lastName}
								error={errors.lastName}
								title={t("auth.lastName")}
								handleChange={handleChange}
							/>

							<FormGroup
								margin='mt-[12px]'
								name='email'
								value={values.email}
								type='email'
								touched={touched.email}
								error={errors.email}
								title={t("auth.email")}
								handleChange={handleChange}
							/>

							<FormGroup
								margin='my-[12px]'
								name='password'
								value={values.password}
								type='password'
								touched={touched.password}
								error={errors.password}
								title={t("auth.createPassword")}
								handleChange={handleChange}
							/>

							<TextDown
								options={countryOptions}
								placeHolder={t("auth.selectCountry")}
								containerHeightMax={200}
								containerWidth={380}
								onEnterSelect={false}
								isAbsolute={true}
								containerClass='rounded-xl border-[1px] border-[#B4BFDD]'
								containerSizing='py-2 px-[20px]'
								onChange={e => setValues({ ...values, country: e.label })}
							/>

							<TextDown
								options={cities}
								placeHolder={t("auth.selectCity")}
								className='mt-[12px]'
								containerHeightMax={200}
								containerWidth={380}
								onEnterSelect={false}
								isAbsolute={true}
								containerClass='rounded-xl border-[1px] border-[#B4BFDD] active:bg-[#F5F8FF] active:border-[1.5px] active:border-[#24459A]'
								containerSizing='py-2 px-[20px]'
								onChange={e => setValues({ ...values, city: e.label })}
							/>

							<div className='mt-[12px]'>
								<label
									className='flex items-center cursor-pointer select-none'
									htmlFor='terms'
								>
									<div className='relative'>
										<input
											name='terms'
											value={values.terms}
											onChange={handleChange}
											className='hidden'
											type='checkbox'
											id='terms'
										/>
										<div className='box flex items-center justify-center w-[12px] h-[12px] rounded-sm border border-[#2D2A33] mr-2'>
											<span
												className={values.terms === false ? "opacity-0" : ""}
											>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													width='15'
													height='16'
													className='ml-1 mb-1'
													viewBox='0 0 15 16'
													fill='none'
												>
													<path
														d='M6.84173 15.9998C6.79635 15.9998 6.75147 15.9885 6.7099 15.9664C6.66833 15.9444 6.63098 15.9122 6.60018 15.8719L0.0873947 7.34121C0.0439788 7.28433 0.0151968 7.21337 0.00457124 7.137C-0.00605429 7.06063 0.00193752 6.98216 0.0275687 6.9112C0.0531998 6.84025 0.0953585 6.77988 0.148885 6.73748C0.202411 6.69509 0.264983 6.67251 0.328943 6.6725H3.46384C3.51091 6.67251 3.55743 6.68474 3.60026 6.70837C3.64309 6.73201 3.68124 6.76648 3.71213 6.80949L5.88873 9.84167C6.12396 9.2328 6.57933 8.21899 7.37841 6.98363C8.55974 5.15733 10.7571 2.47141 14.5164 0.0467428C14.5891 -0.000110954 14.6736 -0.0122714 14.7533 0.0126629C14.833 0.0375972 14.9021 0.0978135 14.947 0.181422C14.9918 0.26503 15.0091 0.365952 14.9955 0.46426C14.9818 0.562568 14.9383 0.651115 14.8733 0.712418C14.859 0.726001 13.4095 2.10818 11.7413 4.63987C10.2061 6.96965 8.16519 10.7792 7.16094 15.6973C7.1433 15.7837 7.10227 15.8604 7.04439 15.9153C6.98652 15.9702 6.91523 15.9998 6.84173 15.9998Z'
														fill='#24459A'
													/>
												</svg>
											</span>
										</div>
									</div>
									<span
										className='text-xs text-[#7D7D7D]'
										dangerouslySetInnerHTML={{ __html: t("auth.terms") }}
									/>
								</label>
							</div>

							<Button
								className='w-full my-4 text-lg font-semibold font-jakarta'
								variant='primary'
								rounded='lg'
								type='submit'
							>
								{t("auth.signUp")}
							</Button>

							<h1 className='mt-[12px] text-center uppercase text-xs text-[#7D7D7D]'>
								{t("auth.or")}
							</h1>

							<div className='flex flex-row justify-center gap-[20px] pt-[10px] pb-[20px] py-[20px] mt-[12px]'>
								<GoogleButton googleLoginCallback={googleCallback} />
								<AppleButton />
								<FacebookButton />
							</div>

							<div className='flex flex-row justify-center gap-2 mt-[12px] text-[#7D7D7D] text-sm'>
								<span
									className='font-light [&>strong]:font-semibold'
									dangerouslySetInnerHTML={{
										__html: t("auth.alreadyMember"),
									}}
								/>

								<Link className='font-bold text-[#24459A]' to={routes.signIn}>
									{t("auth.logIn")}
								</Link>
							</div>
						</form>
					</div>
				</Show.Else>
			</Show>
		</React.Fragment>
	)
}
export default SignUp
