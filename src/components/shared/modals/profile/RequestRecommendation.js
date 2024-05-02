import XMarkIcon from "../../../../elements/icons/XMarkIcon"
import React, { useEffect, useState } from "react"
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup"
import useForm from "../../../../hooks/useForm"
import { APP_ENV } from "../../../../env"
import defaultImage from "../../../../assets/default-image.jpg"
import Button from "../../../../elements/buttons/Button"
import Show from "../../../../elements/shared/Show"
import ModalInputFormGroup from "../../forms/ModalInputFormGroup"
import ModalTextareaFormGroup from "../../forms/ModalTextareaFormGroup"
import RecommendedProfileService from "../../../../services/recommendedProfileService"
import { useQuery } from "@tanstack/react-query"
import ProfileService from "../../../../services/profileService"
import { useAlertContext } from "../../../../providers/AlertProvider"
import { Trans, useTranslation } from "react-i18next"

const UserItem = ({ image, firstName, lastName, lastPosition, onClick }) => {
	return (
		<button
			className={`flex flex-row gap-3 ${
				onClick ? "hover:bg-gray-50 cursor-pointer" : ""
			}`}
			onClick={onClick}
		>
			<div className='overflow-hidden h-10 w-10 my-auto bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
				<img
					className='object-contain'
					src={image ? APP_ENV.UPLOADS_URL + "/" + image : defaultImage}
					alt='image'
				/>
			</div>

			<div className='flex flex-col gap-1'>
				<h1 className='font-jost font-medium'>
					{firstName} {lastName}
				</h1>

				<h3 className='font-jost text-sm'>{lastPosition}</h3>
			</div>
		</button>
	)
}

const RequestRecommendation = ({ onClose, onChange, onSave }) => {
	const initialValues = {
		options: {
			connection: [],
		},
		values: {
			connection: {},
			relationship: "",
			positionAtTheTime: "",
			requestMessage: "",
		},
		errors: {
			connection: true,
			relationship: true,
			positionAtTheTime: true,
		},
	}
	const {
		options,
		values,
		errors,
		isSubmitted,
		handleChangeSelect,
		onChangeInput,
		setValues,
		setOptions,
	} = useForm(initialValues, onChange)
	const [step, setStep] = useState(1)
	const { data: profile } = useQuery({
		queryFn: () => ProfileService.getProfile(),
		queryKey: ["profile"],
		select: ({ data }) => data,
	})
	const { success } = useAlertContext()
	const { t } = useTranslation()

	useEffect(() => {
		RecommendedProfileService.requestRecommendation().then(({ data }) => {
			setOptions({
				connection: data.connections,
			})
		})
	}, [])

	const stringifyUser = data => {
		const { firstName, lastName } = data

		return firstName ? `${firstName} ${lastName}` : ""
	}

	const onNext = async () => {
		if (!values.connection.hasOwnProperty("id")) return

		if (step === 1) return setStep(2)

		const model = {
			positionAtTheTime: values.positionAtTheTime,
			relationship: values.positionAtTheTime,
			senderId: values.connection.id,
			requestMessage: values.requestMessage,
			requesterId: profile.id,
		}

		await RecommendedProfileService.sendRequestRecommendation(model)

		success(
			t("profile.modal.request.requestSend", {
				name: stringifyUser(values.connection),
			}),
			5,
		)
		onSave()
	}

	return (
		<div
			className='flex flex-col gap-2 px-7 bg-white py-5 w-screen h-[100dvh] md:w-[750px] md:h-full'
			style={{ boxShadow: "0px 0px 8px 2px #00000066" }}
		>
			<div className='flex flex-row py-2.5 border-b-[1px] border-b-[#24459A]'>
				<h1 className='font-jost font-semibold text-[#2D2A33] text-xl'>
					{t("profile.modal.request.title")}
				</h1>

				<button onClick={onClose} className='ml-auto'>
					<XMarkIcon className='fill-[#7D7D7D] h-4' />
				</button>
			</div>

			<h3 className='mt-4 font-jost text-[#2D2A33] font-light text-sm'>
				{t("validation.requiredField")}
			</h3>

			<Show>
				<Show.When isTrue={step === 1}>
					<div className='mt-4 flex flex-col'>
						<h1 className='font-jost font-light text-[#2D2A33] text-lg'>
							{t("profile.modal.request.canWrite")}
						</h1>

						<ModalSelectFormGroup
							className='mt-4 pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
							title={t("profile.modal.request.search")}
							value={stringifyUser(values.connection)}
							options={options.connection}
							containerWidth={665}
							placeHolder=''
							error={isSubmitted && errors["connection"]}
							hasTools={false}
							clearOnSelect={false}
							onChange={e => {
								handleChangeSelect(e, "connection")
								setValues(prev => ({
									...prev,
									positionAtTheTime: e.lastPosition || "",
									requestMessage: t("profile.modal.request.defaultMessage", {
										name: e.firstName,
									}),
								}))
							}}
							item={<UserItem />}
							searchFunc={search => el => {
								return (
									el.user.firstName.toLowerCase().indexOf(search) >= 0 ||
									el.user.lastName.toLowerCase().indexOf(search) >= 0
								)
							}}
							errorChildren={
								<h3 className='mt-2 text-[#9E0F20] text-xs'>
									{t("validation.required")}
								</h3>
							}
						/>
					</div>
				</Show.When>

				<Show.Else>
					<div className='mt-4 flex flex-col'>
						<UserItem {...values.connection} />

						<h1 className='font-jost text-lg font-light mt-4'>
							<Trans
								i18nKey='profile.modal.request.whereKnow'
								components={{ strong: <strong className='font-semibold' /> }}
								values={{ value: stringifyUser(values.connection) }}
							/>
						</h1>

						<ModalInputFormGroup
							title={t("profile.modal.request.relationship")}
							name='relationship'
							type='text'
							value={values.relationship}
							onChange={onChangeInput}
							className='mt-4 pb-[10px] pr-[20px] gap-[5px]'
						/>

						<ModalInputFormGroup
							title={t("profile.modal.request.position")}
							name='positionAtTheTime'
							type='text'
							value={values.positionAtTheTime}
							onChange={onChangeInput}
							className='pb-[10px] pr-[20px] gap-[5px]'
						/>

						<ModalTextareaFormGroup
							title={t("profile.modal.request.message")}
							name='requestMessage'
							className='pb-[10px] pr-[20px] gap-[5px]'
							onChange={onChangeInput}
							value={values.requestMessage}
							rows={3}
						/>
					</div>
				</Show.Else>
			</Show>

			<div className='flex flex-row mt-auto mb-10 md:mb-0 md:mt-4'>
				<h1 className='font-jost text-lg'>
					{t("profile.modal.request.step", { value: step })}
				</h1>

				<Button
					variant='primary'
					rounded='full'
					onClick={onNext}
					className='ml-auto'
				>
					{t(`profile.modal.request.${step === 1 ? "continue" : "send"}`)}
				</Button>
			</div>
		</div>
	)
}
export default RequestRecommendation
