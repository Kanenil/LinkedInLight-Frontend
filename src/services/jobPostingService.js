import axios from "./axios"

class JobPosting {
	#URL = "api/jobPosting"

	newJobPosting(jobPosting) {
		return axios.post(`${this.#URL}/newJobPosting`, jobPosting)
	}

	newJobsSkills(jobSkills) {
		return axios.post(`${this.#URL}/newJobSkills`, jobSkills)
	}

	getAllJobPostingByCompany(companyId) {
		return axios.get(`${this.#URL}/${companyId}/all`)
	}

	getJobPostingById(jobPostingId) {
		return axios.get(`${this.#URL}/${jobPostingId}`)
	}

	getJobSkills(jobPostingId) {
		return axios.get(`${this.#URL}/${jobPostingId}/skills`)
	}

	updateJobPosting(jobPosting) {
		return axios.put(`${this.#URL}/update/${jobPosting.id}`, jobPosting)
	}

	allPostedJobs() {
		return axios.get(`${this.#URL}/allPostedJobs`)
	}

	getApplicantsCount(jobPostingId) {
		return axios.get(`${this.#URL}/${jobPostingId}/allApplicants/count`)
	}

	ifApplied(jobPostingId) {
		return axios.get(`${this.#URL}/${jobPostingId}/ifApplied`)
	}
}

export default new JobPosting()
