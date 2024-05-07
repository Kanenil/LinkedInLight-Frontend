import { useQueries } from "@tanstack/react-query"
import companyService from "../services/companyService"
import profileService from "../services/profileService"

const useAdministratedCompanies = () => {
	const { companies, administratedCompany, isLoading } = useQueries({
		queries: [
			{
				queryFn: () => companyService.getCurrentUserCompanies(),
				queryKey: ["currentUserCompanies"],
				select: ({ data }) => data,
			},
			{
				queryFn: () => profileService.administratedCompany(),
				queryKey: ["administratedCompany"],
				select: ({ data }) => data,
				retry: false,
			},
		],
		combine: results => {
			const [companies, administratedCompany] = results
			return {
				companies: companies.data,
				administratedCompany: administratedCompany.data,
				isLoading: companies.isLoading || administratedCompany.isLoading,
			}
		},
	})

	const spreadCompanies = companies ? [...companies, administratedCompany] : []

	return { companies: spreadCompanies.filter(v => !!v), isLoading }
}
export default useAdministratedCompanies
