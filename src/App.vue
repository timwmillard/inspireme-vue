<template>
  <div id="app" class="container">
    <section class="section form-section">
      <form id="form">
      <h1 class="title is-1">InspireMe</h1>
      <div class="columns">
        <div class="column is-half">
            <b-field label="Message">
            <b-input v-model="form.quote" maxlength="200" type="textarea" placeholder="Enter your message" required></b-input>
        </b-field>
        </div>
        <div class="column is-half">
              <b-field label="Background URL">
                <b-input v-model="form.backgroundUrl" type="url" placeholder="Enter bacgkround URL" required></b-input>
              </b-field>
        </div>
      </div>
      <div class="column is-full button-section">
        <b-button type="is-primary" size="is-medium" @click="generateImage">Generate Image</b-button>
      </div>
      </form>
    </section>

    <section class="section image-section">
      <img
            v-show="imageUrl != ''"
            :src="imageUrl"
            :alt="form.quote"
            :title="form.quote"
        >
    </section>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      form: {
        quote: '',
        backgroundUrl: '',
      },
      imageUrl: ''
    }
  },
  methods: {
    generateImage() {

      const form = document.querySelector('#form')
      if (!form.checkValidity()) {
        this.$buefy.notification.open('Please check form errors')
        return
      } 
      // this.$buefy.notification.open('Clicked')
      axios.post(process.env.VUE_APP_INSPIREME_API_URL, this.form)
        .then(res => {
          console.log(this)
          this.imageUrl = res.data.imageUrl
          console.log(this)
        })
        .catch(err => {
          console.log(err)
          this.$buefy.notification.open(err.toString())
        })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}

.title {
  text-align: center;
}

.form-section {
  background-color: #f5f2ff;
  border: 2px  #e7e0ff solid;
  color: white;
  border-radius: 10px;
}

.button-section {
  text-align: center; 
}

.image-section {
  text-align: center; 
}

</style>
