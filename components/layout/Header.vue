<template>
  <div
    class="py-4 px-5 border-b border-gray-200 flex justify-between items-center"
  >
    <button
      class="cursor-pointer block lg:hidden"
      @click="$emit('toggleSidebar')"
    >
      <i class="fa-solid fa-bars"></i>
    </button>
    <div class="hidden lg:block">پنل مدیریت</div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <i class="fa-regular fa-user"></i>
        <span class="text-gray-700 font-medium">{{ authUser?.name }}</span>
      </div>
      <a
        @click="logout"
        class="px-3 py-2 text-gray-700 hover:text-white hover:bg-red-500 transition-colors rounded-md flex items-center gap-2 cursor-pointer"
      >
        <i class="fa-solid fa-right-from-bracket"></i>
        خروج
      </a>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const { authUser } = useAuth();

async function logout() {
  await useFetch("/api/auth/logout", {
    method: "POST",
  });

  authUser.value = null;
  toast.warning("از سیستم خارج شدید");
  return navigateTo("/auth");
}
</script>
