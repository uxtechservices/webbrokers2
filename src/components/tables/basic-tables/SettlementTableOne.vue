<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th v-if="liquidator || pdf_generator" scope="col" class="border-gray-100 dark:border-gray-800 border-r">
              <input type="checkbox" :checked="selectAll" class="check-all w-4 h-4" @change="toggleAll">
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Cliente</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Aseguradora</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Cod. Subagente</p>
            </th>
            <th class="px-5 py-3 text-left w-3/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Fecha de vencimiento</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">N° Poliza</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Prima</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Comisión</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acciones</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700" v-if="paginatedItems.length > 0">
          <tr v-for="(settlement, index) in paginatedItems" :key="index"
            class="relative border-gray-100 dark:border-gray-800">
            <th v-if="liquidator || pdf_generator" scope="row"
              class="px-5 py-4 border-r-1 border-gray-100 dark:border-gray-800"><input
                @change="selectOne(settlement.id, settlement.SubagenteCodigo)" type="checkbox" class="check w-4 h-4">
            </th>
            <td class="px-5 py-4 sm:px-6 relative">
              <div class="absolute top-0 left-0 inline-flex gap-2"
                v-if="settlement.tipo == LiquidacionTypes.PRE_LIQUIDACIONES">
                <span class="inline-block px-2 py-0.5 text-xs font-semibold rounded-br-lg text-nowrap"
                  :class="{ 'text-amber-800 bg-amber-200': invoiceOrNote(settlement) == 'Factura', 'text-error-800 bg-error-200': invoiceOrNote(settlement) != 'Factura' }">
                  {{ invoiceOrNote(settlement) }}
                </span>
                <span v-if="settlement.ori && settlement.ori.trim() == 'AP'" class="text-rose-800 bg-rose-200 px-2 py-0.5 text-xs font-semibold rounded-lg">
                  Vida
                </span>
                <span v-if="!settlement.fecha_pagada && settlement.fecha_liquidada" class="text-emerald-800 text-nowrap bg-emerald-200 px-2 py-0.5 text-xs font-semibold rounded-lg">
                  Pendiente Factura
                </span>
                <span v-if="!settlement.fecha_pagada && !settlement.fecha_liquidada" class="text-orange-800 text-nowrap bg-orange-200 px-2 py-0.5 text-xs font-semibold rounded-lg">
                  Por Liquidar
                </span>
              </div>
              <span class="absolute top-0 left-0 inline-block bg-indigo-200 text-indigo-700 px-2 py-0.5 text-xs font-semibold rounded-br-lg"
                v-if="settlement.tipo == LiquidacionTypes.CONSOLIDADO && settlement.Finalizada?.kanban == 'Emitida'">
                Liquidada
              </span>
              <div class="flex items-center gap-3">
                <div>
                  <span v-if="settlement.Cliente"
                    class="block font-medium text-gray-800 text-theme-xs dark:text-white/90">
                    {{ settlement.Cliente.correo }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6 relative">
              <div class="flex items-center gap-3">
                <div>
                  <span v-if="settlement.Aseguradora"
                    class="block font-medium text-gray-800 text-theme-xs dark:text-white/90">
                    {{ settlement.Aseguradora.nombre + " (" + (settlement.Sucursale?.ciudad || "N/A") + ")" }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6 relative">
              <div class="flex items-center gap-3">
                <div>
                  <span v-if="settlement.SubagenteCodigo"
                    class="block font-medium text-gray-800 text-theme-xs dark:text-white/90">
                    {{ settlement.SubagenteCodigo }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span v-if="settlement.fecha_vence"
                    class="block font-medium text-gray-800 text-theme-xs dark:text-white/90">
                    {{ dateFormatter(settlement.fecha_vence) }}
                  </span>
                  <span v-else class="block font-medium text-gray-800 text-theme-xs dark:text-white/90">
                    N/A
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="block font-medium text-gray-800 text-theme-xs dark:text-white/90">
                {{ settlement.poliza }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="block font-medium text-gray-800 text-theme-xs dark:text-white/90">
                {{ formatUSD(settlement.valor_prima || 0) }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <p class="block font-medium text-gray-800 text-theme-xs dark:text-white/90">
                {{ formatUSD(settlement.comision || 0) }}
              </p>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <RouterLink v-if="settlement.id" :to="'/liquidaciones/editar/' + settlement.id"
                  class="p-2 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    Editar
                  </span>
                </RouterLink>
                <button v-if="settlement.id" @click="deleteSettlemet(settlement.id)" class="p-2 bg-red-700 rounded-lg">
                  <span class="block font-medium text-gray-200 text-theme-sm dark:text-white/90">
                    Eliminar
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700" v-else>
          <td class="px-5 py-4 sm:px-6">
            <div class="flex items-center gap-3">
              <div>
                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  No se encontraron resultados
                </span>
              </div>
            </div>
          </td>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between px-4">
      <div class="inline-flex items-center gap-2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Filas por pagina
        </label>
        <select v-model="itemsPerPage" @change="setPaginatedItems(currentPage)"
          class="dark:bg-dark-900 h-11 appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="35">35</option>
        </select>
      </div>
      <Paginator :itemsPerPage="Number(itemsPerPage)" :total-items="count" @update:current-page="setPaginatedItems">
      </Paginator>
    </div>

    <div class="grid w-full px-4 justify-items-end mb-4">
      <button @click="liquidateSettlements" v-if="selectedSettlements.length > 0 && liquidator"
        class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
        <img src="/calc-icon.svg" alt="Calc Icon">
        Liquidar
      </button>
    </div>
  </div>
  <Alert v-if="errorLiquidation" class="mt-6" variant="error" title="Error al añadir negocios para liquidación"
    :message="errorMessage" :showLink="false" />
  <Alert v-if="successAlert" class="mt-6" variant="success" title="Negocios añadidos exitosamente"
    message="Las filas han sido añadidas en la cola de liquidación" />
  <Modal v-if="isSettlementDeletionModal" @close="isSettlementDeletionModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isSettlementDeletionModal = false"
          class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
          <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
              fill="" />
          </svg>
        </button>
        <div class="px-2 pr-14">
          <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Eliminar una liquidación
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            ¿Estas seguro de realizar esta acción?
          </p>
        </div>
        <form class="flex flex-col">
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar eliminar la liquidación"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="confirmSettlementDeletion" type="button"
              class="flex w-full justify-center rounded-lg bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto">
              Eliminar liquidación
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import instance from '@/libs/axios';
import Modal from "@/components/profile/Modal.vue";
import Alert from "@/components/ui/Alert.vue";
import { LiquidacionTypes, type LiquidacionMappedTS, type LiquidacionRowTS, type LiquidacionTS } from '@/interfaces/LiquidacionesTS';
import { getToken } from '@/libs/authentication';
import Paginator from '@/components/common/Paginator.vue';
import event from '@/libs/event';
import { getLiquidatorRows, saveLiquidatorRows } from '@/libs/storage';
import type { SettlementFilters } from '@/interfaces/Options';
import { dateFormatter, formatUSD } from '@/libs/formatter';

const errorAlert = ref(false);
const errorLiquidation = ref(false);
const successAlert = ref(false);
const errorMessage = ref("");
const props = defineProps<{ settlements: LiquidacionMappedTS[], liquidator: boolean, pdf_generator: boolean, type: string, count: number }>();
const filteredSettlements = ref<LiquidacionMappedTS[]>([]);
const settlementUnderDeletion = ref("");
const isSettlementDeletionModal = ref(false);
const itemsPerPage = ref(5);
const currentPage = ref(1);
const filter = ref("");
const agency_filter = ref("");
const subsidiary_filter = ref("");
const person = ref("");
const paginatedItems = ref<LiquidacionMappedTS[]>([]);
const selectAll = ref(false);
const selectedSettlements = ref<LiquidacionRowTS[]>([]);

function toggleAll() {
  selectAll.value = !selectAll.value;
  const checks = document.querySelectorAll<HTMLInputElement>('.check');
  checks.forEach(cb => {
    cb.checked = selectAll.value;
  });
  if (selectAll.value) {
    if (paginatedItems.value) {
      selectedSettlements.value = paginatedItems.value.map((item) => {
        return {
          id: item.id || "", SAge: item.SubagenteCodigo || ""
        }
      })
    }
  } else {
    if (paginatedItems.value) {
      selectedSettlements.value = []
    }
  }
}

function selectOne(id: string = "", SAge: string = "") {
  if (selectedSettlements.value.some((item) => item.id == id)) {
    selectedSettlements.value = selectedSettlements.value.filter((item) => item.id != id);
  } else {
    selectedSettlements.value.push({ id, SAge });
  }
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = date.toLocaleString("es-ES", { month: "long", timeZone: "UTC" });
  const year = date.getUTCFullYear();
  return `${day} de ${month} de ${year}`;
}

onMounted(() => {
  event.on('filter-by-type', filterBySettlementType)
  event.on('filter-by-agency', filterByAgency)
  event.on('filter-by-agent', filterByAgent)
})


watch(() => selectedSettlements.value, (newValue) => {
  if (selectedSettlements.value.length < paginatedItems.value.length) {
    selectAll.value = false;
  }
});

watch(() => props.settlements, (newValue) => {
  paginatedItems.value = newValue
});

const liquidateSettlements = () => {
  const existingRows = getLiquidatorRows() || [];
  const selectedRows = selectedSettlements.value || [];

  if (selectedRows.length > 0) {
    let isSameAgent = true;

    if (existingRows.length > 0) {
      const existingSAge = existingRows[0].SAge;
      isSameAgent = selectedRows.every(row => row.SAge === existingSAge);
    } else {
      const firstSelectedSAge = selectedRows[0].SAge;
      isSameAgent = selectedRows.every(row => row.SAge === firstSelectedSAge);
    }

    if (!isSameAgent) {
      errorLiquidation.value = true;
      errorMessage.value = "No se puede liquidar negocios de diferentes subagentes";
      setTimeout(() => errorLiquidation.value = false, 3000);
      return;
    }
  }
  // Mergeamos existing + selected sin duplicados
  if (existingRows.length > 0) {
    const existingIds = existingRows.map(row => row.id);
    const newRows = selectedRows.filter(row => !existingIds.includes(row.id));
    existingRows.push(...newRows);
    saveLiquidatorRows(existingRows);
    successAlert.value = true;
  } else {
    saveLiquidatorRows(selectedRows);
    successAlert.value = true;
  }

  setTimeout(() => {
    successAlert.value = false;
    errorLiquidation.value = false;
  }, 3000)
}

const filterByAgent = async (newValue: string) => {
  person.value = newValue
  await getSettlementList(currentPage.value, itemsPerPage.value);
}

const filterByAgency = async (newValue: { agency: string, subsidiary?: string }) => {
  agency_filter.value = newValue.agency;
  subsidiary_filter.value = newValue.subsidiary ? newValue.subsidiary : "";
  await getSettlementList(currentPage.value, itemsPerPage.value);
}

const filterBySettlementType = async (newValue: string) => {
  filter.value = newValue
  await getSettlementList(currentPage.value, itemsPerPage.value);
}

const setPaginatedItems = async (value: number) => {
  currentPage.value = value;
  await getSettlementList(currentPage.value, itemsPerPage.value);
}

const getSettlements = async (page: number, limit: number, filters: SettlementFilters = {}) => {
  try {
    errorAlert.value = false;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Filtros dinámicos
    if (filters.person) queryParams.append("person", filters.person);
    if (filters.type) queryParams.append("type", filters.type);
    if (filters.agency) queryParams.append("agency", filters.agency);
    if (filters.subsidiary) queryParams.append("subsidiary", filters.subsidiary);
    if (filters.liquidity !== undefined) queryParams.append("liquidity", String(filters.liquidity));
    if (filters.health) queryParams.append("health", "true");

    const url = `/settlements/search-by/${props.type}?${queryParams.toString()}`;

    const { data } = await instance.get(url, {
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
    });

    if (data) {
      event.emit('update-total-items', data.count);
      paginatedItems.value = data.payouts;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
};

const getSettlementList = async (page: number, limit: number) => {
  const filters: SettlementFilters = {};

  if (filter.value === 'Factura') filters.liquidity = false;
  if (filter.value === 'N/C') filters.liquidity = true;
  if (filter.value === 'Vida') filters.health = true;

  if (person.value != '') filters.person = person.value;
  if (filter.value != '') filters.type = filter.value;
  if (agency_filter.value != '') filters.agency = agency_filter.value;
  if (subsidiary_filter.value != '') filters.subsidiary = subsidiary_filter.value;

  await getSettlements(page, limit, filters);
};

const deleteSettlemet = (id: string) => {
  settlementUnderDeletion.value = id;
  isSettlementDeletionModal.value = true;
}

const invoiceOrNote = (settlement: LiquidacionTS) => {
  if (settlement.valor_prima && settlement.comision) {
    if (settlement.valor_prima < 0 && settlement.comision < 0) {
      return 'Nota de credito';
    }
    return 'Factura';
  } else {
    return 'Factura';
  }
}


const confirmSettlementDeletion = async () => {
  try {
    errorAlert.value = false;
    const { data } = await instance.delete('/settlements/' + settlementUnderDeletion.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      isSettlementDeletionModal.value = false;
      window.location.reload();
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>