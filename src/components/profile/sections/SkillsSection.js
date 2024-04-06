import React, {useEffect, useState} from "react";
import ProfileService from "../../../services/profileService";
import PencilButton from "../../../elements/buttons/PencilButton";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import SkillItem from "../items/SkillItem";
import ShowAllLink from "../../../elements/links/ShowAllLink";
import {useTranslation} from "react-i18next";

const SkillsSection = ({user, isOwner}) => {
    const {t} = useTranslation();
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        ProfileService
            .getSkills()
            .then(({data}) => setSkills(data))
    }, [user])

    return (
        <ConditionalWrapper condition={skills.length > 0}>
            <section id="skills"
                     className={`rounded-lg bg-white overflow-hidden pt-8 ${skills.length > 4 && isOwner?'':'pb-8'}`}>
                <div className="mx-10">
                    <div className="flex flex-row items-center gap-[20px]">
                        <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">{t('profile.skills')}</h1>

                        <ConditionalWrapper condition={isOwner}>
                            <PencilButton to='details/skills'/>
                        </ConditionalWrapper>
                    </div>

                    <div className="flex flex-col mt-2.5 gap-[25px] py-[5px]">
                        {
                            isOwner && skills.slice(0, 4).map((skill, index) =>
                                <SkillItem {...skill} key={`skills-${skill.skill.name}-${index}`}/>
                            )
                        }
                        {
                            !isOwner && skills.map((skill, index) =>
                                <SkillItem {...skill} key={`skills-${skill.skill.name}-${index}`}/>
                            )
                        }
                    </div>
                </div>

                <ConditionalWrapper condition={skills.length > 4 && isOwner}>
                    <ShowAllLink to="details/skills" title={`${t('profile.showAll')} ${t('profile.skills').toLowerCase()}`} />
                </ConditionalWrapper>
            </section>
        </ConditionalWrapper>
    )
}
export default SkillsSection;