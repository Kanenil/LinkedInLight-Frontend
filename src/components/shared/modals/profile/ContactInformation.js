import XMarkIcon from "../../../../elements/icons/XMarkIcon"
import React from "react"
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper"
import PencilButton from "../../../../elements/buttons/PencilButton"
import {
	ArrowTopRightOnSquareIcon,
	EnvelopeIcon,
	EyeIcon,
	MapPinIcon,
} from "@heroicons/react/24/outline"
import { APP_ENV } from "../../../../env"
import { Link } from "react-router-dom"
import { Trans, useTranslation } from "react-i18next"

const ContactInformation = ({ onClose, isOwner, user }) => {
	const { t } = useTranslation()

	return (
		<div
			className='flex flex-col gap-2 px-7 py-5 bg-white w-screen h-[100dvh] md:w-[480px] md:h-full'
			style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
		>
			<div className='flex flex-row py-2.5 border-b-[1px] border-b-[#24459A]'>
				<h1 className='font-jost font-semibold text-[#2D2A33] text-2xl md:text-xl'>
					{user.firstName} {user.lastName}
				</h1>

				<button onClick={onClose} className='ml-auto'>
					<XMarkIcon className='fill-[#7D7D7D] h-6 md:h-4' />
				</button>
			</div>

			<div className='flex flex-row mt-4'>
				<h3 className='font-jost text-[#2D2A33] text-lg'>
					{t("profileSection.contactInformation")}
				</h3>

				{/* <ConditionalWrapper condition={isOwner}>
					<PencilButton
						onClick={onClose}
						className='ml-auto'
						to={`/j4y/${user.profileUrl}/edit/contact-information`}
					/>
				</ConditionalWrapper> */}
			</div>

			<div className='flex flex-col mt-4 gap-4'>
				<div className='flex flex-row gap-2.5 items-center'>
					<ArrowTopRightOnSquareIcon className='ml-2 text-[#2D2A33] w-7 h-7' />

					<div className='flex flex-col'>
						<h1 className='text-[#2D2A33] font-medium font-jost'>
							{t(
								isOwner
									? "profileSection.yourProfile"
									: "profileSection.profile",
							)}
							{}
						</h1>

						<Link
							onClick={onClose}
							to={`${APP_ENV.FRONTEND_URL}/j4y/${user.profileUrl}`}
							className='text-[#24459A] text-sm font-medium hover:underline'
						>
							{`${APP_ENV.FRONTEND_URL}/j4y/${user.profileUrl}`}
						</Link>
					</div>
				</div>

				{user.country && (
					<div className='flex flex-row gap-2.5 items-center'>
						<MapPinIcon className='ml-2 text-[#2D2A33] w-7 h-7' />

						<div className='flex flex-col'>
							<h1 className='text-[#2D2A33] font-medium font-jost'>
								{t("profileSection.address")}
							</h1>

							<h3 className='text-[#24459A] cursor-pointer text-sm font-medium hover:underline'>
								{user.country}
								{user.city ? ", " + user.city : ""}
							</h3>
						</div>
					</div>
				)}

				<div className='flex flex-row gap-2.5 items-center'>
					<EnvelopeIcon className='ml-2 text-[#2D2A33] w-7 h-7' />

					<div className='flex flex-col'>
						<h1 className='text-[#2D2A33] font-medium font-jost'>
							{t("profileSection.email")}
						</h1>

						<Link
							to={`email:${user.email}`}
							className='text-[#24459A] font-medium hover:underline'
						>
							{user.email}
						</Link>
					</div>
				</div>
			</div>

			<ConditionalWrapper condition={isOwner}>
				<div className='flex flex-row gap-3 mt-auto mb-10 md:mt-4 md:mb-0 items-center'>
					<EyeIcon className='w-4 h-4 text-[#7D7D7D]' />
					<span className='font-jost font-light'>
						<Trans
							i18nKey='profileSection.everyBody'
							components={{ strong: <strong className='font-medium' /> }}
						/>
					</span>
				</div>
			</ConditionalWrapper>
		</div>
	)
}
export default ContactInformation
