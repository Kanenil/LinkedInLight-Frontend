import React, {useEffect, useState} from "react";
import {profileService} from "../../../services/profileService";
import ArrowRightIcon from "../../../elements/icons/ArrowRightIcon";
import {Link} from "react-router-dom";
import PlusIcon from "../../../elements/icons/PlusIcon";
import ExperienceItem from "../experience/ExperienceItem";

const ExperienceDetails = ({ user, onClickBack }) => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        profileService
            .getExperiences()
            .then(({data}) => {
                if(data.length === 0)
                    onClickBack();

                setExperiences(data)
            })
    }, [user])

    return (
        <div className="flex flex-col gap-2.5 rounded-lg bg-white py-8 px-10">
            <div className="flex flex-row items-center font-jost pb-2.5 border-b-[0.5px] border-[#24459A80]">
                <button onClick={onClickBack}>
                    <ArrowRightIcon className="w-4 mr-3.5 fill-[#24459A]" style={{transform: `rotate(180deg)`}}/>
                </button>

                <h1 className="font-medium text-2xl text-[#2D2A33]">Experience</h1>

                <Link to='edit/experience' className="ml-auto">
                    <PlusIcon className="w-4 fill-[#556DA9]"/>
                </Link>
            </div>
            {
                experiences.map((experience, index) =>
                    <ExperienceItem
                        key={`experiences-${experience.companyName}-${index}`}
                        editPath={`edit/experience/${experience.id}`}
                        isShowMore={false}
                        {...experience}
                    />
                )
            }
        </div>
    )
}
export default ExperienceDetails;