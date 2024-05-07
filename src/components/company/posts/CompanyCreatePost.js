import { APP_ENV } from "../../../env"
import defaultImage from "../../../assets/default-company-image.jpg"
import React from "react"
import { useTranslation } from "react-i18next"

const CompanyCreatePost = ({
	company,
	searchParams: [searchParams, setSearchParams],
}) => {
	const { t } = useTranslation()

	const onFocus = e => {
		e.preventDefault()
		if (!searchParams.get("createPost")) {
			setSearchParams(prev => ({
				...prev,
				createPost: true,
			}))
		}
	}

	return (
		<section className='flex flex-row gap-5 p-6 rounded-lg overflow-hidden bg-white'>
			<div className='flex items-center my-auto max-h-[30px] max-w-[30px] bg-white'>
				<img
					className='object-contain'
					src={
						company.logoImg
							? `${APP_ENV.UPLOADS_URL}/${company.logoImg}`
							: defaultImage
					}
					alt='company-logo'
				/>
			</div>

			<input
				onFocus={onFocus}
				className='w-full border-[1px] border-[#7D88A4] rounded-full font-roboto text-[#7D7D7D] font-light px-5 py-2.5'
				placeholder={t("company.posts.create")}
			/>
		</section>
	)
}
export default CompanyCreatePost
