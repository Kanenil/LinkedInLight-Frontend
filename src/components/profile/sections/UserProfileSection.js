import defaultBg from "../../../assets/default-background.jpg"
import CameraIcon from "../../../elements/icons/CameraIcon"
import defaultImage from "../../../assets/default-image.jpg"
import OpenToButton from "../../../elements/buttons/OpenToButton"
import React, { useState } from "react"
import Modal from "../../shared/modals/Modal"
import AddToProfile from "../../shared/modals/profile/AddToProfile"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import { Link } from "react-router-dom"
import { APP_ENV } from "../../../env"
import PencilButton from "../../../elements/buttons/PencilButton"
import Show from "../../../elements/shared/Show"
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import { connectedQuery } from "../../../constants/combinedQueries"
import ConfirmAction from "../../shared/modals/shared/ConfirmAction"
import ConnectionService from "../../../services/connectionService"
import ContactInformation from "../../shared/modals/profile/ContactInformation"
import useMobileDetector from "../../../hooks/useMobileDetector"
import Button from "../../../elements/buttons/Button"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"

const ImageSector = ({ user, isOwner }) => {
	const backgroundUrl = user?.background
		? APP_ENV.UPLOADS_URL + "/" + user?.background
		: defaultBg
	const imageUrl = user?.image
		? APP_ENV.UPLOADS_URL + "/" + user?.image
		: defaultImage

	return (
		<div
			className='relative w-full h-48'
			style={{ background: `url(${backgroundUrl})` }}
		>
			<ConditionalWrapper condition={isOwner}>
				<Link
					to='edit/background'
					className='absolute flex justify-center items-center rounded-full bg-white w-10 h-10 top-3 right-5'
				>
					<CameraIcon />
				</Link>
			</ConditionalWrapper>

			<Show>
				<Show.When isTrue={isOwner}>
					<Link
						to='edit/image'
						className='absolute left-8 md:left-16 overflow-hidden -bottom-12 h-32 w-32 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'
					>
						<img className='object-contain' src={imageUrl} alt='image' />
					</Link>
				</Show.When>

				<Show.Else>
					<div className='absolute left-16 overflow-hidden -bottom-12 h-32 w-32 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
						<img className='object-contain' src={imageUrl} alt='image' />
					</div>
				</Show.Else>
			</Show>
		</div>
	)
}

const CONNECTION = "connection"
const CONNECTIONREQUEST = "connectionRequest"
const CONNECTIONREVOKE = "connectionRevoke"
const CONTACTINFORMATION = "contactInformation"

const InformationSector = ({ user, isOwner }) => {
	const queryClient = useQueryClient()
	const { isConnected, isConnectionRequested } = useQueries({
		queries: connectedQuery(user.id, isOwner).map(value => ({
			...value,
		})),
		combine: results => {
			return {
				isConnected: results[0].data ?? false,
				isConnectionRequested: results[1].isError ? false : results[1].data,
			}
		},
	})
	const { data: connectionsCount } = useQuery({
		queryFn: ({ queryKey }) =>
			ConnectionService.getConnectionCountByProfileUrl(queryKey[1]),
		queryKey: ["connections", user.profileUrl],
		select: ({ data }) => data,
	})
	const { data } = useQuery({
		queryFn: () => ConnectionService.getConnections(),
		queryKey: ["connections"],
		select: ({ data }) => data,
	})
	const [isVisible, setIsVisible] = useState(false)
	const [confirmModal, setConfirmModal] = useState(null)

	const closeModal = () => {
		setIsVisible(false)
	}

	const onRemoveConnection = () => {
		setConfirmModal(CONNECTION)
		setIsVisible(true)
	}

	const onShowContactInformation = () => {
		setConfirmModal(CONTACTINFORMATION)
		setIsVisible(true)
	}

	const onShowAddToProfile = () => {
		setConfirmModal(null)
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
		const [[first], [second]] = connectedQuery(user.id, isOwner).map(
			val => val.queryKey,
		)

		queryClient.invalidateQueries({
			predicate: query => [first, second].includes(query.queryKey[0]),
		})
	}

	const onConnect = () => {
		ConnectionService.sendRequest(user.id).then(refetch)
	}

	const onConfirm = () => {
		setIsVisible(false)
		setConfirmModal(null)

		if (confirmModal === CONNECTION) {
			const { id } = data.find(val => val.user.id === user.id)

			ConnectionService.removeConnection(id).then(refetch)
		} else {
			ConnectionService.revokeRequest(isConnectionRequested.id).then(refetch)
		}
	}

	const { isMobile } = useMobileDetector()

	return (
		<React.Fragment>
			<div className='ml-6 md:ml-10 mr-8 mt-5 mb-4'>
				<ConditionalWrapper condition={isOwner}>
					<div className='flex justify-end mb-2'>
						<PencilButton to='edit/intro' />
					</div>
				</ConditionalWrapper>
				<div className={`flex flex-row ${!isOwner ? "mt-6" : ""}`}>
					<h1 className='font-bold text-2xl text-[#2D2A33]'>
						{user?.firstName} {user?.lastName}
					</h1>

					<ConditionalWrapper condition={user?.currentPosition}>
						<h1 className='ml-auto font-jost text-[#2D2A33] font-bold mt-auto'>
							{user?.currentPosition}
						</h1>
					</ConditionalWrapper>
				</div>
				<ConditionalWrapper condition={user?.headline}>
					<h1 className='font-jost font-light text-[#2D2A33] mt-1'>
						{user?.headline}
					</h1>
				</ConditionalWrapper>
				<div className='flex flex-row mt-1.5 gap-6 font-jost text-sm'>
					{user?.country && (
						<h3 className='text-[#7F7F7F]'>
							{user?.country}
							{user.city ? ", " + user.city : ""}
						</h3>
					)}

					<button
						onClick={onShowContactInformation}
						className='text-[#24459A] font-medium hover:underline'
					>
						Contact information
					</button>
				</div>
				<Show>
					<Show.When isTrue={isOwner}>
						<Link
							to='/j4y/my-network/connections'
							className='flex flex-row mt-1 font-jost text-[#24459A] text-sm hover:underline w-fit'
						>
							<h3 className='font-medium'>Connections:</h3>

							<h4 className='ml-4'>{connectionsCount}</h4>
						</Link>
					</Show.When>

					<Show.Else>
						<div className='flex flex-row mt-1 font-jost text-[#24459A] text-sm w-fit'>
							<h3 className='font-medium'>Connections:</h3>

							<h4 className='ml-4'>{connectionsCount}</h4>
						</div>
					</Show.Else>
				</Show>

				<Show>
					<Show.When isTrue={isOwner}>
						<div className='flex flex-row gap-4 mt-4'>
							<OpenToButton />
							<Button
								variant='tertiary'
								rounded='full'
								onClick={onShowAddToProfile}
							>
								Add profile section
							</Button>
						</div>
					</Show.When>

					<Show.Else>
						<div className='mt-3'>
							<Show>
								<Show.When isTrue={isConnected}>
									<Button
										variant='primary'
										rounded='full'
										className='items-center w-fit gap-2.5 px-3'
										onClick={onRemoveConnection}
									>
										Remove connection
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
										Requested connection
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
										Requested connection
										<XMarkIcon className='h-5 fill-white' />
									</Button>
								</Show.When>

								<Show.Else>
									<Button
										variant='primary'
										rounded='full'
										onClick={onConnect}
										className='items-center gap-2.5 mt-2 px-3'
									>
										<PlusIcon className='w-4 h-4 stroke-2' />
										Connect
									</Button>
								</Show.Else>
							</Show>
						</div>
					</Show.Else>
				</Show>
			</div>
			<Modal
				isOpen={isVisible}
				isRounded={!isMobile}
				closeModal={!isVisible}
				onClose={closeModal}
				position='mt-0 md:mt-10 mx-auto'
			>
				<Show>
					<Show.When isTrue={confirmModal && confirmModal === CONNECTION}>
						<ConfirmAction
							onConfirm={onConfirm}
							onClose={closeModal}
							title='Remove connection?'
							action={`Do you want to remove your connection with ${user?.firstName} ${user?.lastName}?`}
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

					<Show.When
						isTrue={confirmModal && confirmModal === CONTACTINFORMATION}
					>
						<ContactInformation
							onClose={closeModal}
							isOwner={isOwner}
							user={user}
						/>
					</Show.When>

					<Show.Else>
						<AddToProfile onClose={closeModal} />
					</Show.Else>
				</Show>
			</Modal>
		</React.Fragment>
	)
}

const UserProfileSection = ({ user, isOwner }) => {
	return (
		<div className='flex flex-col bg-white rounded-b-lg'>
			<ImageSector user={user} isOwner={isOwner} />

			<InformationSector user={user} isOwner={isOwner} />
		</div>
	)
}
export default UserProfileSection
