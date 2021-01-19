import axios from 'axios'
//
// POST
// /articles/:slug/comments
//
// GET
//
// DELETE

const getComments = (slug) => {
    return axios
        .get(`/articles/${slug}/comments`)
        .then((response) => {
            console.log('api', response.data)
           return  response.data.comments
        })
}

const deleteComment = (slug, commentId) => {
    return axios.delete(`/articles/${slug}/comments/${commentId}`)
}

const createComment = (slug, payload) => {
    return axios
        .post(`/articles/${slug}/comments`, {comment: {body: payload}})
        // .then((response) => response.data.comments)
}


export default {
    getComments,
    deleteComment,
    createComment
}