import {useEffect, useState} from "react";
import {recommendedProfileService} from "../../../services/recommendedProfileService";
import SectionHeaderBlock from "../shared/SectionHeaderBlock";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import ProjectItem from "../items/ProjectItem";

const ProjectsSection = ({user}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        recommendedProfileService
            .getProjects()
            .then(({data}) => setProjects(data))
    }, [user])

    return (
        <ConditionalWrapper condition={projects.length > 0}>
            <div id="projects" className="rounded-lg bg-white py-8 px-10">
                <SectionHeaderBlock
                    title="Projects"
                    buttonTitle="Add project"
                    onPencilClickTo="details/projects"
                    link="edit/project"
                />

                {projects.map((project, index) =>
                    <ProjectItem key={`sectionProjects-${index}`} {...project} />
                )}
            </div>
        </ConditionalWrapper>
    )
}
export default ProjectsSection;