import productApiFactory from '@/api/meals'

export default ({ $axios }, inject) => {
    // Inject `api` key
    // -> app.$api
    // -> this.$api in vue components
    // -> this.$api in store actions/mutations
    const api = productApiFactory($axios)
    inject('api', api)
}
