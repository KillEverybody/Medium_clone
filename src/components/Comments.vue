<template >

  <div class='card' v-if='checkComment'>
    <div class='card-block'>
      <p class='card-text'>{{ initialValues.body }}</p>
    </div>
    <div class='card-footer'>
      <a href='' class='comment-author'>
        <img :src='initialValues.author.image' class='comment-author-img' />
      </a>
      <router-link
          class='comment-author'
          :to="{ name: 'userProfile', params: { slug: initialValues.author.username } }"
      >
        {{ initialValues.author.username }}
      </router-link>
      <span class='date-posted'>{{ initialValues.createdAt | date }}</span>
      <span v-if='isCurrentUser' class='mod-options'>
        <i class='ion-trash-a' @click='deleteComment(slug, initialValues.id)'></i>
      </span>
    </div>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {actionTypes as commentActionTypes} from '@/store/modules/comment'

export default {
  name: 'McvComments',
  props: {
    slug: {
      type: String,
      required: true
    },
    comment: {
      type: Object,
      required: true
    }
  },
  // data() {
  //   return {
  //     slugIn: this.slug,
  //     commentIn: this.comment
  //   }
  // },
  computed: {
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isCurrentUser() {
      if (this.initialValues.author.username === this.currentUser.username) {
        return this.initialValues.author.username === this.currentUser.username
      } else {
        return false
      }
    },
    checkComment() {
      console.log('SUKA',this.comment, 'SUKA 2', this.commentIn)
      if (this.comment === (null || undefined )) {
        return false
      } else {
        return true
      }
    },
    initialValues() {
      if (!this.comment) {
        return {
            author: {},
            title: "",
            description: "",
            body: "",
            tagList: [],
          createdAt: ""
        }
      }
      return this.comment
    }
  },
  methods: {
    deleteComment(slug, commentId) {
      this.$store.dispatch(commentActionTypes.deleteComment, {
        slug, commentId
      })
          .then(() => {
            this.$store.dispatch(commentActionTypes.getComment, {slug: this.$route.params.slug})
          }
      )
      this.$emit('deleteSubmit')
    }
  }

}
</script>

