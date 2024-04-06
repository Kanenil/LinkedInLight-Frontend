import EditGeneralInformation from "../components/shared/modals/profile/EditGeneralInformation";
import AddLanguage from "../components/shared/modals/profile/AddLanguage";
import AddImage from "../components/shared/modals/profile/AddImage";
import AddEducation from "../components/shared/modals/profile/AddEducation";
import AddExperience from "../components/shared/modals/profile/AddExperience";
import AddCertification from "../components/shared/modals/profile/AddCertification";
import AddCourse from "../components/shared/modals/profile/AddCourse";
import AddProject from "../components/shared/modals/profile/AddProject";
import AddVolunteerExperience from "../components/shared/modals/profile/AddVolunteerExperience";
import AddSkill from "../components/shared/modals/profile/AddSkill";
import React from "react";
import EditIntro from "../components/shared/modals/profile/EditIntro";

export const modals = [
    {
        route: ["general-information"],
        children: <EditGeneralInformation/>,
    },
    {
        route: ["language"],
        children: <AddLanguage/>
    },
    {
        route: ["background", "image"],
        children: <AddImage/>
    },
    {
        route: ["education"],
        children: <AddEducation/>
    },
    {
        route: ["experience"],
        children: <AddExperience/>
    },
    {
        route: ["certification"],
        children: <AddCertification/>
    },
    {
        route: ["course"],
        children: <AddCourse/>
    },
    {
        route: ["project"],
        children: <AddProject/>
    },
    {
        route: ["volunteerExperience"],
        children: <AddVolunteerExperience/>
    },
    {
        route: ["skill"],
        children: <AddSkill/>
    },
    {
        route: ["intro"],
        children: <EditIntro/>
    },
]