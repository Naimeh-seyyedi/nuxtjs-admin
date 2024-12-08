<template>
  <div class="w-full">
    <label :for="id" class="block text-right mb-1">{{ label }}</label>
    <input
      class="w-full border border-gray-300 rounded-md p-2"
      :id="id"
      :type="type"
      v-model="fieldValue"
      :class="{
        'border-red-500': errorMessage,
        'bg-gray-200 cursor-not-allowed': disabled
      }"
      :disabled="disabled"
      @blur="handleBlur"
      :placeholder="placeholder"
    />
    <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { defineProps } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  id: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
});

const {
  value: fieldValue,
  errorMessage,
  handleBlur
} = useField(props.id);
</script>

<style scoped>
</style>
