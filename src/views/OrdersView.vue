<script setup>
import DataReview from '@/components/DataReview.vue';

const headers = [
  { text: 'Дата', value: 'date' },
  { text: 'Цена', value: 'total_price' },
];

const chartProps = {
  chartField: "total_price",
  labelField: "date",
  chartType: "line",
  chartTitle: "Цены заказов по дням"
}
</script>

<template>
  <DataReview
    :headers="headers"
    :chartProps="chartProps"
    collection="orders"
    headerText="Заказы"
  />
</template>