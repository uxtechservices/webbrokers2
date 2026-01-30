<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-3/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Estatus</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Codigo</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Cod. Ej. Ciaros</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nombres</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Comisión</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Ciudad Beneficiario</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Lider</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acciones</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700" v-if="paginatedItems.length > 0">
          <tr v-for="(agent, index) in paginatedItems" :key="index" class="border-t border-gray-100 dark:border-gray-800">
            <td class="px-5 py-4 sm:px-6">
              <span :class="[
                'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                {
                  'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500':
                    agent.estatus === 'Activo',
                  'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400':
                    agent.estatus === 'Inactivo',
                  'bg-error-50 text-error-700 dark:bg-error-500/25 dark:text-error-400':
                    agent.estatus === 'Suspendido'
                },
              ]">
                {{ agent.estatus }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ agent.codigo }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ agent.codigo_ejecutivo_ciaros }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-xs dark:text-white/90">
                    {{ agent.nombres }} {{ agent.apellidos }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ agent.tarifa_comision }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ agent.ciudad_beneficiario }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-xs dark:text-white/90">
                    {{ agent.parent?.nombres }} {{ agent.parent?.apellidos }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <RouterLink v-if="agent.id" :to="'/subagentes/editar/' + agent.id" class="p-2 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    Editar
                  </span>
                </RouterLink>
                <button v-if="agent.id" @click="deleteAgent(agent.id)" class="p-2 bg-red-700 rounded-lg">
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
        <select v-model="itemsPerPage"  @change="setPaginatedItems(currentPage)"
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


  <Modal v-if="isAgentUnderDeletion" @close="isAgentUnderDeletion = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isAgentUnderDeletion = false"
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
            Eliminar un sub-agente
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            ¿Estas seguro de realizar esta acción?
          </p>
        </div>
        <form class="flex flex-col">
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar eliminar el agente"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="confirmAgentDeletion" type="button"
              class="flex w-full justify-center rounded-lg bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto">
              Eliminar agente
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
import { getToken } from '@/libs/authentication';
import type { SubagenteTS } from '@/interfaces/SubagentesTS';
import Modal from "@/components/profile/Modal.vue";
import Alert from "@/components/ui/Alert.vue";
import event from '@/libs/event';
import Paginator from '@/components/common/Paginator.vue';
import type { AgentFilters } from '@/interfaces/Options';

const errorAlert = ref(false);
const errorMessage = ref("");
const agents = ref<SubagenteTS[]>([])
const filteredAgents = ref<SubagenteTS[]>([]);
const isAgentUnderDeletion = ref(false);
const agentUnderDeletion = ref("");
const itemsPerPage = ref(5);
const totalItems = ref(0);
const currentPage = ref(1);
const filter = ref("");
const paginatedItems = ref<SubagenteTS[]>([]);
const state = ref("");

const props = defineProps({user_filter: {type: String, default: ''}, document_filter: {type: String, default: ''}})
const name_filter = ref(props.user_filter);
const document_filter = ref(props.document_filter);

// Observa cambios en `props.user_filter`
watch(() => props.user_filter, (newValue) => {
  name_filter.value = newValue;
  filterByUser();
});

// Observa cambios en `props.user_filter`
watch(() => props.document_filter, (newValue) => {
  document_filter.value = newValue;
  filterByDocument();
});

const setPaginatedItems = async (value: number) => {
  currentPage.value = value;
  await getAgentsList(currentPage.value, itemsPerPage.value);
}

const filterByDocument = async () => {
  if(document_filter.value.trim() == ""){
    await setPaginatedItems(1);
  } else {
    await getAgentsList(currentPage.value, itemsPerPage.value);
  }
}

const filterByUser = async () => {
  if(name_filter.value.trim() == ""){
    await setPaginatedItems(1);
  } else {
    await getAgentsList(currentPage.value, itemsPerPage.value);
  }
}


const getAgentsList = async (page: number, limit: number) => {
  const filters: AgentFilters = {}

  if (name_filter.value != '') filters.name = name_filter.value;
  if (state.value != '') filters.state = state.value;
  if (document_filter.value != '') filters.doc = document_filter.value;

  await getAgents(page, limit, filters);
};

const getAgents = async (page: number, limit: number, filters: AgentFilters = {}) => {
  // Handle form submission
  try {
    errorAlert.value = false;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Filtros dinámicos
    if (filters.name) queryParams.append("name", filters.name);
    if (filters.state) queryParams.append("state", filters.state);
    if (filters.doc) queryParams.append("doc", filters.doc);

    const { data } = await instance.get('/agents?' + queryParams.toString(), {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      paginatedItems.value = data.agents;
      totalItems.value = data.count;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}


const deleteAgent = (id: string) => {
  agentUnderDeletion.value = id;
  isAgentUnderDeletion.value = true;
}

const confirmAgentDeletion = async () => {
  try {
    errorAlert.value = false;
    const { data } = await instance.delete('/agents/' + agentUnderDeletion.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      await getAgentsList(1,5);
      isAgentUnderDeletion.value = false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

onMounted(async () => {
  await getAgentsList(1,5);
  event.on('reload-agents-table', async () => {
    await getAgentsList(1,5)
  })
  event.on('filter-by-agent-state', async (val) => {
    state.value = val;
    await getAgentsList(1,5)
  })
})
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
