<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6" v-if="!loading && analytics">
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <ecommerce-metrics :agents="analytics.agents" :clients="analytics.clients"
          :pending_payments="analytics.pending_payments" :missing_information="analytics.missing_information" />
        <monthly-target :monthly_payouts="analytics.monthly_payouts.map((mp) => mp.quantity)" />
      </div>
      <div class="col-span-12 xl:col-span-5">
        <monthly-sale :pending_loans="analytics.pending_loans" />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 md:gap-6 items-start"  v-if="loading && !analytics">
      <div
        class="grid animate-pulse rounded-2xl border min-h-128 col-span-12 space-y-6 xl:col-span-7 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div class="flex flex-col gap-4 text-center justify-center w-full">
          <span class="loader mx-auto"></span>
          <h1 class="text-lg text-gray-500 dark:text-gray-400">Cargando estadisticas</h1>
        </div>
      </div>

      <div
        class="grid animate-pulse rounded-2xl border min-h-64 col-span-12 xl:col-span-5 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div class="flex flex-col gap-4 text-center justify-center w-full">
          <span class="loader mx-auto"></span>
          <h1 class="text-lg text-gray-500 dark:text-gray-400">Cargando comisiones negativas</h1>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 md:gap-6 items-start" v-if="!loading && !analytics">
      <div
        class="grid rounded-2xl border min-h-128 col-span-12 space-y-6  border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div class="flex flex-col gap-4 text-center justify-center items-center w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><g fill="none" stroke="#4f39f6" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8"><path d="m17.121 21.364l2.122-2.121m2.121-2.122l-2.121 2.122m0 0L17.12 17.12m2.122 2.122l2.121 2.121M4 6v6s0 3 7 3s7-3 7-3V6"/><path d="M11 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3m0 18c-7 0-7-3-7-3v-6"/></g></svg>
          <h1 class="text-lg text-gray-500 dark:text-gray-400">Error al cargar las estadisticas</h1>
          <button @click="getAnalytics" class="rounded-md bg-indigo-300 text-center text-indigo-600 px-4 py-2">Recargar</button>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import instance from '@/libs/axios'
import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
import MonthlyTarget from '../components/ecommerce/MonthlySale.vue'
import MonthlySale from '../components/ecommerce/MonthlyTarget.vue'
import type { IAnalytic } from '@/interfaces/AnaliticaTS.ts';
import { onMounted, ref } from 'vue'
import { getToken } from '@/libs/authentication'

const analytics = ref<IAnalytic | null>(null);
const loading = ref(true);

onMounted(async () => {
  await getAnalytics();
})

const getAnalytics = async () => {
  try {
    loading.value = true;
    const { data } = await instance.get('/analytics', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    })
    analytics.value = data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
}
</script>

<style scoped>
.loader {
  transform: rotateZ(45deg);
  perspective: 1000px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: #8276df;
}

.loader:before,
.loader:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  transform: rotateX(70deg);
  animation: 1s spin linear infinite;
}

.loader:after {
  color: #4f39f6;
  transform: rotateY(70deg);
  animation-delay: .4s;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotateZ(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotateZ(360deg);
  }
}

@keyframes rotateccw {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@keyframes spin {

  0%,
  100% {
    box-shadow: .2em 0px 0 0px currentcolor;
  }

  12% {
    box-shadow: .2em .2em 0 0 currentcolor;
  }

  25% {
    box-shadow: 0 .2em 0 0px currentcolor;
  }

  37% {
    box-shadow: -.2em .2em 0 0 currentcolor;
  }

  50% {
    box-shadow: -.2em 0 0 0 currentcolor;
  }

  62% {
    box-shadow: -.2em -.2em 0 0 currentcolor;
  }

  75% {
    box-shadow: 0px -.2em 0 0 currentcolor;
  }

  87% {
    box-shadow: .2em -.2em 0 0 currentcolor;
  }
}
</style>