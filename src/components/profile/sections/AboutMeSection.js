import EyeIcon from "../../../elements/icons/EyeIcon";
import React, {useEffect, useState} from "react";
import InformationIcon from "../../../elements/icons/InformationIcon";
import PuzzlesIcon from "../../../elements/icons/PuzzlesIcon";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import {profileService} from "../../../services/profileService";
import PencilButton from "../../../elements/buttons/PencilButton";

const AboutMeSection = ({user}) => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        profileService
            .getMainSkills()
            .then(({data}) => setSkills(data.map(skill => skill.skill.name)))
    }, [user])

    const dot = <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
        <path
            d="M0 1.51205C0 1.23092 0.0883534 0.993976 0.26506 0.801205C0.449799 0.600402 0.698795 0.5 1.01205 0.5C1.33333 0.5 1.58635 0.596386 1.77108 0.789157C1.95582 0.981928 2.04819 1.22289 2.04819 1.51205C2.04819 1.78514 1.95582 2.01807 1.77108 2.21084C1.58635 2.40361 1.33333 2.5 1.01205 2.5C0.698795 2.5 0.449799 2.40361 0.26506 2.21084C0.0883534 2.01807 0 1.78514 0 1.51205Z"
            fill="#2D2A33"/>
    </svg>

    return (
        <ConditionalWrapper condition={user?.about || skills.length > 0}>
            <div
                className="rounded-lg bg-white overflow-hidden pt-8 pb-8">
                <div className="mx-10">
                    <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">About me</h1>

                    <div className="flex flex-row items-center gap-2.5 mt-2">
                        <EyeIcon className="h-4"/>

                        <h3 className="text-sm font-roboto font-light text-[#7D7D7D]">
                            This section is only visible to you
                        </h3>
                    </div>
                </div>

                <div className="mx-10 mt-2.5 flex flex-row gap-[30px] py-[5px]">
                    <div className="w-1/2 py-[5px]">
                        <div className="flex flex-col gap-2.5">
                            <div className="flex flex-row gap-2.5 items-center">
                                <InformationIcon className="h-5 fill-[#24459A]"/>

                                <h1 className="font-jost font-medium text-[#2D2A33] text-2xl">General information</h1>

                                <PencilButton to='edit/general-information' className="ml-auto"/>
                            </div>

                            <h3 className="text-[#2D2A33] font-jost font-light text-sm">
                                {user?.about ? user?.about : "Here your self-description will be displayed..."}
                            </h3>
                        </div>
                    </div>

                    <ConditionalWrapper condition={skills.length > 0}>
                        <div className="w-1/2 py-[5px]">
                            <div className="flex flex-col gap-2.5">
                                <div className="flex flex-row gap-2.5 items-center">
                                    <PuzzlesIcon className="h-5 fill-[#24459A]"/>

                                    <h1 className="font-jost font-medium text-[#2D2A33] text-2xl">General skills</h1>

                                    <PencilButton to='edit/general-information' className="ml-auto"/>
                                </div>


                                <h3 className="flex flex-row flex-wrap content-start items-center gap-1 text-[#2D2A33] font-jost font-light text-sm">
                                    {
                                        skills.map((skill, index) =>
                                            <React.Fragment key={`${skill}-${index}`}>
                                                <span>{skill}</span>
                                                {index + 1 !== skills.length ? dot : ''}
                                            </React.Fragment>
                                        )
                                    }
                                </h3>
                            </div>
                        </div>
                    </ConditionalWrapper>
                </div>
            </div>
        </ConditionalWrapper>
    )
}
export default AboutMeSection;