import { APP_ENV } from "../../../env"
import defaultImage from "../../../assets/default-image.jpg"
import React from "react"
import Show from "../../../elements/shared/Show"
import { Link } from "react-router-dom"
import { useLocation, useNavigate } from "react-router"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import moment from "moment"
import Button from "../../../elements/buttons/Button"

const RecommendationItem = ({
	status,
	sender,
	requester,
	content,
	relationship,
	requestMessage,
	dateGiven,
	id,
	...data
}) => {
	const location = useLocation()
	const navigator = useNavigate()

	const user = status === "Pending" ? requester : sender

	return (
		<div className='flex flex-col gap-3'>
			<div className='flex flex-row gap-5'>
				<div className='overflow-hidden h-14 w-14 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
					<img
						className='object-contain'
						src={
							user?.image
								? APP_ENV.UPLOADS_URL + "/" + user?.image
								: defaultImage
						}
						alt='image'
					/>
				</div>

				<div className='flex flex-col gap-1'>
					<Link
						to={`/j4y/${user.profileUrl}`}
						className='hover:underline font-jost font-medium'
					>
						{user.firstName} {user.lastName}
					</Link>

					<h3>{user.lastPosition}</h3>

					<ConditionalWrapper condition={status === "Given"}>
						<h3 className='font-light text-[#BBBBBB] text-sm'>
							Given {moment(dateGiven).format("YYYY, DD MMMM")}
						</h3>
					</ConditionalWrapper>
				</div>
			</div>

			<div className='md:ml-20 w-fit'>
				<Show>
					<Show.When isTrue={status === "Pending"}>
						<Button
							className='mb-4 px-5 w-fit'
							variant='tertiary'
							rounded='full'
							onClick={() =>
								navigator(`${location.pathname}/edit/give-recommendation/${id}`)
							}
						>
							Give recommendation
						</Button>

						<div className='border-r-[1px] border-l-[1px] px-3 py-2 rounded-lg border-[#24459A] text-[#2D2A33] font-jost'>
							{requestMessage}
						</div>

						<div className='mt-5 font-jost font-light text-sm'>
							<h3 className='text-[#2D2A33]'>
								Write a recommendation for {user.firstName} {user.lastName}
							</h3>
							<Link
								to={`${location.pathname}/edit/give-recommendation/${id}`}
								className='text-[#7D7D7D]'
							>
								{`${APP_ENV.FRONTEND_URL}${location.pathname}/edit/give-recommendation/${id}`}
							</Link>
						</div>
					</Show.When>

					<Show.Else>
						<div className='border-r-[1px] border-l-[1px] px-3 py-2 rounded-lg border-[#24459A] text-[#2D2A33] font-jost'>
							{content}
						</div>
					</Show.Else>
				</Show>
			</div>
		</div>
	)
}
export default RecommendationItem
