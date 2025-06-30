<script setup>
import DataReview from '@/components/DataReview.vue';

const headers = [
  { text: 'Дата', value: 'date' },
  { text: 'Количество', value: 'quantity' },
];

const chartProps = {
  chartField: "quantity",
  labelField: "date",
  chartType: "line",
  chartTitle: "Количество проданных товаров по дням"
}
</script>

<template>
  <DataReview
    :headers="headers"
    :chartProps="chartProps"
    collection="incomes"
    headerText="Доходы"
  />
</template>