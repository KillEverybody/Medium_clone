<template>
    <div class='article-meta'>
        <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
        >
            <img :src='article.author.image'>
        </router-link>
        <div class='info'>
            <router-link
                :to="{name: 'userProfile', params: {slug: article.author.username}}"
            >
                {{ article.author.username }}
            </router-link>
            <span class='date'>{{ article.createdAt | date }}</span>
        </div>
        <span v-if='isAuthor'>
            <router-link class='btn btn-outline-secondary btn-sm'
                         :to="{name: 'editArticle', params: {slug: article.slug}}">
              <i class='ion-edit' />
              Edit Article
            </router-link>
            <button class='btn btn-outline-danger btn-sm' @click='deleteArticle'>
              <i class='ion-trash-a' />
              Delete Article
            </button>
          </span>


        <span v-else>
              <mcv-follow-user

              ></mcv-follow-user>

            <mcv-add-to-favorites-article

            >
              <template v-slot:favorite>
               Unfavorite Article
              </template>
              <template  v-slot:unfavorite>
                Favorite Article
              </template>
            </mcv-add-to-favorites-article>


          </span>
    </div>


</template>

<script>

import McvFollowUser from '@/components/FollowUser'
import {mapGetters, mapState} from 'vuex'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {actionTypes as articleActionTypes} from '@/store/modules/article'
import McvAddToFavoritesArticle from '@/components/AddToFavoritesArticle'
export default {
    name: 'McvUserProfileBox',
    components: {
        McvAddToFavoritesArticle,
      McvFollowUser,

    },
    computed: {
        ...mapState({
            article: state => state.article.data,
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
    methods: {
        deleteArticle() {
            this.$store
                .dispatch(articleActionTypes.deleteArticle, {
                    slug: this.$route.params.slug
                })
                .then(() => {
                    this.$router.push({name: 'globalFeed'})
                })
        },
    },
}
</script>

