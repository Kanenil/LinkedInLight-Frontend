import Logo from "../../../elements/shared/Logo"
import { Link, NavLink } from "react-router-dom"
import BellIcon from "../../../elements/icons/BellIcon"
import HomeIcon from "../../../elements/icons/HomeIcon"
import JobsIcon from "../../../elements/icons/JobsIcon"
import GroupsIcon from "../../../elements/icons/GroupsIcon"
import MessagesIcon from "../../../elements/icons/MessagesIcon"
import AccountButton from "../../../elements/buttons/AccountButton"
import { useQueries } from "@tanstack/react-query"
import React from "react"
import { headerQuery } from "../../../constants/combinedQueries"
import SearchInput from "./SearchInput"
import HeaderModal from "./HeaderModal"
import HeaderProvider, {
	useHeaderContext,
} from "../../../providers/HeaderProvider"
import CompanyButton from "../../../elements/buttons/CompanyButton"
import useMobileDetector from "../../../hooks/useMobileDetector"
import Show from "../../../elements/shared/Show"
import classNames from "classnames"
import useValidateConnectionEvents from "../../../hooks/useValidateConnectionEvents"

const MobileHeader = ({ pendingRequests, unReadMessages }) => {
	const { isComponentVisible: searchEnabled, modal } = useHeaderContext()

	return (
		<>
			<header
				className={classNames("flex flex-row gap-3 px-5 pt-7 pb-4", {
					"absolute top-0 left-0 z-40 w-full bg-white":
						searchEnabled && modal === "search",
				})}
				style={{ boxShadow: "0px 2px 6px 0px #24459A33" }}
			>
				<SearchInput />

				<div className='flex flex-row'>
					<CompanyButton />

					<AccountButton />
				</div>
			</header>
			<nav
				className='fixed flex w-full z-20 flex-row justify-center p-5 gap-10 bottom-0 bg-white'
				style={{ boxShadow: "0px 2px 6px 0px #24459A33" }}
			>
				<NavLink
					end
					to='/j4y'
					className={({ isActive }) =>
						classNames("group p-2", {
							active: isActive,
						})
					}
				>
					<HomeIcon className='h-5 fill-[#2D2A33] group-[.active]:fill-[#24459A]' />
				</NavLink>

				<NavLink
					to='/j4y/my-network'
					className={({ isActive }) =>
						classNames("group p-2", {
							active: isActive,
						})
					}
				>
					<GroupsIcon
						className='h-5 fill-[#2D2A33] group-[.active]:fill-[#24459A]'
						number={pendingRequests?.length > 0 && pendingRequests.length}
					/>
				</NavLink>

				<NavLink
					to='/j4y/chats'
					className={({ isActive }) =>
						classNames("group p-2", {
							active: isActive,
						})
					}
				>
					<MessagesIcon
						className='h-5 fill-[#2D2A33] group-[.active]:fill-[#24459A]'
						number={unReadMessages || null}
					/>
				</NavLink>

				<NavLink
					to='/j4y/jobs'
					className={({ isActive }) =>
						classNames("group p-2", {
							active: isActive,
						})
					}
				>
					<JobsIcon className='h-5 fill-[#2D2A33] group-[.active]:fill-[#24459A]' />
				</NavLink>

				<NavLink
					to='/j4y/notifications'
					className={({ isActive }) =>
						classNames("group p-2", {
							active: isActive,
						})
					}
				>
					<BellIcon className='h-5 fill-[#2D2A33] group-[.active]:fill-[#24459A]' />
				</NavLink>
			</nav>
		</>
	)
}

const InHeader = () => {
	const { unReadMessages, pendingRequests } = useQueries({
		queries: headerQuery().map(value => ({
			...value,
		})),
		combine: results => {
			return {
				unReadMessages: results[0].data ?? 0,
				pendingRequests: results[1].data ?? 0,
			}
		},
	})

	const { isMobile } = useMobileDetector()

	useValidateConnectionEvents()

	return (
		<HeaderProvider>
			<HeaderModal />
			<Show>
				<Show.When isTrue={!isMobile}>
					<header
						className='sticky top-0 left-0 z-40 w-full'
						style={{ boxShadow: "0px 2px 6px 0px #24459A33" }}
					>
						<div className='bg-white flex flex-row justify-center py-2.5'>
							<Link to='/j4y'>
								<Logo className='fill-[#2D2A33] h-10' />
							</Link>

							<SearchInput />

							<div className='flex flex-row justify-end w-[440px] gap-4'>
								<NavLink
									end
									to='/j4y'
									className={({ isActive }) =>
										classNames("group p-2", {
											active: isActive,
										})
									}
								>
									<HomeIcon className='h-5 fill-[#2D2A33] group-[.active]:fill-[#24459A]' />
								</NavLink>

								<NavLink
									to='/j4y/my-network'
									className={({ isActive }) =>
										classNames("group p-2", {
											active: isActive,
										})
									}
								>
									<GroupsIcon
										className='h-5 fill-[#2D2A33] group-[.active]:fill-[#24459A]'
										number={
											pendingRequests?.length > 0 && pendingRequests.length
										}
									/>
								</NavLink>

								<NavLink
									to='/j4y/jobs'
									className={({ isActive }) =>
										classNames("group p-2", {
											active: isActive,
										})
									}
								>
									<JobsIcon className='h-5 fill-[#2D2A33] group-[.active]:fill-[#24459A]' />
								</NavLink>

								<NavLink
									to='/j4y/chats'
									className={({ isActive }) =>
										classNames("group p-2", {
											active: isActive,
										})
									}
								>
									<MessagesIcon
										className='h-5 fill-[#2D2A33] group-[.active]:fill-[#24459A]'
										number={unReadMessages || null}
									/>
								</NavLink>

								<NavLink
									to='/j4y/notifications'
									className={({ isActive }) =>
										classNames("group p-2", {
											active: isActive,
										})
									}
								>
									<BellIcon className='h-5 fill-[#2D2A33] group-[.active]:fill-[#24459A]' />
								</NavLink>
							</div>

							<div className='flex flex-row ml-10'>
								<CompanyButton />

								<AccountButton />
							</div>
						</div>
					</header>
				</Show.When>

				<Show.Else>
					<MobileHeader
						pendingRequests={pendingRequests}
						unReadMessages={unReadMessages}
					/>
				</Show.Else>
			</Show>
		</HeaderProvider>
	)
}
export default InHeader
