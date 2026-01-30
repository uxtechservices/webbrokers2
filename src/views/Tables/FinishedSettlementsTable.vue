<template>
  <AdminLayout class="overflow-x-scroll">
    <FinishedTableBreadcrumb :pageTitle="currentPageTitle" :export="false" :import="true" :create="false" :filter="false" :filter_payout_state="true"/>
    <div class="space-y-5 sm:space-y-6">
        <FinishedTableOne :settlements="settlements" :liquidator="false" :type="'Consolidado'" :count="totalItems" :pdf_generator="false" />
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import type { LiquidacionMappedTS } from "@/interfaces/LiquidacionesTS";
import axios from 'axios'
import instance from '@/libs/axios';
import { getToken } from "@/libs/authentication";
import event from '@/libs/event';
import FinishedTableOne from "@/components/tables/basic-tables/FinishedTableOne.vue";
import router from "@/router";
import FinishedTableBreadcrumb from "@/components/common/FinishedTableBreadcrumb.vue";

const currentPageTitle = ref("Consolidados");
const errorAlert = ref(false);
const errorMessage = ref("");
const totalItems = ref(0);
const settlements = ref<LiquidacionMappedTS[]>([])

const getSettlementList = async () => {
  // Handle form submission
  try {
    errorAlert.value = false;
    const queryParams = new URLSearchParams({
      page: "1",
      limit: "5",
    });
    if(router.currentRoute.value.query.cliente){
      console.log(router.currentRoute.value.query.cliente);
      queryParams.append('client', String(router.currentRoute.value.query.cliente))
    }
    const { data } = await instance.get('/settlements/search-by/Consolidado?' + queryParams.toString(), {
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

<style scoped>

*::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

*::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

*::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #1c2e5f;
}
  </style>