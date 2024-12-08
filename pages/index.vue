<template>
    <div>
      <div
        class="flex justify-between flex-wrap md:flex-nowrap items-center py-3 pb-2 mb-3 border-b"
      >
        <h4 class="font-bold">سفارشات</h4>
      </div>
      <OrderList
        :data="data.orders"
        :titleTabe="orderTableColumns"
        route="orders"
      />
  
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
  
  
  const page = ref(0);
  
  const { data, refresh } = await useFetch(() => "/api/dashboard/global", {
    query: { url: "/orders", page },
    headers: useRequestHeaders(["cookie"]),
  });
  
  function paginate(value) {
    page.value = value;
    refresh();
  }
  
  const orderTableColumns = [
    { id: 1, title: "شماره سفارش", field: "id" },
    { id: 2, title: "وضعیت", field: "status" },
    { id: 3, title: "وضعیت پرداخت", field: "payment_status" },
    { id: 4, title: "مبلغ پرداختی", field: "paying_amount" },
    { id: 5, title: "تاریخ ایجاد", field: "created_at" },
  ];
  </script>
  
  <style></style>
  