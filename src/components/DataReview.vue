<script setup>
import useApi from "@/composables/useApi";
import { onMounted, ref, watch } from "vue";
import DateFilter from '@/components/DateFilter.vue'
import DataChart from '@/components/DataChart.vue'
import DataTable from '@/components/DataTable.vue'

const props = defineProps({
  headers: Array,
  chartProps: Object,
  collection: String,
  headerText: String
});

const { 
  data, 
  loading, 
  totalItems, 
  totalPages,
  currentPage, 
  itemsPerPage, 
  fetchData 
} = useApi(`/api/${props.collection}`)

const activeFilters = ref({
  dateFrom: new Date().toISOString().substr(0, 10),
  dateTo: new Date().toISOString().substr(0, 10)
})

const loadData = () => {
  fetchData({
    ...activeFilters.value,
    page: currentPage.value,
    limit: itemsPerPage.value
  })
}

const handleFilter = (filters) => {
  activeFilters.value = filters
  currentPage.value = 1
  loadData()
}

const handlePageChange = (page) => {
  currentPage.value = page
  loadData()
}

const handleItemsPerPageChange = (limit) => {
    itemsPerPage.value = limit
    loadData()
}


//loadData();

watch([currentPage, itemsPerPage], loadData)
</script>

<template>
  <h1 class="text-h4 mb-4">{{ headerText }}</h1>

  <div class="d-flex ga-7">
    <div>
      <DateFilter
        :loading="loading"
        @filter="handleFilter"
      />

      <DataChart
        v-if="data.length"
        :data="data"
        v-bind="chartProps"
      />
    </div>
    <DataTable
      :items="data"
      :loading="loading"
      :headers="headers"
      :total-items="totalItems"
      :total-pages="totalPages"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      @update:page="handlePageChange"
      @update:items-per-page="handleItemsPerPageChange"
    />
  </div>
</template>