<template>
  <div class='article-page'>
    <div class='banner'>
      <div class='container' v-if='article'>
        <h1>{{ article.title }}</h1>
        <mcv-user-profile-box >  </mcv-user-profile-box>
    </div>
    </div>
    <div class='container page' v-if='article'>
      <mcv-loading v-if='isLoading' />
      <mcv-error-message v-if='error' :message='error' />
      <div class='row article-content' >
        <div class='col-xs-12'>
          <div>
            <p>{{ article.body }}</p>
          </div>
          <mcv-tag-list :tags='article.tagList'/>
        </div>
      </div>
        <hr>
        <div class='article-actions'>
          <mcv-user-profile-box  >  </mcv-user-profile-box>
        </div>
    </div>
  </div>


</template>

<script>

import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {mapState, mapGetters} from 'vuex'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTagList from '@/components/TagList'
import McvUserProfileBox from '@/components/UserProfileBox'



export default {
  name: 'McvArticle',
  components: {
      McvUserProfileBox,
    McvErrorMessage,
    McvLoading,
    McvTagList
  },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data,
      likedPost: state => state.addToFavorites.data
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isAuthor(){
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    },
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {slug: this.$route.params.slug})
  },
}
</script>

