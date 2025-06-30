<script setup>
import DataReview from '@/components/DataReview.vue';

const headers = [
  { text: 'Дата', value: 'date' },
  { text: 'Цена', value: 'price' },
];

const chartProps = {
  chartField: "price",
  labelField: "date",
  chartType: "line",
  chartTitle: "Цены по дням"
}
</script>

<template>
  <DataReview
    :headers="headers"
    :chartProps="chartProps"
    collection="stocks"
    headerText="Склады"
  />
</template>