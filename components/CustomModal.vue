<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 id="modal-title" class="text-lg font-bold">{{ title }}</h3>
        <button
          class="text-gray-400 hover:text-gray-600 focus:outline-none"
          @click="close"
        >
        <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="mb-4">
        <slot></slot>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["close"]);

const close = () => emits("close");

</script>


