import commentsApi from '@/api/comments'

const state = {
    comments: {},
    isLoadingC: true,
    error: null,
}

export const mutationTypes = {
    getCommentStart: '[comment] Get comment start',
    getCommentSuccess: '[comment] Get comment success',
    getCommentFailed: '[comment] Get comment failed',

    deleteCommentStart: '[comment] delete comment start',
    deleteCommentSuccess: '[comment] delete comment success',
    deleteCommentFailed: '[comment] delete comment failed',

    updateComment: '[comment] update comment'
}

export const actionTypes = {
    getComment: '[comment] Get comment',
    deleteComment: '[comment] Delete comment',
}

export const getterTypes = {
    comments: '[comment] getter comments',
}

const getters = {
    [getterTypes.comments]: (state) => {
        return state.comments
    },
}

const mutations = {

    [mutationTypes.getCommentStart](state) {
        state.isLoadingC = true
        // console.log('start', this.state.comments)
        // state.data = []
    },
    [mutationTypes.getCommentSuccess](state, payload) {
        // console.log(payload)
        state.isLoadingC = false
        state.comments = payload
    },
    [mutationTypes.getCommentFailed](state) {
        state.isLoadingC = false
    },

    [mutationTypes.deleteCommentStart]() {},
    [mutationTypes.deleteCommentSuccess]() {},
    [mutationTypes.deleteCommentFailed]() {},


}

const actions = {
    [actionTypes.getComment](context, {slug}) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getCommentStart, slug)
            // console.log('ddd')
            commentsApi
                .getComments(slug)
                .then((comments) => {
                    // console.log('fdsf', comments)
                    context.commit(mutationTypes.getCommentSuccess, comments)
                    resolve(comments)
                })
                .catch(() => {
                    context.commit(mutationTypes.getCommentFailed)
                })
        })
    },
    [actionTypes.deleteComment](context, {slug, commentId}) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.deleteCommentStart, slug)
            commentsApi
                .deleteComment(slug, commentId)
                .then(() => {
                    context.commit(mutationTypes.deleteCommentSuccess)
                    resolve()
                })
                .catch(() => {
                    context.commit(mutationTypes.getCommentFailed)
                })
        })
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}