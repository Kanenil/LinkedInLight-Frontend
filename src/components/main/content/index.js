import { useQuery } from "@tanstack/react-query"

import companyService from "../../../services/companyService"
import Loader from "../../shared/Loader"
import { imageUrl } from "../../../utils/converters"
import defaultCompanyLogo from "../../../assets/default-company-image.jpg"
import { getTimeDuration } from "../../../utils/date"
import noPosts from "../../../assets/no-posts.png"
import { useTranslation } from "react-i18next"

const PostItem = ({ companyName, postedAt, content, companyLogo, image }) => (
	<div className='w-full h-fit rounded-lg overflow-hidden bg-white p-6'>
		<div className='flex flex-row pb-2 border-b-[1px] border-b-[#24459A]/50'>
			<div className='flex items-center max-h-[50px] max-w-[50px] bg-white'>
				<img
					className='object-contain'
					src={imageUrl(companyLogo, defaultCompanyLogo)}
					alt='company-logo'
				/>
			</div>

			<div className='flex flex-col mx-6 font-jost text-[#2D2A33]'>
				<h1 className='text-lg font-bold'>{companyName}</h1>

				<div className='inline-flex gap-3 items-center'>
					<h3 className='text-[#7D7D7D] text-sm'>
						{getTimeDuration(postedAt)}
					</h3>
				</div>
			</div>
		</div>

		<div className='flex flex-col gap-3 mt-4'>
			<h1 className='font-jost font-light text-[#2D2A33] break-words text-wrap'>
				{content}
			</h1>

			{image && (
				<div className='flex justify-center items-center border-[0.5px] border-[#7D88A4]/50 rounded-lg overflow-hidden my-auto w-full h-fit bg-white'>
					<img className='object-contain' src={imageUrl(image)} alt='post' />
				</div>
			)}
		</div>
	</div>
)

const MainContentSection = () => {
	const { t } = useTranslation()

	const { data: newsFeed, isLoading } = useQuery({
		queryFn: () => companyService.getNewsFeed(),
		queryKey: ["newsFeed"],
		select: ({ data }) => data,
	})

	if (isLoading)
		return (
			<div className='md:mt-0 md:w-8/12 md:ml-5 flex flex-col gap-5'>
				<Loader />
			</div>
		)

	return (
		<div className='md:mt-0 md:w-8/12 flex flex-col gap-5'>
			{newsFeed.length > 0 ? (
				newsFeed.map(news => <PostItem key={news.id} {...news} />)
			) : (
				<div className='w-full h-fit rounded-lg overflow-hidden bg-white p-6'>
					<div className='my-auto mx-auto pb-6 font-jost text-[#2D2A33] text-center'>
						<div
							className='mx-auto h-[200px] w-[200px]'
							style={{ backgroundImage: `url(${noPosts})` }}
						/>
						<h1 className='text-xl mt-2'>{t("main.noPosts")}</h1>
						<h3 className='text-[#7D7D7D] [&>strong]:font-medium text-sm mt-2'>
							{t("main.noPostsDescription")}
						</h3>
					</div>
				</div>
			)}
		</div>
	)
}
export default MainContentSection
