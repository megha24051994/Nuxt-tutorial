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
              <PostItem v-for="post in posts" :key="post._id" :title="post.title" :subtitle ="post.subtitle" :date="post.createdAt"/>
            </div>
            <!-- end of post -->
          </div>
          <!-- end of side bar -->
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      posts: [
        {
          _id: '1',
          title: 'My First Post',
          subtitle: 'My First Subtitle',
          createdAt: new Date()
        },
        {
          _id: '2',
          title: 'My Second Post',
          subtitle: 'My Second Subtitle',
          createdAt: new Date()
        }
      ]
    }
  }

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
