import SectionHeaderBlock from "../shared/SectionHeaderBlock";
import {useEffect, useState} from "react";
import ProfileService from "../../../services/profileService";
import EducationItem from "../items/EducationItem";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";

const EducationSection = ({user, isOwner}) => {
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        ProfileService
            .getEducations()
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