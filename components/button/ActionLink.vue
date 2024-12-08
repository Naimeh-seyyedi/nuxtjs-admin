<template>
  <NuxtLink
    :to="to"
    :class="[buttonClass, icon ? 'flex items-center gap-2' : '']"
    class="px-4 py-2 rounded-md transition-colors"
  >
    <i v-if="icon" :class="icon"></i>
    {{ label }}
  </NuxtLink>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true, 
    },
    label: {
      type: String,
      required: true, 
    },
    icon: {
      type: String,
      default: "", 
    },
    buttonClass: {
      type: String,
      default: "bg-gray-400 hover:bg-gray-600 text-black",
    },
  },
};
</script>
