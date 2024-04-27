import React from "react"
import ProfileService from "../../services/profileService"
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper"
import { Helmet } from "react-helmet-async"
import StandardProfilePage from "../../components/profile/StandardProfilePage"
import EditModalPage from "../../components/profile/EditModalPage"
import DetailsPage from "../../components/profile/DetailsPage"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { usePageStatus } from "../../hooks/usePageStatus"
import Show from "../../elements/shared/Show"
import { useNavigate } from "react-router"
import ProfileSkeleton from "./profile-skeleton"

const Profile = () => {
	const { edit, details, id, profileURL } = usePageStatus()
	const profile = useQuery({
		queryFn: () => ProfileService.getProfile(),
		queryKey: ["profile"],
		select: ({ data }) => data,
	})
	const profileId = useQuery({
		queryFn: ({ queryKey }) => ProfileService.getProfileUrl(queryKey[1]),
		queryKey: ["profileUrl", profileURL],
		select: ({ data }) => data,
	})
	const queryClient = useQueryClient()
	const navigator = useNavigate()

	if (profile.isLoading || profileId.isLoading) return <ProfileSkeleton />

	if (profileId.data.profileUrl !== profile.data.profileUrl && edit) {
		navigator(-1)
		return <></>
	}

	if (!profileId.data) {
		navigator("/j4y/not-found")
		return <></>
	}

	return (
		<React.Fragment>
			<Helmet>
				<title>
					{profileId.data.firstName} {profileId.data.lastName}
				</title>
			</Helmet>

			<ConditionalWrapper condition={edit}>
				<EditModalPage
					editModal={edit}
					id={id}
					user={profileId.data}
					isOwner={profileId.data.profileUrl === profile.data.profileUrl}
					onSaveCallback={() => queryClient.invalidateQueries("profile")}
				/>
			</ConditionalWrapper>

			<Show>
				<Show.When isTrue={!!details}>
					<DetailsPage
						detail={details}
						isOwner={profileId.data.profileUrl === profile.data.profileUrl}
						user={profile.data}
					/>
				</Show.When>

				<Show.Else>
					<StandardProfilePage
						user={profileId.data}
						isOwner={profileId.data.profileUrl === profile.data.profileUrl}
					/>
				</Show.Else>
			</Show>
		</React.Fragment>
	)
}
export default Profile
