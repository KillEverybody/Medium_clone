import followUserApi from '@/api/followUser'

export const mutationTypes = {
    followUserStart: '[followUser] followUser start',
    followUserSuccess: '[followUser] followUser success',
    followUserFailed: '[followUser] followUser failed',
}

export const actionTypes = {
    followUser: '[followUser] follow User',
}

const mutations = {
    [mutationTypes.followUserStart]() {},
    [mutationTypes.followUserSuccess]() {},
    [mutationTypes.followUserFailed]() {},
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
                    context.commit(mutationTypes.followUserFailed)
                })
        })
    },
}

export default {
    actions,
    mutations,
}