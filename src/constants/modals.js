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
import EditContactInformation from "../components/shared/modals/profile/EditContactInformation";
import RequestRecommendation from "../components/shared/modals/profile/RequestRecommendation";
import OpenToWork from "../components/shared/modals/profile/OpenToWork";
import GiveRecommendation from "../components/shared/modals/profile/GiveRecommendation";

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
        route: ["volunteer-experience"],
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
    {
        route: ["contact-information"],
        children: <EditContactInformation/>
    },
    {
        route: ["request-recommendation"],
        children: <RequestRecommendation/>
    },
    {
        route: ["give-recommendation"],
        children: <GiveRecommendation/>
    },
    {
        route: ["job-opportunity"],
        children: <OpenToWork/>
    },
]