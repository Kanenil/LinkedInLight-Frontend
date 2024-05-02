import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import PencilButton from "../../../elements/buttons/PencilButton"
import React from "react"
import useAuthUser from "../../../hooks/useAuthUser"
import { APP_ENV } from "../../../env"
import { useTranslation } from "react-i18next"

const RightEditSection = () => {
	const { t } = useTranslation()

	const { profile, isLoading } = useAuthUser()

	const blocks = [
		{
			title: t("rightEditSection.languages"),
			border: "",
			to: "/j4y/settings/params/language",
		},
		{
			title: t("rightEditSection.public"),
			border: "pt-3 border-t-[0.5px] border-[#24459A80]",
			to: "public",
			optional: APP_ENV.FRONTEND_URL + "/j4y/" + profile.profileUrl,
		},
	]

	if (isLoading) return <></>

	const EditBlock = ({ title, to, optional, border }) => {
		return (
			<div className={`flex flex-col mx-5 mt-5 ${border}`}>
				<div className='flex flex-row'>
					<h3 className='font-jost text-[#2D2A33] text-xl'>{title}</h3>

					<PencilButton to={to} className='ml-auto mr-1.5' />
				</div>

				<ConditionalWrapper condition={optional}>
					<h3 className='font-jost text-[#7D7D7D] text-sm text-wrap'>
						{optional}
					</h3>
				</ConditionalWrapper>
			</div>
		)
	}

	return (
		<div className='flex flex-col bg-white rounded-lg pb-5'>
			{blocks.map((block, index) => (
				<EditBlock key={`rightEditSection-${index}`} {...block} />
			))}
		</div>
	)
}
export default RightEditSection
