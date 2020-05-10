<template>
    <v-app>
        <v-content>
            <v-container py-0 class="app__container">
                <v-slide-x-transition>
                    <nuxt />
                </v-slide-x-transition>
            </v-container>
        </v-content>
        <!-- <v-bottom-navigation grow app dark>
            <v-btn v-for="item of items" :key="item.title" :to="item.to" exact>
                <span>{{item.title}}</span>
                <v-icon>{{item.icon}}</v-icon>
            </v-btn>
        </v-bottom-navigation>-->
        <v-snackbar
            :value="snackBar"
            :multiLine="$store.state.snackbar.multiLine"
            :timeout="$store.state.snackbar.timeout"
            :bottom="$store.state.snackbar.bottom"
            :vertical="$store.state.snackbar.vertical"
            :color="$store.state.snackbar.color !== '' ? $store.state.snackbar.color : null"
        >
            {{ $store.state.snackbar.message }}
            <v-btn color="white" text @click="$store.dispatch('snackbar/close')">Close</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [
                {
                    icon: 'mdi-home-variant',
                    title: 'Home',
                    to: '/',
                },
                {
                    icon: 'mdi-magnify',
                    title: 'Search',
                    to: '/search',
                },
            ],
        }
    },

    computed: {
        snackBar() {
            return this.$store.state.snackbar.show || false
        },
    },

    async fetch({ store }) {
        await store.dispatch('meals/getMeals')
    },

    head() {
        return {
            title: 'HomemadeFood',
            meta: [
                {
                    'http-equiv': 'Content-Security-Policy',
                    content: 'upgrade-insecure-requests'
                }
            ]
        }
    }
}
</script>
<style lang="scss">
.app {
    &__container,
    &__layout,
    &__list {
        height: 100%;
    }
    &__list {
        width: 100%;
    }
}

@media screen and (min-width: 960px) {
    .app {
        &__list {
            width: 900px;
        }
    }
}
</style>