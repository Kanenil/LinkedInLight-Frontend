import axios from "./axios"

class CompanyService {
	#URL = "api/company"

	getIndustries() {
		return axios.get(`${this.#URL}/allIndustries`)
	}

	getTypes() {
		return axios.get(`${this.#URL}/allOrganizationTypes`)
	}

	getSizes() {
		return axios.get(`${this.#URL}/allOrganizationSizes`)
	}

	create(model) {
		return axios.post(`${this.#URL}/newCompany`, model)
	}

	remove(companyId) {
		return axios.delete(`${this.#URL}/${companyId}/remove`)
	}

	getUserCompanies(profileUrl) {
		return axios.get(`${this.#URL}/${profileUrl}/userCompanies`)
	}

	getFollowedCompanies(profileUrl) {
		return axios.get(`${this.#URL}/${profileUrl}/followedCompanies`)
	}

	getFollowersCount(companyId) {
		return axios.get(`${this.#URL}/${companyId}/followersCount`)
	}

	getCompany(companyId) {
		return axios.get(`${this.#URL}/${companyId}`)
	}

	getOwner(companyId) {
		return axios.get(`${this.#URL}/${companyId}/owner`)
	}

	getAdmins(companyId) {
		return axios.get(`${this.#URL}/${companyId}/admins`)
	}

	getIsFollower(companyId) {
		return axios.get(`${this.#URL}/isFollower/${companyId}`)
	}

	follow(companyId) {
		return axios.post(`${this.#URL}/follow/${companyId}`)
	}

	unfollow(companyId) {
		return axios.post(`${this.#URL}/unfollow/${companyId}`)
	}

	createPost(model) {
		return axios.post(`${this.#URL}/post`, model)
	}

	editPost(model) {
		return axios.put(`${this.#URL}/post/${model.id}`, model)
	}

	posts(companyId) {
		return axios.get(`${this.#URL}/posts/${companyId}`)
	}

	deletePost(postId) {
		return axios.delete(`${this.#URL}/post/${postId}`)
	}

	post(postId) {
		return axios.get(`${this.#URL}/post/${postId}`)
	}

	followers(companyId) {
		return axios.get(`${this.#URL}/${companyId}/followers`)
	}

	visibleForAll(companyId) {
		return axios.get(`${this.#URL}/${companyId}/visibleForAll`)
	}

	editVisibleForAll(companyId, isVisibleForAll) {
		return axios.put(`${this.#URL}/${companyId}/visibleForAll`, null, {
			params: {
				isVisibleForAll,
			},
		})
	}

	editCompany(model) {
		return axios.put(`${this.#URL}/${model.id}/edit`, model)
	}
}

export default new CompanyService()
