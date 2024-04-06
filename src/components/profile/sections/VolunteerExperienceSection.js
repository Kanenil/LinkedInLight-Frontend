import React, {useEffect, useState} from "react";
import AdditionalProfileService from "../../../services/additionalProfileService";
import PencilButton from "../../../elements/buttons/PencilButton";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import VolunteerExperienceItem from "../items/VolunteerExperienceItem";

const VolunteerExperienceSection = ({user}) => {
    const [volunteerExperiences, setVolunteerExperiences] = useState([]);

    useEffect(() => {
        AdditionalProfileService
            .getVolunteerExperiences()
            .then(({data}) => setVolunteerExperiences(data))
    }, [user])

    return (
        <ConditionalWrapper condition={volunteerExperiences.length > 0}>
            <section id="volunteerExperiences"
                     className="rounded-lg bg-white overflow-hidden pt-8 pb-8">
                <div className="mx-10">
                    <div className="flex flex-row items-center gap-[20px]">
                        <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">Volunteer Experiences</h1>

                        <PencilButton to='details/volunteerExperiences'/>
                    </div>

                    <div className="flex flex-col mt-2.5 gap-[25px] py-[5px]">
                        {
                            volunteerExperiences.map((volunteerExperience, index) =>
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