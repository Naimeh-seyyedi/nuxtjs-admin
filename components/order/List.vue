<template>
  <div class="overflow-x-auto max-h-52 border shadow rounded-md p-4">
    <table class="table table-xs table-pin-rows table-pin-cols ">
      <thead class="sticky top-0 z-50"> 
        <tr class="text-right ">
          <th v-if="route === 'products'">تصویر</th>
          <th v-for="title in props.titleTabe" :key="title.id">
            {{ title.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.data" :key="item.id" class="text-right">
          <td v-for="column in props.titleTabe" :key="column.id">
            {{ getValueForColumn(item, column.field) }}
          </td>
          <td>
            <button
              @click="showDetailOrder(item)"
              class="bg-gray-400 hover:bg-gray-600 px-4 py-1 rounded-md"
            >
              نمایش
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <CustomModal :isOpen="isModalOpen" :title="modalTitle" @close="closeModal">
      <table class="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr class="text-center">
            <th>محصول</th>
            <th>نام</th>
            <th>قیمت</th>
            <th>تعداد</th>
            <th>قیمت کل</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="detailOrder in selectedOrderItems" :key="detailOrder.id">
            <th>
              <img
                :src="detailOrder.product_primary_image"
                alt="Product Image"
                width="80"
              />
            </th>
            <td class="fw-bold">{{ detailOrder.product_name }}</td>
            <td>{{ detailOrder.price }} تومان</td>
            <td>{{ detailOrder.quantity }}</td>
            <td>{{ detailOrder.subtotal }} تومان</td>
          </tr>
        </tbody>
      </table>
    </CustomModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  titleTabe: {
    type: Array,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
});

const getValueForColumn = (item, field) => {
  return item[field] || "-";
};

const isModalOpen = ref(false);
const modalTitle = ref("");
const selectedOrderItems = ref([]); 

const showDetailOrder = (item) => {
  modalTitle.value = "جزئیات سفارش شماره " + item.id
  selectedOrderItems.value = item.order_items || []
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedOrderItems.value = []; 
};
</script>

<style scoped></style>
