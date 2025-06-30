<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>WB API Dashboard</v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-tabs>
        <v-tab to="/sales">Продажи</v-tab>
        <v-tab to="/orders">Заказы</v-tab>
        <v-tab to="/stocks">Склады</v-tab>
        <v-tab to="/incomes">Доходы</v-tab>
      </v-tabs>
    </v-app-bar>
    
    <v-main min-width="1400">
      <v-container fluid class="d-md-flex flex-md-column align-center">
        <router-view></router-view>
      </v-container>
    </v-main>
    
    <v-footer app>
      <span>&copy; 2023 WB API Dashboard</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('App mounted')
})
</script>

<style>

.v-tab {
  text-transform: none !important;
}
</style>