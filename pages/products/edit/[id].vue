<template>
  <div>
    <div
      class="flex justify-between flex-wrap md:flex-nowrap items-center pt-3 pb-2 mb-3 border-b"
    >
      <h4 class="font-bold">ویرایش محصول</h4>
    </div>

    <div
      v-if="errors.length > 0"
      class="alert alert-danger md:w-1/4 m-auto mb-4"
      role="alert"
    >
      <ul class="mb-0">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <ClientOnly fallback-tag="span" fallback="در حال بارگذاری ...">
      <form @submit.prevent="create">
        <PrimaryImage @set-primary-image="(image) => (primaryImage = image)" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="col-span-1">
            <CustomInput
              label="نام"
              id="name"
              v-model="formData.name"
              :error="errors.name"
              validation="required"
              placeholder="نام محصول"
            />
          </div>

          <div class="col-span-1">
            <label for="status" class="block text-right mb-1">دسته بندی</label>
            <select
              v-model="formData.status"
              id="status"
              class="w-full border border-gray-300 rounded-md p-2"
              :class="{ 'border-red-600': errors.status }"
            >
              <option
                v-for="category in data.categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>

         
          </div>

          <div class="col-span-1">
            <label for="status" class="block text-right mb-1">وضعیت</label>
            <select
              v-model="formData.status"
              id="status"
              class="w-full border border-gray-300 rounded-md p-2"
              :class="{ 'border-red-600': errors.status }"
            >
              <option value="1">فعال</option>
              <option value="0">غیرفعال</option>
            </select>
            <span v-if="errors.status" class="form-text text-red-600">{{
              errors.status
            }}</span>
          </div>

          <div class="col-span-1">
            <CustomInput
              label="قیمت"
              id="price"
              v-model="formData.price"
              :error="errors.price"
              validation="required|number"
              placeholder="قیمت محصول"
            />
          </div>

          <div class="col-span-1">
            <CustomInput
              label="تعداد"
              id="quantity"
              v-model="formData.quantity"
              :error="errors.quantity"
              validation="required|number"
              placeholder="تعداد محصول"
            />
          </div>

          <div class="col-span-1">
            <CustomInput
              label="قیمت حراجی"
              id="sale_price"
              v-model="formData.sale_price"
              :error="errors.sale_price"
              validation="number"
              placeholder="قیمت حراجی"
            />
          </div>
          <div class="col-span-1">
            <label class="text-right mb-1">تاریخ شروع حراجی</label>
            <div>
              <span class="input-group-text"><i class="bi bi-clock"></i></span>
              <input
                type="text"
                class="w-full border border-gray-300 rounded-md p-3"
                id="sale-date-from-picker"
              />
            </div>

            <date-picker
              v-model="saleDateFrom"
              type="datetime"
              display-format="HH:mm jYYYY-jMM-jDD"
              format="YYYY-MM-DD HH:mm:ss"
              custom-input="#sale-date-from-picker"
            />
          </div>
          <div class="col-span-1">
            <label class="text-right">تاریخ پایان حراجی</label>
            <div>
              <span class="input-group-text"><i class="bi bi-clock"></i></span>
              <input
                type="text"
                class="w-full border border-gray-300 rounded-md p-3"
                id="sale-date-to-picker"
              />
            </div>

            <date-picker
              v-model="saleDateFrom"
              type="datetime"
              display-format="HH:mm jYYYY-jMM-jDD"
              format="YYYY-MM-DD HH:mm:ss"
              custom-input="#sale-date-to-picker"
            />
          </div>

          <div class="col-span-1">
            <label
              for="images"
              class="form-label text-sm font-medium text-gray-700"
              >تصاویر</label
            >
            <input
              @change="imagesFile"
              type="file"
              id="images"
              multiple
              class="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div class="col-span-1 md:col-span-3">
            <CustomInput
              label="توضیحات"
              id="description"
              v-model="formData.description"
              :error="errors.description"
              validation="required"
              placeholder="توضیحات محصول"
              isTextArea
            />
          </div>

          <button type="submit" class="btn btn-outline-dark mt-3 mb-5">
            ایجاد محصول
          </button>
        </div>
      </form>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useToast } from "vue-toastification";
import PrimaryImage from "~/components/PrimaryImage.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

definePageMeta({
  middleware: "auth",
});

const toast = useToast();
const route = useRoute();
const loading = ref(false);
const errors = ref([]);
const primaryImage = ref(null);
const saleDateFrom = ref(null);
const saleDateTo = ref(null);
const images = ref(null);

const {  data } = await useFetch('/api/dashboard/global', {
    query: { url: '/categories' },
    headers: useRequestHeaders(['cookie'])
})
const { data:product } = await useFetch('/api/dashboard/global', {
  query: { url: `/products/${route.params.id}` },
  headers: useRequestHeaders(['cookie']),
});

const formData = reactive({
  name: "",
  category_id:"",
  status: "1",
  price: "",
  quantity: "",
  sale_price: "",
  description: "",
});



console.log("prouct",product.value.name)

const schema = yup.object({
  name: yup.string().required("فیلد نام الزامیست"),
  category_id: yup.string().required("فیلد دسته بندی الزامیست"),
  status: yup.string().required("فیلد وضعیت الزامیست"),
  price: yup
    .number()
    .required("فیلد قیمت الزامیست")
    .typeError("مقدار قیمت باید عددی باشد"),
  quantity: yup
    .number()
    .required("فیلد تعداد الزامیست")
    .typeError("مقدار تعداد باید عددی باشد"),
  sale_price: yup.number().typeError("مقدار قیمت حراجی باید عددی باشد"),
  description: yup.string().required("فیلد توضیحات الزامیست"),
});

const { reset, validate: validateForm } = useForm({
  initialValues: {
    name: product.value?.name,
    category_id: product.value.category_id,
    status: product.value.status,
    price: product.value.price,
    quantity: product.value.quantity,
    sale_price: product.value.sale_price,
    description: product.value.description,
  },
  validationSchema: schema,
});

function imagesFile(event) {
  images.value = event.target.files;
}

async function create() {
  const isValid = await validateForm();
  if (!isValid) {
    return;
  }

  if (!primaryImage.value) {
    toast.error("فیلد تصویر اصلی الزامیست");
    return;
  }

  const formDataToSend = new FormData();

  for (let index = 0; index < images.value.length; index++) {
    formDataToSend.append("images", images.value[index]);
  }

  formDataToSend.append("primary_image", primaryImage.value);
  formDataToSend.append("name", formData.name);
  formDataToSend.append("category_id", formData.category_id);
  formDataToSend.append("status", formData.status);
  formDataToSend.append("price", formData.price);
  formDataToSend.append("quantity", formData.quantity);
  formDataToSend.append("sale_price", formData.sale_price);
  formDataToSend.append("date_on_sale_from", saleDateFrom.value);
  formDataToSend.append("date_on_sale_to", saleDateTo.value);
  formDataToSend.append("description", formData.description);

  try {
    loading.value = true;
        errors.value = [];

        await $fetch('/api/products/edit', {
            method: 'PUT',
            body: formData,
            query: { url: `/products/${product.value.id}` },
        });

        toast.success("ویرایش محصول باموفقیت انجام شد");
        return navigateTo('/products')
  } catch (error) {
    errors.value = Object.values(error.data.data.message).flat();
    console.log(errors.value);
  } finally {
    loading.value = false;
  }
}
</script>
