import { useEffect } from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { Link } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { useAlertContext } from "../../../providers/AlertProvider"
import CompanyService from "../../../services/companyService"
import ModalInputFormGroup from "../../shared/forms/ModalInputFormGroup"
import ModalSelectFormGroup from "../../shared/forms/ModalSelectFormGroup"
import Button from "../../../elements/buttons/Button"
import Loader from "../../shared/Loader"
import { authService } from "../../../services/authService"
import ToggleInput from "../../shared/forms/ToggleInput"
import { companyPageQuery } from "../../../constants/combinedQueries"
import { useTranslation } from "react-i18next"

const CompanyLocationSchema = yup.object({
	country: yup.string(),
	city: yup.string(),
	street: yup.string(),
	office: yup.string(),
	postalCode: yup.string(),
	showLocation: yup.bool(),
})

const EditCompanyLocation = ({ company }) => {
	const { success } = useAlertContext()
	const queryClient = useQueryClient()
	const { t } = useTranslation()

	const onSubmitFormik = async values => {
		await CompanyService.editLocation(company.id, {
			country: values.country,
			city: values.city || "",
			street: values.street || "",
			office: values.office || "",
			postalCode: values.postalCode || "",
		})
		await CompanyService.editShowLocation(company.id, values.showLocation)

		success(t("alert.onSuccess", { name: t("Information") }), 5)
		queryClient.invalidateQueries(
			...companyPageQuery(company.id).map(value => value.queryFn),
		)
	}

	const initValues = {
		country: company.country || "",
		city: company.city || "",
		street: company.street || "",
		office: company.office || "",
		postalCode: company.postalCode || "",
		showLocation: company.showLocation,
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: CompanyLocationSchema,
		onSubmit: onSubmitFormik,
	})

	const { values, handleSubmit, handleChange, setValues } = formik

	const { data: countries, isLoading } = useQuery({
		queryFn: () => authService.countries(),
		queryKey: ["countries"],
		select: ({ data }) =>
			data.map(val => ({
				value: val.name,
				label: val.name,
			})),
	})

	const {
		data: cities,
		isLoading: isCitiesLoading,
		refetch,
	} = useQuery({
		queryFn: ({ queryKey }) => authService.cities(queryKey[1]),
		queryKey: ["cities", values.country],
		select: ({ data }) =>
			Array.from(new Set(data.map(val => val.name))).map(name => ({
				value: name,
				label: name,
			})),
		enabled: !!values.country,
	})

	useEffect(() => {
		if (values.country) refetch()
	}, [values.country])

	return (
		<form onSubmit={handleSubmit} className='bg-white rounded-lg py-6'>
			<div className='inline-flex w-full gap-5 pb-2 px-10 border-b-[1px] border-b-[#24459A]/50'>
				<Link to={`/j4y/company/${company.id}/edit`} className='my-auto'>
					<ArrowLeftIcon className='text-[#24459A] stroke-2 w-5 h-5' />
				</Link>

				<h1 className='font-jost text-xl text-[#2D2A33] font-medium'>
					{t("company.editPages.location.title")}
				</h1>
			</div>

			{isLoading ? (
				<div className='h-[300px]'>
					<Loader />
				</div>
			) : (
				<>
					<div className='flex flex-col rounded-lg gap-5 p-2 mx-4 mt-4 md:mx-20'>
						<div className='flex flex-row rounded-lg my-4'>
							<div className='flex flex-col gap-1 font-jost max-w-[60%] text-start'>
								<h1 className='text-[#2D2A33] font-medium text-lg'>
									{t("company.editPages.location.visibility")}
								</h1>

								<h3 className='text-[#A7A7A7] font-light'>
									{t("company.editPages.location.description")}
								</h3>
							</div>

							<ToggleInput
								name='showLocation'
								value={values.showLocation}
								onChange={handleChange}
								className='ml-auto'
							/>
						</div>

						<ModalSelectFormGroup
							className='gap-[5px]'
							title={t("company.editPages.location.country")}
							value={values.country}
							options={countries}
							containerWidth={300}
							containerHeightMax={200}
							placeHolder={t("company.newCompany.selectFromList")}
							hasTools={false}
							onEnterSelect={false}
							isAbsolute={true}
							clearOnSelect={false}
							onChange={e =>
								setValues(prev => ({
									...prev,
									country: e.label,
									city: "",
								}))
							}
						/>

						{isCitiesLoading ? (
							<Loader />
						) : (
							<ModalSelectFormGroup
								className='gap-[5px]'
								title={t("company.editPages.location.city")}
								value={values.city}
								options={cities ?? []}
								containerWidth={300}
								containerHeightMax={200}
								placeHolder={t("company.newCompany.selectFromList")}
								hasTools={false}
								onEnterSelect={false}
								isAbsolute={true}
								clearOnSelect={false}
								searchAble={true}
								onChange={e =>
									setValues(prev => ({
										...prev,
										city: e.label,
									}))
								}
							/>
						)}

						<ModalInputFormGroup
							title={t("company.editPages.location.street")}
							name='street'
							type='text'
							value={values.street}
							onChange={handleChange}
							className='gap-[5px]'
						/>

						<ModalInputFormGroup
							title={t("company.editPages.location.office")}
							name='office'
							type='text'
							value={values.office}
							onChange={handleChange}
							className='gap-[5px]'
						/>

						<ModalInputFormGroup
							title={t("company.editPages.location.postalCode")}
							name='postalCode'
							type='text'
							value={values.postalCode}
							onChange={handleChange}
							className='gap-[5px]'
						/>
					</div>
					<div className='flex justify-end mt-5'>
						<Button
							type='submit'
							variant='primary'
							rounded='full'
							className='mr-6 px-5'
						>
							{t("profile.modal.save", {
								title: t("Information").toLowerCase(),
							})}
						</Button>
					</div>
				</>
			)}
		</form>
	)
}
export default EditCompanyLocation
