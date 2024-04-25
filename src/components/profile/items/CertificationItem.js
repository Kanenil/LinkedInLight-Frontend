import React from "react"
import { getShortMonth } from "../../../utils/date"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import PencilButton from "../../../elements/buttons/PencilButton"
import Button from "../../../elements/buttons/Button"
import { useNavigate } from "react-router"

const CertificationItem = ({
	editPath,
	issueDate,
	expirationDate,
	name,
	issuingOrganization,
	credentialId,
	credentialURL,
}) => {
	const start = new Date(issueDate)
	const end = new Date(expirationDate)
	const navigator = useNavigate()

	const period = `Issued ${getShortMonth(
		start.getMonth(),
	)} ${start.getFullYear()} ${
		expirationDate
			? ` - ${getShortMonth(end.getMonth())} ${end.getFullYear()}`
			: ""
	}`

	return (
		<div className='mt-2.5 py-2.5 flex flex-row gap-5'>
			<div className='flex justify-center items-center p-5 bg-[#EAECF3] h-[60px] font-bold text-[#2D2A33]'>
				logo
			</div>

			<div className='pb-[5px] font-jost'>
				<h1 className='font-medium text-[#2D2A33]'>{name}</h1>
				<h3 className='font-light font-normal text-[#2D2A33] text-sm'>
					{issuingOrganization}
				</h3>

				<h3 className='font-light text-[#556DA9] text-sm'>{period}</h3>

				<ConditionalWrapper condition={credentialId}>
					<h3 className='font-light font-normal text-[#2D2A33] mt-2 text-sm'>
						Credential ID {credentialId}
					</h3>
				</ConditionalWrapper>

				<ConditionalWrapper>
					<Button
						variant='tertiary'
						rounded='full'
						onClick={() => navigator(credentialURL)}
					>
						Show credential
					</Button>
				</ConditionalWrapper>
			</div>

			<ConditionalWrapper condition={editPath}>
				<PencilButton className='ml-auto' to={editPath} />
			</ConditionalWrapper>
		</div>
	)
}
export default CertificationItem
