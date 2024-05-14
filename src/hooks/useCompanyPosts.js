import companyService from "../services/companyService"
import jobPostingService from "../services/jobPostingService"
import useQueriesWithRefetch from "./useQueriesWithRefetch"

const useCompanyPosts = companyId => {
	const { refetchAll: refetch, results } = useQueriesWithRefetch({
		queries: [
			{
				queryKey: ["posts", companyId],
				queryFn: ({ queryKey }) => companyService.posts(queryKey[1]),
				select: ({ data }) => data,
			},
			{
				queryKey: ["jobPosting", companyId],
				queryFn: ({ queryKey }) =>
					jobPostingService.getAllJobPostingByCompany(queryKey[1]),
				select: ({ data }) => data,
			},
		],
	})

	const [posts, jobPostings] = results

	const filteredResults =
		!posts.isLoading && !jobPostings.isLoading
			? [
					...posts.data.map(v => ({ ...v, type: "post" })),
					...jobPostings.data.map(v => ({ ...v, type: "JobPosting" })),
			  ].sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
			: []

	return {
		posts: filteredResults,
		isError: results.some(val => val.isError),
		isLoading: results.some(val => val.isLoading),
		refetch,
	}
}

export default useCompanyPosts
