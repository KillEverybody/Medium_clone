<template>
  <div class='article-page'>
    <div class='banner'>
      <div class='container' v-if='article'>
        <h1>{{ article.title }}</h1>
<!--        <div class='article-meta'>-->
<!--          <router-link-->
<!--              :to="{name: 'userProfile', params: {slug: article.author.username}}"-->
<!--          >-->
<!--            <img :src='article.author.image'>-->
<!--          </router-link>-->
<!--          <div class='info'>-->
<!--            <router-link-->
<!--                :to="{name: 'userProfile', params: {slug: article.author.username}}"-->
<!--            >-->
<!--              {{ article.author.username }}-->
<!--            </router-link>-->
<!--            <span class='date'>{{ article.createdAt }}</span>-->
<!--          </div>-->
<!--          <span v-if='isAuthor'>-->
<!--            <router-link class='btn btn-outline-secondary btn-sm'-->
<!--                         :to="{name: 'editArticle', params: {slug: article.slug}}">-->
<!--              <i class='ion-edit' />-->
<!--              Edit Article-->
<!--            </router-link>-->
<!--            <button class='btn btn-outline-danger btn-sm' @click='deleteArticle'>-->
<!--              <i class='ion-trash-a' />-->
<!--              Delete Article-->
<!--            </button>-->
<!--          </span>-->
<!--          <span v-else>-->
<!--            <button class='btn btn-sm btn-outline-secondary'>-->
<!--              <i class='ion-plus-round'/>-->
<!--              &nbsp; Follow &nbsp; &nbsp;-->
<!--            </button>-->

<!--            <button-->
<!--              class='btn btn-sm btn-outline-primary'>-->
<!--              <i class='ion-heart'/>-->
<!--              &nbsp; Favorite Article-->
<!--              <span-->
<!--              class='counter'-->
<!--              >-->
<!--                &nbsp; (0)-->
<!--              </span>-->
<!--            </button> -->
<!--              <mcv-follow-user-->
<!--                  :is-followed='article.following'-->
<!--                  :article-slug='article.author.username'-->
<!--              />-->

<!--            <mcv-add-to-favorites-->
<!--                :is-favorited='article.favorited'-->
<!--                :article-slug='article.slug'-->
<!--                :favorites-count='article.favoritesCount'-->
<!--            >-->
<!--              <template v-slot:favorite>-->
<!--               Unfavorite Article {{log()}}-->
<!--              </template>-->
<!--              <template  v-slot:unfavorite>-->
<!--                Favorite Article-->
<!--              </template>-->
<!--            </mcv-add-to-favorites>-->


<!--          </span>-->

<!--        </div>-->
<!--      </div>-->

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
// import McvAddToFavorites from '@/components/AddToFavorites'
// import McvFollowUser from '@/components/FollowUser'
import McvUserProfileBox from '@/components/UserProfileBox'

export default {
  name: 'McvArticle',
  components: {
      McvUserProfileBox,
    //   McvFollowUser,
    // McvAddToFavorites,
    McvErrorMessage,
    McvLoading,
    McvTagList
  },
    // data() {
    //   return {
    //       counter: 0
    //   }
    // },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
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
    // this.getUserProfile()
    //   this.getUserProfile()
  },
// methods: {
//       onClickComponent() {
//           this.counter++
//       }
// },
    // watch: {
    //     onClickComponent() {
    //         this.$store.dispatch(articleActionTypes.getArticle, {slug: this.$route.params.slug})
    //     }
    // }
  // methods: {
  //   deleteArticle() {
  //     this.$store
  //         .dispatch(articleActionTypes.deleteArticle, {
  //           slug: this.$route.params.slug
  //         })
  //         .then(() => {
  //             this.$router.push({name: 'globalFeed'})
  //         })
  //   },
  // },
  // watch: {
  //   userProfileSlug() {
  //     this.article()
  //   }
  // },
}
</script>

