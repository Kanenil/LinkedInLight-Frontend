import { useEffect, useState } from "react"
import useAuthUser from "../../hooks/useAuthUser"
import useUrlUser from "../../hooks/useUrlUser"
import Loader from "../shared/Loader"
import LeftProfileSection from "./LeftProfileSection"
import classNames from "classnames"
import { APP_ENV } from "../../env"
import PencilButton from "../../elements/buttons/PencilButton"
import Button from "../../elements/buttons/Button"
import { useNavigate } from "react-router"
import { ArrowLeftIcon, EyeIcon } from "@heroicons/react/24/outline"
import ToggleInput from "../shared/forms/ToggleInput"
import XMarkIcon from "../../elements/icons/XMarkIcon"
import ModalInputFormGroup from "../shared/forms/ModalInputFormGroup"
import * as yup from "yup"
import { useFormik } from "formik"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import ProfileService from "../../services/profileService"
import PrivacySettingsService from "../../services/privacySettingsService"
import { Helmet } from "react-helmet-async"
import { useAlertContext } from "../../providers/AlertProvider"
import { useTranslation } from "react-i18next"

const UrlSchema = yup.object({
	profileUrl: yup.string(),
})

const PublicProfile = () => {
	const [isPreview, setIsPreview] = useState(false)
	const [isEditUrl, setIsEditUrl] = useState(false)
	const { success } = useAlertContext()
	const { t } = useTranslation()

	const navigator = useNavigate()
	const queryClient = useQueryClient()

	const onSubmitFormik = async values => {
		try {
			await ProfileService.editUrl(values.profileUrl)

			queryClient.invalidateQueries([
				"profile",
				["profileUrl", values.profileUrl],
				["profileUrl", urlUser.profileUrl],
			])

			navigator(`/j4y/${values.profileUrl}/public`, { replace: true })

			setIsEditUrl(false)

			success("New url successfully saved", 5)
		} catch (err) {
			setErrors({
				profileUrl: err.response.data,
			})
		}
	}

	const { values, setValues, setErrors, errors, handleChange, handleSubmit } =
		useFormik({
			initialValues: { profileUrl: "" },
			validationSchema: UrlSchema,
			onSubmit: onSubmitFormik,
		})

	const { profile: authUser, isLoading: authLoading } = useAuthUser()
	const { profile: urlUser, isLoading: urlLoading } = useUrlUser()
	const {
		data: visibility,
		isLoading: visibilityLoading,
		refetch,
	} = useQuery({
		queryFn: () => PrivacySettingsService.getProfileVisibility(),
		queryKey: ["profileVisibility"],
		select: ({ data }) => data,
	})

	useEffect(() => {
		setValues({ profileUrl: authUser?.profileUrl })
	}, [authUser?.profileUrl])

	if (authLoading || urlLoading || visibilityLoading) return <Loader />

	if (authUser.id !== urlUser.id) {
		navigator(`/j4y/${urlUser.profileUrl}`, { replace: true })
		return <></>
	}

	const onVisibilityChange = async ({ target: { name, checked } }) => {
		await PrivacySettingsService.editProfileVisibility({
			...visibility,
			[name]: checked,
		})
		refetch()
	}

	return (
		<main className='bg-[#E7E7E7] flex-grow'>
			<Helmet>
				<title>
					{authUser.firstName} {authUser.lastName}
				</title>
			</Helmet>
			<div className='flex flex-col-reverse sm:flex-row mb-20 sm:my-8 sm:mx-auto sm:container md:w-[1170px]'>
				<div
					className={classNames("sm:w-8/12", {
						"hidden sm:block": !isPreview,
					})}
				>
					<div className='sm:hidden flex flex-row py-5 mx-5 mb-5 border-b-[0.5px] border-[#24459A80]'>
						<button
							type='button'
							onClick={() => setIsPreview(false)}
							className='inline-flex items-center gap-3 text-xl font-medium font-jost text-[#2D2A33]'
						>
							<ArrowLeftIcon className='text-[#24459A] stroke-2 h-5' />
							{t("publicProfile.backToSettings")}
						</button>
					</div>
					<div className='hidden sm:flex flex-col font-jost text-[#2D2A33] gap-2 mb-5'>
						<h1 className='font-medium text-2xl'>{t("publicProfile.title")}</h1>

						<h3 className='font-light text-lg'>
							{t("publicProfile.description")}
						</h3>
					</div>
					<LeftProfileSection
						user={authUser}
						isOwner={false}
						isPreview={true}
					/>
				</div>
				<div
					className={classNames("sm:w-4/12 sm:ml-10", {
						"hidden sm:block": isPreview,
					})}
				>
					<div className='flex flex-col sm:hidden bg-white px-5'>
						<div className='flex flex-row pt-2.5 pb-5 border-b-[0.5px] border-[#24459A80]'>
							<h1 className='font-jost font-semibold text-[#2D2A33] text-xl'>
								{t("publicProfile.title")}
							</h1>

							<button
								type='button'
								onClick={() => navigator(`/j4y/${authUser.profileUrl}`)}
								className='ml-auto'
							>
								<XMarkIcon className='fill-[#7D7D7D] h-4' />
							</button>
						</div>

						<div className='bg-[#E8EBF3] mt-5 p-2.5 flex flex-col font-jost text-[#2D2A33] gap-2'>
							<h1 className='font-medium text-2xl'>
								{t("publicProfile.title")}
							</h1>

							<h3 className='font-light text-lg'>
								{t("publicProfile.description")}
							</h3>
						</div>
					</div>
					<div className='flex flex-col bg-white rounded-lg pb-5'>
						<div className='flex flex-col gap-2 mx-5 mt-5 pt-3 border-t-[0.5px] border-[#24459a6c]'>
							<div className='inline-flex gap-4 items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 14 14'
									fill='none'
								>
									<path
										d='M3.49972 14C3.04321 14 2.59763 13.9124 2.17472 13.7394C1.74224 13.5624 1.35552 13.3052 1.02518 12.9749C0.694758 12.6445 0.437548 12.2577 0.260657 11.8253C0.0837393 11.3928 -0.00389756 10.9367 0.000132937 10.4696C0.00418996 10.0024 0.0997818 9.54783 0.284151 9.11856C0.467671 8.6913 0.730025 8.31055 1.06392 7.98692L3.85982 5.19102C4.52087 4.53012 5.39965 4.16619 6.33436 4.16619C7.26904 4.16619 8.14782 4.53012 8.80885 5.19094C9.08228 5.46427 9.08234 5.90747 8.80903 6.18088C8.5357 6.45432 8.0925 6.4544 7.81904 6.18101C7.42243 5.78451 6.89515 5.56618 6.33436 5.56618C5.77356 5.56618 5.24631 5.78451 4.8497 6.18101L2.04983 8.98097C2.04696 8.98383 2.04407 8.98667 2.04116 8.98948C1.84036 9.183 1.68034 9.41476 1.57054 9.67111C1.4602 9.92724 1.40226 10.2029 1.40012 10.4817C1.39742 10.7606 1.45057 11.0372 1.55644 11.2952C1.66179 11.5534 1.81775 11.7879 2.01515 11.9849C2.21217 12.1823 2.4467 12.3383 2.70492 12.4436C2.96425 12.5497 3.23824 12.6014 3.51831 12.5999C3.79719 12.5978 4.07281 12.5398 4.32894 12.4295C4.58528 12.3197 4.81704 12.1596 5.01055 11.9588C5.01344 11.9559 5.01636 11.9529 5.01927 11.95L5.79066 11.1793C6.06413 10.9061 6.50738 10.9063 6.7806 11.1797C7.05383 11.4532 7.05364 11.8965 6.78015 12.1697L6.01295 12.9362C5.68927 13.2701 5.3086 13.5324 4.88144 13.7158C4.45201 13.9002 3.99749 13.9958 3.53045 13.9998C3.52022 13.9999 3.50996 14 3.49972 14ZM7.7344 9.76495C6.79967 9.76495 5.92089 9.40101 5.25988 8.7402C4.98647 8.46686 4.98642 8.02364 5.25975 7.75026C5.53308 7.47687 5.97631 7.47677 6.24969 7.75012C6.64627 8.1466 7.17352 8.36493 7.73437 8.36493C8.29522 8.36493 8.82248 8.1466 9.21903 7.75012L12.0143 4.95481C12.3968 4.55685 12.6047 4.03392 12.5998 3.48174C12.5951 2.92774 12.3766 2.40687 11.9849 2.01507C11.5931 1.62331 11.0722 1.40489 10.5182 1.40007C10.5119 1.40002 10.5057 1.39999 10.4994 1.39999C9.95399 1.39999 9.43824 1.60764 9.04463 1.98606L8.27976 2.75098C8.00643 3.02433 7.56321 3.02436 7.28982 2.751C7.01647 2.47764 7.01647 2.03442 7.28982 1.76104L8.05978 0.991053C8.06265 0.988189 8.06554 0.985325 8.06845 0.982514C8.72524 0.348188 9.5874 0 10.4993 0C10.5097 0 10.52 5.30329e-05 10.5304 0.000132582C11.4538 0.00819359 12.322 0.372211 12.9749 1.02518C13.6278 1.67817 13.9918 2.5463 13.9998 3.46965C14.0078 4.39306 13.659 5.26739 13.0175 5.93152C13.0147 5.93446 13.0118 5.93733 13.009 5.94019L10.2089 8.74014C9.54791 9.40101 8.66913 9.76495 7.7344 9.76495Z'
										fill='#24459A'
									/>
								</svg>

								<h1 className='font-jost font-medium text-[#2D2A33] text-lg'>
									{t("publicProfile.editUrl")}
								</h1>
							</div>

							{isEditUrl ? (
								<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
									<ModalInputFormGroup
										value={values.profileUrl}
										onChange={handleChange}
										className='w-full'
										name='profileUrl'
										error={errors.profileUrl}
										errorChildren={
											<p className='mt-2 text-[#9E0F20] text-xs'>
												{errors.profileUrl}
											</p>
										}
									/>

									<div className='inline-flex gap-4 ml-auto'>
										<Button type='submit' variant='primary' rounded='lg'>
											{t("profile.modal.save", { title: "" })}
										</Button>

										<Button
											onClick={() => {
												setIsEditUrl(false)
												setValues({ profileUrl: authUser.profileUrl })
											}}
											className='px-4'
											variant='tertiary'
											rounded='lg'
										>
											{t("modal.cancel")}
										</Button>
									</div>
								</form>
							) : (
								<div className='flex flex-row gap-2'>
									<h3 className='font-jost text-[#7D7D7D] text-sm text-wrap'>
										{APP_ENV.FRONTEND_URL + "/j4y/" + authUser.profileUrl}
									</h3>

									<PencilButton
										onClick={() => setIsEditUrl(true)}
										className='ml-auto mb-auto'
									/>
								</div>
							)}
						</div>

						<div className='flex flex-col gap-2 mx-5 mt-5 pt-3 border-t-[0.5px] border-[#24459a6c]'>
							<div className='inline-flex gap-4 items-center'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='18'
									height='18'
									viewBox='0 0 14 14'
									fill='none'
								>
									<g clipPath='url(#clip0_818_5512)'>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M11.0306 9.39071H2.96852C2.75528 9.39071 2.75528 9.06265 2.96852 9.06265H11.0306C11.2439 9.06265 11.2439 9.39071 11.0306 9.39071ZM11.0306 10.8178H2.96852C2.75528 10.8178 2.75528 10.4897 2.96852 10.4897H11.0306C11.2439 10.4897 11.2439 10.8178 11.0306 10.8178ZM11.0306 12.2366H2.96852C2.75528 12.2366 2.75528 11.9086 2.96852 11.9086H11.0306C11.2439 11.9086 11.2439 12.2366 11.0306 12.2366ZM7.33994 7.96365C6.27374 7.96365 6.31475 8.05387 6.19992 7.06968C6.13431 7.04508 6.0605 7.01227 5.99489 6.98767C5.22394 7.60278 5.31416 7.56177 4.55962 6.80723C4.25616 6.50378 4.64163 6.15111 4.87128 5.85586C4.83847 5.79025 4.81387 5.72463 4.78926 5.65082C3.80508 5.5442 3.8953 5.58521 3.8953 4.51901C3.8953 4.07613 4.42019 4.10073 4.78926 4.05972C4.81387 3.99411 4.83847 3.9285 4.87128 3.85469C4.24796 3.08374 4.29717 3.17396 5.04351 2.41942C5.35517 2.11596 5.70783 2.50143 5.99489 2.73108C6.0687 2.69827 6.13431 2.67367 6.19992 2.64906C6.31475 1.66488 6.27374 1.7551 7.33994 1.7551C7.77462 1.7551 7.75001 2.27999 7.79102 2.64906C7.86483 2.67367 7.93045 2.69827 7.99606 2.73108C8.7752 2.11596 8.67678 2.15697 9.43132 2.91151C9.74298 3.21497 9.35751 3.56763 9.11967 3.85469C9.15247 3.9285 9.18528 3.99411 9.20988 4.05972C10.1941 4.17454 10.1038 4.13354 10.1038 5.19974C10.1038 5.64262 9.57895 5.60981 9.20988 5.65082C9.18528 5.72463 9.15247 5.79025 9.11967 5.85586C9.74298 6.635 9.70197 6.53658 8.94743 7.29112C8.63578 7.60278 8.28311 7.21731 7.99606 6.98767C7.93045 7.01227 7.86483 7.04508 7.79102 7.06968C7.75001 7.43875 7.77462 7.96365 7.33994 7.96365ZM5.97848 6.6268C6.04409 6.6268 6.22453 6.73342 6.40496 6.79083C6.65101 6.86464 6.47878 7.63559 6.65101 7.63559H7.33994C7.52037 7.63559 7.34814 6.86464 7.59418 6.79083C8.16829 6.6104 7.85663 6.44637 8.60297 7.05328C8.62757 7.06968 8.68499 7.09429 8.71779 7.06148L9.20168 6.57759C9.3247 6.45457 8.66038 6.02809 8.7834 5.79845C9.07046 5.26535 8.71779 5.38017 9.68557 5.27355C9.71018 5.26535 9.77579 5.24894 9.77579 5.19974V4.51081C9.77579 4.33858 9.00484 4.51081 8.93103 4.25656C8.7506 3.68245 8.58657 4.00231 9.18528 3.24777C9.20988 3.22317 9.23449 3.17396 9.20168 3.14115L8.71779 2.64906C8.59477 2.52604 8.16829 3.19036 7.93865 3.06734C7.40555 2.78029 7.52037 3.13295 7.41375 2.17337C7.40555 2.14057 7.38914 2.08316 7.33994 2.08316H6.65101C6.47878 2.08316 6.65101 2.8459 6.40496 2.92791C5.82265 3.10015 6.14251 3.27238 5.38797 2.66546C5.36337 2.64906 5.31416 2.61626 5.28135 2.64906L4.79746 3.14115C4.66624 3.26418 5.33056 3.69065 5.20754 3.9121C4.92049 4.4534 5.27315 4.33858 4.31357 4.44519C4.28077 4.44519 4.22336 4.4698 4.22336 4.51081V5.19974C4.22336 5.38017 4.9861 5.20794 5.06811 5.45398C5.24035 6.02809 5.41258 5.71643 4.80566 6.46277C4.78926 6.48737 4.75646 6.54479 4.79746 6.57759L5.28135 7.06148C5.38797 7.1681 5.79805 6.6268 5.97848 6.6268Z'
											fill='#24459A'
										/>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M6.99421 6.51225C6.08384 6.51225 5.3457 5.76591 5.3457 4.85554C5.3457 3.94517 6.08384 3.20703 6.99421 3.20703C7.90458 3.20703 8.64272 3.94517 8.64272 4.85554C8.64272 5.76591 7.90458 6.51225 6.99421 6.51225ZM6.99421 3.53509C6.26427 3.53509 5.67376 4.1338 5.67376 4.85554C5.67376 5.58547 6.26427 6.18418 6.99421 6.18418C7.72414 6.18418 8.31465 5.58547 8.31465 4.85554C8.31465 4.1338 7.72414 3.53509 6.99421 3.53509Z'
											fill='#24459A'
										/>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M11.4239 13.9918H2.57441C2.0085 13.9918 1.54102 13.5325 1.54102 12.9666V1.03339C1.54102 0.467487 2.0085 0.00820152 2.57441 0.00820152L11.4239 0C11.9898 0 12.449 0.467487 12.449 1.03339V12.9666C12.449 13.5325 11.9898 13.9918 11.4239 13.9918ZM11.4239 0.328061L2.57441 0.336262C2.18073 0.336262 1.86908 0.64792 1.86908 1.03339V12.9666C1.86908 13.3521 2.18073 13.6637 2.57441 13.6637H11.4239C11.8093 13.6637 12.121 13.3521 12.121 12.9666V1.03339C12.121 0.64792 11.8093 0.328061 11.4239 0.328061Z'
											fill='#24459A'
										/>
									</g>
									<defs>
										<clipPath id='clip0_818_5512'>
											<rect width='14' height='14' fill='white' />
										</clipPath>
									</defs>
								</svg>

								<h1 className='font-jost font-medium text-[#2D2A33] text-lg'>
									{t("publicProfile.content.title")}
								</h1>
							</div>

							<div className='flex flex-row gap-2'>
								<h3 className='font-jost font-light text-[#2D2A33] text-wrap'>
									{t("publicProfile.content.description")}
								</h3>
							</div>

							<Button
								className='w-fit mx-auto mt-4 px-8 py-1 bg-transparent'
								variant='tertiary'
								rounded='full'
								onClick={() => navigator(`/j4y/${authUser.profileUrl}`)}
							>
								{t("publicProfile.content.button")}
							</Button>
						</div>

						<div className='flex flex-col gap-2 mx-5 mt-5 pt-3 border-t-[0.5px] border-[#24459a6c]'>
							<div className='inline-flex gap-4 items-center'>
								<EyeIcon className='w-5 h-5 text-[#24459A]' />

								<h1 className='font-jost font-medium text-[#2D2A33] text-lg'>
									{t("publicProfile.visibility.title")}
								</h1>
							</div>

							<div className='flex flex-row gap-2'>
								<h3 className='font-jost font-light text-[#2D2A33] text-wrap'>
									{t("publicProfile.visibility.description")}
								</h3>
							</div>

							<div className='flex flex-col gap-3 mt-5 font-jost text-[#2D2A33]'>
								<div className='flex flex-row py-1 px-3 bg-[#F7F7F7] rounded-lg'>
									<h1 className='font-medium text-lg'>
										{t("publicProfile.visibility.sections.title")}
									</h1>
								</div>

								<div className='flex flex-col mt-2 pb-3 gap-1.5 border-[#E8EBF3] rounded-b-2xl border-b-2 border-x-2'>
									{visibilityLoading ? (
										<div className='h-[200px]'>
											<Loader />
										</div>
									) : (
										<>
											<div className='flex flex-row px-8'>
												<h1>{t("publicProfile.visibility.sections.header")}</h1>

												<ToggleInput
													name='showHeadline'
													value={visibility.showHeadline}
													onChange={onVisibilityChange}
													withText={false}
													className='ml-auto'
												/>
											</div>

											<div className='flex flex-row px-8'>
												<h1>
													{t("publicProfile.visibility.sections.description")}
												</h1>

												<ToggleInput
													name='showDescription'
													value={visibility.showDescription}
													onChange={onVisibilityChange}
													withText={false}
													className='ml-auto'
												/>
											</div>

											<div className='flex flex-row px-8'>
												<h1>
													{t("publicProfile.visibility.sections.languages")}
												</h1>

												<ToggleInput
													name='showLanguages'
													value={visibility.showLanguages}
													onChange={onVisibilityChange}
													withText={false}
													className='ml-auto'
												/>
											</div>

											<div className='flex flex-row px-8'>
												<h1>
													{t("publicProfile.visibility.sections.education")}
												</h1>

												<ToggleInput
													name='showEducation'
													value={visibility.showEducation}
													onChange={onVisibilityChange}
													withText={false}
													className='ml-auto'
												/>
											</div>

											<div className='flex flex-row px-8'>
												<h1>
													{t("publicProfile.visibility.sections.experience")}
												</h1>

												<ToggleInput
													name='showExperience'
													value={visibility.showExperience}
													onChange={onVisibilityChange}
													withText={false}
													className='ml-auto'
												/>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col pb-5 sm:hidden bg-white px-5'>
						<Button
							variant='tertiary'
							rounded='lg'
							onClick={() => {
								setIsPreview(true)
								window.scrollTo(0, 0)
							}}
						>
							<EyeIcon className='text-[#24459A] w-5 h-5' />
							<h1 className='ml-2 text-lg'>{t("publicProfile.preview")}</h1>
						</Button>
					</div>
				</div>
			</div>
		</main>
	)
}
export default PublicProfile
