<template>
  <div class="overflow-x-auto max-h-52 border shadow">
    <table class="table table-xs table-pin-rows table-pin-cols">
      <thead>
        <tr class="text-right">
          <th v-if="route === 'products'">تصویر</th>
          <th v-for="title in props.titleTabe" :key="title.id">
            {{ title.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.data" :key="item.id" class="text-right">
          <td v-if="route === 'products'">
            <img
              v-if="item.primary_image"
              :src="item.primary_image"
              alt="Primary Image"
              width="80"
              height="53"
              class="object-contain"
            />
          </td>
          <td v-for="column in props.titleTabe" :key="column.id">
            {{ getValueForColumn(item, column.field) }}
          </td>
          <td>
            <div class="flex gap-4">
              <ButtonActionLink
                :to="`/${props.route}/${item.id}`"
                label="نمایش "
              />
              <ButtonActionLink
                :to="`/${props.route}/edit/${item.id}`"
                label="ویرایش"
              />
            
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
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
</script>

<style scoped></style>
