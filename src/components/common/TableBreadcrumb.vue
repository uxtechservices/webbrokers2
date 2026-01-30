<template>
  <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageTitle">
      {{ pageTitle }}
    </h2>
    <nav class="flex gap-2 items-center">
      <input v-model="agent" type="text" placeholder="Subagente o cliente" @input="filterByAgent"
        class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-3 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
      <select v-model="agency_filter" @change="filterByAgency"
        class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
        <option value="" selected>N/A</option>
        <option :value="agency.id" v-for="agency in agencies">{{ agency.nombre }}</option>
      </select>
      <select v-model="subsidiary_filter" @change="filterByAgency"
        class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
        <option value="" selected>N/A</option>
        <option :value="subsidiary.id" v-for="subsidiary in filter_subsidiaries">{{ subsidiary.ciudad }}</option>
      </select>
      <select v-model="type" @change="filterByType" v-if="filter"
        class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
        <option value="" selected>Total</option>
        <option value="N/C">N/C</option>
        <option value="Factura">Factura</option>
        <option value="Por Liquidar">Por Liquidar</option>
        <option value="Por Facturar">Pendiente Factura</option>
        <option value="Vida">Vida</option>
        <option value="Liquidada">Liquidada</option>
      </select>
      <select v-model="payment_status" @change="filterByType" v-if="filter_payout_state"
        class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
        <option value="" selected>N/A</option>
        <option value="Vida">Vida</option>
        <option value="No pagado">No pagado</option>
        <option value="Pagado">Pagado</option>
        <option value="Pagado sin factura">Pagado sin factura</option>
        <option value="Por facturar">Por facturar</option>
        <option value="No aplica">No aplica</option>
      </select>
      <button v-if="!downloadingArchive && props.export" @click="genereateSettlementsPdf"
        class="px-3 py-2 text-base font-semibold rounded-lg dark:bg-white text-gray-800 border-1 dark:border-0">
        Exportar
      </button>
      <button v-if="downloadingArchive && props.export"
        class="px-3 py-2 text-base font-semibold rounded-lg dark:bg-white text-gray-800 border-1 dark:border-0">
        <div style="border-top-color:transparent"
          class="w-6 h-6 mx-auto border-4 border-gray-800 border-solid rounded-full animate-spin"></div>
      </button>
      <button @click="isImportModal = true" v-if="import"
        class="px-3 py-2 text-base font-semibold rounded-lg dark:bg-white text-gray-800 border-1 dark:border-0">
        Importar
      </button>
      <RouterLink to="/liquidaciones/crear" v-if="create"
        class="px-3 py-2 text-base font-semibold rounded-lg dark:bg-white text-gray-800 border-1 dark:border-0">
        Nueva
      </RouterLink>
    </nav>
  </div>


  <Modal v-if="isImportModal" @close="isImportModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isImportModal = false"
          class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
          <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
              fill="" />
          </svg>
        </button>
        <div class="px-2 ">
          <h4 class="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Importar archivo excel
          </h4>
          <Dropzone />
        </div>
        <div class="grid grid-cols-2 gap-2 px-2 mt-2">
          <div class="">
            <h4 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
              Seleccionar aseguradora
            </h4>
            <select v-model="selectedAgency" @change="getSubsidiaries"
              class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
              <option v-for="agency in agencies" :value="agency">{{ agency.nombre }}</option>
            </select>
          </div>
          <div class="">
            <h4 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
              Seleccionar sucursal
            </h4>
            <select v-model="selectedSubsidiary"
              class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
              <option v-for="subsidiary in subsidiaries" :value="subsidiary">Ciudad de {{ subsidiary.ciudad }} encargado
                {{ subsidiary.encargado }}</option>
            </select>
          </div>
        </div>
        <form class="flex flex-col">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar crear las liquidaciones"
              :message="errorMessage" :showLink="false" />
            <div class="flex items-center gap-3 mt-6 lg:justify-end">
              <button @click="isImportModal = false" type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
                Cerrar
              </button>
              <button type="button" @click="createSettlements"
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
                Crear Liquidaciones
              </button>
            </div>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import Modal from '../profile/Modal.vue';
import Alert from '../ui/Alert.vue';
import Dropzone from '../forms/FormElements/Dropzone.vue';
import event from '@/libs/event';
import type { ClienteTS } from '@/interfaces/ClientesTS';
import axios from 'axios';
import { LiquidacionStates, LiquidacionTypes, type ILiquidacionRequestBody, type LiquidacionTS } from '@/interfaces/LiquidacionesTS';
import instance from '@/libs/axios';
import { getToken } from '@/libs/authentication';
import type { AseguradoraTS } from '@/interfaces/AseguradoraTS';
import type { SubsidiariaTS } from '@/interfaces/SubsidiariaTS';
import { saveRows } from '@/libs/storage';

const props = defineProps({ filter: { type: Boolean, default: true }, filter_payout_state: { type: Boolean, default: false }, export: { type: Boolean }, pageTitle: { type: String }, import: { type: Boolean, default: true }, create: { type: Boolean, default: true } });
const isImportModal = ref(false);
const errorAlert = ref(false);
const downloadingArchive = ref(false);
const errorMessage = ref("");
const excelData = ref([]);
const clients = ref<ClienteTS[]>([])
const type = ref("");
const agent = ref("");
const agencies = ref<AseguradoraTS[]>([])
const selectedAgency = ref<AseguradoraTS | null>(null);
const subsidiaries = ref<SubsidiariaTS[]>([])
const filter_subsidiaries = ref<SubsidiariaTS[]>([])
const selectedSubsidiary = ref<SubsidiariaTS | null>(null);
const agency_filter = ref("");
const subsidiary_filter = ref("");
const payment_status = ref("");

onMounted(async () => {
  event.on('send-excel', (data) => {
    excelData.value = data;
  })
  await getAgencies();
  await getClientList();
})

const genereateSettlementsPdf = async () => {
  downloadingArchive.value = true;
  const { data, headers } = await instance.get('/settlements/generate-pending-pdf', {
    headers: {
      Authorization: 'Bearer ' + getToken()
    },
    responseType: 'blob',
  });

  const blob = new Blob([data], { type: headers['content-type'] || 'application/zip' });

  // Obtener el nombre del archivo desde el header o usar uno por defecto
  const contentDisposition = headers['content-disposition'];
  const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
  const fileName = fileNameMatch ? fileNameMatch[1] : 'negocios_pendientes.zip';

  // Crear enlace de descarga
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  downloadingArchive.value = false;
}


const createSettlements = async () => {
  try {
    if (!selectedAgency.value || !selectedSubsidiary.value) {
      errorAlert.value = true;
      errorMessage.value = "Porfavor, selecciona una aseguradora y sucursal";
      return;
    }

    event.emit('request-excel');
    if (excelData.value.length == 0) {
      errorAlert.value = true;
      errorMessage.value = "Porfavor, sube un excel que tenga filas validas";
      return;
    }

    const mappedData: LiquidacionTS[] = excelData.value.map(mapExcelRowToLiquidacion);

    const filteredArrays: ILiquidacionRequestBody = { with_user: [], without_user: [], agency: selectedAgency.value, subsidiary: selectedSubsidiary.value };

    if (clients.value.length > 0) {
      for (const row of mappedData) {
        const mappedClients = clients.value.map((client) => {
          return client.correo.trim();
        })
        if (row.cliente && mappedClients.includes(row.cliente.trim())) {
          const uuid = clients.value.filter((client) => client.correo.trim() == row.cliente?.trim())[0].id;
          row.ClienteId = uuid;
          filteredArrays.with_user.push(row);
        } else {
          filteredArrays.without_user.push(row);
        }
      }
    } else {
      filteredArrays.without_user = mappedData;
    }

    errorAlert.value = false;
    const { data } = await instance.post('/settlements/many', filteredArrays, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data.message) {
      isImportModal.value = false;
      event.emit('reload-settlements-table');
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      window.location.href = "/liquidaciones/arreglar-subida";
      if (error.response) {
        if (error.response.data.errors && error.response.data.payouts) {
          saveRows({ errors: error.response.data.errors, payouts: error.response.data.payouts });
        }
      }
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const getFilterSubsidiaries = async () => {
  // Handle form submission
  try {
    if (!agency_filter.value) {
      return;
    }
    errorAlert.value = false;
    const { data } = await instance.get('/agency/subsidiary/' + agency_filter.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      filter_subsidiaries.value = data;
      subsidiary_filter.value = filter_subsidiaries.value[0].id || "";
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const getSubsidiaries = async () => {
  // Handle form submission
  try {
    if (!selectedAgency.value) {
      return;
    }
    errorAlert.value = false;
    const { data } = await instance.get('/agency/subsidiary/' + selectedAgency.value.id, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      subsidiaries.value = data;
      selectedSubsidiary.value = subsidiaries.value[0];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const getAgencies = async () => {
  // Handle form submission
  try {
    errorAlert.value = false;
    const { data } = await instance.get('/agency', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      agencies.value = data.agencies;
      selectedAgency.value = agencies.value[0];
      if (selectedAgency.value) {
        getSubsidiaries();
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const getClientList = async () => {
  // Handle form submission
  try {
    errorAlert.value = false;
    const { data } = await instance.get('/clients', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      clients.value = data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const filterByAgency = async () => {
  if (subsidiary_filter.value.trim() != "") {
    if (agencies.value.filter(ag => ag.id == agency_filter.value).filter(ag => ag.Sucursales?.map(sc => sc.id).includes(subsidiary_filter.value)).length > 0) {
      event.emit('filter-by-agency', { agency: agency_filter.value, subsidiary: subsidiary_filter.value });
      return;
    } else {
      event.emit('filter-by-agency', { agency: agency_filter.value });
      await getFilterSubsidiaries();
      return;
    }
  }
  event.emit('filter-by-agency', { agency: agency_filter.value });
  await getFilterSubsidiaries();
}

const filterByType = () => {
  if (props.filter) {
    event.emit('filter-by-type', type.value);
  } else {
    event.emit('filter-by-type', payment_status.value);
  }
}

const filterByAgent = () => {
  event.emit('filter-by-agent', agent.value);
}



const excelSerialToDate = (serial: number): string => {
  const excelEpoch = new Date(1900, 0, 1); // 1 de enero de 1900
  const daysOffset = serial - 1; // Excel cuenta el 1 de enero de 1900 como 1
  excelEpoch.setDate(excelEpoch.getDate() + daysOffset);

  return excelEpoch.toISOString().split('T')[0]; // Devuelve en formato YYYY-MM-DD
};

const formatDate = (value: any): string => {
  if (typeof value === 'number') {
    return excelSerialToDate(value);
  }
  return value || ''; // Si ya es string, lo deja igual
};

const mapExcelRowToLiquidacion = (row: Record<string, any>): LiquidacionTS => {
  return {
    id: '',
    tipo: LiquidacionTypes.PRE_LIQUIDACIONES,
    estado: LiquidacionStates.EMITIDO,
    factura_ciaros: row['Factura Ciaros'] || 0,
    factura: row['Factura'] || 0,
    documento: row['Documento'] || 0,
    orden: row['Orden'] || '',
    fecha_vence: formatDate(row['F/Vence']) || '',
    d_inicial: row['D/Inicial'] || 0,
    poliza: row['Poliza'] || '',
    anexo: row['Anexo'] || 0,
    endoso: row['Endoso'] || '',
    codigo: row['Codigo'] || 0,
    cliente: row['Cliente'] || '',
    f_contab: formatDate(row['F/Contab']) || '',
    valor_prima: row['Valor Prima'] || 0,
    comision: row['Com. Agente'] || 0,
    ori: row['Ori'] || '',
    F: row['F'] || '',
    L: row['L'] || '',
    P: row['P'] || '',
    Notas: row['Notas'] || row['Ori'] || '',
    SAge: row['SAge'] || '',
    fecha_cobrada: row['F. Cobrada'] || null,
    fecha_pagada: row['F. Pagada'] || null,
    fecha_factura_ciaros: row['F. Facturacion'] || null,
    fecha_liquidada: row['F. Liquidacion'] || null
  };
};
</script>
