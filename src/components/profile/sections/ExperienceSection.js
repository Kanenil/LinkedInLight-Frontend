import SectionHeaderBlock from "../shared/SectionHeaderBlock";
import ProfileService from "../../../services/profileService";
import ExperienceItem from "../items/ExperienceItem";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import {useQuery} from "@tanstack/react-query";

const ExperienceSection = ({user, isOwner}) => {
    const {data, isLoading} = useQuery({
        queryFn: ({queryKey}) => ProfileService.getExperiencesByProfileUrl(queryKey[1]),
        queryKey: ['experience', user.profileUrl],
        select: ({data}) => data,
        enabled: !!user.profileUrl
    })

    if (isLoading)
        return;

    return (
        <ConditionalWrapper condition={data.length > 0}>
            <div id="experiences" className="rounded-lg bg-white py-8 px-10">
                <SectionHeaderBlock
                    title="Experience"
                    buttonTitle="Add experience"
                    onPencilClickTo="details/experiences"
                    link="edit/experience"
                    isOwner={isOwner}
                />

                {data.map((experience, index) =>
                    <ExperienceItem key={`sectionExperiences-${index}`} {...experience} />
                )}
            </div>
        </ConditionalWrapper>
    )
}
export default ExperienceSection;