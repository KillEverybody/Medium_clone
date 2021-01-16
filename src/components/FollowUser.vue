<template>
    <button @click='handleLike'
            :class="{
         btn:true,
        'btn-sm': true,
        'btn-primary': article.following,
        'btn-outline-primary': !article.following}">
        <i class='ion-heart' />
        <span >&nbsp;
            <span v-if='article.following'>Unfollow {{article.username}}</span>
            <span v-else> Follow {{article.username}}</span>

    </span>
    </button>
</template>

<script>
import {actionTypes} from '@/store/modules/followUser'
import {mapState} from 'vuex'

export default {
    name: 'McvFollowUser',
    computed:{
        ...mapState({
            article: state => state.followUser.data
        }),
    },
    methods: {
        handleLike() {
            this.$store.dispatch(actionTypes.followUser, {
                slug: this.article.username,
                isFollowed: this.article.following})
        }
    },
}
</script>
