<template>
  <section>
    <div class="bg-white rounded-2xl p-5 w-full">
      <div class="px-4">
        <h2 class="font-bold text-2xl text-right pb-8">ایجاد کاربر</h2>
        <form @submit.prevent="onSubmit" class="flex flex-wrap gap-4">
          <CustomInput
            label="نام"
            id="name"
            v-model="name"
            :errorMessage="nameError"
            @blur="nameBlur"
          />
          <CustomInput
            label="ایمیل"
            id="email"
            v-model="email"
            :errorMessage="emailError"
            @blur="emailBlur"
          />
          <CustomInput
            label="شماره موبایل"
            id="cellphone"
            v-model="cellphone"
            :errorMessage="cellphoneError"
            @blur="cellphoneBlur"
          />
          <CustomInput
            label="رمز عبور"
            id="password"
            type="password"
            v-model="password"
            :errorMessage="passwordError"
            @blur="passwordBlur"
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

// وضعیت‌های لودینگ و مدیریت خطا
const isLoading = ref(false);
const { authUser } = useAuth();
const router = useRouter();
const toast = useToast();

// استفاده از فرم و اعتبارسنجی
const { values, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required("نام الزامی است."),
      email: string().email("ایمیل معتبر وارد کنید").required("ایمیل الزامی است."),
      cellphone: string()
        .matches(/^(\+98|0)?9\d{9}$/, "شماره موبایل نامعتبر است.")
        .required("شماره موبایل الزامی است."),
      password: string()
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
        .required("رمز عبور الزامی است."),
    })
  ),
});

const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField("name");

const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField(
  "email"
);

const {
  value: cellphone,
  errorMessage: cellphoneError,
  handleBlur: cellphoneBlur,
} = useField("cellphone");

const {
  value: password,
  errorMessage: passwordError,
  handleBlur: passwordBlur,
} = useField("password");

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    errors.value = [];

    await $fetch("/api/dashboard/global", {
      method: "POST",
      body: values,
      query: { url: "/users" },
    });

    toast.success("ایجاد کاربر باموفقیت انجام شد");
    return navigateTo("/users");
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
