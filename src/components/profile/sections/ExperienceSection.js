import SectionHeaderBlock from "../shared/SectionHeaderBlock";
import {useEffect, useState} from "react";
import {profileService} from "../../../services/profileService";
import ExperienceItem from "../experience/ExperienceItem";

const ExperienceSection = ({ user }) => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        profileService
            .getExperiences()
            .then(({data}) => setExperiences(data))
    }, [user])

    return (
        <div id="experiences" className={`rounded-lg bg-white py-8 px-10 ${experiences.length === 0? 'hidden': ''}`}>
            <SectionHeaderBlock
                title="Experience"
                buttonTitle="Add experience"
                onPencilClickTo="details/experiences"
                link="edit/experience"
            />

            {experiences.map((experience, index) =>
                <ExperienceItem key={`sectionExperiences-${index}`} {...experience} />
            )}
        </div>
    )
}
export default ExperienceSection;