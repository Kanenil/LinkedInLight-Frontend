import React from "react"
import ArrowRightIcon from "../../elements/icons/ArrowRightIcon"
import { Link, useNavigate } from "react-router-dom"
import PlusIcon from "../../elements/icons/PlusIcon"
import { useQuery } from "@tanstack/react-query"
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper"
import defaultImage from "../../assets/empty-messages.png"
import Show from "../../elements/shared/Show"
import Button from "../../elements/buttons/Button"

const NoData = ({ title, addPath }) => {
	const navigator = useNavigate()

	return (
		<div className='flex flex-col items-center gap-4'>
			<img className='w-96' src={defaultImage} alt='noData' />

			<h1 className='text-center text-lg text-blue-800'>
				Nothing to see for now
			</h1>

			<h3 className='text-sm text-center text-gray-400 w-2/3 mx-auto'>
				When you add new {title.toLowerCase()} they'll show up here.
			</h3>

			<Button
				className='mb-4 px-5 w-fit'
				variant='tertiary'
				rounded='full'
				onClick={() => navigator(addPath)}
			>
				Add {title.toLowerCase()}
			</Button>
		</div>
	)
}

const AbstractDetails = ({
	onClickBack,
	promise,
	hook,
	detail,
	edit,
	itemComponent,
	user,
	isOwner,
	title = "",
}) => {
	const { isLoading, data } = useQuery({
		queryFn: () => promise(),
		queryKey: [detail],
		select: ({ data }) => data,
		enabled: !hook,
	})
	const navigator = useNavigate()

	const hookData = hook && hook(user, isOwner)

	return (
		<div className='flex flex-col gap-2.5 rounded-lg bg-white py-8 px-10'>
			<ConditionalWrapper condition={!isLoading}>
				<div className='flex flex-row items-center font-jost pb-2.5 border-b-[0.5px] border-[#24459A80]'>
					<button onClick={onClickBack}>
						<ArrowRightIcon
							className='w-4 mr-3.5 fill-[#24459A]'
							style={{ transform: `rotate(180deg)` }}
						/>
					</button>

					<h1 className='font-medium text-2xl text-[#2D2A33]'>
						{title ? title : detail}
					</h1>

					<Link
						to={`details/${detail.toLowerCase()}/edit/${edit}`}
						className='ml-auto'
					>
						<PlusIcon className='w-4 fill-[#556DA9]' />
					</Link>
				</div>
				<Show>
					<Show.When isTrue={!!hook}>
						{React.cloneElement(itemComponent, {
							data: hookData,
						})}
					</Show.When>

					<Show.When isTrue={data?.length > 0}>
						{data?.map((item, index) =>
							React.cloneElement(itemComponent, {
								key: `abstractDetail-${index}`,
								editPath: `details/${detail.toLowerCase()}/edit/${edit}/${
									item.id
								}`,
								...item,
							}),
						)}
					</Show.When>

					<Show.Else>
						<NoData
							title={edit}
							addPath={`details/${detail.toLowerCase()}/edit/${edit}`}
						/>
					</Show.Else>
				</Show>
			</ConditionalWrapper>
		</div>
	)
}
export default AbstractDetails
