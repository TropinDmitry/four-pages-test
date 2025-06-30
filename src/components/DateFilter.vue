<template>
  <v-card class="pa-4 mb-4">
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          v-model="dateFrom"
          label="Дата от"
          type="date"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3" v-if="!isStocks">
        <v-text-field
          v-model="dateTo"
          label="Дата до"
          type="date"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-btn
          color="primary"
          @click="applyFilters"
          :loading="loading"
        >
          Применить
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  loading: Boolean,
  isStocks: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['filter'])

const dateFrom = ref(new Date().toISOString().substr(0, 10))
const dateTo = ref(new Date().toISOString().substr(0, 10))

const applyFilters = () => {
  const filters = {dateFrom: dateFrom.value};
  
  if (!props.isStocks) {
    filters.dateTo = dateTo.value;
  }
  
  emit('filter', filters);
}

//watch([dateFrom, dateTo], applyFilters)
</script>