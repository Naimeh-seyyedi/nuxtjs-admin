<template>
  <div>
    <div
      class="flex justify-between flex-wrap md:flex-nowrap items-center py-3 pb-2 mb-3 border-b"
    >
      <h4 class="font-bold">کاربران</h4>
      <ButtonActionLink to="/users/create" label="ایجاد کاربر" />
    </div>

    <TableList :data="data.users" :titleTabe="userTableColumns" route="users" />
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

const page = ref(0);

const { data, refresh } = await useFetch(() => "/api/dashboard/global", {
  query: { url: "/users", page },
  headers: useRequestHeaders(["cookie"]),
});

function paginate(value) {
  page.value = value;
  refresh();
}

const userTableColumns = [
  { id: 1, title: "نام", field: "name" },
  { id: 2, title: "ایمیل", field: "email" },
  { id: 3, title: "شماره تلفن", field: "cellphone" },
  { id: 4, title: "تاریخ ایجاد", field: "created_at" },
];
</script>

<style></style>
