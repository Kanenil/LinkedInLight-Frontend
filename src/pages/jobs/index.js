import { Helmet } from "react-helmet-async"
import Content from "../../components/jobs/Content"
import { useSearchParams } from "react-router-dom"
import JobSearch from "../../components/jobs/JobSearch"

const JobsPage = () => {
	const [searchParams] = useSearchParams()

	const search = searchParams.get("search") || ""
	const selected = searchParams.get("selected") || ""

	return (
		<>
			<Helmet>
				<title>Jobs</title>
			</Helmet>
			{search ? (
				<JobSearch search={search} selected={selected} />
			) : (
				<main className='flex flex-grow bg-[#E7E7E7]'>
					<div className='flex flex-col md:flex-row my-8 mx-auto w-full md:container lg:w-[1170px]'>
						<div className='w-3/12 bg-white h-[300px] border-[#B4BFDD] border-[1px] rounded-l-lg'></div>

						<Content />
					</div>
				</main>
			)}
		</>
	)
}

export default JobsPage
