<template>
  <div class="fetch-post p-8 w-full"></div>
</template>

<script>
export default {
  props: ['index', 'limit'],
  mounted() {
    console.log(this.index, this.limit)
  },
}
</script>