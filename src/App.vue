<template>
  <div id="app" class="container">
    <section class="section">
      <h1 class="title is-1">InspireMe</h1>
      <div class="columns">
        <div class="column is-half">
            <b-field label="Message">
            <b-input maxlength="200" type="textarea" placeholder="Enter your message"></b-input>
        </b-field>
        </div>
        <div class="column is-half">
              <b-field label="Background URL">
                <b-input v-model="name" type="url" placeholder="Enter bacgkround URL"></b-input>
              </b-field>
        </div>
      </div>
      <div class="column is-full">
        <b-button type="is-primary" size="is-medium" @click="generateImage">Generate Image</b-button>
      </div>
    </section>

    <section class="section">
      <b-image
            :src="require('@/assets/logo.png')"
            alt="Your Message"
            ratio="601by235"
        ></b-image>
    </section>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    generateImage() {
      this.$buefy.notification.open('Clicked')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
