import followUserApi from '@/api/followUser'
 import router from '@/router'

const state = {
    data: [],
    userProfile: []
}

export const mutationTypes = {
    followUserStart: '[followUser] followUser start',
    followUserSuccess: '[followUser] followUser success',
    followUserFailed: '[followUser] followUser failed',
    followUserInitUserPorfile: '[followUser] followUser init user profile',
    followUserInit:'[followUser] followUser init',
}

export const actionTypes = {
    followUser: '[followUser] follow User',
}

const mutations = {
    [mutationTypes.followUserStart]() {

    },
    [mutationTypes.followUserSuccess](state, payload) {
        state.data = payload
        state.userProfile = payload
    },
    [mutationTypes.followUserFailed]() {},

    [mutationTypes.followUserInit](state, payload) {
        state.data = payload
    },
    [mutationTypes.followUserInitUserPorfile](state, payload) {
        state.userProfile = payload
    }

}

const actions = {
    [actionTypes.followUser](context, {slug, isFollowed}) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.followUserStart)
            const promise = isFollowed
                ? followUserApi.removeUserProfileFollow(slug)
                : followUserApi.getUserProfileFollow(slug)
            promise
                .then((article) => {
                    context.commit(mutationTypes.followUserSuccess, article)
                    resolve(article)
                })
                .catch(() => {
                    router.push( {name:"login"} )
                    // console.log(error)
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