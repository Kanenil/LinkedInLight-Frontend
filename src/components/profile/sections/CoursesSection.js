import React, {useEffect, useState} from "react";
import RecommendedProfileService from "../../../services/recommendedProfileService";
import PencilButton from "../../../elements/buttons/PencilButton";
import ConditionalWrapper from "../../../elements/shared/ConditionalWrapper";
import CourseItem from "../items/CourseItem";

const CoursesSection = ({user}) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        RecommendedProfileService
            .getCourses()
            .then(({data}) => setCourses(data))
    }, [user])

    return (
        <ConditionalWrapper condition={courses.length > 0}>
            <section id="courses"
                     className="rounded-lg bg-white overflow-hidden pt-8 pb-8">
                <div className="mx-10">
                    <div className="flex flex-row items-center gap-[20px]">
                        <h1 className="font-jost font-medium text-2xl text-[#2D2A33]">Courses</h1>

                        <PencilButton to='details/courses'/>
                    </div>

                    <div className="flex flex-col mt-2.5 gap-[25px] py-[5px]">
                        {
                            courses.map((course, index) =>
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