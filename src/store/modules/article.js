import articleApi from '@/api/article'
import {mutationTypes as addToFavMutationTypes} from '@/store/modules/addToFavorites'
import {mutationTypes as followUserMutationTypes} from '@/store/modules/followUser'
import router from '@/router'

const state = {
    data: null,
    isLoading: false,
    error: null,
}

export const mutationTypes = {
    getArticleStart: '[article] Get article start',
    getArticleSuccess: '[article] Get article success',
    getArticleFailed: '[article] Get article failed',

    deleteArticleStart: '[article] delete article start',
    deleteArticleSuccess: '[article] delete article success',
    deleteArticleFailed: '[article] delete article failed',

    updateArticle: '[article] update article'
}

export const actionTypes = {
    getArticle: '[article] Get article',
    deleteArticle: '[article] Delete article',
}

const mutations = {
    [mutationTypes.getArticleStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getArticleSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
        console.log(payload )
    },
    [mutationTypes.getArticleFailed](state) {
        state.isLoading = false
    },

    [mutationTypes.deleteArticleStart]() {},
    [mutationTypes.deleteArticleSuccess]() {},
    [mutationTypes.deleteArticleFailed]() {},


}

const actions = {
    [actionTypes.getArticle](context, {slug}) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getArticleStart, slug)
            articleApi
                .getArticle(slug)
                .then((article) => {
                    context.commit(mutationTypes.getArticleSuccess, article)
                    context.commit(addToFavMutationTypes.addToFavoritesInit, article)
                    context.commit(followUserMutationTypes.followUserInit, article.author)
                    resolve(article)
                })
                .catch(() => {
                    router.push( {name:"globalFeed"} )
                    context.commit(mutationTypes.getArticleFailed)
                })
        })
    },
    [actionTypes.deleteArticle](context, {slug}) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.deleteArticleStart, slug)
            articleApi
                .deleteArticle(slug)
                .then(() => {
                    context.commit(mutationTypes.deleteArticleSuccess)
                    resolve()
                })
                .catch(() => {
                    context.commit(mutationTypes.deleteArticleFailed)
                })
        })
    },
}

export default {
    state,
    actions,
    mutations,
}
