import ArrowDownIcon from "../icons/ArrowDownIcon"
import defaultImage from "../../assets/default-image.jpg"
import React from "react"
import ProfileService from "../../services/profileService"
import { Link } from "react-router-dom"
import useComponentVisible from "../../hooks/useComponentVisible"
import { useAuth } from "../../hooks/useAuth"
import ConditionalWrapper from "../shared/ConditionalWrapper"
import { APP_ENV } from "../../env"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

const AccountButton = () => {
	const { t } = useTranslation()

	const { data } = useQuery({
		queryFn: () => ProfileService.getProfile(),
		queryKey: ["profile"],
		select: ({ data }) => data,
	})
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible(false)
	const { logout } = useAuth()

	const imageUrl = data?.image
		? APP_ENV.UPLOADS_URL + "/" + data?.image
		: defaultImage

	const defaultRoutes = [
		{
			to: "/j4y/settings",
			title: t("main.settings"),
		},
		{
			to: "/j4y/settings/params/language",
			title: t("main.language"),
		},
		// {
		// 	to: "/j4y",
		// 	title: "Help",
		// },
	]

	const LinkedText = ({ to, title, onClickHandler }) => {
		return (
			<React.Fragment>
				<ConditionalWrapper condition={to}>
					<Link
						onClick={onClickHandler}
						className='hover:underline active:font-normal active:no-underline'
						to={to}
					>
						{title}
					</Link>
				</ConditionalWrapper>
				<ConditionalWrapper condition={onClickHandler && !to}>
					<button
						onClick={onClickHandler}
						className='hover:underline active:font-normal active:no-underline'
						to={to}
					>
						{title}
					</button>
				</ConditionalWrapper>
			</React.Fragment>
		)
	}

	return (
		<div
			ref={ref}
			className='relative flex items-center border-l-2 border-[#24459A73] pl-5 md:pl-10'
		>
			<button
				onClick={() => setIsComponentVisible(val => !val)}
				className='flex flex-row items-end'
			>
				<div className='w-8 h-8 overflow-hidden rounded-full my-auto border-2 border-[#2D2A33]'>
					<img alt='' className='object-contain' src={imageUrl} />
				</div>

				<ArrowDownIcon className='ml-1 w-3.5 fill-[#24459A]' />
			</button>
			<ConditionalWrapper condition={isComponentVisible}>
				<div
					className='absolute flex flex-col bg-white -left-32 rounded-l-lg rounded-b-lg  top-14 p-5 z-20'
					style={{ boxShadow: "0px 1px 6px 0px #00000040" }}
				>
					<div className='flex flex-row gap-2.5'>
						<div className='rounded-full min-w-10 overflow-hidden border-[1px] border-[#2D2A33] w-10 h-10'>
							<img alt='' className='object-contain' src={imageUrl} />
						</div>

						<div className='font-jost'>
							<h1 className='font-medium'>
								{data?.firstName} {data?.lastName}
							</h1>

							<ConditionalWrapper condition={data?.headline}>
								<h3 className='font-light text-sm'>{data?.headline}</h3>
							</ConditionalWrapper>
						</div>
					</div>
					<Link
						className='border-[#24459A] w-[172px] mt-2.5 mb-1 text-center border-[1px] rounded-full py-1.5 px-6 font-jost text-[#556DA9] hover:bg-[#E5F2FC] hover:border-[#24459A] hover:border-[1.5px] hover:text-[#556DA9] text-sm'
						to={`/j4y/${data?.profileUrl}`}
						onClick={() => setIsComponentVisible(false)}
					>
						{t("main.viewProfile")}
					</Link>

					<div className='flex flex-col gap-1 mt-1 mb-1 pb-1 pt-2.5 border-t-[0.5px] border-[#24459A80] font-jost font-light text-[#2D2A33]'>
						{defaultRoutes.map((route, index) => (
							<LinkedText
								onClickHandler={() => setIsComponentVisible(false)}
								key={`accountDefaultRoute-${index}`}
								{...route}
							/>
						))}
					</div>

					<div className='mt-1 pt-2.5 mb-1 pb-1 border-t-[0.5px] border-[#24459A80] font-jost font-light text-[#2D2A33]'>
						<LinkedText
							onClickHandler={() => logout()}
							title={t("main.exit")}
						/>
					</div>
				</div>
			</ConditionalWrapper>
		</div>
	)
}
export default AccountButton
