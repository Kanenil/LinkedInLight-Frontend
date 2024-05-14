import { Helmet } from "react-helmet-async"
import Content from "../../components/jobs/Content"
import { useSearchParams } from "react-router-dom"
import JobSearch from "../../components/jobs/JobSearch"
import PublishJob from "../../components/jobs/PublishJob"
import { useTranslation } from "react-i18next"
import useAdministratedCompanies from "../../hooks/useAdministratedCompanies"
import useAuthUser from "../../hooks/useAuthUser"
import Loader from "../../components/shared/Loader"

const JobsPage = () => {
	const { t } = useTranslation()

	const { companies, isLoading } = useAdministratedCompanies()
	const { profile, isLoading: isUserLoading } = useAuthUser()
	const [searchParams] = useSearchParams()

	const search = searchParams.get("search") || ""
	const publish = searchParams.get("publish") || ""
	const selected = searchParams.get("selected") || ""

	if (isLoading || isUserLoading) return <Loader />

	return (
		<>
			<Helmet>
				<title>{t("jobs.title")}</title>
			</Helmet>
			{search ? (
				<JobSearch search={search} selected={selected} />
			) : (
				<main className='flex flex-grow bg-[#E7E7E7]'>
					{publish && companies.length > 0 ? (
						<PublishJob companies={companies} userId={profile.id} />
					) : (
						<div className='flex flex-col md:flex-row my-8 mx-auto w-full md:container lg:w-[1170px]'>
							{/* <div className='w-3/12 bg-white h-[300px] border-[#B4BFDD] border-[1px] rounded-l-lg'></div> */}

							<Content companies={companies} />
						</div>
					)}
				</main>
			)}
		</>
	)
}

export default JobsPage
