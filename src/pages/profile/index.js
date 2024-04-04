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

const Profile = () => {
    const { isLoading, data } = useQuery({
        queryFn: () => ProfileService.getProfile(),
        queryKey: ['profile'],
        select: ({data}) => data,
    })
    const { edit, details, id } = usePageStatus();
    const queryClient = useQueryClient();

    return (
        <React.Fragment>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <ConditionalWrapper condition={!isLoading}>
                <ConditionalWrapper condition={edit}>
                    <ImageCropProvider>
                        <EditModalPage editModal={edit} id={id} onSaveCallback={() => queryClient.invalidateQueries('profile')}/>
                    </ImageCropProvider>
                </ConditionalWrapper>

                <ConditionalWrapper condition={details}>
                    <DetailsPage detail={details} user={data} />
                </ConditionalWrapper>

                <ConditionalWrapper condition={!details}>
                    <StandardProfilePage user={data} />
                </ConditionalWrapper>
            </ConditionalWrapper>
        </React.Fragment>
    )
}
export default Profile;