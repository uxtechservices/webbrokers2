<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid gap-6">
      <div class="space-y-6">
        <form class="grid">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-4">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Tipo *
                </label>

                <select v-model="settlementSchema.tipo"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option value="Pre Liquidacion">Pre Liquidacion</option>
                  <option value="Negocio pendiente por liberar">Negocio pendiente por liberar</option>
                  <option value="Negocio pendiente por facturar">Negocio pendiente por facturar</option>
                  <option value="Consolidado">Consolidado</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Estado *
                </label>
                <select v-model="settlementSchema.estado"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option value="Emitida">Emitida</option>
                  <option value="Lista">Lista</option>
                  <option value="Por Facturar">Por Facturar</option>
                  <option value="Por Liberar">Por Liberar</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Factura Ciaros
                </label>
                <input type="text" v-model="settlementSchema.factura_ciaros"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Factura
                </label>
                <input type="text" v-model="settlementSchema.factura"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Documento
                </label>
                <input type="text" v-model="settlementSchema.documento"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Fecha vencimiento
                </label>
                <input type="date" v-model="settlementSchema.fecha_vence"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  D/Inicial
                </label>
                <input type="number" v-model="settlementSchema.d_inicial"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Poliza
                </label>
                <input type="text" v-model="settlementSchema.poliza"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Anexo
                </label>
                <input type="number" v-model="settlementSchema.anexo"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
            </div>
          </div>
        </form>

        <form class="grid bg-indigo-900/5 px-2 py-4 rounded-md">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-4">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Endoso
                </label>
                <input type="text" v-model="settlementSchema.endoso"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Codigo
                </label>
                <input type="number" v-model="settlementSchema.codigo"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div class="relative">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Cliente
                </label>
                <input type="text" v-model="name" @input="getClientList" :class="{
                  'rounded-t-lg': clients.length > 0,
                  'rounded-lg': !(clients.length > 0)
                }"
                  class="dark:bg-dark-900 h-11 w-full appearance-none border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                <div v-if="clients.length > 0"
                  class="grid gap-4 dark:bg-dark-900 h-auto w-full appearance-none rounded-b-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 absolute">
                  <span class="text-white cursor-pointer" @click="setClient(client)"
                    v-for="client in clients" :key="client.id">{{ client.correo }}</span>
                </div>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  F/Contab
                </label>
                <input type="date" v-model="settlementSchema.f_contab"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Valor prima
                </label>
                <input type="number" v-model="settlementSchema.valor_prima"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Comisión Agente
                </label>
                <input type="number" v-model="settlementSchema.comision"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div v-if="settlementSchema.tipo != LiquidacionTypes.NEGOCIO_LIBERADO">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Ori
                </label>
                <input type="text" v-model="settlementSchema.ori"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  F
                </label>
                <input type="text" v-model="settlementSchema.F"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  L
                </label>
                <input type="text" v-model="settlementSchema.L"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  P
                </label>
                <input type="text" v-model="settlementSchema.P"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  SAge
                </label>
                <input type="text" v-model="settlementSchema.SAge"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Aseguradora
                </label>
                <select v-model="settlementSchema.AseguradoraId" @change="getSubsidiaries"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option v-for="agency in agencies" :value="agency.id">{{ agency.nombre }}</option>
                </select>
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Sucursal
                </label>
                <select v-model="settlementSchema.SucursaleId"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option v-for="subsidiary in subsidiaries" :value="subsidiary.id">Ciudad de {{ subsidiary.ciudad }}
                    encargado
                    {{ subsidiary.encargado }}</option>
                </select>
              </div>
              <div v-if="settlementSchema.tipo == LiquidacionTypes.CONSOLIDADO">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Fecha cobrada
                </label>
                <input type="date" v-model="settlementSchema.fecha_cobrada"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div v-if="settlementSchema.tipo == LiquidacionTypes.CONSOLIDADO">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Fecha pagada
                </label>
                <input type="date" v-model="settlementSchema.fecha_pagada"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div v-if="settlementSchema.tipo == LiquidacionTypes.CONSOLIDADO">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Fecha factura ciaros
                </label>
                <input type="date" v-model="settlementSchema.fecha_factura_ciaros"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div v-if="settlementSchema.tipo == LiquidacionTypes.CONSOLIDADO">
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Fecha liquidada
                </label>
                <input type="date" v-model="settlementSchema.fecha_liquidada"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
            </div>
          </div>
          <div class="px-2 overflow-y-auto custom-scrollbar mt-3">
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Notas
            </label>
            <textarea type="text" rows="5" v-model="settlementSchema.Notas"
              class="dark:bg-dark-900 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"></textarea>
          </div>
        </form>


        <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar crear la liquidación"
          :message="errorMessage" :showLink="false" />
      </div>
      <button @click="createSettlement" type="button"
        class="px-3 py-2 md:w-1/3 text-base mx-auto font-semibold rounded-lg bg-indigo-700/65 dark:bg-indigo-700/35 text-white border-1 dark:border-0">
        Guardar liquidación
      </button>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import axios from "axios";
import event from "@/libs/event";
import Alert from "@/components/ui/Alert.vue";
import { BASE_LIQUIDACION, LiquidacionTypes, type LiquidacionTS } from '@/interfaces/LiquidacionesTS';
import instance from '@/libs/axios';
import { getToken } from '@/libs/authentication';
import router from '@/router';
import type { AseguradoraTS } from '@/interfaces/AseguradoraTS';
import type { SubsidiariaTS } from '@/interfaces/SubsidiariaTS';
import type { ClienteTS } from '@/interfaces/ClientesTS';

const settlementSchema = ref<LiquidacionTS>(BASE_LIQUIDACION);
const currentPageTitle = ref('Crear pre-liquidación')
const errorAlert = ref(false);
const errorMessage = ref("");
const agencies = ref<AseguradoraTS[]>([])
const subsidiaries = ref<SubsidiariaTS[]>([])
const clients = ref<ClienteTS[]>([])
const page = ref(1);
const limit = ref(10);
const name = ref("");

onMounted(async () => {
  await getAgencies();
})

const createSettlement = async () => {
  try {
    if (!settlementSchema.value.AseguradoraId || !settlementSchema.value.SucursaleId) {
      errorAlert.value = true;
      errorMessage.value = "Porfavor, selecciona una aseguradora y sucursal";
      return;
    }
    errorAlert.value = false;

    if (settlementSchema.value.cliente == "") {
      errorAlert.value = true;
      errorMessage.value = "Ingresa el correo de un cliente valido";
      return;
    }

    const { data } = await instance.post('/settlements', settlementSchema.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      router.go(-1)
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const setClient = async (client: ClienteTS) => {
  settlementSchema.value.cliente = client.correo
  name.value = client.correo
  clients.value = [];
}

const getClientList = async () => {
  // Handle form submission
  try {
    errorAlert.value = false;

    const queryParams = new URLSearchParams({
      page: String(page.value),
      limit: String(limit.value),
    });

    // Filtros dinámicos
    if (name.value != '') {
      queryParams.append("name", name.value);
    } else {
      clients.value = [];
      return;
    }
    

    const url = `/clients?${queryParams.toString()}`;

    const { data } = await instance.get(url, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      clients.value = data.clients;
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
    if (!settlementSchema.value.AseguradoraId) {
      return;
    }
    errorAlert.value = false;
    const { data } = await instance.get('/agency/subsidiary/' + settlementSchema.value.AseguradoraId, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      subsidiaries.value = data;
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
      await getSubsidiaries();
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}
</script>
