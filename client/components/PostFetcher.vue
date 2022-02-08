<template>
  <div id="fetcher" class="fetch-post p-8 w-full"></div>
</template>

<script>
export default {
  props: ['index', 'loading'],
  data() {
    return {
      limit: 5,
    }
  },
  methods: {
    async getData() {
      const res = await fetch(
        `${process.env.baseUrl}/posts/paginated?page=${this.index}&limit=${this.limit}`
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
        const posts = await this.getData()
        this.$store.commit('posts/populate', posts)
      }
    }, options)

    observer.observe(root)
  },
}
</script>