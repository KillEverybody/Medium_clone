<template>

  <div class='settings-page' v-if='currentUser'>
    <div class='container page'>
      <div class='row'>
        <div class='col-md-6 offset-md-3 col-xs-12'>
          <h1 class='text-xs-center'>
            Your Settings
          </h1>
          <mcv-validation-errors
              v-if='validationErrors'
              :validation-errors='validationErrors' />
          <form @submit.prevent='onSubmit'>
            <fieldset>
              <fieldset class='form-group'>
                <input
                    type='text'
                    placeholder='URL of profile picture'
                    class='form-control form-control-lg'
                    v-model='form.image'>
              </fieldset>
              <fieldset class='form-group'>
                <input type='text' placeholder='Your username'
                       class='form-control form-control-lg' v-model='form.username'>
              </fieldset>
              <fieldset class='form-group'>
                <textarea
                    rows='8'
                    placeholder='Short bio about you'
                    class='form-control form-control-lg'
                    v-model='form.bio'
                >
                </textarea>
              </fieldset>
              <fieldset class='form-group'>
                <input type='text' placeholder='Email' class='form-control form-control-lg' v-model='form.email'>
              </fieldset>
              <fieldset class='form-group'>
                <input type='password' placeholder='Password'
                       class='form-control form-control-lg' v-model='form.password'
                ></fieldset>
              <button class='btn btn-lg btn-primary pull-xs-right' type='submit' :disabled='isSubmitting'>
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr>
          <button class='btn btn-outline-danger' @click='logout' >
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {getterTypes as authGetterTypes, actionTypes as authActionTypes} from '@/store/modules/auth'
import McvValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'McvSettings',
  components: {
    McvValidationErrors

  },
  computed: {
    ...mapState({
      isSubmitting: state => state.settings.isSubmitting,
      validationErrors: state => state.settings.validationErrors
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    form() {
      // if (this.currentUser) {
        return {
          username: this.currentUser.username,
          bio: this.currentUser.bio,
          image: this.currentUser.image,
          email: this.currentUser.email,
          password: ''
        }
      // }
      // return {
      //   username: '',
      //   bio: '',
      //   image: '',
      //   email: '',
      //   password: ''
      // }
    }
  },
  methods: {
    onSubmit() {
      console.log('ff!23')
      this.$store.dispatch(authActionTypes.updateCurrentUser, {currentUserInput: this.form})
    },
    logout() {
      console.log('logout')
      this.$store.dispatch(authActionTypes.logout).then(()=> this.$router.push({name: 'globalFeed'}))
    }
  }
}

</script>
