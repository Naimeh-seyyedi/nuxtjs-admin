<template>
  <div>
    <div
      class="flex justify-between flex-wrap items-center pt-3 pb-2 mb-3 border-b"
    >
      <h4 class="font-bold text-lg">محصول : {{ data.name }}</h4>
    </div>
    <div>
      <div class="grid gap-4">
        <div class="w-full flex justify-center mb-4">
          <div class="w-1/3">
            <img
            :src="data.primary_image"
              v-img="data.primary_image"
              alt="Product Image"
              class="w-full h-auto"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">نام</label>
            <input
              type="text"
              class="form-input border border-gray-300 rounded-md w-full"
              disabled
              :placeholder="data.name"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">دسته بندی</label>
            <input
              type="text"
              class="form-input border border-gray-300 rounded-md w-full"
              disabled
              :placeholder="data.category"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">وضعیت</label>
            <input
              type="text"
              class="form-input border border-gray-300 rounded-md w-full"
              disabled
              :placeholder="data.status"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">قیمت</label>
            <input
              type="text"
              class="form-input border border-gray-300 rounded-md w-full"
              disabled
              :placeholder="data.price"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">تعداد</label>
            <input
              type="text"
              class="form-input border border-gray-300 rounded-md w-full"
              disabled
              :placeholder="data.quantity"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">قیمت حراجی</label>
            <input
              type="text"
              class="form-input border border-gray-300 rounded-md w-full"
              disabled
              :placeholder="data.sale_price"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1"
              >تاریخ شروع حراجی</label
            >
            <input
              type="text"
              class="form-input border border-gray-300 rounded-md w-full"
              disabled
              :placeholder="data.date_on_sale_from_jalali"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1"
              >تاریخ پایان حراجی</label
            >
            <input
              type="text"
              class="form-input border border-gray-300 rounded-md w-full"
              disabled
              :placeholder="data.date_on_sale_to_jalali"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">توضیحات</label>
          <textarea
            rows="5"
            class="form-textarea border border-gray-300 rounded-md w-full"
            disabled
            :value="data.description"
          ></textarea>
        </div>
        <div class="flex flex-wrap gap-4">
          <img
            v-for="image in data.images"
            :key="image.id"
            class="w-1/4 rounded-md"
           :src="image.image"
          />
        </div>
      </div>
    </div>
    <SumbitButton
      :label="'حذف'"
      :isLoading="loading"
      type="button"
      @click="deleteProduct"
    />
  </div>
  
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const route = useRoute();

const { data } = await useFetch("/api/dashboard/global", {
  query: { url: `/products/${route.params.id}` },
  headers: useRequestHeaders(["cookie"]),
});

async function deleteProduct() {
    try {
        loading.value = true;

        await $fetch('/api/dashboard/global', {
            method: 'DELETE',
            query: { url: `/products/${props.productId}` },
        })

        toast.warning("حذف محصول باموفقیت انجام شد");
        return navigateTo('/products')
    } catch (error) {
        console.log(error.data);
    } finally {
        loading.value = false;
    }
}
</script>
