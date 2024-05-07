const JobItem = ({ job }) => {
	return (
		<div className='flex flex-row'>
			<img src={job.company.logoImg} alt='logo' className='w-12 h-12' />
			<div className=''></div>
			<h3>{job.title}</h3>
			<p>{job.description}</p>
		</div>
	)
}
export default JobItem
