import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

import ConnectionService from "../../../services/connectionService"
import { imageUrl } from "../../../utils/converters"
import defaultBg from "../../../assets/default-background.jpg"
import defaultImage from "../../../assets/default-image.jpg"
import Button from "../../../elements/buttons/Button"
import { useNavigate } from "react-router"

const ProfileSection = ({ profile }) => {
	const { t } = useTranslation()
	const navigator = useNavigate()

	const { data: connectionsCount } = useQuery({
		queryFn: ({ queryKey }) =>
			ConnectionService.getConnectionCountByProfileUrl(queryKey[1]),
		queryKey: ["connections", profile?.profileUrl],
		enabled: !!profile,
		select: ({ data }) => data,
	})

	const background = imageUrl(profile?.background, defaultBg)
	const image = imageUrl(profile?.image, defaultImage)

	return (
		<div className='rounded-lg flex flex-col overflow-hidden bg-white h-fit'>
			<div
				className='h-[100px] w-full'
				style={{ background: `url(${background})` }}
			/>
			<div className='-mt-12 mx-auto overflow-hidden h-24 w-24 rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
				<img className='object-contain' src={image} alt='' />
			</div>
			<div className='flex flex-col items-center justify-center mt-2 font-jost text-[#2D2A33]'>
				<h1 className='text-xl font-bold'>
					{profile?.firstName} {profile?.lastName}
				</h1>
				<h3 className='font-extralight text-lg break-words text-wrap'>
					{profile?.headline}
				</h3>
			</div>
			<Button
				variant='tertiary'
				rounded='full'
				className='w-fit mx-auto my-5'
				onClick={() => navigator(`/j4y/${profile?.profileUrl}`)}
			>
				{t("main.viewProfile")}
			</Button>

			<div className='flex flex-col gap-2 border-t-[1px] mx-5 py-5 border-t-[#24459a74]'>
				<div className='flex flex-row text-[#2D2A33] font-jost'>
					<h1>{t("main.contacts")}</h1>
					<h3 className='ml-auto'>{connectionsCount}</h3>
				</div>
			</div>
		</div>
	)
}
export default ProfileSection
