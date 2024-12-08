<template>
  <div>
    <div
      class="flex justify-between flex-wrap md:flex-nowrap items-center py-3 pb-2 mb-3 border-b"
    >
      <h4 class="font-bold">محصولات</h4>

      <ButtonActionLink to="/products/create" label="ایجاد محصول" />
    </div>

    <TableList :data="data.products" :titleTabe="productTableColumns" route="products" />
    <div class="flex justify-center items-center space-x-2 mt-4">
      <ul class="flex gap-4">
        <li
          v-for="(link, index) in data.meta.links.slice(1, -1)"
          :key="index"
          class="page-item"
          :class="{ active: link.active }"
        >
          <button @click="paginate(link.label)" class="page-link">
            {{ link.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import TableList from "~/components/TableList.vue";

definePageMeta({
  middleware: "auth",
});

const page = ref(0);

const { data, refresh } = await useFetch(() => "/api/dashboard/global", {
  query: { url: "/products", page },
  headers: useRequestHeaders(["cookie"]),
});

function paginate(value) {
  page.value = value;
  refresh();
}

const productTableColumns = [
  { id: 1, title: "نام محصول", field: "name" },
  { id: 2, title: "قیمت", field: "price" },
  { id: 3, title: "دسته‌بندی", field: "category" },
  { id: 4, title: "توضیحات", field: "description" },
  { id: 5, title: "وضعیت", field: "status" },
];
</script>
