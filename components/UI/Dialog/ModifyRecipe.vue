<template>
    <v-card>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="onClose()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark text @click="onSubmit()">Save</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
            <v-subheader>General</v-subheader>
            <v-col cols="12" class="pt-0 pb-3 pa-4">
                <v-text-field label="Name*" placeholder="Enter a name" v-model="meal.name" required></v-text-field>
                <v-text-field
                    label="Description*"
                    placeholder="Enter a description"
                    v-model="meal.description"
                    required
                ></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-subheader>Ingredients</v-subheader>
            <v-col cols="12" class="pt-0 pb-3 pa-4">
                <v-text-field append-icon="mdi-plus" @click:append="addIngredientToList()"></v-text-field>
            </v-col>
        </v-list>
    </v-card>
</template>

<script lang="ts">
// import Vue from 'vue'
// import Component from 'vue-class-component'
import { Vue, Prop, Component } from 'vue-property-decorator'
import Recipe from '../../../models/recipe'

@Component({
    props: {
        title: {
            type: String,
            required: true,
        },
        ingredients: {
            type: Array,
            default: () => [],
        },
    },
})
export default class ModifyRecipe extends Vue {
    @Prop(String) readonly name: string | undefined
    @Prop(String) readonly description: string | undefined
    @Prop(String) readonly type!: string

    meal:
        | Recipe
        | { name: undefined; description: undefined; ingredients: [] } = {
        name: '',
        description: '',
        ingredients: [],
    }

    created() {
        this.meal.name = this.name
        this.meal.description = this.description
    }

    onSubmit() {
        this.$emit('submit', this.meal)
        if (this.type !== 'edit') {
            this.clearValues()
        }
    }

    onClose() {
        this.$emit('close')
        this.clearValues()
    }

    clearValues() {
        this.meal.name = ''
        this.meal.description = ''
        this.meal.ingredients = []
    }
}
</script>

<style lang="scss" scoped>
</style>