<template>
  <div>
    <div class="left absolute left-2 flex flex-col gap-2 items-center">
      <button @click="$emit('up', index)">
        <img
          v-if="liked"
          src="/images/cta/active-up-arrow.svg"
          class="w-6 text-blue-200"
        />
        <img v-else src="/images/cta/up-arrow.svg" class="w-6 text-blue-200" />
      </button>
      <span>{{ totalLikes }}</span>
      <button @click="$emit('down', index)">
        <img
          v-if="disliked"
          src="/images/cta/active-down-arrow.svg"
          class="w-6 text-blue-200"
        />
        <img
          v-else
          src="/images/cta/down-arrow.svg"
          class="w-6 text-blue-200"
        />
      </button>
    </div>
    <div class="right w-full text-center">
      <h1 class="text-center font-extrabold text-l mb-12">{{ title }}</h1>

      <h3 v-if="body.length < 250" class="body text-justify">{{ body }}</h3>
      <h3 v-else class="body text-justify">{{ body.substring(0, 250) }}...</h3>

      <span
        v-if="body.length >= 250"
        class="read-more cursor-pointer underlined"
        >Read More</span
      >
      <div
        class="
          details
          absolute
          bottom-0
          left-0
          flex
          justify-between
          w-full
          px-8
          py-2
        "
      >
        <div class="flex items-end">
          <img :src="dp" class="w-12 mr-2 profile" />
          <span class="flex">
            <h1 class="text-blue-500 mr-1">{{ author }}</h1>
            <h3 class="text-gray-500 italic">• author</h3>
          </span>
        </div>
        <div class="flex items-center gap-2">
          <img src="/images/icons/comment.svg" class="w-4" />
          <span class="text-blue-500 text-2xl">{{ totalComments }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    liked: Boolean,
    disliked: Boolean,
    totalLikes: Number,
    body: String,
    index: Number,
    dp: String,
    author: String,
    totalComments: Number,
  },
}
</script>

<style scoped>
.left {
  top: 50%;
  transform: translateY(-50%);
}
.read-more {
  color: var(--c-pri);
}
.body {
  margin-bottom: 15px;
}
.details {
  width: calc(100% - 70px);
  border-top: 1px solid rgba(0, 0, 0, 0.7);
  width: 100%;
}
img.profile {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
</style>