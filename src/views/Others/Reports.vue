<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="inline-flex w-full justify-between gap-2 items-center">
      <div class="inline-flex gap-3 items-center">
        <button @click="getReportSVCS"
          class="dark:bg-white/[0.12] bg-gray-200 text-center hover:bg-gray-300  hover:dark:bg-white/[0.20] px-3 py-2 inline-flex items-center gap-3 border rounded-sm border-gray-200 dark:border-none text-2xl dark:text-white font-bold">
          GENERAR REPORTE
        </button>
        <div class="grid">
          <label for="from-date" class="dark:text-gray-200 text-gray-500">Desde</label>
          <input type="date" id="from-date" v-model="min_date"
            class="outline-none border-gray-500 dark:border-gray-300 rounded-sm px-2 py-1 text-center text-gray-500 dark:text-gray-200 border-[3px]">
        </div>
        <div class="grid">
          <label for="to-date" class="dark:text-gray-200 text-gray-500">Hasta</label>
          <input type="date" id="to-date" v-model="max_date"
            class="outline-none border-gray-500 dark:border-gray-300 rounded-sm px-2 py-1 text-center text-gray-500 dark:text-gray-200 border-[3px]">
        </div>
      </div>

      <div class="inline-flex items-center gap-2">
        <input v-model="agency" type="text" placeholder="Filtro por aseguradora" @input="filterByAgency"
          class="dark:bg-dark-900 h-11 w-auto appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />

        <button @click="isCodeCreationModal = true"
          class="px-3 py-2 text-base font-semibold rounded-lg dark:bg-white text-gray-800 border-1 dark:border-0">
          Nuevo
        </button>
      </div>
    </div>

    <div
      class="overflow-hidden mt-6 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div class="max-w-full overflow-x-auto custom-scrollbar">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="px-5 py-3 text-left w-3/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Empresa</p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nombre Ramo</p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Codigo Ramo</p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nombre Super Cia</p>
              </th>
              <th class="px-5 py-3 text-left w-2/11 sm:px-6">
                <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Codigo Super Cia</p>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700" v-if="paginatedItems.length > 0">
            <tr v-for="(code, index) in paginatedItems" :key="index"
              class="border-t border-gray-100 dark:border-gray-800">
              <td class="px-5 py-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div>
                    <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {{ code.Aseguradora?.nombre }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div>
                    <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {{ code.nombre_ramo }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div>
                    <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {{ code.codigo_ramo }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div>
                    <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {{ code.nombre_ramo_cia }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div>
                    <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {{ code.codigo_ramo_cia }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <button @click="editCode(code)" v-if="code"
                    class="p-2 border border-gray-200 dark:border-gray-800 rounded-lg">
                    <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      Editar
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

          <Paginator :itemsPerPage="Number(itemsPerPage)" :total-items="totalItems"
            @update:current-page="setPaginatedItems">
          </Paginator>
        </div>
      </div>
    </div>
  </AdminLayout>

  <Modal v-if="isCodeCreationModal" @close="isCodeCreationModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isCodeCreationModal = false"
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
            Crear nuevo codigo ramo
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Agrega un codigo nuevo al sistema.
          </p>
        </div>
        <form class="flex flex-col">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre Ramo
                </label>
                <input type="text" v-model="codeSchema.nombre_ramo"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Codigo Ramo
                </label>
                <input type="text" v-model="codeSchema.codigo_ramo"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre Ramo Super Cia
                </label>
                <input type="text" v-model="codeSchema.nombre_ramo_cia"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Codigo Ramo Super Cia
                </label>
                <input type="text" v-model="codeSchema.codigo_ramo_cia"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>

              <div class="">
                <h4 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                  Seleccionar aseguradora
                </h4>
                <select v-model="selectedAgency"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option v-for="agency in agencies" :value="agency.id">{{ agency.nombre }}</option>
                </select>
              </div>
            </div>
          </div>
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar crear el codigo ramo"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="isCodeCreationModal = false" type="button"
              class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
              Cerrar
            </button>
            <button @click="createCode" type="button"
              class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
              Crear codigo ramo
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>

  <Modal v-if="isCodeEditionModal" @close="isCodeEditionModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isCodeEditionModal = false"
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
            Editar codigo ramo
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Edita un codigo existente en el sistema.
          </p>
        </div>
        <form class="flex flex-col">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre Ramo
                </label>
                <input type="text" v-model="codeSchema.nombre_ramo"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Codigo Ramo
                </label>
                <input type="text" v-model="codeSchema.codigo_ramo"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre Ramo Super Cia
                </label>
                <input type="text" v-model="codeSchema.nombre_ramo_cia"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Codigo Ramo Super Cia
                </label>
                <input type="text" v-model="codeSchema.codigo_ramo_cia"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>

              <div class="">
                <h4 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                  Seleccionar aseguradora
                </h4>
                <select v-model="selectedAgency"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option v-for="agency in agencies" :value="agency.id">{{ agency.nombre }}</option>
                </select>
              </div>
            </div>
          </div>
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar actualizar el codigo ramo"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="isCodeEditionModal = false" type="button"
              class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
              Cerrar
            </button>
            <button @click="updateCode" type="button"
              class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
              Actualizar codigo ramo
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import instance from '@/libs/axios';
import axios from 'axios';
import { getToken } from '@/libs/authentication';
import type { CodigoRamoTS } from '@/interfaces/AseguradoraTS';
import { onMounted, ref } from 'vue';
import Alert from "@/components/ui/Alert.vue";
import Modal from "@/components/profile/Modal.vue";
import type { AseguradoraTS } from '@/interfaces/AseguradoraTS';
import Paginator from '@/components/common/Paginator.vue';
import event from '@/libs/event';

const filter = ref("");
const currentPageTitle = "Reportes SVCS"
const agency_codes = ref<CodigoRamoTS[]>([]);
const isCodeCreationModal = ref(false);
const isCodeEditionModal = ref(false);
const errorAlert = ref(false);
const errorMessage = ref("");
const selectedAgency = ref("");
const itemsPerPage = ref(5);
const currentPage = ref(1);
const totalItems = ref(0);
const edition_identifier = ref("");
const min_date = ref("");
const max_date = ref("");
const agencies = ref<AseguradoraTS[]>([])
const agency = ref("")
const paginatedItems = ref<CodigoRamoTS[]>([]);
const codeSchema = ref<CodigoRamoTS>({ nombre_ramo: '', nombre_ramo_cia: '', codigo_ramo: '', codigo_ramo_cia: '' })

onMounted(async () => {
  await getAgencyCodesList(currentPage.value, itemsPerPage.value);
  await getAgencies();
});

const setPaginatedItems = async (value: number) => {
  currentPage.value = value;
  await getAgencyCodesList(currentPage.value, itemsPerPage.value);
}

const editCode = (code: CodigoRamoTS) => {
  codeSchema.value = code;
  edition_identifier.value = code.id || "";
  isCodeEditionModal.value = true;
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
      selectedAgency.value = agencies.value[0].id || '';
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}


const getAgencyCodesList = async (page?: number | 1, limit?: number | 5, agency?: string) => {
  // Handle form submission
  try {
    if (agency && agency != '') {
      const { data } = await instance.get('/agency/codes?page=' + page + '&limit=' + limit + '&agency=' + agency, {
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      });

      agency_codes.value = data.codes;
      totalItems.value = data.count;
      paginatedItems.value = agency_codes.value;
      return;
    }
    const { data } = await instance.get('/agency/codes?page=' + page + '&limit=' + limit, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    agency_codes.value = data.codes;
    totalItems.value = data.count;
    paginatedItems.value = agency_codes.value;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    }
  }
}

const createCode = async () => {
  try {
    errorAlert.value = false;
    const schema: any = { ...codeSchema.value };
    schema.AseguradoraId = selectedAgency.value;
    const { data } = await instance.post('/agency/codes', schema, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      isCodeCreationModal.value = false;
      await getAgencyCodesList(currentPage.value, itemsPerPage.value);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const updateCode = async () => {
  try {
    errorAlert.value = false;
    const schema: any = { ...codeSchema.value };
    schema.AseguradoraId = selectedAgency.value;
    const { data } = await instance.put('/agency/codes/' + edition_identifier.value, schema, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      isCodeEditionModal.value = false;
      await getAgencyCodesList(currentPage.value, itemsPerPage.value);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const filterByAgency = async () => {
  if (agency.value.trim() == "") {
    await getAgencyCodesList(currentPage.value, itemsPerPage.value);
    event.emit('reload-paginator');
  } else {
    await getAgencyCodesList(currentPage.value, itemsPerPage.value, agency.value);
  }
}

const getReportSVCS = async () => {
  try {
    if (max_date.value != "" && min_date.value != "") {
      const { data, headers } = await instance.get('/agency/report-svcs?from=' + min_date.value + '&to=' + max_date.value, {
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        responseType: 'blob',
      });

      const blob = new Blob([data], { type: headers['content-type'] || 'text/plain' });
      // Obtener el nombre del archivo desde el header o usar uno por defecto
      const contentDisposition = headers['content-disposition'];
      const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : 'Reporte_SVCS.txt'

      // Crear enlace de descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } else {
      const { data, headers } = await instance.get('/agency/report-svcs', {
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        responseType: 'blob',
      });

      const blob = new Blob([data], { type: headers['content-type'] || 'text/plain' });
      // Obtener el nombre del archivo desde el header o usar uno por defecto
      const contentDisposition = headers['content-disposition'];
      const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : 'Reporte_SVCS.txt'

      // Crear enlace de descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
    }
  }
}
</script>