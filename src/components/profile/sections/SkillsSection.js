import React, {useEffect, useState} from "react";
import {profileService} from "../../../services/profileService";
import PencilButton from "../../../elements/buttons/PencilButton";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import SkillItem from "../items/SkillItem";
import ShowAllLink from "../../../elements/links/ShowAllLink";

const SkillsSection = ({user}) => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        profileService
            .getSkills()
            .then(({data}) => setSkills(data))
    }, [user])

    return (
        <ConditionalWrapper condition={skills.length > 0}>
            <section id="skills"
                     className={`rounded-lg bg-white overflow-hidden pt-8 ${skills.length > 4?'':'pb-8'}`}>
                <div className="mx-10">
                    <div className="flex flex-row items-center gap-[20px]">
                        <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">Skills</h1>

                        <PencilButton to='details/skills'/>
                    </div>

                    <div className="flex flex-col mt-2.5 gap-[25px] py-[5px]">
                        {
                            skills.slice(0, 4).map((skill, index) =>
                                <SkillItem {...skill} key={`courses-${skill.skill.name}-${index}`}/>
                            )
                        }
                    </div>
                </div>

                <ConditionalWrapper condition={skills.length > 4}>
                    <ShowAllLink to="details/skills" title={`Show all ${skills.length} skills`} />
                </ConditionalWrapper>
            </section>
        </ConditionalWrapper>
    )
}
export default SkillsSection;