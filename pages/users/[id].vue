<template>
  <div>
    <div
      class="flex justify-between flex-wrap md:flex-nowrap items-center py-3 pb-2 mb-3 border-b"
    >
      <h4 class="font-bold">کاربر : {{ user.name }}</h4>
    </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CustomInput label="نام" id="name" disabled :placeholder="user.name" />
        <CustomInput
          label="ایمیل"
          id="name"
          disabled
          :placeholder="user.email"
        />

        <CustomInput
          label="شماره تماس"
          id="cellphone"
          disabled
          :placeholder="user.cellphone"
        />
       
      </div>
  
    <SumbitButton
      :label="'حذف'"
      :isLoading="loading"
      type="button"
      @click="deleteUser"
    />
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import SumbitButton from "~/components/SumbitButton.vue";

const route = useRoute();
const loading = ref(false);
const toast = useToast();
const { data: user } = await useFetch(() => "/api/dashboard/global", {
  query: { url: `/users/${route.params.id}` },
  headers: useRequestHeaders(["cookie"]),
});
async function deleteUser() {
  try {
    loading.value = true;

    await $fetch("/api/dashboard/global", {
      method: "DELETE",
      query: { url: `/users/${route.params.id}` },
    });

    toast.warning("حذف کاربر باموفقیت انجام شد");
    return navigateTo("/users");
  } catch (error) {
    toast.error("کاربر را مشخص کنید");
  } finally {
    loading.value = false;
  }
}
</script>
