<template>
<div>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  </head>
 <div>
   <Navbar />
  <div class="blogs-page">
    <div class="main-content">
      <div class="container">
        <div class="columns is-mobile">
          <div class="column is-8 is-offset-2">
            <div class="section">
              <div class="title">
                <h1>Newest Posts</h1>
                <hr>
              </div>
              <div v-if="posts && posts.length > 0">
              <PostItem v-for="post in posts" :key="post._id" :title="post.title" :subtitle ="post.subtitle" :date="post.createdAt" :isRead="post.isRead" :id="post._id"/>
              </div>
              <div v-else> 
                No posts
              </div>
            </div>
            <!-- end of post -->
          </div>
          <!-- end of side bar -->
        </div>
      </div>
    </div>
  </div>
  
    <!-- <form>
      <input type="text" v-model="form.title">
       <input type="text" v-model="form.subtitle">
    </form>
    {{isFormValid}} -->
</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { fetchPostsAPI } from '../store/post'

export default Vue.extend({
  data() {
    return {
        // form: {
        //        title : "Some title",
        //        subtitle: "Some subtitle"
        //    }
    }
  },
  // async asyncData() {
  //   const posts = await fetchPostsAPI()
  //   return { posts }
  // },
  // mounted() {
  //   this.$store.dispatch('post/fetchPosts')
  // },
  fetch({store}) {
    if(store.getters['post/hasEmptyItem'])
    return store.dispatch('post/fetchPosts')
  },
  mounted() {
    this.$store.dispatch('post/getArchivedItems')
  },
   computed: {
      posts() {
        return this.$store.state.post.items
      }
   },
    // isFormValid() {
    //   if(this.form.title) {
    //     return true
    //   }
    //   return false
    // }
  

})
</script>

<style >

.post-content {
  font-style: italic;
}

.post {
  margin-bottom: 20px;
  padding: 5px;
  border-bottom: 2px solid transparent;
}

.post:hover {
  border-bottom: 2px solid #e8e8e8;
}
</style>
