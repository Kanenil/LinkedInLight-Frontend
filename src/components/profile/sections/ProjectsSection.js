import RecommendedProfileService from "../../../services/recommendedProfileService"
import SectionHeaderBlock from "../shared/SectionHeaderBlock"
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper"
import ProjectItem from "../items/ProjectItem"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

const ProjectsSection = ({ user, isOwner }) => {
	const { t } = useTranslation()

	const { data, isLoading } = useQuery({
		queryFn: ({ queryKey }) =>
			RecommendedProfileService.getProjectsByProfileUrl(queryKey[1]),
		queryKey: ["project", user.profileUrl],
		select: ({ data }) => data,
		enabled: !!user.profileUrl,
	})

	if (isLoading) return

	return (
		<ConditionalWrapper condition={data.length > 0}>
			<div id='projects' className='rounded-lg bg-white py-8 px-6 md:px-10'>
				<SectionHeaderBlock
					title={t("projectsSection.title")}
					buttonTitle={t("projectsSection.add")}
					onPencilClickTo='details/projects'
					link='edit/project'
					isOwner={isOwner}
				/>

				{data.map((project, index) => (
					<ProjectItem key={`sectionProjects-${index}`} {...project} />
				))}
			</div>
		</ConditionalWrapper>
	)
}
export default ProjectsSection
