import axios from '@/api/axios'

const getUserProfile = (slug) => {
    return axios.get(`/profiles/${slug}`).then((response) => {
        // console.log(response.data.profile)
        return response.data.profile
    })
}

export default {
    getUserProfile,
}
