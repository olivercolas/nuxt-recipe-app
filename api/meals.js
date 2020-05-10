const DEFAULT_URL = axios => {
    return `${axios.defaults.baseURL}/recipes`
}

const productApiFactory = axios => ({
    getMeals() {
        return axios.get(DEFAULT_URL(axios))
    },
    insertMeal(data) {
        return axios.post(DEFAULT_URL(axios), data)
    },
    deleteMeal(id) {
        return axios.delete(`${DEFAULT_URL(axios)}/${id}`, id)
    },
    updateMeal(data) {
        return axios.put(`${DEFAULT_URL(axios)}/${data._id}`, data)
    },
})

export default productApiFactory
