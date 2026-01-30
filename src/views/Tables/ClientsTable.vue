<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    
    <nav class="flex justify-between gap-2 items-center mb-4">
      <div class="flex gap-2 w-1/2">
        <SearchBar @update:modelValue="applyUserFilter" :placeholder="'Buscar un cliente'"></SearchBar>
      </div>
      <button @click="isClientCreationModal = true" class="px-3 py-2 text-base font-semibold rounded-lg dark:bg-white text-gray-800 border-1 dark:border-0">
        Nuevo
      </button>
    </nav>
    <div class="space-y-5 sm:space-y-6">
        <ClientsTableOne :user_filter="searchQuery"/>
    </div>
  </AdminLayout>

  
  
  <Modal v-if="isClientCreationModal" @close="isClientCreationModal = false">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <!-- close btn -->
          <button @click="isClientCreationModal = false"
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
              Crear nuevo cliente
            </h4>
            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Agrega un nuevo cliente al sistema.
            </p>
          </div>
          <form class="flex flex-col">
            <div class="px-2 overflow-y-auto custom-scrollbar">
              <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Nombre
                  </label>
                  <input type="text" v-model="clientSchema.nombre"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                </div>

                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Correo
                  </label>
                  <input type="text" v-model="clientSchema.correo"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                </div>
                
                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Telefono
                  </label>
                  <input type="text" v-model="clientSchema.telefono"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                </div>

                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Dirección
                  </label>
                  <input type="text" v-model="clientSchema.direccion"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                </div>
              </div>
            </div>
            <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar crear el usuario" :message="errorMessage"
              :showLink="false" />
            <div class="flex items-center gap-3 mt-6 lg:justify-end">
              <button @click="isClientCreationModal = false" type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
                Cerrar
              </button>
              <button @click="createClient" type="button"
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
                Crear cliente
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/profile/Modal.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import SearchBar from '@/components/layout/header/SearchBar.vue'
import ClientsTableOne from "@/components/tables/basic-tables/ClientsTableOne.vue";
import instance from "@/libs/axios";
import { getToken } from "@/libs/authentication";
import axios from "axios";
import event from "@/libs/event";
import Alert from "@/components/ui/Alert.vue";
import type { ClienteTS } from "@/interfaces/ClientesTS";

const clientSchema = ref<ClienteTS>({nombre: '', correo: '', direccion: '', telefono: ''})
const errorAlert = ref(false);
const errorMessage = ref("");
const currentPageTitle = ref("Clientes");
const isClientCreationModal = ref(false)
const searchQuery = ref("");

const applyUserFilter = async (data: string) => {
  searchQuery.value = data;
}

const createClient = async () => {
  // Implement save profile logic here
  // Handle form submission
  try {
    errorAlert.value = false;
    const { data } = await instance.post('/clients', clientSchema.value, {headers: {
      Authorization: 'Bearer ' + getToken()
    }});

    if (data) {
      isClientCreationModal.value = false
      event.emit('reload-client-table');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}
</script>
