export const state = () => ({
  posts: [],
  currentPage: 1,
})

export const mutations = {
  up(state, index) {
    if (!state.posts[index].liked) {
      state.posts[index].liked = true
      state.posts[index].totalLikes++
      state.posts[index].disliked = false
    } else {
      state.posts[index].liked = false
      state.posts[index].totalLikes--
    }
  },
  down(state, index) {
    if (!state.posts[index].disliked) {
      state.posts[index].disliked = true
      state.posts[index].totalLikes--
      state.posts[index].liked = false
    } else {
      state.posts[index].disliked = false
    }
  },
  create(state, post) {
    state.posts.push(post)
  },
  populate(state, posts) {
    state.posts = posts
  },
  nextPage(state) {
    state.currentPage += 1
  },
}
