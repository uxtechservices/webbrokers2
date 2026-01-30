<template>
  <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="Kanban">
      {{ pageTitle }}
    </h2>
    <nav>
      <button v-if="clusterViewer" @click="event.emit('close-cluster-viewer')"
        class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
        <TrashIcon></TrashIcon>
        Cerrar visualizador
      </button>
      <button v-if="!loading && !successAlert && !clusterViewer" @click="archiveCluster"
        class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
        <FolderIcon></FolderIcon>
        Archivar
      </button>
      <RouterLink to="/liquidaciones/negocios-archivados" v-if="!loading && successAlert"
        class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
        <FolderIcon></FolderIcon>
        Ver archivadas
      </RouterLink>
      <button v-if="loading"
        class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
        <div style="border-top-color:transparent"
          class="w-6 h-6 mx-auto border-4 border-gray-800 border-solid rounded-full animate-spin"></div>
      </button>
    </nav>
  </div>

  <Modal v-if="archiveModal" @close="archiveModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="archiveModal = false"
          class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
          <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
              fill="" />
          </svg>
        </button>
        <div class="px-2">
          <h4 class="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Archivar pagados
          </h4>
        </div>
        <div class="grid gap-2 px-2 mt-6">
          <div class="">
            <h4 class="mb-2 text-sm text-gray-800 dark:text-white/90">
              Fecha de pago
            </h4>
            <input v-model="payment_date" type="date"
              class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
          </div>
        </div>
        <form class="flex flex-col">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al archivar negocios"
              :message="alertMessage" :showLink="false" />
            <div class="flex items-center gap-3 mt-6 lg:justify-end">
              <button @click="archiveModal = false" type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
                Cerrar
              </button>
              <button type="button" @click="archiveCluster"
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
                Archivar
              </button>
            </div>
          </div>
        </form>
      </div>
    </template>
  </Modal>


  <Alert v-show="successAlert" class="absolute top-2 right-2 z-10000 alert-animation" variant="successfull"
    title="Archivados correctamente" :message="'Se realizo el archivado correctamente'" :showLink="true"
    :link-href="'/liquidaciones/negocios-archivados'" :link-text="'Ver archivados'" />
</template>

<script setup lang="ts">
import FolderIcon from '@/icons/FolderIcon.vue';
import TrashIcon from '@/icons/TrashIcon.vue';
import Modal from '../profile/Modal.vue';
import { getToken } from '@/libs/authentication';
import instance from '@/libs/axios';
import axios from 'axios';
import { defineProps, ref } from 'vue'
import Alert from '../ui/Alert.vue';
import event from '@/libs/event';

const payment_date = ref("");
const loading = ref(false);

const errorAlert = ref(false);
const successAlert = ref(false);
const archiveModal = ref(false);
const alertMessage = ref("");

interface BreadcrumbProps {
  pageTitle: string
  clusterViewer: boolean
}


const archiveCluster = async () => {
  if (!archiveModal.value) {
    archiveModal.value = true;
    return;
  }
  if (payment_date.value == '') {
    errorAlert.value = true;
    alertMessage.value = "Ingresa una fecha de pago valida";
    return;
  }
  try {
    loading.value = true;
    await instance.put('/settlements/set-status', { status: 'Archivada', date: payment_date.value }, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      params: {
        id: ""
      }
    });

    event.emit('reload-kanban');
    archiveModal.value = false;
    loading.value = false;
    successAlert.value = true;
    payment_date.value = '';
    setTimeout(() => {
      successAlert.value = false
    }, 4000)
  } catch (error) {
    loading.value = false;
    if (axios.isAxiosError(error)) {
      successAlert.value = false;
      errorAlert.value = true;
      alertMessage.value = error.response?.data.message;
    }
  }
}

defineProps<BreadcrumbProps>()
</script>

<style scoped>
.alert-animation {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: slideInTopRight 4.5s ease-out forwards;
}

@keyframes slideInTopRight {
  0% {
    transform: translateY(-200px);
    opacity: 0;
  }

  20% {
    transform: translateY(0);
    opacity: 1;
  }

  80% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-200px);
    opacity: 0;
  }
}
</style>