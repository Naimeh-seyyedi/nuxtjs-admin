<template>
  <section>
    <div class="bg-white rounded-2xl p-5 w-full">
      <div class="px-4">
        <h2 class="font-bold text-2xl text-right pb-8">ویرایش دسته بندی</h2>
        <form @submit.prevent="onSubmit" class="flex flex-wrap gap-4">
          <CustomInput
            label="نام"
            id="name"
            v-model="name"
            :errorMessage="nameError"
            @blur="nameBlur"
          />
          <CustomInput
            label="توضیحات"
            id="description"
            v-model="description"
            :errorMessage="descriptionError"
            @blur="descriptionBlur"
          />
          <SumbitButton
            :label="'ویرایش'"
            :isLoading="isLoading"
            type="sumbit"
          />
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useForm, useField } from "vee-validate";
import { object, string } from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import CustomInput from "@/components/CustomInput.vue";

const route = useRoute();
const isLoading = ref(false);
const toast = useToast();
const { data: category } = await useFetch("/api/dashboard/global", {
  query: { url: `/categories/${route.params.id}` },
  headers: useRequestHeaders(["cookie"]),
});

const { values, errors, handleSubmit } = useForm({
  initialValues: {
    name: category.value?.name,
    description: category.value?.description,
  },
  validationSchema: toTypedSchema(
    object({
      name: string().required("نام الزامی است."),
      description: string().required("توضیحات الزامی است."),
    })
  ),
});

const {
  value: name,
  errorMessage: nameError,
  handleBlur: nameBlur,
} = useField("name");
const {
  value: description,
  errorMessage: descriptionError,
  handleBlur: descriptionBlur,
} = useField("description");

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    await $fetch("/api/dashboard/global", {
      method: "PUT",
      body: values,
      query: { url: `/categories/${category.value.id}` },
    });
    toast.success("ویرایش دسته بندی باموفقیت انجام شد");
    return navigateTo("/categories");
  } catch (error) {
    toast.error("همه فیلدها الزامی است");
  } finally {
    isLoading.value = false;
  }
});
</script>

<style></style>
