import { useQuery } from "@tanstack/react-query"
import CompanyService from "../../../services/companyService"
import Loader from "../../shared/Loader"
import Show from "../../../elements/shared/Show"
import noPosts from "../../../assets/no-posts.png"
import React from "react"
import PostItem from "../items/PostItem"
import Button from "../../../elements/buttons/Button"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"

const CompanyPostsSection = ({
	company,
	isAdmin,
	isContentAdmin,
	searchParams: [_, setSearchParams],
}) => {
	const { t } = useTranslation()

	const {
		data: posts,
		isLoading,
		refetch,
	} = useQuery({
		queryFn: ({ queryKey }) => CompanyService.posts(queryKey[1]),
		queryKey: ["posts", company.id],
		select: ({ data }) => data,
	})
	const navigator = useNavigate()

	if (isLoading) return <Loader />

	const onEdit = id => {
		setSearchParams(prev => ({
			...prev,
			createPost: true,
			id,
		}))
	}

	const onDelete = id => {
		CompanyService.deletePost(id).then(refetch)
	}

	return (
		<section className='flex flex-col gap-5'>
			<Show>
				<Show.When isTrue={posts.length > 0}>
					{posts.map(post => (
						<PostItem
							key={`post-${post.id}`}
							company={company}
							isAdmin={isAdmin}
							isContentAdmin={isContentAdmin}
							setSearchParams={setSearchParams}
							onEdit={() => onEdit(post.id)}
							onDelete={() => onDelete(post.id)}
							{...post}
						/>
					))}
				</Show.When>

				<Show.Else>
					<div className='w-full h-full rounded-lg overflow-hidden bg-white p-6'>
						<div className='my-auto mx-auto font-jost text-[#2D2A33] text-center'>
							<div
								className='mx-auto h-[200px] w-[200px]'
								style={{ backgroundImage: `url(${noPosts})` }}
							/>
							<h1 className='text-xl mt-2'>{t("company.noPosts")}</h1>
							<h3
								className='text-[#7D7D7D] [&>strong]:font-medium text-sm mt-2'
								dangerouslySetInnerHTML={{
									__html: t("company.noPostsDescription"),
								}}
							/>

							{isAdmin && (
								<div className='flex justify-center mt-4'>
									<Button
										className='px-5 w-fit'
										variant='tertiary'
										rounded='full'
										onClick={() => navigator("?createPost=true")}
									>
										{t("company.publishFirstPost")}
									</Button>
								</div>
							)}
						</div>
					</div>
				</Show.Else>
			</Show>
		</section>
	)
}
export default CompanyPostsSection
