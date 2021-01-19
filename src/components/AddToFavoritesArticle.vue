<template>
  <button @click='handleLike'
          :class="{
         btn:true,
        'btn-sm': true,
        'btn-primary': this.article.favorited,
        'btn-outline-primary': !this.article.favorited}">
    <i class='ion-heart' />
    <span >&nbsp;
      <slot > &nbsp;   </slot>
      <slot name='favorite' v-if='this.article.favorited' ></slot>
      <slot name='unfavorite' v-else ></slot>
        <span v-if='routeCheck'>({{ this.article.favoritesCount }})</span>
        <span v-else>{{ this.article.favoritesCount }}</span>

    </span>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'
import {mapState} from 'vuex'

export default {
    name: 'McvAddToFavoritesArticle',
    computed: {
        ...mapState({
            article: state => state.addToFavorites.data
        }),
        routeCheck() {
            if (this.$route.name === 'article') {
                return true
            } else
                return false
        },
    },
    methods: {
        handleLike() {
            this.$store.dispatch(actionTypes.addToFavorites, {
                slug: this.article.slug,
                isFavorited: this.article.favorited,
            })
        },

    },
}
</script>
