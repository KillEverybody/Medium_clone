<template >

    <div class='article-page' v-if='article'>
      <div class='banner'>
        <div class='container'>
          <h1>{{ article.title }}</h1>
          <mcv-user-profile-box></mcv-user-profile-box>
        </div>
      </div>
      <div class='container page'>
        <mcv-loading v-if='isLoading' />
        <mcv-error-message v-if='error' :message='error' />
        <div class='row article-content'>
          <div class='col-xs-12'>
            <div>
              <p>{{ article.body }}</p>
            </div>
            <mcv-tag-list :tags='article.tagList' />
          </div>
        </div>
        <hr>
        <div class='article-actions'>
          <mcv-user-profile-box></mcv-user-profile-box>
        </div>
        <div class='row'>
          <div class='col-xs-12 col-md-8 offset-md-2'>
           <mcv-comment-create
               v-if='currentUser'
           :slug='$route.params.slug'
           :user-image='currentUser.image'

           ></mcv-comment-create>

            <p v-else>
              <router-link :to="{ name: 'login' }">Sign in</router-link>
              or
              <router-link :to="{ name: 'register' }">sign up</router-link>
              to add comments on this article.
            </p>

              <mcv-comments
                  v-for='(comment, index) in comments'
                  :slug='$route.params.slug'
                  :comment='comment'
                  :key='index'

              ></mcv-comments>
          </div>
        </div>
      </div>
    </div>


</template>

<script>

import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {actionTypes as commentActionTypes} from '@/store/modules/comment'
import {mapState, mapGetters} from 'vuex'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTagList from '@/components/TagList'
import McvUserProfileBox from '@/components/UserProfileBox'
import McvComments from '@/components/Comments'
import McvCommentCreate from '@/components/CommentCreate'


export default {
  name: 'McvArticle',
  components: {
    McvCommentCreate,
    McvComments,
    McvUserProfileBox,
    McvErrorMessage,
    McvLoading,
    McvTagList
  },
  computed: {
    ...mapState({
      comments: state => state.comment.comments,
      isLoadingComments: state => state.comment.isLoadingC,
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data,
      likedPost: state => state.addToFavorites.data

    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    // initComments() {
    //   console.log('initComments  ', Object.keys(this.comments).length, this.comments)
    //   if (Object.keys(this.comments).length > 0) {
    //     console.log('initComments true ', Object.keys(this.comments).length, this.comments)
    //     return this.comments
    //   } else {
    //     console.log('initComments  false', Object.keys(this.comments).length, this.comments)
    //     return false
    //   }
    // },
    // checkComments() {
    //   console.log('CheckComments  ', this.comments)
    //   return this.comments
    // }
    // isAuthor(){
    //   if (!this.currentUser || !this.article) {
    //     return false
    //   }
    //   return this.currentUser.username === this.article.author.username
    // },
  },
  created() {
     // console.log(' fsd', this.$route)
    this.$store.dispatch(commentActionTypes.getComment, {slug: this.$route.params.slug})
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {slug: this.$route.params.slug}).then(
        setTimeout(()=> this.$store.dispatch(commentActionTypes.getComment, {slug: this.$route.params.slug}), 1000)
    )
    // this.$store.dispatch(commentActionTypes.getComment, {slug: this.$route.params.slug})
  }


}
</script>

