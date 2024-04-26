import React, { useState } from "react"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"
import CompanyNavButton from "../CompanyNavButton"
import { APP_ENV } from "../../../env"
import defaultImage from "../../../assets/default-image.jpg"
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import Button from "../../../elements/buttons/Button"
import ConfirmationModal from "../../../components/shared/modals/ConfirmationModal"
import ManageAdmin from "../../shared/modals/company/ManageAdmin"
import ConfirmAction from "../../shared/modals/shared/ConfirmAction"
import Modal from "../../shared/modals/Modal"
import CompanyService from "../../../services/companyService"
import useMobileDetector from "../../../hooks/useMobileDetector"

const cols = ["User profile", "Status", "Action"]

const PermissionsPage = ({
	company,
	admins,
	followers,
	refetch,
	isOwner,
	currentAdmin,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState(undefined)
	const [deleteId, setDeleteId] = useState(undefined)
	const { isMobile } = useMobileDetector()

	return (
		<div className='bg-white rounded-lg py-6'>
			<div className='inline-flex w-full gap-5 pb-2 px-10 border-b-[1px] border-b-[#24459A]/50'>
				<Link to={`/j4y/company/${company.id}/settings`} className='my-auto'>
					<ArrowLeftIcon className='text-[#24459A] stroke-2 w-5 h-5' />
				</Link>

				<h1 className='font-jost text-xl text-[#2D2A33] font-medium'>
					Page Access Management
				</h1>
			</div>

			<div className='flex flex-row gap-3 w-full px-4 md:px-14 py-4'>
				<CompanyNavButton
					className='w-full md:w-fit px-2 md:px-5 border-b-2'
					isActive={true}
				>
					Page administrators
				</CompanyNavButton>

				<Button
					variant='primary'
					rounded='full'
					className='items-center gap-2.5 md:w-fit ml-auto text-sm'
					onClick={() => {
						setIsModalOpen(true)
						setSelectedUser(undefined)
					}}
				>
					<PlusIcon className='w-4 h-4 stroke-2' />
					Add administrator
				</Button>
			</div>

			<div className='flex flex-row [&>h1]:flex-grow [&>h1]:text-center flex-grow justify-center font-medium font-jost text-[#2D2A33] bg-[#F0F1F3] border-t-[1px] border-b-[1px] border-b-[#24459A]/20 border-t-[#24459A]/20 py-4'>
				{cols.map(col => (
					<h1 key={`col-${col}`}>{col}</h1>
				))}
			</div>

			<div className='mt-2'>
				<div className='flex flex-col gap-2'>
					{admins.map(
						({ userId, image, firstName, lastName, currentPosition, role }) => (
							<div
								key={`admin-${userId}`}
								className='mx-0 md:mx-10 flex flex-row [&>div]:flex-grow [&>div]:mx-auto flex-grow justify-center font-medium font-jost text-[#2D2A33] py-4'
							>
								<div className='flex flex-row gap-3 max-w-[35%] md:max-w-[30%]'>
									<div className='overflow-hidden max-h-12 max-w-12 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
										<img
											className='object-contain'
											src={
												image ? APP_ENV.UPLOADS_URL + "/" + image : defaultImage
											}
											alt='image'
										/>
									</div>

									<div className='flex flex-col gap-1 text-sm md:text-base'>
										<h1 className='font-jost font-medium'>
											{firstName} {lastName}
										</h1>

										<h3>{currentPosition}</h3>
									</div>
								</div>

								<div className='max-w-[25%] my-auto'>
									<div className='w-fit px-2 py-1 rounded-lg capitalize bg-[#F0F1F3] text-[#2D2A33] font-medium font-jost'>
										{role}
									</div>
								</div>

								<div className='flex flex-row gap-3 max-w-[8%]'>
									<ConditionalWrapper
										condition={role !== "Owner" && currentAdmin.id !== userId}
									>
										<button
											onClick={() => {
												setSelectedUser({
													id: userId,
													image,
													firstName,
													lastName,
													currentPosition,
													role,
												})
												setIsModalOpen(true)
											}}
											className='my-auto'
										>
											<PencilIcon className='w-5 h-5 text-[#24459A] stroke-1' />
										</button>

										{isOwner && (
											<button
												onClick={() => setDeleteId(userId)}
												className='my-auto'
											>
												<TrashIcon className='w-5 h-5 text-[#24459A] stroke-1' />
											</button>
										)}
									</ConditionalWrapper>
								</div>
							</div>
						),
					)}
				</div>
			</div>
			{isModalOpen && (
				<ConfirmationModal
					isOpen={true}
					onSaveCallback={refetch}
					onCloseCallback={() => {
						setIsModalOpen(false)
						document.body.classList.remove("modal-open")
					}}
					followers={followers}
					admins={admins}
					company={company}
					selectedUser={selectedUser}
				>
					<ManageAdmin />
				</ConfirmationModal>
			)}
			{deleteId && (
				<Modal
					isOpen={true}
					onClose={() => {
						setDeleteId(undefined)
						document.body.classList.remove("modal-open")
					}}
					isRounded={!isMobile}
					isFixed={isMobile}
				>
					<ConfirmAction
						onClose={() => {
							setDeleteId(undefined)
							document.body.classList.remove("modal-open")
						}}
						onConfirm={async () => {
							await CompanyService.deleteAdmin(company.id, deleteId)
							document.body.classList.remove("modal-open")
							refetch()
							setDeleteId(undefined)
						}}
						title='Delete admin'
						action={`Are you sure that you want remove ${
							admins
								.filter(val => val.userId === deleteId)
								.map(val => val.firstName + " " + val.lastName)[0]
						} from administrator`}
					/>
				</Modal>
			)}
		</div>
	)
}
export default PermissionsPage
