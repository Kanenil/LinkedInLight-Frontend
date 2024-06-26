import React from "react";
import RecommendedProfileService from "../../../services/recommendedProfileService";
import PencilButton from "../../../elements/buttons/PencilButton";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import CourseItem from "../items/CourseItem";
import {useTranslation} from "react-i18next";
import {useQuery} from "@tanstack/react-query";

const CoursesSection = ({user, isOwner}) => {
    const {data, isLoading} = useQuery({
        queryFn: ({queryKey}) => RecommendedProfileService.getCoursesByProfileUrl(queryKey[1]),
        queryKey: ['course', user.profileUrl],
        select: ({data}) => data,
        enabled: !!user.profileUrl
    })

    const {t} = useTranslation();

    if (isLoading)
        return;

    return (
        <ConditionalWrapper condition={data.length > 0}>
            <section id="courses"
                     className="rounded-lg bg-white overflow-hidden pt-8 pb-8">
                <div className="px-6 md:px-10">
                    <div className="flex flex-row items-center gap-[20px]">
                        <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">{t('profile.courses')}</h1>

                        <ConditionalWrapper condition={isOwner}>
                            <PencilButton to='details/courses'/>
                        </ConditionalWrapper>
                    </div>

                    <div className="flex flex-col mt-2.5 gap-[25px] py-[5px]">
                        {
                            data.map((course, index) =>
                                <CourseItem {...course} key={`courses-${course.name}-${index}`}/>
                            )
                        }
                    </div>
                </div>
            </section>
        </ConditionalWrapper>
    )
}
export default CoursesSection;