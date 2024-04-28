import { useQuery } from "@tanstack/react-query"

import ProfileService from "../services/profileService"

const useAuthUser = () => {
	const { data: profile, isLoading } = useQuery({
		queryFn: () => ProfileService.getProfile(),
		queryKey: ["profile"],
		select: ({ data }) => data,
	})

	return { profile, isLoading }
}
export default useAuthUser
