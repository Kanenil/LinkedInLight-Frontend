import UserProfileSection from "../components/profile/sections/UserProfileSection";
import ProfileStatus from "../components/profile/sections/ProfileStatus";
import AnalyticsSection from "../components/profile/sections/AnalyticsSection";
import AboutMeSection from "../components/profile/sections/AboutMeSection";
import ActivitySection from "../components/profile/sections/ActivitySection";
import LanguagesSection from "../components/profile/sections/LanguagesSection";
import EducationSection from "../components/profile/sections/EducationSection";
import ExperienceSection from "../components/profile/sections/ExperienceSection";
import SkillsSection from "../components/profile/sections/SkillsSection";
import CoursesSection from "../components/profile/sections/CoursesSection";
import CertificationsSection from "../components/profile/sections/CertificationsSection";
import VolunteerExperienceSection from "../components/profile/sections/VolunteerExperienceSection";
import React from "react";
import ProjectsSection from "../components/profile/sections/ProjectsSection";

export const sections = [
    {
        children: <UserProfileSection />,
    },
    {
        children: <ProfileStatus />,
    },
    // {
    //     children: <AnalyticsSection />,
    // },
    {
        children: <AboutMeSection />,
    },
    {
        children: <ActivitySection />,
    },
    {
        children: <LanguagesSection />,
    },
    {
        children: <EducationSection />,
    },
    {
        children: <ExperienceSection />,
    },
    {
        children: <SkillsSection />,
    },
    {
        children: <CoursesSection />,
    },
    {
        children: <CertificationsSection />,
    },
    {
        children: <ProjectsSection />,
    },
    {
        children: <VolunteerExperienceSection />,
    },
]