import React, { useEffect } from "react"
import ProfileService from "../../../../services/profileService"
import EditModalForm from "../../forms/EditModalForm"
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup"
import { useAlertContext } from "../../../../providers/AlertProvider"

import { useFormik } from "formik"
import * as yup from "yup"
import { useQuery } from "@tanstack/react-query"
import Loader from "../../Loader"
import { useTranslation } from "react-i18next"

const SkillSchema = yup.object({
	skill: yup.object(),
	isMain: yup.bool(),
})

const initValues = {
	skill: null,
	isMain: false,
}

const AddSkill = ({ onClose, onSave, onChange, id }) => {
	const { success } = useAlertContext()
	const { t } = useTranslation()

	const { data: skills, isLoading: allSkillsLoading } = useQuery({
		queryFn: () => ProfileService.getAllSkills(),
		queryKey: ["allSkills"],
		select: ({ data }) =>
			data.map(val => ({
				label: val.name,
				value: val.id,
			})),
	})

	const { data: userSkills, isLoading: userSkillsLoading } = useQuery({
		queryFn: () => ProfileService.getSkills(),
		queryKey: ["userSkills"],
		select: ({ data }) => data,
	})

	const filteredSkills = () =>
		skills.filter(opt => !userSkills.map(v => v.skill.name).includes(opt.label))

	useEffect(() => {
		if (id && !userSkillsLoading) {
			const skill = userSkills.find(val => val.id === +id)

			if (!skill) return onClose()

			setValues({
				skill: { label: skill.skill.name, value: skill.skillId },
				isMain: skill.isMainSkill,
			})
		}
	}, [id, userSkillsLoading])

	const onSubmitFormik = async values => {
		const {
			skill: { label, value },
			isMain,
		} = values

		try {
			if (!id) {
				await ProfileService.addSkill(
					{
						name: label,
						id: typeof value === "number" ? value : 0,
					},
					isMain,
				)
			} else {
				const skill = userSkills.find(val => val.id === +id)

				console.log(skill, {
					...skill,
					isMainSkill: isMain,
					skill: {
						name: label,
						id: typeof value === "number" ? value : 0,
					},
				})

				await ProfileService.updateSkill(
					{
						...skill,
						isMainSkill: isMain,
						skill: {
							name: label,
							id: typeof value === "number" ? value : 0,
						},
						skillId: typeof value === "number" ? value : 0,
					},
					id,
				)
			}

			success(
				t("alert.onSuccess", { name: t("profile.modal.skill.title1") }),
				5,
			)
			onSave()
		} catch (err) {
			if (err.response.data === "You can only have 5 main skills.") {
				setErrors({ isMain: "You can only have 5 main skills." })
				setValues(prev => ({ ...prev, isMain: false }))
			}
		}
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: SkillSchema,
		onSubmit: onSubmitFormik,
	})

	const { values, errors, handleSubmit, setValues, setErrors } = formik

	const onRemoveClick = async () => {
		await ProfileService.removeSkill(id)

		success(t("alert.onRemoved", { name: t("profile.modal.skill.title1") }), 5)
		onSave()
	}

	const stringifySkill = value => (value ? value.label : "")

	return (
		<EditModalForm
			onSubmit={handleSubmit}
			onClose={onClose}
			onRemove={onRemoveClick}
			isEdit={id ?? false}
			header={t(`profile.modal.${id ? "edit" : "add"}`, {
				title: t("profile.modal.skill.title"),
			})}
			removeTitle={t("profile.modal.skill.title")}
		>
			{userSkillsLoading || allSkillsLoading ? (
				<div className='h-[300px]'>
					<Loader />
				</div>
			) : (
				<>
					<h3 className='font-jost text-[#2D2A33] text-sm'>
						{t("validation.requiredField")}
					</h3>

					<ModalSelectFormGroup
						className='pt-[5px] pb-[10px] pr-[20px] gap-[5px]'
						title={t("profile.modal.skill.title1") + " *"}
						value={stringifySkill(values.skill)}
						options={filteredSkills()}
						containerWidth={400}
						placeHolder=''
						error={errors.skill}
						hasTools={false}
						clearOnSelect={false}
						onEnterSelect={true}
						onChange={async e => {
							if (typeof e !== "object") return

							await setValues(prev => ({
								...prev,
								skill:
									!userSkills.find(v => v.skill.name === e.label) &&
									e?.label?.length > 0
										? e
										: null,
							}))
							onChange()
						}}
						errorChildren={
							<h3 className='mt-2 text-[#9E0F20] text-xs'>{errors.skill}</h3>
						}
					/>
				</>
			)}
		</EditModalForm>
	)
}
export default AddSkill
