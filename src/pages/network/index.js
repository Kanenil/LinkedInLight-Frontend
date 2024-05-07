import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import ConnectionService from "../../services/connectionService"
import Loader from "../../components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../elements/buttons/Button"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { APP_ENV } from "../../env"
import defaultImage from "../../assets/default-image.jpg"
import Modal from "../../components/shared/modals/Modal"
import ConfirmAction from "../../components/shared/modals/shared/ConfirmAction"
import { useChatContext } from "../../providers/ChatProvider"
import useMobileDetector from "../../hooks/useMobileDetector"
import noConnections from "../../assets/no-connections.png"
import { useTranslation } from "react-i18next"

const ConnectionItem = ({ sender, user, isPending, onConfirm, onReject }) => {
	const data = sender ? sender : user

	const { t } = useTranslation()

	return (
		<div className='border-[#B4BFDD] p-2 border-[1px] rounded-xl flex flex-col sm:flex-row sm:items-center gap-3 h-fit'>
			<div className='flex flex-row gap-3 items-center'>
				<div className='overflow-hidden size-28 rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
					<img
						className='object-contain'
						src={
							data?.image
								? APP_ENV.UPLOADS_URL + "/" + data?.image
								: defaultImage
						}
						alt=''
					/>
				</div>

				<div className='flex flex-col h-fit gap-1 mt-1.5'>
					<Link
						to={`/j4y/${data.profileUrl}`}
						className='font-jost text-xl font-medium'
					>
						{data.firstName} {data.lastName}
					</Link>

					<h3>
						{data.country}
						{data.city ? ", " + data.city : ""}
					</h3>
				</div>
			</div>

			<div className='flex flex-row gap-3 items-center ml-auto'>
				{isPending ? (
					<>
						<div className='py-4'>
							<Button
								className='items-center gap-2 px-3 w-fit'
								variant='primary'
								rounded='full'
								onClick={onConfirm}
							>
								<PlusIcon className='h-4 stroke-2' />
								{t("connections.connect")}
							</Button>
						</div>

						<div className='py-4'>
							<Button
								className='w-fit'
								variant='tertiary'
								rounded='full'
								onClick={onReject}
							>
								{t("connections.reject")}
							</Button>
						</div>
					</>
				) : (
					<>
						<div className='py-4'>
							<Button
								className='w-fit'
								variant='primary'
								rounded='full'
								onClick={onConfirm}
							>
								{t("connections.message")}
							</Button>
						</div>

						<button
							className='text-[#2D2A33] hover:text-[#5d5b62]'
							onClick={onReject}
						>
							<XMarkIcon className='w-8 h-8' />
						</button>
					</>
				)}
			</div>
		</div>
	)
}

const MyNetwork = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [selected, setSelected] = useState(null)
	const [isRemove, setIsRemove] = useState(false)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const { setSelectedChatByUserId } = useChatContext()
	const { isMobile } = useMobileDetector()
	const navigator = useNavigate()
	const { t } = useTranslation()

	const {
		data: connectionsList,
		isLoading: connectionsListLoading,
		refetch: pendingRefetch,
	} = useQuery({
		queryFn: () => ConnectionService.getConnections(),
		queryKey: ["connections"],
		select: ({ data }) => data,
	})
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

	const onReject = val => {
		setSelected(val)
		setIsVisible(true)
		setIsRemove(false)
		setTitle(t("connections.rejectRequestTitle"))
		setDescription(t("connections.rejectRequestAction"))
	}

	const onConfirm = async () => {
		if (!isRemove) {
			await ConnectionService.rejectRequest(selected)
		} else {
			await ConnectionService.removeConnection(selected)
		}

		refetch()
		pendingRefetch()
		setIsVisible(false)
	}

	const onAdd = val => {
		ConnectionService.acceptRequest(val).then(() => {
			refetch()
			queryClient.invalidateQueries("connections")
		})
	}

	const onMessage = user => {
		if (isMobile) {
			navigator(`/j4y/chats?createIfNotExist=${user.id}`)
		} else {
			setSelectedChatByUserId(user.id)
		}
	}

	const onRemove = val => {
		console.log(val)
		setSelected(val)
		setIsRemove(true)
		setIsVisible(true)
		setTitle(t("connections.removeAgreeTitle"))
		setDescription(
			t("connections.removeAgreeAction", {
				fullName: val.firstName + " " + val.lastName,
			}),
		)
	}

	return (
		<React.Fragment>
			<Helmet>
				<title>{t("connections.connectionsText")}</title>
			</Helmet>
			<main className='flex-grow bg-[#E7E7E7]'>
				<div className='flex flex-col bg-white rounded-lg mt-2 mb-20 sm:my-8 sm:mx-auto sm:container md:w-[1170px]'>
					<div className='flex flex-row gap-5 sm:gap-10 px-5 py-3 font-jost border-b-[1px] border-b-[#B4BFDD]'>
						<h1 className='text-black text-lg'>
							{t("connections.connectionsText")}
						</h1>
					</div>
					{pendingRequestsListLoading || connectionsListLoading ? (
						<Loader />
					) : (
						<>
							{pendingRequestsList.length > 0 || connectionsList.length > 0 ? (
								<div className='grid grid-cols-1 sm:grid-cols-2 auto-rows-max gap-6 p-6 min-h-[60dvh]'>
									{pendingRequestsList.map(item => (
										<ConnectionItem
											key={`pendingRequests-${item.id}`}
											isPending={true}
											onConfirm={() => onAdd(item.id)}
											onReject={() => onReject(item.id)}
											{...item}
										/>
									))}
									{connectionsList.map(item => (
										<ConnectionItem
											key={`connection-${item.id}`}
											onReject={() => onRemove(item.user)}
											onConfirm={() => onMessage(item.user)}
											{...item}
										/>
									))}
								</div>
							) : (
								<div className='flex flex-col mx-auto my-auto gap-4 pb-20'>
									<img
										className='object-contain'
										src={noConnections}
										alt='no-connections'
									/>

									<h3 className='text-[#7D7D7D] text-lg sm:text-2xl text-center'>
										{t("connections.noConnections")}
									</h3>
								</div>
							)}
						</>
					)}
				</div>
			</main>
			<Modal
				isOpen={isVisible}
				onClose={() => setIsVisible(false)}
				closeModal={!isVisible}
				isRounded={!isMobile}
				position='sm:mt-10 sm:mx-auto'
			>
				<ConfirmAction
					onConfirm={onConfirm}
					onClose={() => setIsVisible(false)}
					title={title}
					action={description}
				/>
			</Modal>
		</React.Fragment>
	)
}
export default MyNetwork
