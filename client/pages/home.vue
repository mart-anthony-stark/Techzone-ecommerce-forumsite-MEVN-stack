<template>
  <div class="home mt-24">
    <ErrorModal v-if="createPostError.length !== 0" :error="createPostError" />
    <CreatePost
      @createdPost="handleCreatedPost"
      v-if="createShown"
      @closeCreatePost="handleCreatedPost"
      @error="handlePostError"
    />
    <h1 class="font-bold text-center text-4xl mb-8 text-sec">Tech Forum</h1>

    <!-- SEARCH BAR -->
    <div class="flex justify-center gap-20 flex-wrap mb-8 relative">
      <div class="search-container flex relative rounded-lg">
        <input
          v-model="search"
          class="search rounded-lg py-2 px-4 bg-transparent w-full"
          type="text"
          placeholder="Search topics..."
        />
        <img
          class="absolute right-4 w-8 top-1"
          src="/images/search.svg"
          alt="search topics"
        />
      </div>
    </div>

    <div class="mb-8 flex justify-end pr-20">
      <button
        v-if="isAuth"
        class="post-btn bg-pri rounded text-white extrbold px-6 py-2"
        @click="createShown = true"
      >
        + Create new post
      </button>
    </div>

    <div class="px-4 flex gap-20 flex-wrap justify-center pb-8">
      <LoadingCards v-for="(loader, i) in loaders" v-show="loading" :key="i" />

      <div
        v-for="(post, i) in filteredPost"
        :key="post.body"
        class="
          card
          p-12
          pb-20
          bg-gray-200
          rounded-lg
          flex
          gap-4
          relative
          justify-center
          align-center
        "
      >
        <Post
          :title="post.title"
          :liked="post.liked"
          :total-likes="post.totalLikes"
          :disliked="post.disliked"
          :body="post.body"
          :index="i"
          :author="post.author"
          :dp="post.author.img"
          :total-comments="post.comments.length"
          @up="up"
          @down="down"
        />
      </div>
      <Noresult v-if="filteredPost.length === 0 && !loading" />
      <PostFetcher :loading="loading" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createShown: false,
      search: '',
      loading: true,
      loaders: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      createPostError: '',
    }
  },
  computed: {
    currentPage() {
      return this.$store.state.posts.currentPage
    },
    isAuth() {
      return this.$store.state.auth.isLogged
    },
    posts() {
      return this.$store.state.posts.posts
    },
    filteredPost() {
      const regex = new RegExp(this.search, 'i')
      return this.posts.filter((post) => {
        return (
          post.title.match(regex) ||
          post.body.match(regex) ||
          post.author.name.match(regex)
        )
      })
    },
  },
  methods: {
    handlePostError(err) {
      console.log({ err, postError: this.createPostError })
      this.createPostError = err
    },
    async getPosts() {
      const res = await fetch(
        `${process.env.baseUrl}/posts/paginated?page=${this.currentPage}&limit=5`
      )
      const data = await res.json()
      this.loading = false
      return data.result
    },
    up(index) {
      this.$store.commit('posts/up', index)
    },
    down(index) {
      this.$store.commit('posts/down', index)
    },
    handleCreatedPost() {
      this.createPostError = ''
      this.createShown = false
      this.getPosts()
    },
  },
  async mounted() {
    const posts = await this.getPosts()

    this.$store.commit('posts/populate', posts)
    if (posts.length !== 0) this.$store.commit('posts/nextPage')
  },
  destroyed() {
    this.$store.commit('posts/resetPages')
  },
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}
.card {
  max-width: 500px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.left {
  top: 50%;
  transform: translateY(-50%);
}
input.search::placeholder {
  color: black;
}
.arrow-liked {
  fill: var(--c-pri);
}
.arrow-disliked {
  fill: var(--c-accent);
}
.search-container {
  max-width: 600px;
  width: 100%;
  background: #e5e5e5;
}
</style>