import XMarkIcon from "../../../../elements/icons/XMarkIcon"
import React, { useEffect, useMemo } from "react"
import PlusIcon from "../../../../elements/icons/PlusIcon"
import ConditionalWrapper from "../../../../elements/shared/ConditionalWrapper"
import TextDown from "../../../../elements/shared/TextDown"
import ProfileService from "../../../../services/profileService"
import EditModalForm from "../../forms/EditModalForm"
import { useAlertContext } from "../../../../providers/AlertProvider"

import { useFormik } from "formik"
import * as yup from "yup"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../Loader"
import { Trans, useTranslation } from "react-i18next"

const GeneralInfoSchema = yup.object({
	about: yup.string(),
	skills: yup.array(),
	isAdd: yup.bool(),
})

const initValues = {
	about: "",
	skills: [],
	isAdd: false,
}

const EditGeneralInformation = ({ onClose, onSave, onChange }) => {
	const { success } = useAlertContext()
	const { t } = useTranslation()

	const { data: userSkills, isLoading: userSkillsLoading } = useQuery({
		queryFn: () => ProfileService.getSkills(),
		queryKey: ["userSkills"],
		select: ({ data }) => data,
	})

	const { data: about, isLoading: aboutLoading } = useQuery({
		queryFn: () => ProfileService.getAbout(),
		queryKey: ["about"],
		select: ({ data }) => data,
	})

	useEffect(() => {
		if (!userSkillsLoading && !aboutLoading) {
			setValues(prev => ({
				...prev,
				skills: userSkills
					.filter(val => val.isMainSkill)
					.map(val => ({ label: val.skill.name, value: val.id })),
				about,
			}))
		}
	}, [userSkillsLoading, aboutLoading])

	const onSubmitFormik = async () => {
		if (about !== values.about) await ProfileService.editAbout(values.about)

		for (const userSkill of userSkills) {
			const skill = values.skills.find(skill => skill.value === userSkill.id)

			if (skill && !userSkill.isMainSkill) {
				await ProfileService.updateSkill(
					{
						...userSkill,
						isMainSkill: true,
					},
					skill.value,
				)
			} else if (!skill && userSkill.isMainSkill) {
				await ProfileService.updateSkill(
					{
						...userSkill,
						isMainSkill: false,
					},
					userSkill.id,
				)
			}
		}

		success(
			t("alert.onSuccess", { name: t("profile.modal.general.title1") }),
			5,
		)
		onSave()
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: GeneralInfoSchema,
		onSubmit: onSubmitFormik,
	})

	const { values, errors, handleSubmit, handleChange, setValues } = formik

	const filtered = useMemo(
		() =>
			userSkills
				?.filter(val => !values.skills.map(v => v.value).includes(val.id))
				.map(val => ({ label: val.skill.name, value: val.id })),
		[values.skills, userSkills],
	)

	const onRemoveItem = skill => {
		const newArray = values.skills.filter(val => val !== skill)

		setValues(prev => ({
			...prev,
			skills: newArray,
		}))

		onChange()
	}

	return (
		<EditModalForm
			onSubmit={handleSubmit}
			onClose={onClose}
			onRemove={null}
			isEdit={false}
			header={t("profile.modal.edit", {
				title: t("profile.modal.general.title"),
			})}
		>
			{userSkillsLoading || aboutLoading ? (
				<div className='h-[300px]'>
					<Loader />
				</div>
			) : (
				<>
					<div className='flex flex-col pt-[5px] pl-[20px] pr-[15px] pb-[10px] gap-2.5'>
						<h1 className='font-jost font-light text-sm text-[#2D2A33]'>
							<Trans
								i18nKey='profile.modal.general.description'
								components={{ strong: <strong className='font-medium' /> }}
							/>
						</h1>

						<textarea
							className='mt-[15px] resize-none border-[0.5px] border-[#556DA9] rounded-lg text-sm font-jost font-light'
							placeholder={t("placeholders.description")}
							name='about'
							onChange={handleChange}
							value={values.about}
							rows={7}
						/>
					</div>

					<div className='flex flex-col pt-[5px] pl-[20px] pr-[15px] pb-[10px] gap-[5px]'>
						<h1 className='font-jost text-[#2D2A33] font-semibold'>
							{t("profile.modal.general.skills")}
						</h1>

						<h3 className='font-jost text-sm text-[#2D2A33] font-light'>
							<Trans
								i18nKey='profile.modal.general.skillsDescription'
								components={{ strong: <strong className='font-medium' /> }}
							/>
						</h3>

						{values.skills.map((val, index) => (
							<div
								key={`skill-${index}`}
								className='flex flex-row items-center gap-2.5 pl-2.5 pr-[5px]'
							>
								<button type='button' onClick={() => onRemoveItem(val)}>
									<XMarkIcon className='fill-[#7D7D7D] h-3' />
								</button>

								<h1 className='font-jost text-lg font-medium text-[#556DA9]'>
									{val.label}
								</h1>
							</div>
						))}

						<ConditionalWrapper condition={values.isAdd}>
							<TextDown
								className='mt-[5px]'
								options={filtered}
								placeHolder={t("profile.modal.general.skillPlaceholder")}
								error={errors.skills}
								searchAble={true}
								hasTools={false}
								onEnterSelect={false}
								clearOnSelect={true}
								onChange={e => {
									setValues(prev => ({
										...prev,
										isAdd: false,
										skills: [...prev.skills, e],
									}))
									onChange()
								}}
							/>
						</ConditionalWrapper>
						<ConditionalWrapper
							condition={!values.isAdd && values.skills.length !== 5}
						>
							<button
								onClick={() => setValues(prev => ({ ...prev, isAdd: true }))}
								className='group flex flex-row gap-2.5 items-center mt-2.5 w-fit px-2.5 py-[5px] text-sm rounded-full border-[1px] border-[#7D88A4] text-[#7D88A4] hover:border-[#24459A] hover:text-[#556DA9] active:text-[#24459A] active:border-[#24459A] active:border-[1.5px]  active:bg-[#E4EAFF]'
							>
								<PlusIcon className='fill-[#7D88A4] group-hover:fill-[#556DA9] group-active:fill-[#24459A] h-3' />
								{t("profile.modal.add", {
									title: t("profile.modal.skill.single"),
								})}
							</button>
						</ConditionalWrapper>
						<ConditionalWrapper condition={values.skills.length === 5}>
							<h3 className='text-[#2D2A33] font-light font-sm'>
								{t("profile.modal.general.maximum")}
							</h3>
						</ConditionalWrapper>
					</div>
				</>
			)}
		</EditModalForm>
	)
}
export default EditGeneralInformation
