<template>
  <div class="fetch-post p-8 w-full"></div>
</template>

<script>
export default {
  props: ['index'],
  data() {
    return {
      limit: 5,
    }
  },
  mounted() {
    console.log(this.index, this.limit)
  },
}
</script>