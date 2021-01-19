<template>

    <div>
      <mcv-validation-errors v-if='errors' :validation-errors='errors' />
      <form class="card comment-form" @submit.prevent="onSubmit(slug, comment)">
        <div class="card-block">
        <textarea
            class="form-control"
            v-model="comment"
            placeholder="Write a comment..."
            rows="3"
        >
        </textarea>
        </div>
        <div class="card-footer">
          <img :src="userImage" class="comment-author-img" />
          <button class="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>
    </div>

</template>

<script>
import {actionTypes as createCommentActionTypes} from '@/store/modules/createComment'
import McvValidationErrors from '@/components/ValidationErrors'
import {mapState} from 'vuex'
import {actionTypes as commentActionTypes} from '@/store/modules/comment'

export default {
  name: 'McvCommentCreate',
  components: {McvValidationErrors},
  props: {
    slug: { type: String, required: true },
    userImage: { type: String, required: false }
  },
  data() {
    return {
      comment: this.content || null,
      // errors: {}
    };
  },
  computed: {
    ...mapState({
      errors: state => state.createComment.error
    })
  },
  methods: {
    onSubmit(slug, comment) {
      this.$store
          .dispatch(createCommentActionTypes.createComment, { slug, comment })
          .then(() => {
            this.comment = null;
             // this.errors = null;
            this.$store.dispatch(commentActionTypes.getComment, {slug: this.$route.params.slug})

          })
          // .catch(({ response }) => {
          //   this.errors = response.data.errors;
          // });
    }
  }
}
</script>

