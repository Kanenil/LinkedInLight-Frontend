import { useQuery } from "@tanstack/react-query"

import ProfileService from "../../../services/profileService"
import PencilButton from "../../../elements/buttons/PencilButton"
import Modal from "../../shared/modals/Modal"
import OpenToWorkDetails from "../../shared/modals/profile/OpenToWorkDetails"
import { useState } from "react"
import { authService } from "../../../services/authService"

const OpenToWork = ({ isOwner, user }) => {
	const [isOpen, setIsOpen] = useState(false)

	const { data, isLoading, isError } = useQuery({
		queryFn: ({ queryKey }) => ProfileService.getOpenToWorkByURL(queryKey[1]),
		queryKey: ["openToWork", user.profileUrl],
		select: ({ data }) => data,
		retry: false,
	})

	const { data: positions, isLoading: positionLoading } = useQuery({
		queryFn: () => ProfileService.getPositions(),
		queryKey: ["allPositions"],
		select: ({ data }) => data,
		retry: false,
	})

	const { data: countries, isLoading: countriesLoading } = useQuery({
		queryFn: () => authService.countries(),
		queryKey: ["allCountries"],
		select: ({ data }) => data,
		retry: false,
	})

	if (isLoading || positionLoading || countriesLoading || isError) return <></>

	const dot = (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='3'
			height='3'
			viewBox='0 0 3 3'
			fill='none'
		>
			<path
				d='M0 1.51205C0 1.23092 0.0883534 0.993976 0.26506 0.801205C0.449799 0.600402 0.698795 0.5 1.01205 0.5C1.33333 0.5 1.58635 0.596386 1.77108 0.789157C1.95582 0.981928 2.04819 1.22289 2.04819 1.51205C2.04819 1.78514 1.95582 2.01807 1.77108 2.21084C1.58635 2.40361 1.33333 2.5 1.01205 2.5C0.698795 2.5 0.449799 2.40361 0.26506 2.21084C0.0883534 2.01807 0 1.78514 0 1.51205Z'
				fill='#2D2A33'
			/>
		</svg>
	)

	return (
		<div className='relative flex flex-col my-2 bg-[#F7F7F7] font-jost w-[300px] rounded-lg p-2'>
			<h1 className='text-[#2D2A33] font-semibold'>Looking for work</h1>

			<div className='flex flex-row mt-1'>
				<h1 className='text-[#2D2A33] font-semibold text-sm'>Positions:</h1>
				<div className='inline-flex flex-wrap gap-1.5'>
					{data.openToWorkPositions.map((position, index, arr) => (
						<div
							className='inline-flex items-center gap-1.5'
							key={`position-${position.positionId}`}
						>
							<h3 className='text-sm ml-1 font-light'>
								{positions.find(val => val.id === position.positionId).name}
							</h3>
							{arr.length - 1 !== index && dot}
						</div>
					))}
				</div>
			</div>

			<button
				onClick={() => setIsOpen(true)}
				className='flex flex-row hover:underline font-medium mt-1 font-jost text-[#24459A] text-sm w-fit'
			>
				Details
			</button>

			{isOwner && (
				<PencilButton
					className='absolute right-2 top-1'
					to='edit/job-opportunity'
				/>
			)}
			<Modal
				position='sm:mt-20 mx-auto'
				isOpen={isOpen}
				closeModal={!isOpen}
				onClose={() => setIsOpen(false)}
			>
				<OpenToWorkDetails
					preferences={data}
					positions={positions}
					countries={countries}
					dot={dot}
					onClose={() => setIsOpen(false)}
				/>
			</Modal>
		</div>
	)
}
export default OpenToWork
