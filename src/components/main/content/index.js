import { useQuery } from "@tanstack/react-query"

import companyService from "../../../services/companyService"
import Loader from "../../shared/Loader"
import noPosts from "../../../assets/no-posts.png"
import { useTranslation } from "react-i18next"
import MainPostItem from "./MainPostItem"

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
				newsFeed.map(news => (
					<MainPostItem key={`${news.type}-${news.id}`} {...news} />
				))
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
