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
          <a class="navbar-item" href="../">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox">
          </a>
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
        <div>
          <div class="compose has-text-centered">
            <Modal />
          </div>
          <div class="main">
          </div>
        </div>
      </aside>
      <div class="column is-4 messages hero is-fullheight" id="message-feed">
        <div class="inbox-messages" id="inbox-messages">
          <div class="card" v-for="item in posts" :key="item._id">
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
      </div>
      <div class="column is-6 message hero is-fullheight is-hidden" id="message-pane">
        <div class="box message-preview">
          <div class="top">
            <div class="avatar">
              <img src="https://placehold.it/128x128">
            </div>
            <div class="address">
              <div class="name">John Smith</div>
              <div class="email">someone@gmail.com</div>
            </div>
            <hr>
            <div class="content">
            </div>
          </div>
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
import  Modal  from '../components/shared/Modal'

export default {
     fetch({store}) {
    return store.dispatch('post/fetchPosts')
  },
  components : {
      Modal
  },
   computed: {
       ...mapState({
           posts:(state) => state.post.items
       })
   },
   data() {
       return {
         
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
</style>