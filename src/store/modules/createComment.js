import commentsApi from '@/api/comments'

const state = {
    comments: {},
    isLoadingC: true,
    error: null,
}

export const mutationTypes = {
    createCommentStart: '[createComment] Create comment start',
    createCommentSuccess: '[createComment] Create comment success',
    createCommentFailed: '[createComment] Create comment failed',

}

export const actionTypes = {
    createComment: '[createComment] Create comment',

}


const mutations = {

    [mutationTypes.createCommentStart](state) {
        state.isLoadingC = true
        state.error = null
        // console.log('start', this.state.comments)
        // state.data = []
    },
    [mutationTypes.createCommentSuccess](state, payload) {
        // console.log(payload)
        state.isLoadingC = false
        state.comments = payload
        state.error = null
    },
    [mutationTypes.createCommentFailed](state, payload) {
        state.isLoadingC = false
        state.error = payload
    },

}

const actions = {
    [actionTypes.createComment](context, payload) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.createCommentStart)
            // console.log('ddd')
            commentsApi
                .createComment(payload.slug, payload.comment)
                .then((response) => {
                    console.log('fdsf', response)
                    context.commit(mutationTypes.createCommentSuccess, response)
                    resolve(response)
                })
                .catch((result) => {
                    // console.log(result)
                    context.commit(mutationTypes.createCommentFailed, result.response.data.errors)
                })
        })
    },
    // [actionTypes.deleteComment](context, {slug, commentId}) {
    //     return new Promise((resolve) => {
    //         context.commit(mutationTypes.deleteCommentStart, slug)
    //         commentsApi
    //             .deleteComment(slug, commentId)
    //             .then(() => {
    //                 context.commit(mutationTypes.deleteCommentSuccess)
    //                 resolve()
    //             })
    //             .catch(() => {
    //                 context.commit(mutationTypes.getCommentFailed)
    //             })
    //     })
    // },
}

export default {
    state,
    actions,
    mutations,
}