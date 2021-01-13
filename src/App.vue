<template>
  <div id="app">

    <!-- Navbar -->
    <nav class="navbar container is-fluid level">
      <b-button type="is-outline" :icon-right="showFormIcon" size="is-large" class="level-left" v-on:click="toogleShowForm" />
      <h1 class="title is-3 level-item has-text-centered logo">InspireMe</h1>
    </nav>

    <!-- Main section -->
    <section class="section"> 
      <div class="columns is-fullheight">
        <form id="form" v-show="showForm" class="column is-one-third form">
          <h3 class="title is-4">Image Details</h3>
          <b-field label="Message">
            <b-input v-model="form.quote" maxlength="200" type="textarea" placeholder="Enter your message" required></b-input>
          </b-field>
          <b-field label="Background URL">
            <b-input v-model="form.backgroundUrl" type="url" placeholder="Enter bacgkround URL" required></b-input>
          </b-field>
            <figure class="image">
              <img v-show="form.backgroundUrl != ''"
                        :src="form.backgroundUrl"
                        alt="Background Image"
                        title="Background Image"
                        class="bg-img">
            </figure>
            <b-button type="is-primary" size="is-medium" expanded @click="generateImage" style="margin-top: 40px">Generate Image</b-button>
        </form>

        <figure class="image">
          <img v-show="imageUrl != ''"
                    :src="imageUrl"
                    :alt="form.quote"
                    :title="form.quote"
                    class="main-img">
          <b-loading :is-full-page="false" v-model="imageLoading" :can-cancel="false"></b-loading>
        </figure>
      </div>
    </section>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      showForm: true,
      showFormIcon: "menu-open",
      imageLoading: false,
      form: {
        quote: '',
        backgroundUrl: '',
      },
      imageUrl: ''
    }
  },
  methods: {
    toogleShowForm() {
      this.showForm = !this.showForm

      if (this.showForm) {
        this.showFormIcon = "menu-open"
      } else {
        this.showFormIcon = "menu"
      }
    },
    generateImage() {
      const form = document.querySelector('#form')
      if (!form.checkValidity()) {
        this.$buefy.notification.open('Please check form errors')
        return
      } 
      this.imageLoading = true
      // this.$buefy.notification.open('Clicked')
      axios.post(process.env.VUE_APP_INSPIREME_API_URL, this.form)
        .then(res => {
          this.imageUrl = res.data.imageUrl
        })
        .catch(err => {
          let errMsg = ''
          if( err.response ){
            console.log(err.response.data);
            errMsg = err.response.data.message
          } else {
            errMsg = err.toString()
          }
          this.$buefy.notification.open(errMsg)
        })
        .finally(() => {
          this.imageLoading = false
        })
    }
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}

.navbar {
  background: linear-gradient(-90deg, #84cf6a, #16c0b0);
  height: 60px;
  margin-bottom: 25px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.57);
  display: flex;
}

.logo {
  font-family: 'Roboto Slab', serif;
  color: white;
}

/* @media sceen and (max-width: 480px) {
  .image {
    padding: 40px;
  }
} */

.bg-img {
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.main-img {
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.6);
  border-radius: 5px;

}

.image {
  width: 100%;
  object-fit: fill;
  padding: 0 30px 0 30px;
}

/* img {
  border: 1px solid #eeeeee;
  width: 80%;
  margin: 0px;
  padding: 10px;
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
} */


.title {
  text-align: center;
}

.form {
  /* margin-top:-60px;
  margin-left: -10px; */
  background: #f1f5fa;
  border-radius: 5px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.2);
}

.button-section {
  text-align: center; 
}

.image-section {
  text-align: center; 
}

</style>
