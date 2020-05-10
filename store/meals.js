export const state = () => ({
    meals: {},
    selectedMeal: null,
})

export const mutations = {
    SET_MEALS(state, payload) {
        state.meals = payload
    },
    ADD_MEAL(state, payload) {
        state.meals[payload._id] = payload
    },
    DELETE_MEAL(state, payload) {
        const meals = state.meals
        delete meals[payload]
        state.meals = meals
    },
    UPDATE_MEAL(state, payload) {
        state.meals[payload._id] = payload
    },
    SELECT_RECIPE(state, payload) {
        state.selectedMeal = payload
    },
}

export const getters = {
    getMealById: state => id => {
        return state.meals[id]
    },
}

export const actions = {
    async getMeals({ commit }) {
        const res = await this.$api.getMeals()
        const fixedRes = {}
        res.data.recipes.map(data => {
            fixedRes[data._id] = { ...data }
        })
        commit('SET_MEALS', fixedRes)
    },
    async addMeal({ commit }, payload) {
        const res = await this.$api.insertMeal(payload)
        if (res) {
            commit('ADD_MEAL', res.data.recipe._doc)
        }
    },
    async deleteMeal({ commit }, id) {
        const res = await this.$api.deleteMeal(id)
        if (res) {
            commit('DELETE_MEAL', id)
        }
    },
    async updateMeal({ commit }, payload) {
        const res = await this.$api.updateMeal(payload)
        if (res) {
            commit('UPDATE_MEAL', payload)
        }
    },
}
