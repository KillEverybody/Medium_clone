<template>
    <button @click='handleLike'
            :class="{
         btn:true,
        'btn-sm': true,
        'btn-primary': isFollowedOptimistic,
        'btn-outline-primary': !isFollowedOptimistic}">
        <i class='ion-heart' />
        <span >&nbsp;
            <!--      <slot name='favoriteArticle' v-if='isFavoritedOptimistic' > Unfavorite Article </slot>-->
            <!--      <slot  name='unFavoriteArticle' v-else>Favorite Article </slot>-->
<!--      <slot name='favorite' v-if='isFavoritedOptimistic' ></slot>-->
<!--      <slot name='unfavorite' v-else ></slot>-->
            <span v-if='isFollowedOptimistic'>Unfollow {{articleSlug}}</span>
            <span v-else> Follow {{articleSlug}}</span>

    </span>
    </button>
</template>

<script>
import {actionTypes} from '@/store/modules/followUser'

export default {
    name: 'McvFollowUser',
    props: {
        isFollowed: {
            type: Boolean,
            required: true
        },
        articleSlug: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            isFollowedOptimistic: this.isFollowed,
        }
    },
    methods: {
        handleLike() {
            this.$store.dispatch(actionTypes.followUser, {
                slug: this.articleSlug,
                isFollowed: this.isFollowedOptimistic})
            this.isFollowedOptimistic = !this.isFollowedOptimistic
        }
    },
}
</script>
