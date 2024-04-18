import React from "react";
import AdditionalProfileService from "../../../services/additionalProfileService";
import PencilButton from "../../../elements/buttons/PencilButton";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import VolunteerExperienceItem from "../items/VolunteerExperienceItem";
import {useQuery} from "@tanstack/react-query";

const VolunteerExperienceSection = ({user}) => {
    const {data, isLoading} = useQuery({
        queryFn: ({queryKey}) => AdditionalProfileService.getVolunteerExperiencesByProfileUrl(queryKey[1]),
        queryKey: ['volunteer-experience', user.profileUrl],
        select: ({data}) => data,
        enabled: !!user.profileUrl
    })

    if(isLoading)
        return;

    return (
        <ConditionalWrapper condition={data.length > 0}>
            <section id="volunteerExperiences"
                     className="rounded-lg bg-white overflow-hidden pt-8 pb-8">
                <div className="px-6 md:px-10">
                    <div className="flex flex-row items-center gap-[20px]">
                        <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">Volunteer Experiences</h1>

                        <PencilButton to='details/volunteer-experiences'/>
                    </div>

                    <div className="flex flex-col mt-2.5 gap-[25px] py-[5px]">
                        {
                            data.map((volunteerExperience, index) =>
                                <VolunteerExperienceItem {...volunteerExperience} key={`volunteerExperiences-${volunteerExperience.name}-${index}`}/>
                            )
                        }
                    </div>
                </div>
            </section>
        </ConditionalWrapper>
    )
}
export default VolunteerExperienceSection;