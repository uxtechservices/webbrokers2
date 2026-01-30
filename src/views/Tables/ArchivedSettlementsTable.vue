<template>
  <AdminLayout>
    <TableBreadcrumb :pageTitle="currentPageTitle" :filter="false" :export="false" :import="false" :create="false"/>
    <div class="space-y-5 sm:space-y-6">
        <ArchivedTableOne :settlements="settlements" :liquidator="false" :pdf_generator="false" :count="totalItems"  :export="false"/>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import TableBreadcrumb from "@/components/common/TableBreadcrumb.vue";
import axios from 'axios'
import instance from '@/libs/axios';
import { getToken } from "@/libs/authentication";
import event from '@/libs/event';
import ArchivedTableOne from "@/components/tables/basic-tables/ArchivedTableOne.vue";
import type { FinalizadaMappedTS } from "@/interfaces/FinalizadaTS";

const currentPageTitle = ref("Archivados");
const errorAlert = ref(false);
const errorMessage = ref("");
const totalItems = ref(0);
const settlements = ref<FinalizadaMappedTS[]>([])

const getSettlementList = async () => {
  // Handle form submission
  try {
    errorAlert.value = false;
    const { data } = await instance.get('/settlements/search-by/Archivado?page=1&limit=5', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      params: {
        full: true
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