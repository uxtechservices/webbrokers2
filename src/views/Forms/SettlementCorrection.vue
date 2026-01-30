<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="mx-auto w-full my-5 inline-flex items-center gap-2">
      <button v-for="(row, index) in mergedList" :key="index"
        @click="selectSettlement(row, index)" :class="[
          errors?.errors.some(error => error.index === index) ? 'grid': 'hidden',
          'px-3 py-1 rounded relative',
          row === settlementSchema ? 'dark:bg-indigo-500/20 bg-indigo-600/50 text-white' : 'dark:bg-indigo-600/50 bg-indigo-500/10 dark:text-white hover:bg-gray-200'
        ]">
        {{ index }}
        <span v-if="errors && errors.errors.filter((error) => error.index == index).length > 0"
          class="absolute -top-2 -right-2">
          <img src="/images/icons/warning.svg" alt="Warning Icon" class="h-4 w-4">
        </span>
      </button>
    </div>
    <div class="grid gap-6">
      <div class="space-y-6">
        <form class="grid">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-4">
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
              <div>
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


        <div class="" v-if="errors">
          <Alert v-if="errorValidationMessage != ''" class="mt-6" variant="error" title="Hay campos invalidos"
            :message="errorValidationMessage" :showLink="false" />
          <Alert v-if="errorFieldsMessage != ''" class="mt-6" variant="error" title="Hay campos incompletos"
            :message="errorFieldsMessage" :showLink="false" />
        </div>
        <Alert v-if="errorAlert" class="mt-6" variant="error" title="Un error ha ocurrido al realizar la petición"
          :message="errorMessage" :showLink="false" />
      </div>
      <button @click="createSettlements" type="button"
        class="px-3 py-2 md:w-1/3 text-base mx-auto font-semibold rounded-lg bg-indigo-700/65 dark:bg-indigo-700/35 text-white border-1 dark:border-0">
        Enviar liquidaciones
      </button>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import axios from "axios";
import Alert from "@/components/ui/Alert.vue";
import instance from '@/libs/axios';
import { getToken } from '@/libs/authentication';
import router from '@/router';
import type { IRowsError, IError } from '@/interfaces/ErrorTS';
import { BASE_LIQUIDACION, type ILiquidacionRequestBody, type LiquidacionTS } from '@/interfaces/LiquidacionesTS';
import { deleteSavedRows, getSavedRows, saveRows } from '@/libs/storage';
import type { ClienteTS } from '@/interfaces/ClientesTS';

const settlementSchema = ref<LiquidacionTS>(BASE_LIQUIDACION);
const currentIndex = ref(0);
const mergedList = ref<LiquidacionTS[]>([]);
const clients = ref<ClienteTS[]>([])
const errors = ref<IRowsError>();
const currentPageTitle = ref('Arreglar importación masiva')
const errorAlert = ref(false);
const errorFieldsMessage = ref("");
const errorMessage = ref("");
const errorValidationMessage = ref("");
const page = ref(1);
const limit = ref(10);
const name = ref("");

onMounted(async () => {
  const loadErrors = getSavedRows();
  if (loadErrors) {
    errors.value = loadErrors;
    if(errors.value){
      mergedList.value.push(...errors.value.payouts.with_user)
      mergedList.value.push(...errors.value.payouts.without_user)
      selectSettlement(mergedList.value[0], 0)
    }
  }
})



const printFieldsErrorMessage = (errors: IError[]) => {
  errorFieldsMessage.value = '';
  errorValidationMessage.value = '';

  let fillFieldsMessage = "Debes completar los campos: ";
  let invalidFieldMessage = "Estos campos tienen valores erroneos o duplicados: ";

  const unfilledFields = errors.filter((error) => error.fill).map((val) => val.field);
  const invalidFields = errors.filter((error) => !error.fill).map((val) => val.field);

  if (unfilledFields.length > 0) {
    errorFieldsMessage.value = fillFieldsMessage + unfilledFields;
  }
  if (invalidFields.length > 0) {
    errorValidationMessage.value = invalidFieldMessage + invalidFields;
  }
}

const selectSettlement = (value: LiquidacionTS, index: number) => {
  settlementSchema.value = value;
  currentIndex.value = index;
  if (errors.value) {
    printFieldsErrorMessage(errors.value.errors.filter((error) => error.index == currentIndex.value));
  }
}

const createSettlements = async () => {
  try {
    if (!errors.value) {
      return;
    }

    const mappedData = mergedList.value;
    const filteredArrays: ILiquidacionRequestBody = { with_user: [], without_user: [], agency: errors.value.payouts.agency, subsidiary: errors.value.payouts.subsidiary };

    if (clients.value.length > 0) {
      for (const row of mappedData) {
        const mappedClients = clients.value.map((client) => {
          return client.correo;
        })
        if (row.cliente && mappedClients.includes(row.cliente)) {
          const uuid = clients.value.filter((client) => client.correo == row.cliente)[0].id;
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
      deleteSavedRows();
      router.go(-1);
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      window.location.href = "/liquidaciones/arreglar-subida";
      saveRows({ errors: error.response?.data.errors, payouts: error.response?.data.payouts });
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


</script>
