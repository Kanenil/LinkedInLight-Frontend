import SectionHeaderBlock from "../shared/SectionHeaderBlock"
import ProfileService from "../../../services/profileService"
import EducationItem from "../items/EducationItem"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

const EducationSection = ({ user, isOwner }) => {
	const { t } = useTranslation()

	const { data, isLoading } = useQuery({
		queryFn: ({ queryKey }) =>
			ProfileService.getEducationsByProfileUrl(queryKey[1]),
		queryKey: ["education", user.profileUrl],
		select: ({ data }) => data,
		enabled: !!user.profileUrl,
	})

	if (isLoading) return

	return (
		<ConditionalWrapper condition={data.length > 0}>
			<div id='educations' className='rounded-lg bg-white py-8 px-6 md:px-10'>
				<SectionHeaderBlock
					title={t("educationsSection.title")}
					buttonTitle={t("educationsSection.add")}
					onPencilClickTo='details/educations'
					link='edit/education'
					isOwner={isOwner}
				/>

				{data.map((education, index) => (
					<EducationItem key={`sectionEducation-${index}`} {...education} />
				))}
			</div>
		</ConditionalWrapper>
	)
}
export default EducationSection
