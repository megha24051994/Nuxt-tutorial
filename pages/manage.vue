<template>
<div>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  </head>
 <div>
  <div class="manage-page">
    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <!-- <a class="navbar-item" href="../">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox">
          </a> -->
          <div class="navbar-burger burger"
               aria-label="menu"
               aria-expanded="false"
               data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      <Navbar />
      </div>
    </nav>
    <div class="columns mail-app">
      <aside class="column is-2 aside hero">
            <post-create />
      </aside>
      <div class="column is-4 messages hero is-fullheight" id="message-feed">
        <div v-if="posts && posts.length > 0" class="inbox-messages" id="inbox-messages">
          <div class="card" v-for="item in posts" :key="item._id" @click="activatePost(item)">
            <div class="card-content">
              <div class="msg-header">
                <span class="msg-from"><small>From Filip Jerga</small></span>
                <span class="msg-timestamp">{{item.createdAt}}</span>
                <span class="msg-attachment"><i class="fa fa-paperclip"></i></span>
              </div>
              <div class="msg-subject">
                <span class="msg-subject"><strong id="fake-subject-1">{{item.title}}</strong></span>
              </div>
              <div class="msg-snippet">
                <p id="fake-snippet-1">{{item.subtitle}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="inbox-messages no-posts-title" v-else>
            There are no posts :(
        </div>
      </div>
      <div class="column is-6 message hero is-fullheight" id="message-pane">
        <div class="box message-preview">
          <button @click= "deletePost(activePost._id)" class="button is-danger delete-button">Delete</button>
          <post-manage :postData = "activePost"/>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Bulma Templates</strong> by <a href="https://github.com/dansup">Daniel Supernault</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          </p>
          <p>
            <a class="icon" href="https://github.com/dansup/bulma-templates">
            <i class="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    fetch({store}) {
    return store.dispatch('post/fetchPosts')
  },
  created() {
    this.setInitialActivePost();
  },
  components : {
      
  },
   computed: {
       ...mapState({
           posts:(state) => state.post.items
       })
   },
   data() {
       return {
         activePost: {}
       }
   },
   methods : {
     activatePost(post) {
       this.activePost = post
     },
     setInitialActivePost() {
      if (this.posts && this.posts.length > 0) {
        this.activePost = this.posts[0]
      } else {
        this.activePost = null
      }
    },
     deletePost(id) {
       console.log(id)
       this.$store.dispatch('post/deletePost',id)
       .then(() => {
         this.setInitialActivePost()
       })
     }
   }
}
</script>

<style>
  .manage-page {
    padding: 30px;
  }

  .card {
    margin-bottom: 10px;
  }

  .card:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }

  .delete-button {
    display: block;
    width: 100px;
    margin-left: auto;
    margin-right: 0;
}
</style>