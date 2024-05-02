import { Link } from "react-router-dom"
import ArrowRightIcon from "../../../elements/icons/ArrowRightIcon"
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import ConnectionService from "../../../services/connectionService"
import { connectedQuery } from "../../../constants/combinedQueries"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import { APP_ENV } from "../../../env"
import defaultImage from "../../../assets/default-image.jpg"
import Show from "../../../elements/shared/Show"
import React, { useState } from "react"
import ConfirmAction from "../../shared/modals/shared/ConfirmAction"
import AddToProfile from "../../shared/modals/profile/AddToProfile"
import Modal from "../../shared/modals/Modal"
import Button from "../../../elements/buttons/Button"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"

const CONNECTION = "connection"
const CONNECTIONREQUEST = "connectionRequest"
const CONNECTIONREVOKE = "connectionRevoke"

const MayKnowItem = ({
	firstName,
	id,
	lastName,
	lastPosition,
	profileUrl,
	image,
}) => {
	const { t } = useTranslation()

	const { isConnected, isConnectionRequested } = useQueries({
		queries: connectedQuery(id, false).map(value => ({
			...value,
		})),
		combine: results => {
			return {
				isConnected: results[0].data ?? false,
				isConnectionRequested: results[1].isError ? false : results[1].data,
			}
		},
	})

	const [isVisible, setIsVisible] = useState(false)
	const [confirmModal, setConfirmModal] = useState(null)
	const queryClient = useQueryClient()

	const closeModal = () => {
		setIsVisible(false)
	}

	const onRemoveConnection = () => {
		setConfirmModal(CONNECTION)
		setIsVisible(true)
	}

	const onRemoveConnectionRequest = () => {
		setConfirmModal(CONNECTIONREQUEST)
		setIsVisible(true)
	}

	const onRevokeConnectionRequest = () => {
		setConfirmModal(CONNECTIONREVOKE)
		setIsVisible(true)
	}

	const refetch = () => {
		const [[first], [second]] = connectedQuery(id, false).map(
			val => val.queryKey,
		)

		queryClient.invalidateQueries({
			predicate: query => [first, second].includes(query.queryKey[0]),
		})
	}

	const onConnect = () => {
		ConnectionService.sendRequest(id).then(refetch)
	}

	const onConfirm = () => {
		setIsVisible(false)
		setConfirmModal(null)

		if (confirmModal === CONNECTION) {
			ConnectionService.getConnections().then(({ data }) => {
				const { id: connectionId } = data.find(val => val.user.id === id)

				ConnectionService.removeConnection(connectionId).then(refetch)
			})
		} else {
			ConnectionService.revokeRequest(isConnectionRequested.id).then(refetch)
		}
	}

	return (
		<div className='mt-2.5 py-2.5 border-[#24459A80] border-t-[0.5px]'>
			<div className='flex flex-row'>
				<div className='rounded-full overflow-hidden w-10 h-10 border-[1px] border-[#2D2A33] bg-[#E7E7E7]'>
					<img
						className='object-contain'
						src={image ? `${APP_ENV.UPLOADS_URL}/${image}` : defaultImage}
						alt=''
					/>
				</div>

				<div className='flex flex-col ml-2.5 font-jost text-[#2D2A33]'>
					<Link to={`/j4y/${profileUrl}`} className='font-medium text-lg'>
						{firstName} {lastName}
					</Link>

					<h3 className='flex flex-row font-light'>{lastPosition}</h3>

					<Show>
						<Show.When isTrue={isConnected}>
							<Button
								variant='primary'
								rounded='full'
								className='items-center w-fit gap-2.5 px-3'
								onClick={onRemoveConnection}
							>
								{t("connections.remove")}
								<XMarkIcon className='h-5 fill-white' />
							</Button>
						</Show.When>

						<Show.When
							isTrue={
								!!isConnectionRequested &&
								isConnectionRequested.status === "Rejected"
							}
						>
							<Button
								variant='primary'
								rounded='full'
								className='items-center w-fit gap-2.5 px-3'
								onClick={onRevokeConnectionRequest}
							>
								{t("connections.request")}
								<XMarkIcon className='h-5 fill-white' />
							</Button>
						</Show.When>

						<Show.When isTrue={!!isConnectionRequested}>
							<Button
								variant='primary'
								rounded='full'
								className='items-center w-fit gap-2.5 px-3'
								onClick={onRemoveConnectionRequest}
							>
								{t("connections.request")}
								<XMarkIcon className='h-5 fill-white' />
							</Button>
						</Show.When>

						<Show.Else>
							<Button
								variant='primary'
								rounded='full'
								onClick={onConnect}
								className='items-center gap-2.5 w-fit mt-2 px-3'
							>
								<PlusIcon className='w-4 h-4 stroke-2' />
								{t("connections.add")}
							</Button>
						</Show.Else>
					</Show>
					<Modal
						isOpen={isVisible}
						onClose={closeModal}
						position='mt-0 md:mt-10 mx-auto'
					>
						<Show>
							<Show.When isTrue={confirmModal && confirmModal === CONNECTION}>
								<ConfirmAction
									onConfirm={onConfirm}
									onClose={closeModal}
									title='Remove connection?'
									action={`Do you want to remove your connection with ${firstName} ${lastName}?`}
								/>
							</Show.When>

							<Show.When
								isTrue={
									confirmModal &&
									[CONNECTIONREQUEST, CONNECTIONREVOKE].includes(confirmModal)
								}
							>
								<ConfirmAction
									onConfirm={onConfirm}
									onClose={closeModal}
									title='Remove connection request?'
									action='Do you want to remove your connection request?'
								/>
							</Show.When>

							<Show.Else>
								<AddToProfile onClose={closeModal} />
							</Show.Else>
						</Show>
					</Modal>
				</div>
			</div>
		</div>
	)
}

const PeopleMayKnow = ({ margin = "mt-2.5" }) => {
	const { t } = useTranslation()

	const { data: suggestions, isLoading } = useQuery({
		queryFn: () => ConnectionService.suggestions(),
		queryKey: ["suggestions"],
		select: ({ data }) => data,
	})

	if (isLoading) return

	return (
		<div className={`flex flex-col bg-white rounded-lg px-5 pt-5 ${margin}`}>
			<h1 className='font-jost text-xl text-[#2D2A33] font-medium'>
				{t("peopleMayKnow.title")}
			</h1>

			{suggestions.map((person, index) => (
				<MayKnowItem key={`peopleMayKnow-${index}`} {...person} />
			))}

			<ConditionalWrapper condition={suggestions.length > 5}>
				<Link
					to='/j4y/my-network'
					className='mt-2.5 py-3 border-[#A7ACBA] border-t-[0.5px] flex flex-row justify-center gap-4 font-jost text-[#2D2A33] font-light'
				>
					{t("peopleMayKnow.showAll")}
					<ArrowRightIcon className='fill-[#2D2A33] w-2.5' />
				</Link>
			</ConditionalWrapper>
		</div>
	)
}
export default PeopleMayKnow
