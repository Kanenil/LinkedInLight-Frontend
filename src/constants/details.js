import AdditionalProfileService from "../services/additionalProfileService"
import LanguageItem from "../components/profile/items/LanguageItem"
import ProfileService from "../services/profileService"
import EducationItem from "../components/profile/items/EducationItem"
import ExperienceItem from "../components/profile/items/ExperienceItem"
import RecommendedProfileService from "../services/recommendedProfileService"
import CertificationItem from "../components/profile/items/CertificationItem"
import CourseItem from "../components/profile/items/CourseItem"
import ProjectItem from "../components/profile/items/ProjectItem"
import VolunteerExperienceItem from "../components/profile/items/VolunteerExperienceItem"
import SkillItem from "../components/profile/items/SkillItem"
import React from "react"
import RecommendationsList from "../components/profile/items/RecommendationsList"
import useRecommendation from "../hooks/useRecommendation"
import i18next from "i18next"

export const details = [
	{
		route: ["languages"],
		props: {
			promise: async () => await AdditionalProfileService.getLanguages(),
			title: () => i18next.t("languagesSection.title"),
			detail: "Languages",
			edit: "language",
			itemComponent: <LanguageItem />,
		},
	},
	{
		route: ["educations"],
		props: {
			promise: async () => await ProfileService.getEducations(),
			title: () => i18next.t("educationsSection.title"),
			detail: "Educations",
			edit: "education",
			itemComponent: <EducationItem />,
		},
	},
	{
		route: ["experiences"],
		props: {
			promise: async () => await ProfileService.getExperiences(),
			title: () => i18next.t("experiencesSection.title"),
			detail: "Experiences",
			edit: "experience",
			itemComponent: <ExperienceItem />,
		},
	},
	{
		route: ["certifications"],
		props: {
			promise: async () => await RecommendedProfileService.getCertifications(),
			title: () => i18next.t("certificationsSection.title"),
			detail: "Certifications",
			edit: "certification",
			itemComponent: <CertificationItem />,
		},
	},
	{
		route: ["courses"],
		props: {
			promise: async () => await RecommendedProfileService.getCourses(),
			title: () => i18next.t("profile.courses"),
			detail: "Courses",
			edit: "course",
			itemComponent: <CourseItem />,
		},
	},
	{
		route: ["projects"],
		props: {
			promise: async () => await RecommendedProfileService.getProjects(),
			title: () => i18next.t("projectsSection.title"),
			detail: "Projects",
			edit: "project",
			itemComponent: <ProjectItem />,
		},
	},
	{
		route: ["volunteer-experiences"],
		props: {
			promise: async () =>
				await AdditionalProfileService.getVolunteerExperiences(),
			detail: "volunteer-experiences",
			edit: "volunteer-experience",
			title: () => i18next.t("volunteerExperiencesSection.title"),
			itemComponent: <VolunteerExperienceItem />,
		},
	},
	{
		route: ["skills"],
		props: {
			promise: async () => await ProfileService.getSkills(),
			title: () => i18next.t("skillsSection.title"),
			detail: "Skills",
			edit: "skill",
			itemComponent: <SkillItem />,
		},
	},
	{
		route: ["recommendations"],
		props: {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			hook: (user, isOwner) => useRecommendation(user, isOwner),
			title: () => i18next.t("recommendationsSection.title"),
			detail: "recommendations",
			edit: "request-recommendation",
			itemComponent: <RecommendationsList />,
		},
	},
]
