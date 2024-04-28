import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

import ProfileService from "../services/profileService"

const useUrlUser = () => {
	const { profileURL } = useParams()

	const { data: profile, isLoading } = useQuery({
		queryFn: ({ queryKey }) => ProfileService.getProfileUrl(queryKey[1]),
		queryKey: ["profileUrl", profileURL],
		select: ({ data }) => data,
	})

	return { profile, isLoading }
}
export default useUrlUser
