import axios from '@/api/axios'

const getUrl = (slug) => `/profiles/${slug}/follow`

const getUserProfileFollow = (slug) => {
    const url = getUrl(slug)
    return axios.post(url).then((response) => {
        // console.log(response.data.profile)
        return response.data.profile
    })
}

const removeUserProfileFollow = (slug) => {
    const url = getUrl(slug)
    return axios.delete(url).then((response) => {
      return  response.data.profile
    })


}

export default {
    getUserProfileFollow,
    removeUserProfileFollow

}
