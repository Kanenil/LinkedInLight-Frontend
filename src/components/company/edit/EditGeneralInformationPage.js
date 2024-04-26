import { useEffect } from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { Link } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useQueries } from "@tanstack/react-query"

import { useAlertContext } from "../../../providers/AlertProvider"
import CompanyService from "../../../services/companyService"
import ModalInputFormGroup from "../../shared/forms/ModalInputFormGroup"
import ModalTextareaFormGroup from "../../shared/forms/ModalTextareaFormGroup"
import ModalSelectFormGroup from "../../shared/forms/ModalSelectFormGroup"
import Button from "../../../elements/buttons/Button"
import Loader from "../../shared/Loader"

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const GeneralInformationSchema = yup.object({
	description: yup.string(),
	industry: yup.string(),
	industryId: yup.number(),
	organizationType: yup.string(),
	organizationSize: yup.string(),
	websiteUrl: yup.string(),
	phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
})

const companyCommonDataQuery = [
	{
		queryFn: () => CompanyService.getIndustries(),
		queryKey: ["allIndustries"],
		select: ({ data }) => data,
	},
	{
		queryFn: () => CompanyService.getSizes(),
		queryKey: ["allOrganizationSizes"],
		select: ({ data }) => data,
	},
	{
		queryFn: () => CompanyService.getTypes(),
		queryKey: ["allOrganizationTypes"],
		select: ({ data }) => data,
	},
]

const EditGeneralInformationPage = ({ company }) => {
	const { success } = useAlertContext()

	const { isLoading, industries, sizes, types } = useQueries({
		queries: companyCommonDataQuery,
		combine: results => ({
			isLoading: results.some(v => v.isLoading),
			industries: results[0].data,
			sizes: results[1].data,
			types: results[2].data,
		}),
	})

	const initValues = {
		description: company.description || "",
		industry: "",
		industryId: company.industryId,
		organizationType: company.organizationType,
		organizationSize: company.organizationSize,
		websiteUrl: company.websiteUrl || "",
		phoneNumber: company.phoneNumber || "",
		allIndustries: [],
		allSizes: [],
		allTypes: [],
	}

	useEffect(() => {
		if (!isLoading) {
			setValues(prev => ({
				...prev,
				allIndustries: industries.map(val => ({
					value: val.id,
					label: val.name,
				})),
				allSizes: sizes.map(val => ({ value: val, label: val })),
				allTypes: types.map(val => ({ value: val, label: val })),
				industry: industries.find(v => v.id === company.industryId).name,
			}))
		}
	}, [isLoading])

	const onSubmitFormik = async values => {
		CompanyService.editCompany({
			...company,
			description: values.description,
			industryId: values.industryId,
			organizationType: values.organizationType,
			organizationSize: values.organizationSize,
			websiteUrl: values.websiteUrl,
			phoneNumber: values.phoneNumber,
		})
			.then(() => {
				success("Information successfully saved", 5)
			})
			.catch(err => {
				console.error(err)
			})
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: GeneralInformationSchema,
		onSubmit: onSubmitFormik,
	})

	const { values, errors, handleSubmit, handleChange, setValues } = formik

	return (
		<form onSubmit={handleSubmit} className='bg-white rounded-lg py-6'>
			<div className='inline-flex w-full gap-5 pb-2 px-10 border-b-[1px] border-b-[#24459A]/50'>
				<Link to={`/j4y/company/${company.id}/edit`} className='my-auto'>
					<ArrowLeftIcon className='text-[#24459A] stroke-2 w-5 h-5' />
				</Link>

				<h1 className='font-jost text-xl text-[#2D2A33] font-medium'>
					Edit general information
				</h1>
			</div>

			{isLoading ? (
				<div className='h-[300px]'>
					<Loader />
				</div>
			) : (
				<>
					<div className='flex flex-col rounded-lg gap-5 p-2 mx-4 mt-4 md:mx-20'>
						<ModalTextareaFormGroup
							title='Description'
							name='description'
							type='text'
							value={values.description}
							onChange={handleChange}
							rows={4}
						/>

						<ModalSelectFormGroup
							className='gap-[5px]'
							title='Industry'
							value={values.industry}
							options={values.allIndustries}
							containerWidth={300}
							containerHeightMax={200}
							placeHolder='ex: Software Development'
							error={errors.industry}
							hasTools={false}
							onEnterSelect={false}
							isAbsolute={true}
							clearOnSelect={false}
							onChange={e =>
								setValues(prev => ({
									...prev,
									industry: e.label,
									industryId: e.value,
								}))
							}
							errorChildren={
								<h3 className='mt-2 text-[#9E0F20] text-xs'>
									This field is required
								</h3>
							}
						/>

						<ModalSelectFormGroup
							className='gap-[5px]'
							title='Organization type'
							value={values.organizationType}
							options={values.allTypes}
							containerWidth={300}
							containerHeightMax={200}
							placeHolder='Select from the list'
							hasTools={false}
							onEnterSelect={false}
							isAbsolute={true}
							clearOnSelect={false}
							searchAble={false}
							onChange={e =>
								setValues(prev => ({
									...prev,
									organizationType: e.label,
								}))
							}
						/>

						<ModalSelectFormGroup
							className='gap-[5px]'
							title='Organization size'
							value={values.organizationSize}
							options={values.allSizes}
							containerWidth={300}
							containerHeightMax={200}
							placeHolder='Select from the list'
							hasTools={false}
							onEnterSelect={false}
							isAbsolute={true}
							clearOnSelect={false}
							searchAble={false}
							onChange={e =>
								setValues(prev => ({
									...prev,
									organizationSize: e.label,
								}))
							}
						/>

						<ModalInputFormGroup
							title='Website'
							name='websiteUrl'
							type='url'
							value={values.websiteUrl}
							onChange={handleChange}
							placeholder='Enter URL'
							className='gap-[5px]'
						/>

						<ModalInputFormGroup
							title='Phone number'
							name='phoneNumber'
							type='tel'
							value={values.phoneNumber}
							onChange={handleChange}
							className='gap-[5px]'
						/>
					</div>
					<div className='flex justify-end mt-5'>
						<Button
							disabled={errors.industryId}
							type='submit'
							variant='primary'
							rounded='full'
							className='mr-6 px-5'
						>
							Save changes
						</Button>
					</div>
				</>
			)}
		</form>
	)
}
export default EditGeneralInformationPage
