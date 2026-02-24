<template>
  <AdminLayout>
    <TableBreadcrumb :pageTitle="currentPageTitle" :export="false"/>
    <div class="space-y-5 sm:space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start">
        <div class="relative w-full sm:w-1/2">
          <input
            v-model="searchSubagentCode"
            type="text"
            placeholder="Buscar por código de subagente"
            class="w-full rounded-md border border-gray-200 bg-white px-5 py-2.5 pe-10 text-gray-800 shadow-sm focus:border-brand-500 focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white"
          />
        </div>
        <div class="relative w-full sm:w-1/2">
          <input
            v-model="searchClientName"
            type="text"
            placeholder="Buscar por nombre de cliente"
            class="w-full rounded-md border border-gray-200 bg-white px-5 py-2.5 pe-10 text-gray-800 shadow-sm focus:border-brand-500 focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white"
          />
        </div>
      </div>
      <SettlementTableOne :type="'Pre Liquidacion'" :settlements="filteredSettlements" :liquidator="true" :count="totalItems" :pdf_generator="false"/>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import SettlementTableOne from "../../components/tables/basic-tables/SettlementTableOne.vue";
import TableBreadcrumb from "@/components/common/TableBreadcrumb.vue";
import type { LiquidacionMappedTS } from "@/interfaces/LiquidacionesTS";
import axios from 'axios'
import instance from '@/libs/axios';
import { getToken } from "@/libs/authentication";
import event from '@/libs/event';


const currentPageTitle = ref("Pre Liquidaciones");
const errorAlert = ref(false);
const errorMessage = ref("");
const totalItems = ref(0);
const settlements = ref<LiquidacionMappedTS[]>([])
const searchSubagentCode = ref('');
const searchClientName = ref('');

const filteredSettlements = computed(() => {
  if (!settlements.value) {
    return [];
  }
  let items = settlements.value;
  if (searchSubagentCode.value) {
    items = items.filter(settlement =>
      settlement.Subagente?.codigo?.toLowerCase().includes(searchSubagentCode.value.toLowerCase())
    );
  }
  if (searchClientName.value) {
    items = items.filter(settlement =>
      settlement.Cliente?.nombre?.toLowerCase().includes(searchClientName.value.toLowerCase())
    );
  }
  return items;
});

const getSettlementList = async () => {
  // Handle form submission
  try {
    errorAlert.value = false;
    const { data } = await instance.get('/settlements/search-by/Pre Liquidacion?page=1&limit=5', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      settlements.value = data.payouts;
      totalItems.value = data.count;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

onMounted(async() => {
  await getSettlementList();
  event.on('reload-settlements-table', async () => {
    await getSettlementList();
  })
  event.on('update-total-items', val => totalItems.value = val)
})
</script>
