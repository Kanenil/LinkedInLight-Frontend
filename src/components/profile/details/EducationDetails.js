import React, {useEffect, useState} from "react";
import ArrowRightIcon from "../../../elements/icons/ArrowRightIcon";
import {Link} from "react-router-dom";
import PlusIcon from "../../../elements/icons/PlusIcon";
import {profileService} from "../../../services/profileService";
import EducationItem from "../education/EducationItem";

const EducationDetails = ({user, onClickBack}) => {
    const [educations, setEducations] = useState([]);

    useEffect(() => {
        profileService
            .getEducation()
            .then(({data}) => setEducations(data))
    }, [user])

    useEffect(() => {
        window.scrollTo (0,0);
    }, []);

    return (
        <div className="flex flex-col gap-2.5 rounded-lg bg-white py-8 px-10">
            <div className="flex flex-row items-center font-jost pb-2.5 border-b-[0.5px] border-[#24459A80]">
                <button onClick={onClickBack}>
                    <ArrowRightIcon className="w-4 mr-3.5 fill-[#24459A]" style={{transform: `rotate(180deg)`}}/>
                </button>

                <h1 className="font-medium text-2xl text-[#2D2A33]">Education</h1>

                <Link to='edit/education' className="ml-auto">
                    <PlusIcon className="w-4 fill-[#556DA9]"/>
                </Link>
            </div>
            {
                educations.map((education, index) =>
                    <EducationItem
                        key={`educations-${education.school}-${index}`}
                        editPath={`edit/education/${education.id}`}
                        isShowMore={false}
                        {...education}
                    />
                )
            }
        </div>
    )
}
export default EducationDetails;