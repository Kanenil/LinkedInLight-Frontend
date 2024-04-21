import {useQueries} from "@tanstack/react-query";
import {recommendationQuery} from "../constants/combinedQueries";

const useRecommendation = (user, isOwner) => {
    const recommendation = useQueries({
        queries: recommendationQuery(user.profileUrl).map(value => ({
            ...value,
        })),
        combine: results => {
            return {
                pendingRecommendations: isOwner? results[0].data ?? []: [],
                givenRecommendations: results[1].data ?? [],
                receivedRecommendations: results[2].data ?? [],
                isLoading: results.some(val => val.isLoading),
            }
        },
    })
    return {...recommendation};
}
export default useRecommendation