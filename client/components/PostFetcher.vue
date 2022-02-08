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
  mounted() {
    const root = document.querySelector('#fetcher')
    const options = {
      //   root: document.querySelector('#fetcher'),
      rootMargin: '0px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(() => {
      if (!this.loading) {
        console.log('Fetching...')
      }
    }, options)

    observer.observe(root)
  },
}
</script>