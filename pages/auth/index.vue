<template>
  <section class="bg-gray-50 min-h-screen flex items-center justify-center">
    <div
      class="bg-gray-100 rounded-2xl shadow-lg p-5 w-full max-w-xs sm:max-w-md md:max-w-lg"
    >
      <div class="px-4">
        <h2 class="font-bold text-2xl text-center pb-8">خوش آمدید</h2>
        <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
          <div class="w-full">
            <label for="email" class="block text-right mb-1">ایمیل:</label>
            <input
              class="w-full border border-gray-300 rounded-md p-2"
              v-model="email"
              :class="{ 'border-red-500': emailError }"
              id="email"
              type="email"
              @blur="emailBlur"
            />
            <p v-if="emailError" class="text-red-500 text-sm">
              {{ emailError }}
            </p>
          </div>
          <div class="w-full">
            <label for="password" class="block text-right mb-1"
              >رمز عبور:</label
            >
            <input
              class="w-full border border-gray-300 rounded-md p-2"
              v-model="password"
              :class="{ 'border-red-500': passwordError }"
              id="password"
              type="password"
              @blur="passwordBlur"
            />
            <p v-if="passwordError" class="text-red-500 text-sm">
              {{ passwordError }}
            </p>
          </div>
          <button
            type="submit"
            class="btn btn-primary mt-4"
            :disabled="isLoading"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span v-if="!isLoading">ارسال</span>
          </button>
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
  layout: "auth",
  middleware: "guest",
});

// واکشی داده‌ها و اعتبارسنجی
const isLoading = ref(false); // وضعیت لودینگ
const { authUser } = useAuth();
const router = useRouter();
const toast = useToast();
const { values, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string()
        .email("ایمیل معتبر وارد کنید")
        .required("ایمیل الزامی است."),
      password: string().required("رمز عبور الزامی است."),
    })
  ),
});

const {
  value: email,
  errorMessage: emailError,
  handleBlur: emailBlur,
} = useField("email");

const {
  value: password,
  errorMessage: passwordError,
  handleBlur: passwordBlur,
} = useField("password");

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true; 


  try {
    const user = await $fetch("/api/auth/login", {
      method: "POST",
      body: values, 
    });
    authUser.value = user;
    toast.success("وارد سیستم شدید");
    router.push("/");
  } catch (error) {
    toast.error("ایمیل یا رمز عبور اشتباه است");
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
