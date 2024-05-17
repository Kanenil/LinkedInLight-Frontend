import { useTranslation } from "react-i18next"
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react"

import Button from "../../elements/buttons/Button"
import { CheckIcon } from "@heroicons/react/24/solid"
import { imageUrl } from "../../utils/converters"
import { useQuery } from "@tanstack/react-query"
import searchService from "../../services/searchService"
import Loader from "../shared/Loader"

const SingleItem = ({
	selectedItems,
	options,
	onChange,
	children,
	Component,
	multiple = false,
	limitMaxWidth = true,
}) => (
	<Listbox
		as='div'
		className='space-y-1'
		value={selectedItems}
		onChange={value => onChange(value)}
	>
		<ListboxButton>{children}</ListboxButton>
		<Transition
			leave='transition ease-in duration-100'
			leaveFrom='opacity-100'
			leaveTo='opacity-0'
		>
			<ListboxOptions
				anchor='bottom'
				className={`${
					limitMaxWidth && "w-[var(--button-width)]"
				} mt-1 rounded-xl border border-[#B4BFDD] bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none`}
			>
				{options.map(option => (
					<ListboxOption
						key={option.id || option.value}
						value={option.id || option.value}
						className='group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100'
					>
						{multiple ? (
							selectedItems.includes(option.value || option.id) && (
								<CheckIcon className='size-4 fill-[#24459A]' />
							)
						) : (
							<CheckIcon className='invisible size-4 fill-[#24459A] group-data-[selected]:visible' />
						)}

						{Component ? (
							<Component {...option} />
						) : (
							<div className='text-sm/6 text-black'>{option.label}</div>
						)}
					</ListboxOption>
				))}
			</ListboxOptions>
		</Transition>
	</Listbox>
)

const CompanyItem = ({ companyName, logoImg }) => (
	<div className='flex flex-row gap-4'>
		<img className='h-5' src={imageUrl(logoImg)} alt={companyName} />

		<div className='text-sm/6 text-black'>{companyName}</div>
	</div>
)

const JobSearchFilter = ({ filter, setFilter }) => {
	const { t } = useTranslation()

	const periods = t("periods", { returnObjects: true })
	const experienceLevels = t("jobs.publish.experienceLevels", {
		returnObjects: true,
	})

	const { data, isLoading } = useQuery({
		queryKey: ["companies"],
		queryFn: () => searchService.companiesSearch(),
		select: ({ data }) => data,
		staleTime: 1000,
	})

	if (isLoading) return <Loader />

	return (
		<div className='flex flex-row mx-auto gap-4 w-full md:container lg:w-[1170px] p-5'>
			<Button variant='primary' rounded='full'>
				{t("jobs.jobs")}
			</Button>

			<SingleItem
				selectedItems={filter.period}
				options={periods}
				onChange={value => setFilter({ ...filter, period: value })}
			>
				<Button variant='tertiary' rounded='full'>
					{t("jobs.publishDate")}
				</Button>
			</SingleItem>

			<SingleItem
				selectedItems={filter.experienceLevels}
				options={experienceLevels}
				multiple
				onChange={value => {
					if (filter.experienceLevels.includes(value)) {
						setFilter({
							...filter,
							experienceLevels: filter.experienceLevels.filter(
								item => item !== value,
							),
						})
					} else {
						setFilter({
							...filter,
							experienceLevels: [...filter.experienceLevels, value],
						})
					}
				}}
			>
				<Button variant='tertiary' rounded='full'>
					{t("jobs.experienceLevel")}
				</Button>
			</SingleItem>

			<SingleItem
				selectedItems={filter.companies}
				options={data}
				multiple
				Component={CompanyItem}
				limitMaxWidth={false}
				onChange={value => {
					if (filter.companies.includes(value.companyName)) {
						setFilter({
							...filter,
							companies: filter.companies.filter(
								item => item !== value.companyName,
							),
						})
					} else {
						setFilter({
							...filter,
							companies: [...filter.companies, value.companyName],
						})
					}
				}}
			>
				<Button variant='tertiary' rounded='full'>
					{t("jobs.company")}
				</Button>
			</SingleItem>
		</div>
	)
}
export default JobSearchFilter
