import INITIAL_DATA from './initial_data.json'
import Vue from 'vue'
export const state = () => {
    return {
       items: [],
       archivedItems: [],
       item : {}
    }
}

export const getters = {
    hasEmptyItem(state) {
        return state.items.length == 0
    }
}

export function fetchPostsAPI() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(INITIAL_DATA.posts)
        },0)
    })
}

export const actions = {
    getArchivedItems({commit}) {
        const archivedPosts = localStorage.getItem('archived_posts')
        if(archivedPosts) {
            commit('setArchivedPosts',JSON.parse(archivedPosts))
            return archivedPosts
        }
        else {
            localStorage.setItem('archived_posts',JSON.stringify([]))
            return []

        }
    },

    getItem({commit},postId) {
        return this.$axios.$get('/api/posts')
        .then((posts) => {
          const selectedPost = posts.find((p) => p._id === postId)
          commit('setPost', selectedPost)
          return selectedPost
        })
    },

    togglePost({state, commit}, postId) {

        if(state.archivedItems.includes(postId)) {
            const postIndex = state.archivedItems.findIndex(post => 
                 post === postId
            )
            commit('removeArchivedPost', postIndex)
            localStorage.setItem('archived_posts', JSON.stringify(state.archivedItems))
            return postId
        }
        else {
           commit('addArchivedPost',postId) 
           localStorage.setItem('archived_posts', JSON.stringify(state.archivedItems))
           return postId
        }

    },

    fetchPosts({commit}) {
        console.log('Calling fetch posts')
        return this.$axios.$get('/api/posts').then((posts) => {
            commit('setPosts',posts)
        })
    },

    createPost({commit}, postData) {
        //create post on a server or persist data
        postData._id = Math.random().toString(36).substr(2, 7)
        postData.createdAt = new Date().getTime();
        return this.$axios.$post('/api/posts',postData).then((res) => {
            console.log(res)
            commit('addPost',postData)
            return postData
        })
    },

    updatePost({commit, state}, postData) {
        const postIndex = state.items.findIndex((post) => {
            return post._id === postData._id
        })
        if(postIndex != -1) {
        return this.$axios.$patch(`/api/posts/${postData._id}`,postData)
        .then((res) => {
            console.log(res)
            commit('replacePost', {post : postData, index: postIndex})
            return postData
        })    
        }
    },

    deletePost({commit, state}, id) {
        const postIndex = state.items.findIndex((post) => {
            return post._id === id
        })

        if(postIndex != -1) {
            return this.$axios.$delete(`/api/posts/${id}`)
            .then((res) => {
                console.log(res)
                commit('deletePost', postIndex)
                return id
            })    
        }
    }
}

export const mutations = {
    setPosts(state, posts) {
        state.items = posts
    },
    addPost(state,post) {
        state.items.push(post)
    },
    replacePost(state, {post, index}) {
        Vue.set(state.items, index, post)
    },
    
    deletePost(state, index) {
        state.items.splice(index,1)
    },

    setArchivedPosts(state, posts) {
        state.archivedItems = posts
    },

    addArchivedPost(state, postId) {
        state.archivedItems.push(postId)
    },

    removeArchivedPost(state, index) {
        state.archivedItems.splice(index,1)
    },

    setPost(state, post) {
        state.item = post
    }
}