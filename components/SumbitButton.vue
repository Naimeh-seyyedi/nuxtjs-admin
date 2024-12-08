<template>
    <button
      :type="type"
      :class="[
        'bg-gray-400 hover:bg-gray-600 text-black rounded-md transition-colors mt-4 relative w-20 h-8'
      ]"
      :disabled="isLoading"
      @click="handleClick"
    >
      <span
        v-if="isLoading"
        class="absolute inline-block w-4 h-4 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"
        style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
      ></span>
      <span v-if="!isLoading" class="text-black">{{ label }}</span>
    </button>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      required: false,
    },
    type: {
      type: String,
      default: "button",
    },
  });
  
  // Handle the click event
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(); 
    }
  };
  </script>
  