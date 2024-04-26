import { Link, useNavigate } from "react-router-dom"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import React, { useState } from "react"

import ModalCheckFormGroup from "../../shared/forms/ModalCheckFormGroup"
import { useAlertContext } from "../../../providers/AlertProvider"
import Button from "../../../elements/buttons/Button"
import CompanyService from "../../../services/companyService"

const DeactivationPage = ({ company }) => {
	const [value, setValue] = useState(false)
	const { error, success } = useAlertContext()
	const navigator = useNavigate()

	const onChange = async e => {
		setValue(e.target.checked)
	}

	const onDelete = () => {
		CompanyService.remove(company.id)
			.then(() => {
				navigator("/j4y")
				success(
					`Company ${company.companyName} was successfully deactivated`,
					5,
				)
			})
			.catch(err => {
				console.error(err)
				error("Something went wrong during deactivating", 5)
			})
	}

	return (
		<div className='bg-white rounded-lg py-6'>
			<div className='inline-flex w-full gap-5 pb-2 px-10 border-b-[1px] border-b-[#24459A]/50'>
				<Link to={`/j4y/company/${company.id}/settings`} className='my-auto'>
					<ArrowLeftIcon className='text-[#24459A] stroke-2 w-5 h-5' />
				</Link>

				<h1 className='font-jost text-xl text-[#2D2A33] font-medium'>
					Page Deactivation
				</h1>
			</div>

			<div className='flex flex-col rounded-lg p-2 mx-4 mt-4 md:mx-10'>
				<div className='flex flex-col gap-1 font-jost text-start'>
					<h1 className='text-[#2D2A33] font-medium text-lg'>
						It's unfortunate that you're leaving
					</h1>

					<h3 className='text-[#A7A7A7] font-light'>
						Deactivation will result in the complete deletion of the page from
						Job For You. After deactivation, you and other administrators will
						no longer have access to the page.
					</h3>
				</div>

				<ModalCheckFormGroup
					className='pb-[10px] gap-[5px] mt-5'
					name='deactivation'
					onChange={onChange}
					value={value}
					title="By clicking 'Deactivate', I confirm that I understand the consequences of deactivating the page."
				/>

				<Button
					onClick={onDelete}
					disabled={!value}
					variant='primary'
					rounded='full'
					className='ml-auto px-5 mt-5'
				>
					Deactivate
				</Button>
			</div>
		</div>
	)
}
export default DeactivationPage
