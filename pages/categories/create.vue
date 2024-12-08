<template>
  <section>
    <div class="bg-white rounded-2xl p-5 w-full">
      <div class="px-4">
        <h2 class="font-bold text-2xl text-right pb-8">ایجاد دسته بندی</h2>
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
            type="text"
            v-model="description"
            :errorMessage="descriptionError"
            @blur="descriptionBlur"
          />
          <SumbitButton :label="'ایجاد'" :isLoading="isLoading" type="sumbit" />
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
import { useAuth } from "~/composables/useAuth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

const isLoading = ref(false);
const { authUser } = useAuth();
const router = useRouter();
const toast = useToast();
const { values, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required("نام الزامی است."),
      description: string().required("توضیحات الزامی است."),
    })
  ),
});

const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField("name");
const {
  value: description,
  errorMessage: descriptionError,
  handleBlur: descriptionBlur,
} = useField("description");

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    errors.value = [];

    await $fetch("/api/dashboard/global", {
      method: "POST",
      body: values,
      query: { url: "/categories" },
    });

    toast.success("ایجاد دسته بندی باموفقیت انجام شد");
    return navigateTo("/categories");
  } catch (error) {
    console.log("error");
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.spinner-border {
  border-top-color: transparent;
}
</style>
