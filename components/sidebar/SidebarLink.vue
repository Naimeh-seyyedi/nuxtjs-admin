<template>
    <NuxtLink
      :to="to"
      :class="[
        baseClass,
        $route.path.includes(to) ? activeClass : inactiveClass
      ]"
      class="p-2 rounded transition-colors flex items-center gap-2"
    >
      <i v-if="icon" :class="icon"></i>
      <slot />
    </NuxtLink>
  </template>
  
  <script setup>
 
  
  defineProps({
    to: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
    activeClass: {
      type: String,
      default: "bg-gray-500 text-white",
    },
    inactiveClass: {
      type: String,
      default: "hover:bg-gray-200 text-black",
    },
    baseClass: {
      type: String,
      default: "",
    },
  });
  </script>
  