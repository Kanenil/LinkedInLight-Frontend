import { Link } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import React, { useEffect, useState } from "react"
import ToggleInput from "../../shared/forms/ToggleInput"
import CompanyService from "../../../services/companyService"
import { useAlertContext } from "../../../providers/AlertProvider"
import { useTranslation } from "react-i18next"

const VisibilityPage = ({ company }) => {
	const [value, setValue] = useState(true)
	const { success } = useAlertContext()
	const { t } = useTranslation()

	const onChange = async e => {
		setValue(e.target.checked)

		await CompanyService.editVisibleForAll(company.id, e.target.checked)

		success(
			t("alert.onSuccess", { name: t("company.settingsPage.page2.text") }),
			5,
		)
	}

	useEffect(() => {
		CompanyService.visibleForAll(company.id).then(({ data }) => setValue(data))
	}, [company.id])

	return (
		<div className='bg-white rounded-lg py-6'>
			<div className='inline-flex w-full gap-5 pb-2 px-10 border-b-[1px] border-b-[#24459A]/50'>
				<Link to={`/j4y/company/${company.id}/settings`} className='my-auto'>
					<ArrowLeftIcon className='text-[#24459A] stroke-2 w-5 h-5' />
				</Link>

				<h1 className='font-jost text-xl text-[#2D2A33] font-medium'>
					{t("company.settingsPage.page2.title")}
				</h1>
			</div>

			<div className='flex flex-row rounded-lg p-2 mx-4 mt-4 md:mx-10'>
				<div className='flex flex-col gap-1 font-jost max-w-[60%] text-start'>
					<h1 className='text-[#2D2A33] font-medium text-lg'>
						{t("company.settingsPage.page2.visibility")}
					</h1>

					<h3 className='text-[#A7A7A7] font-light'>
						{t("company.settingsPage.page2.visibilityDescription")}
					</h3>
				</div>

				<ToggleInput
					name='visibility'
					value={value}
					onChange={onChange}
					className='ml-auto'
				/>
			</div>
		</div>
	)
}
export default VisibilityPage
