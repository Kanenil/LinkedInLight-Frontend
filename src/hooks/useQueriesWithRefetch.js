import { useQueries } from "@tanstack/react-query"
import { useCallback } from "react"

const useQueriesWithRefetch = (...queries) => {
	const results = useQueries(...queries)

	const refetchAll = useCallback(() => {
		results.forEach(result => result.refetch())
	}, [results])

	return {
		queries,
		refetchAll,
		results,
	}
}
export default useQueriesWithRefetch
