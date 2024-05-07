import { APP_ENV } from "../../../env"
import defaultImage from "../../../assets/default-image.jpg"
import React from "react"
import Button from "../../../elements/buttons/Button"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"

const FollowerItem = ({ image, firstName, lastName, headline, profileUrl }) => {
	const navigator = useNavigate()
	const { t } = useTranslation()

	return (
		<div className='bg-white flex flex-col rounded-lg py-6 mx-auto md:mx-0'>
			<div className='px-10'>
				<div className='overflow-hidden mx-auto h-20 w-20 bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
					<img
						className='object-contain'
						src={image ? APP_ENV.UPLOADS_URL + "/" + image : defaultImage}
						alt=''
					/>
				</div>

				<div className='flex flex-col mx-auto gap-1'>
					<h1 className='text-center font-jost text-2xl font-medium'>
						{firstName} {lastName}
					</h1>

					<h3 className='text-center'>{headline}</h3>
				</div>
			</div>

			<div className='flex justify-center mt-10 px-3 w-full'>
				<Button
					className='w-fit'
					variant='tertiary'
					rounded='full'
					onClick={() => navigator(`/j4y/${profileUrl}`)}
				>
					{t("main.viewProfile")}
				</Button>
			</div>
		</div>
	)
}
export default FollowerItem
