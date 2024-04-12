import React from "react";
import InformationIcon from "../../../elements/icons/InformationIcon";
import PuzzlesIcon from "../../../elements/icons/PuzzlesIcon";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import ProfileService from "../../../services/profileService";
import PencilButton from "../../../elements/buttons/PencilButton";
import {useTranslation} from "react-i18next";
import {useQuery} from "@tanstack/react-query";

const AboutMeSection = ({user, isOwner}) => {
    const {t} = useTranslation();
    const {data, isLoading} = useQuery({
        queryFn: ({queryKey}) => ProfileService.getMainSkillsByProfileUrl(queryKey[1]),
        queryKey: ['mainSkills', user.profileUrl],
        select: ({data}) => data.map(skill => skill.skill.name)
    })

    if(isLoading)
        return;

    const dot = <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
        <path
            d="M0 1.51205C0 1.23092 0.0883534 0.993976 0.26506 0.801205C0.449799 0.600402 0.698795 0.5 1.01205 0.5C1.33333 0.5 1.58635 0.596386 1.77108 0.789157C1.95582 0.981928 2.04819 1.22289 2.04819 1.51205C2.04819 1.78514 1.95582 2.01807 1.77108 2.21084C1.58635 2.40361 1.33333 2.5 1.01205 2.5C0.698795 2.5 0.449799 2.40361 0.26506 2.21084C0.0883534 2.01807 0 1.78514 0 1.51205Z"
            fill="#2D2A33"/>
    </svg>

    return (
        <ConditionalWrapper condition={user?.about || data?.length > 0}>
            <div
                className="rounded-lg bg-white overflow-hidden pt-8 pb-8">
                <div className="mx-10">
                    <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">{t('profile.aboutMe')}</h1>

                    {/*<div className="flex flex-row items-center gap-2.5 mt-2">*/}
                    {/*    <EyeIcon className="h-4"/>*/}

                    {/*    <h3 className="text-sm font-roboto font-light text-[#7D7D7D]">*/}
                    {/*        {t('profile.visibleForMe')}*/}
                    {/*    </h3>*/}
                    {/*</div>*/}
                </div>

                <div className="mx-10 mt-2.5 flex flex-row gap-[30px] py-[5px]">
                    <ConditionalWrapper condition={isOwner || user.about}>
                        <div className="w-1/2 py-[5px]">
                            <div className="flex flex-col gap-2.5">
                                <div className="flex flex-row gap-2.5 items-center">
                                    <InformationIcon className="h-5 fill-[#24459A]"/>

                                    <h1 className="font-jost font-medium text-[#2D2A33] text-2xl">{t('profile.generalInformation')}</h1>

                                    <ConditionalWrapper condition={isOwner}>
                                        <PencilButton to='edit/general-information' className="ml-auto"/>
                                    </ConditionalWrapper>
                                </div>

                                <h3 className="text-[#2D2A33] font-jost font-light text-sm">
                                    {user?.about ? user?.about : t('profile.defaultText')}
                                </h3>
                            </div>
                        </div>
                    </ConditionalWrapper>

                    <ConditionalWrapper condition={data?.length > 0}>
                        <div className="w-1/2 py-[5px]">
                            <div className="flex flex-col gap-2.5">
                                <div className="flex flex-row gap-2.5 items-center">
                                    <PuzzlesIcon className="h-5 fill-[#24459A]"/>

                                    <h1 className="font-jost font-medium text-[#2D2A33] text-2xl">{t('profile.generalSkills')}</h1>

                                    <ConditionalWrapper condition={isOwner}>
                                        <PencilButton to='edit/general-information' className="ml-auto"/>
                                    </ConditionalWrapper>
                                </div>


                                <h3 className="flex flex-row flex-wrap content-start items-center gap-1 text-[#2D2A33] font-jost font-light text-sm">
                                    {
                                        data.map((skill, index) =>
                                            <React.Fragment key={`${skill}-${index}`}>
                                                <span>{skill}</span>
                                                {index + 1 !== data.length ? dot : ''}
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