import { useMemo } from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { TrashIcon } from "@heroicons/react/24/outline"

import EditModalForm from "../../forms/EditModalForm"
import ModalSelectFormGroup from "../../forms/ModalSelectFormGroup"
import ModalRadioInput from "../../forms/ModalRadioInput"
import { APP_ENV } from "../../../../env"
import defaultImage from "../../../../assets/default-image.jpg"
import CompanyService from "../../../../services/companyService"
import { useAlertContext } from "../../../../providers/AlertProvider"
import { useTranslation } from "react-i18next"

const ManageAdminSchema = yup.object({
	user: yup.object().required(),
	role: yup.string(),
})

const UserItem = ({ image, firstName, lastName, lastPosition, onClick }) => {
	return (
		<button
			className={`flex flex-row gap-3 ${
				onClick ? "hover:bg-gray-50 cursor-pointer" : "cursor-default"
			}`}
			type='button'
			onClick={onClick}
		>
			<div className='overflow-hidden h-10 w-10 my-auto bg-white rounded-full border-[3px] border-[#FFFFFF] bg-[#EAEAEA]'>
				<img
					className='object-contain'
					src={image ? APP_ENV.UPLOADS_URL + "/" + image : defaultImage}
					alt=''
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

const ManageAdmin = ({
	onClose,
	onChange,
	onSave,
	followers,
	admins,
	company,
	selectedUser,
}) => {
	const { success } = useAlertContext()
	const { t } = useTranslation()

	const filtered = useMemo(
		() =>
			followers.filter(
				item => !admins.map(val => val.userId).includes(item.id),
			),
		[admins, followers],
	)

	const initValues = { user: selectedUser, role: selectedUser?.role || "" }

	const onSubmitFormik = async values => {
		if (selectedUser) {
			await CompanyService.editAdmin(company.id, values.user.id, values.role)
		} else {
			await CompanyService.addAdmin(company.id, values.user.id, values.role)
		}

		success(
			t("alert.onSuccess", {
				name: t("company.settingsPage.page1.administrator"),
			}),
			5,
		)

		onSave()
	}

	const formik = useFormik({
		initialValues: initValues,
		validationSchema: ManageAdminSchema,
		onSubmit: onSubmitFormik,
	})

	const { values, errors, handleSubmit, handleChange, setValues } = formik

	const stringifyUser = data =>
		data?.firstName ? `${data.firstName} ${data.lastName}` : ""

	const adminStatuses = t("company.settingsPage.page1.adminStatuses", {
		returnObjects: true,
	})

	return (
		<EditModalForm
			header={t(
				`company.settingsPage.page1.${selectedUser ? "editAdmin" : "addAdmin"}`,
			)}
			withBorder={false}
			onClose={onClose}
			onSubmit={handleSubmit}
			width='w-[550px]'
		>
			{!values.user ? (
				<ModalSelectFormGroup
					className='mb-4'
					value={stringifyUser(values.user)}
					options={filtered}
					containerWidth={300}
					containerHeightMax={200}
					placeHolder={t("company.newCompany.selectFromList")}
					hasTools={false}
					onEnterSelect={false}
					isAbsolute={true}
					clearOnSelect={false}
					onChange={e => {
						setValues(prev => ({
							...prev,
							user: e,
							role: "chief",
						}))
						onChange()
					}}
					item={<UserItem />}
					searchFunc={search => el => {
						return (
							el.firstName.toLowerCase().indexOf(search) >= 0 ||
							el.lastName.toLowerCase().indexOf(search) >= 0
						)
					}}
					error={errors.user}
					errorChildren={
						<p className='mt-2 text-[#9E0F20] text-xs'>
							{t("validation.required")}
						</p>
					}
				/>
			) : (
				<div className='flex flex-row px-5'>
					<UserItem {...values.user} />

					{!selectedUser && (
						<button
							className='ml-auto'
							onClick={() => {
								setValues(prev => ({
									...prev,
									user: undefined,
									role: "",
								}))
							}}
						>
							<TrashIcon className='w-5 h-5 text-[#24459A]' />
						</button>
					)}
				</div>
			)}

			<div className='w-full border-y-[#24459a50] border-y-[1px] py-2.5'>
				<h1 className='font-jost text-[#7D88A4]'>
					{t("company.settingsPage.page1.selectAdminStatus")}
				</h1>
			</div>

			{adminStatuses.map(({ value, label, description }) => (
				<ModalRadioInput
					key={value}
					onChange={handleChange}
					name='role'
					condition={value}
					value={values.role}
					disabled={!values.user}
				>
					<div className='flex flex-col font-jost'>
						<h1 className='text-[#2D2A33] font-medium'>{label}</h1>
						<h3 className='text-[#ACACAC] font-light'>{description}</h3>
					</div>
				</ModalRadioInput>
			))}
		</EditModalForm>
	)
}
export default ManageAdmin
