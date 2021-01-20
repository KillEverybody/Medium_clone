import addToFavoritesApi from '@/api/addToFavorites'
import router from '@/router'


const state = {
    isSubmitting: false,
    data: []
}


export const mutationTypes = {
    addToFavoritesStart: '[addToFavorites] addToFavorites start',
    addToFavoritesSuccess: '[addToFavorites] addToFavorites success',
    addToFavoritesFailed: '[addToFavorites] addToFavorites failed',

    addToFavoritesInit:'[addToFavorites] addToFavorites init',
}

export const actionTypes = {
    addToFavorites: '[addToFavorites] Add to favorites',
    addToFavoritesInit: '[[addToFavorites] Add to favorites init]'
}

const mutations = {
    [mutationTypes.addToFavoritesStart](state) {
        state.isSubmitting = true
    },
    [mutationTypes.addToFavoritesSuccess](state, payload) {
        state.isSubmitting = false
        state.data = payload
    },
    [mutationTypes.addToFavoritesFailed]() {},

    [mutationTypes.addToFavoritesInit](state, payload) {
        state.data = payload
    }
}

const actions = {
    [actionTypes.addToFavorites](context, {slug, isFavorited}) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.addToFavoritesStart)
            const promise = isFavorited
                ? addToFavoritesApi.removeToFavorites(slug)
                : addToFavoritesApi.addToFavorites(slug)

            promise
                .then((article) => {
                    context.commit(mutationTypes.addToFavoritesSuccess, article)
                    resolve(article)
                })
                .catch(() => {
                    router.push( {name:"login"} )
                    context.commit(mutationTypes.addToFavoritesFailed)
                })
        })
    },
}

export default {
    state,
    actions,
    mutations,
}
