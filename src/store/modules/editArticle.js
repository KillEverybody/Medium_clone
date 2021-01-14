import articleApi from '@/api/article'

const state = {
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
    article: null,
}

export const mutationTypes = {
    updateArticleStart: '[editArticle] Update article start',
    updateArticleSuccess: '[editArticle] Update article success',
    updateArticleFailed: '[editArticle] Update article failed',

    getArticleStart: '[editArticle] Get article start',
    getArticleSuccess: '[editArticle] Get article success',
    getArticleFailed: '[editArticle] Get article failed',
}

export const actionTypes = {
    updateArticle: '[editArticle] Update article',
    getArticle: '[getArticle] Get article',
}
const mutations = {
    [mutationTypes.updateArticleStart](state) {
        state.isSubmitting = true
    },

    [mutationTypes.updateArticleSuccess](state) {
        state.isSubmitting = false
    },

    [mutationTypes.updateArticleFailed](state, payload) {
        state.isSubmitting = false
        state.validationErrors = payload
    },

    [mutationTypes.getArticleStart](state) {
        state.isLoading = true
        state.article = null
    },

    [mutationTypes.getArticleSuccess](state, payload) {
        state.isLoading = false
        state.article = payload
    },

    [mutationTypes.getArticleFailed](state) {
        state.isLoading = false
    },
}
const actions = {
    [actionTypes.updateArticle](context, {slug, articleInput}) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.updateArticleStart)
            articleApi
                .updateArticle(slug, articleInput)
                .then((article) => {
                    context.commit(mutationTypes.updateArticleSuccess, article)
                    resolve(article)
                })
                .catch((result) => {
                    context.commit(
                        mutationTypes.updateArticleFailed,
                        result.response.data.errors
                    )
                })
        })
    },

    [actionTypes.getArticle](context, {slug}) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getArticleStart)
            articleApi
                .getArticle(slug)
                .then((article) => {
                    context.commit(mutationTypes.getArticleSuccess, article)
                    resolve(article)
                })
                .catch(() => {
                    context.commit(mutationTypes.getArticleFailed)
                })
        })
    },
}

export default {
    state,
    actions,
    mutations,
}
