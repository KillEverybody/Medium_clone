<template>
    <button @click='handleLike'
            :class="{
         btn:true,
        'btn-sm': true,
        'btn-primary': currentPage.following,
        'btn-outline-primary': !currentPage.following}">
        <i class='ion-heart' />
        <span >&nbsp;
            <span v-if='currentPage.following'>Unfollow {{currentPage.username}}</span>
            <span v-else> Follow {{currentPage.username}}</span>
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
            article: state => state.followUser.data,
            userProfile: state => state.followUser.userProfile
        }),
      currentPage() {
          if (this.$route.name === 'article') {
            return this.article
          } else {
            return this.userProfile
          }
      }
    },
    methods: {
        handleLike() {
            this.$store.dispatch(actionTypes.followUser, {
                slug: this.currentPage.username,
                isFollowed: this.currentPage.following})
          // this.$emit('my-event')
        }
    },
}
</script>
