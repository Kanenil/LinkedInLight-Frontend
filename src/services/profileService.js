import axios from "./axios"

class ProfileService {
	#URL = "api/profile"

	getProfile() {
		return axios.get(this.#URL)
	}

	getProfileUrl(url) {
		return axios.get(`${this.#URL}/${url}`)
	}

	changeImage(data, isBackground = false) {
		return axios.putForm(
			`${this.#URL}/editImage`,
			{ newImage: data },
			{
				params: {
					background: isBackground,
				},
			},
		)
	}

	getCompanies() {
		return axios.get(`${this.#URL}/allCompanies`)
	}

	getPositions() {
		return axios.get(`${this.#URL}/allPositions`)
	}

	openToWork(model) {
		return axios.post(`${this.#URL}/addOpenToWork`, model)
	}

	updateOpenToWork(model) {
		return axios.put(`${this.#URL}/updateOpenToWorkVM`, model)
	}

	getAbout() {
		return axios.get(`${this.#URL}/edit/about`)
	}

	editAbout(newAbout) {
		return axios.put(`${this.#URL}/edit/about`, newAbout)
	}

	getIndustries() {
		return axios.get(`${this.#URL}/allIndustries`)
	}

	getAllSkills() {
		return axios.get(`${this.#URL}/allSkills`)
	}

	getSkillsByProfileUrl(url) {
		return axios.get(`${this.#URL}/${url}/skills`)
	}

	getSkills() {
		return axios.get(`${this.#URL}/userSkills`)
	}

	getMainSkills() {
		return axios.get(`${this.#URL}/mainSkills`)
	}

	getMainSkillsByProfileUrl(url) {
		return axios.get(`${this.#URL}/${url}/mainSkills`)
	}

	addSkill(skill, isMainSkill = true) {
		return axios.post(`${this.#URL}/newSkill`, {
			skill,
			skillId: skill.value,
			applicationUserId: ``,
			isMainSkill: isMainSkill,
			id: 0,
		})
	}

	updateSkill(data, id) {
		return axios.put(`${this.#URL}/skill/edit/${id}`, data)
	}

	removeSkill(skillId) {
		return axios.delete(`${this.#URL}/skill/remove/${skillId}`)
	}

	getEducations() {
		return axios.get(`${this.#URL}/userEducations`)
	}

	getEducationsByProfileUrl(url) {
		return axios.get(`${this.#URL}/${url}/educations`)
	}

	getEducation(id) {
		return axios.get(`${this.#URL}/education/${id}`)
	}

	addEducation(data) {
		return axios.post(`${this.#URL}/newEducation`, data)
	}

	updateEducation(data, id) {
		return axios.put(`${this.#URL}/education/edit/${id}`, data)
	}

	removeEducation(id) {
		return axios.delete(`${this.#URL}/education/remove/${id}`)
	}

	getExperiences() {
		return axios.get(`${this.#URL}/userExperiences`)
	}

	getExperiencesByProfileUrl(url) {
		return axios.get(`${this.#URL}/${url}/experiences`)
	}

	getExperience(id) {
		return axios.get(`${this.#URL}/experience/${id}`)
	}

	addExperience(data) {
		return axios.post(`${this.#URL}/newExperience`, data)
	}

	updateExperience(data, id) {
		return axios.put(`${this.#URL}/experience/edit/${id}`, data)
	}

	removeExperience(id) {
		return axios.delete(`${this.#URL}/experience/remove/${id}`)
	}

	administratedCompany() {
		return axios.get(`${this.#URL}/administratedCompany`)
	}

	getOpenToWork() {
		return axios.get(`${this.#URL}/getOpenToWorkVM`)
	}

	getOpenToWorkByURL(profileUrl) {
		return axios.get(`${this.#URL}/${profileUrl}/getOpenToWorkVM`)
	}

	deleteOpenToWork() {
		return axios.delete(`${this.#URL}/deleteOpenToWorkVM`)
	}

	getServices() {
		return axios.get(`${this.#URL}/getServices`)
	}

	getServicesByURL(profileUrl) {
		return axios.get(`${this.#URL}/${profileUrl}/getServices`)
	}

	getOpenToHire() {
		return axios.get(`${this.#URL}/IsOpenToHire`)
	}

	getOpenToHireByURL(profileUrl) {
		return axios.get(`${this.#URL}/${profileUrl}/IsOpenToHire`)
	}

	editUrl(newUrl) {
		return axios.put(`${this.#URL}/editUrl`, null, {
			params: {
				newUrl,
			},
		})
	}
}

export default new ProfileService()
