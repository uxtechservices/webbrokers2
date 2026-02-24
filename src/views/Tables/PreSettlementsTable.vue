<template>
  <AdminLayout>
    <TableBreadcrumb :pageTitle="currentPageTitle" :export="false" :show_search_filters="true"/>
    <div class="space-y-5 sm:space-y-6">
      <SettlementTableOne :type="'Pre Liquidacion'" :settlements="settlements" :liquidator="true" :count="totalItems" :pdf_generator="false"/>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
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
