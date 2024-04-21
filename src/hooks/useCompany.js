import {useQueries} from "@tanstack/react-query";
import {companyPageQuery} from "../constants/combinedQueries";

const useCompany = (companyId) => {
    const company = useQueries({
        queries: companyPageQuery(companyId).map(value => ({
            ...value,
        })),
        combine: results => {
            return {
                company: results[0].data ?? {},
                followersCount: results[1].data ?? 0,
                isAdmin: !!([results[2].data, ...(results[3].data ?? [])] ?? []).find(
                    val => val?.userId === results[4].data?.id,
                ),
                isLoading: results.some(val => val.isLoading),
                admins: [results[2].data, ...(results[3].data ?? [])] ?? [],
                owner: results[2].data,
                isError: results.some(val => val.isError)
            }
        },
    })
    return {...company};
}
export default useCompany;