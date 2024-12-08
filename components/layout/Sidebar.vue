<template>
  <div
    :class="[
      'transition-transform duration-300',
      isOpen ? 'transform translate-x-0' : 'transform translate-x-full',
      'lg:translate-x-0 lg:block lg:w-64',
    ]"
    class="absolute lg:static top-0 right-0 bottom-0 w-64 bg-[#f8f9fa] text-black min-h-full z-20 p-4"
  >
    <button
      class="absolute top-4 left-4 block lg:hidden"
      @click="$emit('closeSidebar')"
    >
      <i class="fa-solid fa-times"></i>
    </button>
    <div class="flex flex-col gap-y-4 pt-5">
      <SidebarLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :icon="link.icon"
      >
        {{ link.label }}
      </SidebarLink>
    </div>
  </div>
</template>

<script  setup>
import { defineProps } from "vue";

defineProps({
  isOpen: Boolean,
});

const links = [
  { to: "/users", icon: "fa-regular fa-user", label: "کاربران" },
  { to: "/products", icon: "fa-regular fa-box", label: "محصولات" },
  { to: "/categories", icon: "fa-regular fa-list", label: "دسته‌بندی" },


];

</script>
