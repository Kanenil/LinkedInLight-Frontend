import SectionHeaderBlock from "../shared/SectionHeaderBlock";
import {useEffect, useState} from "react";
import {profileService} from "../../../services/profileService";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import EducationItem from "../education/EducationItem";

const EducationSection = ({ user }) => {
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        profileService
            .getEducation()
            .then(({data}) => setEducations(data))
    }, [user])

    return (
        <ConditionalWrapper condition={educations.length > 0}>
            <div id="educations" className="rounded-lg bg-white py-8 px-10">
                <SectionHeaderBlock
                    title="Education"
                    buttonTitle="Add education"
                    onPencilClickTo="details/educations"
                    link="edit/education"
                />

                {educations.map((education, index) =>
                    <EducationItem key={`sectionEducation-${index}`} {...education} />
                )}
            </div>
        </ConditionalWrapper>
    )
}
export default EducationSection;