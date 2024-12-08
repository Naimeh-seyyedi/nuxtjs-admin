<template>
    <div class="mb-4">
      <div class="flex justify-center">
        <div class="w-80">
          <div v-if="image" class="relative">
            <img :src="image" alt="primary image" class="w-full h-auto rounded-lg shadow-md" />
            <div @click="removeImage" class="absolute top-0 right-0 p-2 cursor-pointer">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
  
          <div v-else>
            <label for="formFile" class="block text-lg font-medium text-gray-700 mb-2">تصویر اصلی</label>
            <div class="relative">
              <input
                @change="imageFile"
                :disabled="loading"
                class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="file"
                id="formFile"
              />
              <div
                v-if="loading"
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary"
              >
                <div class="spinner-border spinner-border-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['setPrimaryImage']);
  const image = ref(null);
  const loading = ref(false);
  
  function imageFile(e) {
    loading.value = true;
  
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
  
    reader.onloadend = () => {
      image.value = reader.result.toString();
      loading.value = false;
    };
  
    emit('setPrimaryImage', e.target.files[0]);
  }
  
  function removeImage() {
    image.value = null;
    emit('setPrimaryImage', null);
  }
  </script>
  