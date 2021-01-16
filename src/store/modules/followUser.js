import followUserApi from '@/api/followUser'

const state = {
    data: []
}

export const mutationTypes = {
    followUserStart: '[followUser] followUser start',
    followUserSuccess: '[followUser] followUser success',
    followUserFailed: '[followUser] followUser failed',

    followUserInit:'[followUser] followUser init',
}

export const actionTypes = {
    followUser: '[followUser] follow User',
}

const mutations = {
    [mutationTypes.followUserStart]() {},
    [mutationTypes.followUserSuccess](state, payload) {
        state.data = payload
    },
    [mutationTypes.followUserFailed]() {},

    [mutationTypes.followUserInit](state, payload) {
        state.data = payload
    }
}

const actions = {
    [actionTypes.followUser](context, {slug, isFollowed}) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.followUserStart)
            const promise = isFollowed
                ? followUserApi.removeUserProfileFollow(slug)
                : followUserApi.getUserProfileFollow(slug)
            console.log(slug)
            promise
                .then((article) => {
                    context.commit(mutationTypes.followUserSuccess, article)
                    resolve(article)
                })
                .catch(() => {
                    context.commit(mutationTypes.followUserFailed)
                })
        })
    },
}

export default {
    state,
    actions,
    mutations,
}