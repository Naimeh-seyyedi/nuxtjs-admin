<template>
<div>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h4 class="fw-bold">دسته بندی : {{ category.name }}</h4>
  </div>

      <div class="row gy-4">
        <CustomInput
          label="نام"
          id="name"
          disabled
          :placeholder="category.name"
        />

        <CustomInput
          label="توضیحات"
          id="description"
          disabled
          :placeholder="category.description"
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
const { data: category } = await useFetch(() => "/api/dashboard/global", {
  query: { url: `/categories/${route.params.id}` },
  headers: useRequestHeaders(["cookie"]),
});
async function deleteUser() {
  try {
    loading.value = true;

    await $fetch("/api/dashboard/global", {
      method: "DELETE",
      query: { url: `/categories/${route.params.id}` },
    });

    toast.warning("حذف کاربر باموفقیت انجام شد");
    return navigateTo("/categories");
  } catch (error) {
    toast.error("کاربر را مشخص کنید");
  } finally {
    loading.value = false;
  }
}

</script>