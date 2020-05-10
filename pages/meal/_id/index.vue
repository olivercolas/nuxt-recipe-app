<template>
    <v-row justify="center" align="start">
        <v-col xs="12" md="6" class="app__content__meal">
            <v-card flat class="app__content__meal__img mx-auto" max-height="40vw">
                <v-btn
                    fab
                    color="black"
                    :elevation="0"
                    absolute
                    left
                    text
                    icon
                    @click="$router.back()"
                    class="app__content__meal__btns"
                >
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-img :src="require('@/assets/images/default-image.png')"></v-img>
                <v-menu bottom left>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            fab
                            color="black"
                            :elevation="0"
                            absolute
                            right
                            text
                            icon
                            class="app__content__meal__btns"
                            v-on="on"
                        >
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(item, i) in dropdownList"
                            :key="i"
                            @click.stop="dialog[item.id] = true"
                        >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-card-title>{{ recipe ? recipe.name : null }}</v-card-title>
                <v-card-text>{{ recipe ? recipe.description : null }}</v-card-text>
            </v-card>
        </v-col>
        <v-dialog v-model="dialog.remove" max-width="290">
            <v-card>
                <v-card-title class="headline">Are you sure you'd like to delete this recipe?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialog.remove = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteRecipe()">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog.edit"
            :fullscreen="$vuetify.breakpoint.smAndDown"
            :max-width="$vuetify.breakpoint.mdAndUp ? 500 : '90vw'"
            persistent
        >
            <modify-recipe
                v-if="dialog.edit"
                type="edit"
                :name="recipe.name"
                :description="recipe.description"
                @close="dialog.edit = false"
                @submit="editRecipe"
                title="Edit Recipe"
            ></modify-recipe>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
// import Vue from 'vue'
import { Vue, Component, Watch } from 'vue-property-decorator'
// import Component from 'vue-class-component'
import ModifyRecipe from '../../../components/UI/Dialog/ModifyRecipe.vue'
import Recipe from '@/models/recipe'

@Component({
    components: { ModifyRecipe },
})
export default class MealPage extends Vue {
    @Watch('selectedMeal')
    onMealChange(val: string, oldVal: string): void {
        this.$router.push('/')
    }

    // recipe: Recipe | {} = {}
    dropdownList = [
        { id: 'edit', title: 'Edit' },
        { id: 'remove', title: 'Remove' },
    ]
    dialog = {
        remove: false,
        edit: false,
    }

    get recipe() {
        return this.$store.getters['meals/getMealById'](
            this.$store.state.meals.selectedMeal
        )
    }

    get selectedMeal() {
        return this.$store.state.meals.selectedMeal
    }

    mounted() {
        if (!this.$store.state.meals.selectedMeal) {
            this.$router.push('/')
        }
    }

    editRecipe(meal: {
        name: string
        description: string
        ingredients?: Object[]
    }) {
        const { name, description } = meal
        if (name && name !== '' && (description && description !== '')) {
            const recipeData = {
                _id: this.recipe._id,
                name,
                description,
            }
            this.$store
                .dispatch('meals/updateMeal', recipeData)
                .then((result: any) => {
                    this.dialog.edit = false
                    this.$store.dispatch('snackbar/open', {
                        message: 'Recipe updated successfully',
                        type: 'success',
                    })
                })
        } else {
            this.$store.dispatch('snackbar/open', {
                message: 'Please fill in the required fields',
                type: 'error',
            })
        }
    }

    deleteRecipe() {
        this.$store
            .dispatch('meals/deleteMeal', this.$store.state.meals.selectedMeal)
            .then((result: any) => {
                this.dialog.remove = false
                this.$router.push('/')
                this.$store.dispatch('snackbar/open', {
                    message: 'Item deleted successfully',
                    type: 'success',
                })
            })
    }
}
</script>

<style lang="scss" scoped>
.app__content__meal {
    padding: 0px;
    background: #fff;
    height: 100vh;

    &__btns {
        top: 13px !important;
    }

    &__img {
        position: relative;
    }
}
</style>