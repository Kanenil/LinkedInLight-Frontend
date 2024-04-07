import RecommendedProfileService from "../../../services/recommendedProfileService";
import SectionHeaderBlock from "../shared/SectionHeaderBlock";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import ProjectItem from "../items/ProjectItem";
import {useQuery} from "@tanstack/react-query";

const ProjectsSection = ({user, isOwner}) => {
    const {data, isLoading} = useQuery({
        queryFn: ({queryKey}) => RecommendedProfileService.getProjectsByProfileUrl(queryKey[1]),
        queryKey: ['project', user.profileUrl],
        select: ({data}) => data,
        enabled: !!user.profileUrl
    })

    if(isLoading)
        return;

    return (
        <ConditionalWrapper condition={data.length > 0}>
            <div id="projects" className="rounded-lg bg-white py-8 px-10">
                <SectionHeaderBlock
                    title="Projects"
                    buttonTitle="Add project"
                    onPencilClickTo="details/projects"
                    link="edit/project"
                    isOwner={isOwner}
                />

                {data.map((project, index) =>
                    <ProjectItem key={`sectionProjects-${index}`} {...project} />
                )}
            </div>
        </ConditionalWrapper>
    )
}
export default ProjectsSection;