import {additionalProfileService} from "../services/additionalProfileService";
import LanguageItem from "../components/profile/items/LanguageItem";
import ProfileService from "../services/profileService";
import EducationItem from "../components/profile/items/EducationItem";
import ExperienceItem from "../components/profile/items/ExperienceItem";
import RecommendedProfileService from "../services/recommendedProfileService";
import CertificationItem from "../components/profile/items/CertificationItem";
import CourseItem from "../components/profile/items/CourseItem";
import ProjectItem from "../components/profile/items/ProjectItem";
import VolunteerExperienceItem from "../components/profile/items/VolunteerExperienceItem";
import SkillItem from "../components/profile/items/SkillItem";
import React from "react";

export const details = [
    {
        route: ["languages"],
        props: {
            promise: async () => await additionalProfileService.getLanguages(),
            detail: 'Languages',
            edit: 'language',
            itemComponent: <LanguageItem/>
        }
    },
    {
        route: ["educations"],
        props: {
            promise: async () => await ProfileService.getEducations(),
            detail: 'Educations',
            edit: 'education',
            itemComponent: <EducationItem/>
        }
    },
    {
        route: ["experiences"],
        props: {
            promise: async () => await ProfileService.getExperiences(),
            detail: 'Experiences',
            edit: 'experience',
            itemComponent: <ExperienceItem/>
        }
    },
    {
        route: ["certifications"],
        props: {
            promise: async () => await RecommendedProfileService.getCertifications(),
            detail: 'Certifications',
            edit: 'certification',
            itemComponent: <CertificationItem/>
        }
    },
    {
        route: ["courses"],
        props: {
            promise: async () => await RecommendedProfileService.getCourses(),
            detail: 'Courses',
            edit: 'course',
            itemComponent: <CourseItem/>
        }
    },
    {
        route: ["projects"],
        props: {
            promise: async () => await RecommendedProfileService.getProjects(),
            detail: 'Projects',
            edit: 'project',
            itemComponent: <ProjectItem/>
        }
    },
    {
        route: ["volunteerExperience"],
        props: {
            promise: async () => await additionalProfileService.getVolunteerExperiences(),
            detail: 'VolunteerExperience',
            edit: 'volunteerExperience',
            title: "VolunteerExperience",
            itemComponent: <VolunteerExperienceItem/>
        }
    },
    {
        route: ["skills"],
        props: {
            promise: async () => await ProfileService.getSkills(),
            detail: 'Skills',
            edit: 'skill',
            itemComponent: <SkillItem/>
        }
    }
]