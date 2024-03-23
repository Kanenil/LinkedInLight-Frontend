import SectionHeaderBlock from "../shared/SectionHeaderBlock";
import {useEffect, useState} from "react";
import {profileService} from "../../../services/profileService";
import EducationItem from "../education/EducationItem";

const EducationSection = ({user}) => {
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        profileService
            .getEducations()
            .then(({data}) => setEducations(data))
    }, [user])

    return (
        <div id="educations" className={`rounded-lg bg-white py-8 px-10 ${educations.length === 0 ? 'hidden' : ''}`}>
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
    )
}
export default EducationSection;