import React from "react";
import ProfileService from "../../services/profileService";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {Helmet} from "react-helmet-async";
import StandardProfilePage from "../../components/profile/StandardProfilePage";
import EditModalPage from "../../components/profile/EditModalPage";
import ImageCropProvider from "../../providers/ImageCropProvider";
import DetailsPage from "../../components/profile/DetailsPage";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {usePageStatus} from "../../hooks/usePageStatus";
import {useParams} from "react-router";
import Show from "../../elements/shared/Show";

const Profile = () => {
    const {edit, details, id, profileURL} = usePageStatus();
    const profile = useQuery({
        queryFn: () => ProfileService.getProfile(),
        queryKey: ['profile'],
        select: ({data}) => data,
    })
    const profileId = useQuery({
        queryFn: ({queryKey}) => ProfileService.getProfileUrl(queryKey[1]),
        queryKey: ['profileUrl', profileURL],
        select: ({data}) => data
    })
    const queryClient = useQueryClient();

    if(profile.isLoading || profileId.isLoading)
        return;

    return (
        <React.Fragment>
            <Helmet>
                <title>Profile</title>
            </Helmet>

            <ConditionalWrapper condition={edit}>
                <ImageCropProvider>
                    <EditModalPage editModal={edit} id={id}
                                   onSaveCallback={() => queryClient.invalidateQueries('profile')}/>
                </ImageCropProvider>
            </ConditionalWrapper>

            <Show>
                <Show.When isTrue={details}>
                    <DetailsPage detail={details} user={profile.data}/>
                </Show.When>

                <Show.Else>
                    <StandardProfilePage user={profile.data} isOwner={profileId.data.profileUrl === profile.data.profileUrl}/>
                </Show.Else>
            </Show>
        </React.Fragment>
    )
}
export default Profile;