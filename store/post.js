import {INITIAL_DATA} from './index'
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
        },200)
    })
}

export const actions = {
    fetchPosts({commit}) {
        console.log('Calling fetch posts')
        return fetchPostsAPI().then((posts) => {
            commit('setPosts',posts)
        })
    }
}

export const mutations = {
    setPosts(state, posts) {
        state.items = posts
    }   
}