import { computed, ref, watch } from 'vue'

const API_HOST = 'http://109.73.206.144:6969'
const API_KEY = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

export default function useApi(endpoint) {
  const data = ref([])
  const loading = ref(false)
  const error = ref(null)
  const totalPages = ref(0);
  const totalItems = ref(0);
  const currentPage = ref(1);
  const itemsPerPage = ref(50);
  const dateFrom = ref('');
  const dateTo = ref('');
  
  const fetchData = async (params = {}) => {
    loading.value = true;
    error.value = null;

    if (params.dateFrom && params.dateTo) {
      dateFrom.value = params.dateFrom;
      dateTo.value = params.dateTo;
    }

    try {
      const requestParams = {
        ...params,
        dateFrom: dateFrom.value, 
        dateTo: dateTo.value,
        page: currentPage.value,
        key: API_KEY
      }

      if (itemsPerPage.value > 0) {
        requestParams.limit = itemsPerPage.value;
      } else {
        delete requestParams.limit;
      }

      const queryParams = new URLSearchParams(requestParams).toString();
      
      const response = await fetch(`${API_HOST}${endpoint}?${queryParams}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json();
      data.value = result.data;
      totalItems.value = result.meta.total;
      totalPages.value = result.meta.last_page;
      
    } catch (err) {
      error.value = err.message
      console.error('Error fetching data:', err)
    } finally {
      loading.value = false
    }
  }
  
  return {
    data,
    loading,
    error,
    totalItems,
    totalPages,
    currentPage,
    itemsPerPage,
    fetchData
  }
}