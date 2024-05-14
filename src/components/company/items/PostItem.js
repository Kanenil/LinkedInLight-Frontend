import moment from "moment/moment"
import { APP_ENV } from "../../../env"
import defaultImage from "../../../assets/default-company-image.jpg"
import { getTimeDuration } from "../../../utils/date"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import React from "react"
import { Link } from "react-router-dom"
import PostOptionButton from "../options/PostOptionButton"
import { useTranslation } from "react-i18next"
import MainPostItem from "../../main/content/MainPostItem"

const PostItem = ({
	isAdmin,
	postedBy,
	postedAt,
	visibility,
	content,
	image,
	company,
	onEdit,
	onDelete,
	isContentAdmin,
	type,
	...rest
}) => {
	const { t } = useTranslation()

	console.log(rest)

	if (type === "JobPosting")
		return (
			<MainPostItem
				type='JobPosting'
				companyName={company.companyName}
				postedAt={postedAt}
				content={rest.textForPost}
				companyLogo={company.logoImg}
				id={rest.id}
				image={null}
			/>
		)

	return (
		<div className='w-full h-fit rounded-lg overflow-hidden bg-white p-6'>
			<div className='flex flex-row pb-5 border-b-[1px] border-b-[#24459A]/50'>
				<h1 className='font-jost text-sm text-[#7D7D7D] [&>a]:font-medium'>
					{t("company.post.postedBy")}
					<Link
						to={`/j4y/${postedBy?.profileUrl}`}
						className='text-[#2D2A33] ml-2 hover:underline'
					>
						{postedBy?.firstName} {postedBy?.lastName}
					</Link>
				</h1>

				<div className='inline-flex gap-5 font-jost text-sm ml-auto'>
					<h3 className='text-[#7D7D7D]'>
						{moment(postedAt).format("DD.MM.YYYY")}
					</h3>

					<ConditionalWrapper condition={isAdmin || isContentAdmin}>
						<PostOptionButton onEdit={onEdit} onDelete={onDelete} />
					</ConditionalWrapper>
				</div>
			</div>

			<div className='flex flex-row mt-5'>
				<div className='flex items-center max-h-[50px] max-w-[50px] bg-white'>
					<img
						className='object-contain'
						src={
							company.logoImg
								? `${APP_ENV.UPLOADS_URL}/${company.logoImg}`
								: defaultImage
						}
						alt='company-logo'
					/>
				</div>

				<div className='flex flex-col mx-6 font-jost text-[#2D2A33]'>
					<h1 className='text-lg font-bold'>{company.companyName}</h1>

					<div className='inline-flex gap-3 items-center'>
						<h3 className='text-[#7D7D7D] text-sm'>
							{getTimeDuration(postedAt)}
						</h3>

						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='2'
							height='2'
							viewBox='0 0 2 2'
							fill='none'
						>
							<path
								d='M0.396484 1.00762C0.396484 0.838945 0.449496 0.696776 0.555521 0.581114C0.666364 0.460632 0.815762 0.400391 1.00371 0.400391C1.19648 0.400391 1.34829 0.458222 1.45914 0.573885C1.56998 0.689547 1.6254 0.834126 1.6254 1.00762C1.6254 1.17147 1.56998 1.31123 1.45914 1.4269C1.34829 1.54256 1.19648 1.60039 1.00371 1.60039C0.815762 1.60039 0.666364 1.54256 0.555521 1.4269C0.449496 1.31123 0.396484 1.17147 0.396484 1.00762Z'
								fill='#2D2A33'
							/>
						</svg>

						<h3 className='text-[#7D7D7D] text-sm'>
							{t(`company.post.${visibility}`)}
						</h3>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-3 mt-10'>
				<h1 className='font-jost font-light text-[#2D2A33] break-words text-wrap'>
					{content}
				</h1>

				<ConditionalWrapper condition={image}>
					<div className='flex justify-center items-center border-[0.5px] border-[#7D88A4]/50 rounded-lg overflow-hidden my-auto w-full h-fit bg-white'>
						<img
							className='object-contain'
							src={`${APP_ENV.UPLOADS_URL}/${image}`}
							alt='company-logo'
						/>
					</div>
				</ConditionalWrapper>
			</div>
		</div>
	)
}
export default PostItem
