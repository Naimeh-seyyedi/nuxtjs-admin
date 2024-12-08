<template>
  <div class="relative">
    <LayoutHeader @toggleSidebar="toggleSidebar" />
    <main class="flex min-h-screen">
      <LayoutSidebar :isOpen="isSidebarOpen" @closeSidebar="closeSidebar" />
      <div class="flex-1 p-4 w-full">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value; 
};
const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>
