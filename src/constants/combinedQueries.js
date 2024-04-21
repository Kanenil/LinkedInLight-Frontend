import ConnectionService from "../services/connectionService"
import ChatService from "../services/chatService"
import CompanyService from "../services/companyService"
import ProfileService from "../services/profileService";
import RecommendedProfileService from "../services/recommendedProfileService";

const connectedQuery = (userId, isOwner) => [
	{
		queryFn: ({ queryKey }) => ConnectionService.isConnected(queryKey[1]),
		queryKey: ["isConnected", userId],
		select: ({ data }) => data,
		enabled: !isOwner,
	},
	{
		queryFn: ({ queryKey }) =>
			ConnectionService.isConnectionRequested(queryKey[1]),
		queryKey: ["isConnectionRequested", userId],
		select: ({ data }) => data,
		enabled: !isOwner,
		retry: false,
	},
]

const headerQuery = () => [
	{
		queryFn: () => ChatService.allUnreadMessages(),
		queryKey: ["allUnreadMessages"],
		select: ({ data }) => data,
	},
	{
		queryFn: () => ConnectionService.getPendingRequests(),
		queryKey: ["pendingRequests"],
		select: ({ data }) => data,
	},
]

const companiesQuery = user => [
	{
		queryFn: ({queryKey}) => CompanyService.getUserCompanies(queryKey[1]),
		queryKey: ["userCompanies", user.profileUrl],
		select: ({ data }) => data,
		enabled: !!user,
	},
	{
		queryFn: ({queryKey}) => CompanyService.getFollowedCompanies(queryKey[1]),
		queryKey: ["followedCompanies", user.profileUrl],
		select: ({ data }) => data,
		enabled: !!user,
	},
]

const companyQuery = (companyId, industryId) => [
	{
		queryFn: () => CompanyService.getIndustries(),
		queryKey: ["allIndustries"],
		select: ({ data }) => data.find(val => val.id === industryId),
	},
	{
		queryFn: ({ queryKey }) => CompanyService.getFollowersCount(queryKey[1]),
		queryKey: ["followersCount", companyId],
		select: ({ data }) => data,
	},
]

const companyPageQuery = companyId => [
	{
		queryFn: ({ queryKey }) => CompanyService.getCompany(queryKey[1]),
		queryKey: ["company", companyId],
		select: ({ data }) => data,
	},
	{
		queryFn: ({ queryKey }) => CompanyService.getFollowersCount(queryKey[1]),
		queryKey: ["followersCount", companyId],
		select: ({ data }) => data,
	},
	{
		queryFn: ({ queryKey }) => CompanyService.getOwner(queryKey[1]),
		queryKey: ["owner", companyId],
		select: ({ data }) => data,
	},
	{
		queryFn: ({ queryKey }) => CompanyService.getAdmins(queryKey[1]),
		queryKey: ["admins", companyId],
		select: ({ data }) => data,
	},
	{
		queryFn: () => ProfileService.getProfile(),
		queryKey: ["profile"],
		select: ({ data }) => data,
	}
]

const recommendationQuery = (userId) => [
	{
		queryFn: () => RecommendedProfileService.pendingRecommendations(),
		queryKey: ["pendingRecommendations"],
		select: ({ data }) => data,
	},
	{
		queryFn: ({queryKey}) => RecommendedProfileService.givenRecommendations(queryKey[1]),
		queryKey: ["givenRecommendations", userId],
		select: ({ data }) => data,
	},
	{
		queryFn: ({queryKey}) => RecommendedProfileService.receivedRecommendations(queryKey[1]),
		queryKey: ["receivedRecommendations", userId],
		select: ({ data }) => data,
	},
]


export {
	connectedQuery,
	headerQuery,
	companiesQuery,
	companyQuery,
	companyPageQuery,
	recommendationQuery
}
