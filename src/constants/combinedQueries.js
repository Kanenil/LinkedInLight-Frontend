import ConnectionService from "../services/connectionService";
import ChatService from "../services/chatService";
import CompanyService from "../services/companyService";

const connectedQuery = (userId, isOwner) => [
    {
        queryFn: ({queryKey}) => ConnectionService.isConnected(queryKey[1]),
        queryKey: ['isConnected', userId],
        select: ({data}) => data,
        enabled: !isOwner
    },
    {
        queryFn: ({queryKey}) => ConnectionService.isConnectionRequested(queryKey[1]),
        queryKey: ['isConnectionRequested', userId],
        select: ({data}) => data,
        enabled: !isOwner,
        retry: false
    }
];

const headerQuery = () => [
    {
        queryFn: () => ChatService.allUnreadMessages(),
        queryKey: ['allUnreadMessages'],
        select: ({data}) => data,
    },
    {
        queryFn: () => ConnectionService.getPendingRequests(),
        queryKey: ['pendingRequests'],
        select: ({data}) => data,
    }
];

const companiesQuery = (isOwner) => [
    {
        queryFn: () => CompanyService.getUserCompanies(),
        queryKey: ['userCompanies'],
        select: ({data}) => data,
        enabled: isOwner
    },
    {
        queryFn: () => CompanyService.getFollowedCompanies(),
        queryKey: ['followedCompanies'],
        select: ({data}) => data,
        enabled: isOwner
    }
];

const companyQuery = (companyId, industryId) => [
    {
        queryFn: () => CompanyService.getIndustries(),
        queryKey: ['allIndustries'],
        select: ({data}) => data.find(val => val.id === industryId)
    },
    {
        queryFn: ({queryKey}) => CompanyService.getFollowersCount(queryKey[1]),
        queryKey: ['followersCount', companyId],
        select: ({data}) => data
    }
];

const companyPageQuery = (companyId) => [
    {
        queryFn: ({queryKey}) => CompanyService.getCompany(queryKey[1]),
        queryKey: ['company', companyId],
        select: ({data}) => data
    }
];

export {connectedQuery, headerQuery, companiesQuery, companyQuery, companyPageQuery}