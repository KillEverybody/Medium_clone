<template>
    <button @click='handleLike'
            :class="{
         btn:true,
        'btn-sm': true,
        'btn-primary': isFavoritedOptimistic,
        'btn-outline-primary': !isFavoritedOptimistic}">
        <i class='ion-heart' />
        <span >&nbsp;
            <!--      <slot name='favoriteArticle' v-if='isFavoritedOptimistic' > Unfavorite Article </slot>-->
            <!--      <slot  name='unFavoriteArticle' v-else>Favorite Article </slot>-->
      <slot > &nbsp;   </slot>
      <slot name='favorite' v-if='isFavoritedOptimistic' ></slot>
      <slot name='unfavorite' v-else ></slot>
        <span v-if='routeCheck' >({{ favoritesCountOptimistic }}) </span>
        <span v-else>{{ favoritesCountOptimistic }}</span>

    </span>
    </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'
export default {
    name: 'McvAddToFavoritesFeed',
    props: {
        isFavorited: {
            type: Boolean,
            required: true
        },
        articleSlug: {
            type: String,
            required: true
        },
        favoritesCount: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            isFavoritedOptimistic: this.isFavorited,
            favoritesCountOptimistic: this.favoritesCount
        }
    },
    computed: {
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
                slug: this.articleSlug,
                isFavorited: this.isFavoritedOptimistic
            })
            if (this.isFavoritedOptimistic) {
                this.favoritesCountOptimistic = this.favoritesCountOptimistic - 1
            } else {
                this.favoritesCountOptimistic = this.favoritesCountOptimistic + 1
            }
            this.isFavoritedOptimistic = !this.isFavoritedOptimistic
        },
    }
}
</script>