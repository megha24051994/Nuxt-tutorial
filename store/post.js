import INITIAL_DATA from './initial_data.json'
import Vue from 'vue'
export const state = () => {
    return {
       items: []
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
    fetchPosts({commit}) {
        console.log('Calling fetch posts')
        return fetchPostsAPI().then((posts) => {
            commit('setPosts',posts)
        })
    },

    createPost({commit}, postData) {
        //create post on a server or persist data
        postData._id =
        postData.createdAt = new Date();

        commit('addPost',postData)

    },

    updatePost({commit, state}, postData) {
        const postIndex = state.items.findIndex((post) => {
            return post._id === postData._id
        })
        commit('replacePost', {post : postData, index: postIndex})
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
    }  
}