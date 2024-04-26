import { companyPageQuery } from "../constants/combinedQueries"
import useQueriesWithRefetch from "./useQueriesWithRefetch"

const useCompany = companyId => {
	const { refetchAll: refetch, results } = useQueriesWithRefetch({
		queries: companyPageQuery(companyId),
	})

	return {
		company: results[0].data ?? {},
		followersCount: results[1].data ?? 0,
		isAdmin: !!([results[2].data, ...(results[3].data ?? [])] ?? []).find(
			val => val?.userId === results[4].data?.id,
		),
		isContentAdmin:
			(results[3].data || []).find(val => val?.userId === results[4].data?.id)
				?.role === "content",
		isOwner: results[2].data?.userId === results[4].data?.id,
		currentAdmin: results[4].data,
		admins: [results[2].data, ...(results[3].data ?? [])] ?? [],
		owner: results[2].data,
		followers: results[5].data || [],
		isError: results.some(val => val.isError),
		isLoading: results.some(val => val.isLoading),
		refetch,
	}
}
export default useCompany
