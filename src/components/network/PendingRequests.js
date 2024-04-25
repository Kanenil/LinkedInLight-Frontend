import React, { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import ConnectionService from "../../services/connectionService"
import Show from "../../elements/shared/Show"
import { Link } from "react-router-dom"
import { APP_ENV } from "../../env"
import defaultImage from "../../assets/default-image.jpg"
import Modal from "../shared/modals/Modal"
import ConfirmAction from "../shared/modals/shared/ConfirmAction"
import Button from "../../elements/buttons/Button"
import { PlusIcon } from "@heroicons/react/24/outline"

const PendingRequests = () => {
	const queryClient = useQueryClient()
	const {
		data: pendingRequestsList,
		isLoading: pendingRequestsListLoading,
		refetch,
	} = useQuery({
		queryFn: () => ConnectionService.getPendingRequests(),
		queryKey: ["pendingRequests"],
		select: ({ data }) => data,
	})
	const [isVisible, setIsVisible] = useState(false)
	const [selected, setSelected] = useState(null)

	const onReject = val => {
		setSelected(val)
		setIsVisible(true)
	}

	const onConfirm = () => {
		setIsVisible(false)
		ConnectionService.rejectRequest(selected).then(refetch)
	}

	const onAdd = val => {
		ConnectionService.acceptRequest(val).then(() => {
			refetch()
			queryClient.invalidateQueries("connections")
		})
	}

	return (
		<div className='bg-white rounded-lg'>
			<Show>
				<Show.When
					isTrue={
						!pendingRequestsListLoading && pendingRequestsList?.length > 0
					}
				>
					{/*<div className="flex flex-row px-4 py-2">*/}
					{/*    <Link to="pending-requests" className="ml-auto font-jost hover:bg-gray-100 p-1">*/}
					{/*        Manage*/}
					{/*    </Link>*/}
					{/*</div>*/}

					<div className='flex flex-col gap-4 px-4 py-3'>
						{pendingRequestsList?.map(({ id, sender }) => (
							<div
								key={`pendingRequests-${id}`}
								className='flex flex-row gap-3'
							>
								<div className='overflow-hidden h-16 w-16 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
									<img
										className='object-contain'
										src={
											sender?.image
												? APP_ENV.UPLOADS_URL + "/" + sender?.image
												: defaultImage
										}
										alt='image'
									/>
								</div>

								<div className='flex flex-col gap-1 mt-1.5'>
									<Link
										to={`/j4y/${sender.profileUrl}`}
										className='font-jost text-lg font-medium'
									>
										{sender.firstName} {sender.lastName}
									</Link>

									<h3>{sender.headline}</h3>
								</div>

								<div className='flex flex-row gap-3 items-center ml-auto'>
									<div className='py-4'>
										<Button
											className='px-3 w-fit'
											variant='tertiary'
											rounded='full'
											onClick={() => onAdd(id)}
										>
											<PlusIcon className='h-4 stroke-2' />
											Add connection
										</Button>
									</div>

									<div className='py-4'>
										<Button
											className='w-fit'
											variant='tertiary'
											rounded='full'
											onClick={() => onReject(id)}
										>
											Reject
										</Button>
									</div>
								</div>
							</div>
						))}
						<Modal
							isOpen={isVisible}
							onClose={() => setIsVisible(false)}
							position='mt-10 mx-auto'
						>
							<ConfirmAction
								onConfirm={onConfirm}
								onClose={() => setIsVisible(false)}
								title='Reject connection request?'
								action='Do you want to reject connection request?'
							/>
						</Modal>
					</div>
				</Show.When>

				<Show.Else>
					<div className='flex flex-row px-4 py-2'>
						<h1 className='font-jost text-lg'>No pending requests</h1>

						{/*<Link to="pending-requests" className="ml-auto font-jost hover:bg-gray-100 p-1">*/}
						{/*   Manage*/}
						{/*</Link>*/}
					</div>
				</Show.Else>
			</Show>
		</div>
	)
}
export default PendingRequests
