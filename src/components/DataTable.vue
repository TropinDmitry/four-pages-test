<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true
  },
  loading: Boolean,
  totalItems: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const filteredData = computed(() => {
  return props.items.map(item => {
    const filteredItem = {};
    props.headers.forEach(header => {
      if (item.hasOwnProperty(header.value)) {
        filteredItem[header.value] = item[header.value];
      }
    });
    return filteredItem;
  })
})

const emit = defineEmits(['update:page', 'update:items-per-page']);

const sortBy = ref([]);

const sortedItems = computed(() => {
  if (!sortBy.value.length) return filteredData.value;
  
  const [sortItem] = sortBy.value;
  const key = sortItem.key;
  const order = sortItem.order === 'desc' ? -1 : 1;
  
  return [...filteredData.value].sort((a, b) => {
    if (a[key] < b[key]) return -1 * order;
    if (a[key] > b[key]) return 1 * order;
    return 0;
  });
});

const updatePage = (page) => {
  emit('update:page', page);
}

const updateItemsPerPage = (itemsPerPage) => {
  emit('update:items-per-page', itemsPerPage);
}
</script>

<template>
  <v-card>
    <v-data-table-server
      :items="sortedItems"
      :loading="loading"
      :items-length="totalItems"
      :items-per-page="itemsPerPage"
      :page="currentPage"
      v-model:sort-by="sortBy"
      @update:page="updatePage"
      @update:items-per-page="updateItemsPerPage"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td v-for="header in headers" :key="header.value">
            {{ item[header.value] }}
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </v-card>
</template>