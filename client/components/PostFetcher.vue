<template>
  <div id="fetcher" class="fetch-post p-8 w-full"></div>
</template>

<script>
export default {
  props: ['loading'],
  data() {
    return {
      limit: 5,
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts.posts
    },
    currentPage() {
      return this.$store.state.posts.currentPage
    },
  },
  methods: {
    async getData() {
      const res = await fetch(
        `${process.env.baseUrl}/posts/paginated?page=${this.currentPage}&limit=${this.limit}`
      )
      const data = await res.json()
      console.log(data)
      return data.result
    },
  },
  mounted() {
    const root = document.querySelector('#fetcher')
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(async () => {
      if (!this.loading) {
        console.log('Fetching...')
        const newPosts = await this.getData()
        const populatedPosts = [...this.posts, ...newPosts]
        this.$store.commit('posts/populate', populatedPosts)
      }
    }, options)

    observer.observe(root)
  },
}
</script>