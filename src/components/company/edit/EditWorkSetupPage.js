import { useFormik } from "formik"
import { Link } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useQueryClient } from "@tanstack/react-query"

import { useAlertContext } from "../../../providers/AlertProvider"
import CompanyService from "../../../services/companyService"
import ModalSelectFormGroup from "../../shared/forms/ModalSelectFormGroup"
import ToggleInput from "../../shared/forms/ToggleInput"
import { companyPageQuery } from "../../../constants/combinedQueries"
import { useTranslation } from "react-i18next"

const EditWorkSetupPage = ({ company }) => {
	const { success } = useAlertContext()
	const queryClient = useQueryClient()
	const { t } = useTranslation()

	const workSetups = t("company.editPages.workSetup.workSetups", {
		returnObjects: true,
	})

	const initValues = {
		workSetup: company.workSetup || workSetups[0].value,
		showWorkSetup: company.showWorkSetup,
	}

	const handleChange = e => {
		let promise = null

		if (e.target) {
			setValues(prev => ({ ...prev, showWorkSetup: e.target.checked }))
			promise = CompanyService.editShowWorkSetup(company.id, e.target.checked)
		} else {
			setValues(prev => ({ ...prev, workSetup: e.value }))
			promise = CompanyService.editWorkSetup(company.id, e.value)
		}

		promise
			.then(() => {
				success("Information successfully saved", 5)
				queryClient.invalidateQueries(
					...companyPageQuery(company.id).map(value => value.queryFn),
				)
			})
			.catch(err => {
				console.error(err)
			})
	}

	const { values, setValues } = useFormik({
		initialValues: initValues,
	})

	const WorkSetupItem = ({ label, value, onClick }) => {
		return (
			<button
				onClick={onClick}
				className='flex flex-col gap-1 p-2 font-jost text-[#2D2A33] text-start hover:bg-gray-50'
			>
				<h1 className='font-semibold'>{value}</h1>
				<h1 className='font-light'>{label}</h1>
			</button>
		)
	}

	return (
		<div className='bg-white rounded-lg py-6'>
			<div className='inline-flex w-full gap-5 pb-2 px-10 border-b-[1px] border-b-[#24459A]/50'>
				<Link to={`/j4y/company/${company.id}/edit`} className='my-auto'>
					<ArrowLeftIcon className='text-[#24459A] stroke-2 w-5 h-5' />
				</Link>

				<h1 className='font-jost text-xl text-[#2D2A33] font-medium'>
					{t("company.editPages.workSetup.title")}
				</h1>
			</div>

			<div className='flex flex-col rounded-lg gap-5 p-2 mx-4 mt-4 md:mx-20'>
				<div className='flex flex-row rounded-lg'>
					<div className='flex flex-col gap-1 font-jost max-w-[60%] text-start'>
						<h1 className='text-[#2D2A33] font-medium text-lg'>
							{t("company.editPages.workSetup.visibility")}
						</h1>

						<h3 className='text-[#A7A7A7] font-light'>
							{t("company.editPages.workSetup.description")}
						</h3>
					</div>

					<ToggleInput
						name='showWorkSetup'
						value={values.showWorkSetup}
						onChange={handleChange}
						className='ml-auto'
					/>
				</div>

				<ModalSelectFormGroup
					className='gap-[5px]'
					title={t("company.editPages.workSetup.title")}
					value={values.workSetup}
					options={workSetups}
					item={<WorkSetupItem />}
					searchFunc={() => el => el}
					containerWidth={300}
					containerHeightMax={300}
					placeHolder='Select work setup'
					hasTools={false}
					onEnterSelect={false}
					isAbsolute={true}
					clearOnSelect={false}
					searchAble={false}
					onChange={handleChange}
				/>
			</div>
		</div>
	)
}
export default EditWorkSetupPage
