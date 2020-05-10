<template>
    <v-row justify="center" align="start" class="app__layout">
        <v-list three-line class="app__list pt-0">
            <v-row class="pa-0 ma-0">
                <v-col cols="12" class="pa-0 ma-0">
                    <v-text-field
                        v-model="search"
                        solo
                        type="search"
                        dense
                        placeholder="Search for a recipe"
                        clearable
                        append-icon="mdi-magnify"
                        hide-details
                        tile
                        flat
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <template v-for="(item, index) in displayRecipes">
                <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                <v-list-item v-else :key="item.title" @click="onSelectedRecipe(item._id)">
                    <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
        <v-btn fab color="green" fixed bottom right dark @click="dialog = true">
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-dialog
            v-model="dialog"
            :fullscreen="$vuetify.breakpoint.smAndDown"
            :max-width="$vuetify.breakpoint.mdAndUp ? 500 : '90vw'"
            persistent
        >
            <modify-recipe type="add" @close="onClose" @submit="addRecipe" title="Add Recipe"></modify-recipe>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Recipe from '@/models/recipe'
import ModifyRecipe from '../components/UI/Dialog/ModifyRecipe.vue'

@Component({
    components: {
        ModifyRecipe,
    },
})
export default class Home extends Vue {
    recipes: Recipe[] = []
    dialog = false
    // structure = [{ header: 'Today' }],
    search = ''
    get displayRecipes() {
        let structure = []
        let recipes = Object.keys(this.$store.state.meals.meals).map(
            mealId => this.$store.state.meals.meals[mealId]
        )

        if (this.search.length >= 2) {
            const search = this.search.toLowerCase()
            recipes = recipes.filter((recipe: any) => {
                const recipeName = recipe.name.toLowerCase()
                return recipeName.includes(search)
            })
        }
        for (const recipe of recipes) {
            structure.push({
                _id: recipe._id,
                avatar: '',
                title: recipe.name,
                subtitle: recipe.description,
            })
            structure.push({ divider: true, inset: true })
        }

        return structure
    }

    mounted() {
        this.$store.dispatch('meals/getMeals')
    }

    addIngredientToList() {
        this.$store.dispatch('snackbar/open', {
            message: 'Clicked',
            type: 'info',
        })
    }

    addRecipe(meal: {
        name: string
        description: string
        ingredients?: Object[]
    }) {
        const { name, description } = meal
        if (name && name !== '' && description && description !== '') {
            const recipeData = {
                name,
                description,
            }
            this.$store
                .dispatch('meals/addMeal', recipeData)
                .then((result: any) => {
                    this.dialog = false
                })
        } else {
            this.$store.dispatch('snackbar/open', {
                message: 'Please fill in the required fields',
                type: 'error',
            })
        }
    }

    onSelectedRecipe(recipeId: Recipe) {
        this.$store.commit('meals/SELECT_RECIPE', recipeId)
        this.$router.push(`meal/${recipeId}`)
    }

    onClose() {
        this.dialog = false
    }
}
</script>

<style lang="scss" scoped>
.app__fab {
    bottom: 70px;
}
</style>