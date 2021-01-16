import addToFavoritesApi from '@/api/addToFavorites'

const state = {
    isSubmitting: false,
}

export const mutationTypes = {
    addToFavoritesStart: '[addToFavorites] addToFavorites start',
    addToFavoritesSuccess: '[addToFavorites] addToFavorites success',
    addToFavoritesFailed: '[addToFavorites] addToFavorites failed',
}

export const actionTypes = {
    addToFavorites: '[addToFavorites] Add to favorites',
}

const mutations = {
    [mutationTypes.addToFavoritesStart](state) {
        state.isSubmitting = true
    },
    [mutationTypes.addToFavoritesSuccess](state) {
        state.isSubmitting = false
    },
    [mutationTypes.addToFavoritesFailed]() {},
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
