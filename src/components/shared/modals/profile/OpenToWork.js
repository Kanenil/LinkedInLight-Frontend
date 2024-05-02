import React, { useEffect } from "react"
import useForm from "../../../../hooks/useForm"
import TextDown from "../../../../elements/shared/TextDown"
import Show from "../../../../elements/shared/Show"
import ProfileService from "../../../../services/profileService"
import { authService } from "../../../../services/authService"
import ModalRadioInput from "../../forms/ModalRadioInput"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import { useAlertContext } from "../../../../providers/AlertProvider"
import EditModalForm from "../../forms/EditModalForm"
import { PlusIcon } from "@heroicons/react/24/outline"
import Button from "../../../../elements/buttons/Button"
import Loader from "../../Loader"
import { useTranslation } from "react-i18next"

const OpenToWork = ({ onClose, onChange, onSave }) => {
	const initialValues = {
		options: {
			positions: [],
			regions: [],
		},
		values: {
			isAddPosition: false,
			isAddRegion: false,
			regions: [],
			positions: [],
			allPositions: [],
			allRegions: [],
			fullTime: false,
			partTime: false,
			internship: false,
			contract: false,
			temporary: false,
			canStartImmediately: false,
			visibleForAll: false,
		},
		errors: {
			positions: true,
			regions: true,
			employmentTypes: true,
		},
	}
	const {
		options,
		values,
		errors,
		setValues,
		setOptions,
		isSubmitted,
		setErrors,
		onSubmit,
	} = useForm(initialValues, onChange)
	const { success } = useAlertContext()
	const queryClient = useQueryClient()
	const { t } = useTranslation()

	const employmentTypes = t("profile.modal.jobPreferences.employmentTypes", {
		returnObjects: true,
	})

	const startDate = t("profile.modal.jobPreferences.startDate", {
		returnObjects: true,
	})

	const visibility = t("profile.modal.jobPreferences.visibility", {
		returnObjects: true,
	})

	const onRadioChange = ({ target: { name, value } }) => {
		setValues(prev => ({
			...prev,
			[name]: value,
		}))
	}
	const { positions, countries, isLoading } = useQueries({
		queries: [
			{
				queryFn: () => ProfileService.getPositions(),
				queryKey: ["allPositions"],
				select: ({ data }) => data,
			},
			{
				queryFn: () => authService.countries(),
				queryKey: ["allCountries"],
				select: ({ data }) => data,
			},
		],
		combine: results => {
			return {
				positions: results[0].data ?? [],
				countries: results[1].data ?? [],
				isLoading: results.some(v => v.isLoading),
			}
		},
	})

	useEffect(() => {
		if (!isLoading)
			ProfileService.getOpenToWork()
				.then(({ data }) => {
					if (data) {
						const workRegions = data.openToWorkCountries.map(value => {
							const { name, id } = countries.find(v => v.id === value.countryId)

							return {
								label: name,
								value: id,
							}
						})
						const workPositions = data.openToWorkPositions.map(value => {
							const { name, id } = positions.find(
								v => v.id === value.positionId,
							)

							return {
								label: name,
								value: id,
							}
						})
						setValues(prev => ({
							...prev,
							...data,
							positions: workPositions,
							regions: workRegions,
							update: true,
						}))
						setErrors(prev => ({
							...prev,
							positions: workPositions.length === 0,
							regions: workRegions.length === 0,
							employmentTypes: false,
						}))
					}
				})
				.catch(() => {})
	}, [isLoading])

	useEffect(() => {
		let model = {}

		if (positions.length > 0) {
			const mapped = positions.map(val => ({
				label: val.name,
				value: val.id,
			}))

			setValues(prev => ({
				...prev,
				allPositions: mapped,
			}))
			model = {
				...model,
				positions: [...mapped],
			}
		}

		if (countries.length > 0) {
			const mapped = countries.map(val => ({
				label: val.name,
				value: val.id,
			}))

			setValues(prev => ({
				...prev,
				allRegions: mapped,
			}))
			model = {
				...model,
				regions: [...mapped],
			}
		}

		setOptions(prev => ({
			...prev,
			...model,
		}))
	}, [countries, positions])

	const handleSubmit = async () => {
		const {
			fullTime,
			partTime,
			internship,
			contract,
			temporary,
			canStartImmediately,
			visibleForAll,
			positions,
			regions,
		} = values

		if (!(fullTime || partTime || internship || contract || temporary))
			return setErrors(prev => ({ ...prev, employmentTypes: true }))

		const model = {
			id: values.id || 0,
			canStartImmediately: canStartImmediately === "true",
			fullTime,
			partTime,
			internship,
			contract,
			temporary,
			visibleForAll: visibleForAll === "true",
			applicationUserId: values.applicationUserId || "",
			openToWorkPositions: positions.map(position => ({
				openToWorkId: values.id || 0,
				positionId: position.value,
			})),
			openToWorkCountries: regions.map(region => ({
				openToWorkId: values.id || 0,
				countryId: region.value,
			})),
			openToWorkCities: [],
		}

		if (values.update) {
			await ProfileService.updateOpenToWork(model)
		} else {
			await ProfileService.openToWork(model)
		}

		queryClient.invalidateQueries(["openToWork"])

		success(
			t("alert.onSuccess", { name: t("profile.modal.jobPreferences.title") }),
			5,
		)
		onSave()
	}

	const onChangeTypes = name => {
		setErrors(prev => ({ ...prev, employmentTypes: false }))
		setValues(prev => ({ ...prev, [name]: !prev[name] }))
	}

	const onRemoveItem = (item, store, all) => {
		const newArray = values[store].filter(val => val !== item)

		setValues(prev => ({
			...prev,
			[store]: newArray,
		}))

		setOptions(prev => ({
			...prev,
			[store]: [
				...values[all].filter(
					opt => !newArray.map(val => val.label).includes(opt.label),
				),
			],
		}))

		onChange()
	}

	const onChangeSelect = (item, store, add) => {
		if (
			values[store]
				.map(val => val.label.toLowerCase())
				.indexOf(item.label.toLowerCase()) === -1
		) {
			const newArray = [...values[store], item]

			setErrors(prev => ({ ...prev, [store]: false }))

			setValues(prev => ({
				...prev,
				[store]: newArray,
				[add]: false,
			}))

			setOptions(prev => ({
				...prev,
				[store]: [
					...prev[store].filter(
						opt => !newArray.map(val => val.label).includes(opt.label),
					),
				],
			}))

			onChange()
		}
	}

	const onRemove = async () => {
		await ProfileService.deleteOpenToWork()
		queryClient.invalidateQueries(["openToWork"])

		success(
			t("alert.onRemoved", { name: t("profile.modal.jobPreferences.title") }),
			5,
		)
		onSave()
	}

	return (
		<EditModalForm
			onSubmit={e => onSubmit(e, handleSubmit)}
			onClose={onClose}
			onRemove={onRemove}
			isEdit={values.id}
			withBorder={false}
			header={t("profile.modal.jobPreferences.title")}
		>
			{isLoading ? (
				<div className='h-[400px]'>
					<Loader />
				</div>
			) : (
				<div className='flex flex-col gap-2.5'>
					<h3 className='mt-3 font-jost text-[#2D2A33] font-light text-sm'>
						{t("validation.requiredField")}
					</h3>

					<div className='flex flex-col gap-1 mt-2.5'>
						<h3 className='font-jost text-[#2D2A33]'>
							{t("profile.modal.jobPreferences.labels.positions")}
						</h3>

						<div className='flex flex-row flex-wrap gap-2.5'>
							{values.positions.map(position => (
								<Button
									key={`position-${position.value}`}
									variant='remove'
									rounded='full'
									onClick={() =>
										onRemoveItem(position, "positions", "allPositions")
									}
								>
									{position.label}
								</Button>
							))}
						</div>

						<Show>
							<Show.When isTrue={values.isAddPosition}>
								<TextDown
									className='mt-[5px]'
									options={options.positions}
									error={errors.positions}
									searchAble={true}
									hasTools={false}
									clearOnSelect={true}
									onEnterSelect={false}
									isAbsolute={true}
									onChange={e =>
										onChangeSelect(e, "positions", "isAddPosition")
									}
								/>
							</Show.When>

							<Show.Else>
								<Button
									className='px-3 w-fit'
									variant='tertiary'
									rounded='full'
									onClick={() =>
										setValues(prev => ({ ...prev, isAddPosition: true }))
									}
								>
									<PlusIcon className='h-4 stroke-2' />
									{t("profile.modal.jobPreferences.add.position")}
								</Button>
							</Show.Else>
						</Show>

						{errors.positions && isSubmitted && (
							<p className='mt-2 text-[#9E0F20] text-xs'>
								{t("validation.atLeast2", {
									name: t("profile.modal.jobPreferences.singular.position"),
								})}
							</p>
						)}
					</div>

					<div className='flex flex-col gap-1 mt-2.5'>
						<h3 className='font-jost text-[#2D2A33]'>
							{t("profile.modal.jobPreferences.labels.region")}
						</h3>

						<div className='flex flex-row gap-2.5'>
							{values.regions.map(region => (
								<Button
									key={`region-${region.value}`}
									variant='remove'
									rounded='full'
									onClick={() => onRemoveItem(region, "regions", "allRegions")}
								>
									{region.label}
								</Button>
							))}
						</div>

						<Show>
							<Show.When isTrue={values.isAddRegion}>
								<TextDown
									className='mt-[5px]'
									options={options.regions}
									error={errors.regions}
									searchAble={true}
									hasTools={false}
									clearOnSelect={true}
									onEnterSelect={false}
									isAbsolute={true}
									onChange={e => onChangeSelect(e, "regions", "isAddRegion")}
								/>
							</Show.When>

							<Show.Else>
								<Button
									className='px-3 w-fit'
									variant='tertiary'
									rounded='full'
									onClick={() =>
										setValues(prev => ({ ...prev, isAddRegion: true }))
									}
								>
									<PlusIcon className='h-4 stroke-2' />
									{t("profile.modal.jobPreferences.add.region")}
								</Button>
							</Show.Else>
						</Show>

						{errors.regions && isSubmitted && (
							<p className='mt-2 text-[#9E0F20] text-xs'>
								{t("validation.atLeast", {
									name: t("profile.modal.jobPreferences.singular.region"),
								})}
							</p>
						)}
					</div>

					<div className='flex flex-col gap-1 mt-2.5'>
						<h3 className='font-jost text-[#2D2A33]'>
							{t("profile.modal.jobPreferences.labels.startDate")}
						</h3>

						<div className='flex flex-row gap-12 mt-2'>
							{startDate.map(({ condition, title }) => (
								<ModalRadioInput
									onChange={onRadioChange}
									name='canStartImmediately'
									condition={condition}
									title={title}
									value={values.canStartImmediately}
								/>
							))}
						</div>
					</div>

					<div className='flex flex-col gap-1 mt-2.5'>
						<h3 className='font-jost text-[#2D2A33]'>
							{t("profile.modal.jobPreferences.labels.employmentTypes")}
						</h3>

						<div className='flex flex-row flex-wrap gap-3'>
							{employmentTypes.map(({ value, label }) => (
								<Button
									key={`employmentType-${value}`}
									onClick={() => onChangeTypes(value)}
									active={values[value]}
									variant='selectable'
									rounded='full'
								>
									{label}
								</Button>
							))}
						</div>
						{errors.employmentTypes && isSubmitted && (
							<p className='mt-2 text-[#9E0F20] text-xs'>
								{t("validation.atLeast", {
									name: t(
										"profile.modal.jobPreferences.singular.employmentType",
									),
								})}
							</p>
						)}
					</div>

					<div className='flex flex-col gap-1 mt-2.5'>
						<h3 className='font-jost text-[#2D2A33]'>
							{t("profile.modal.jobPreferences.labels.visibility")}
						</h3>

						<div className='flex flex-col gap-4 mt-2'>
							{visibility.map(({ condition, title }) => (
								<ModalRadioInput
									onChange={onRadioChange}
									name='visibleForAll'
									condition={condition}
									title={title}
									value={values.visibleForAll}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</EditModalForm>
	)
}
export default OpenToWork
