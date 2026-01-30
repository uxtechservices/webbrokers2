<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-3/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Nombre</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Email</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Rol</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acciones</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700" v-if="paginatedItems.length > 0">
          <tr v-for="(user, index) in paginatedItems" :key="index" class="border-t border-gray-100 dark:border-gray-800">
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ user.nombre }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ user.correo }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ user.rol }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <button v-if="user" @click="editUser(user)" class="p-2 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    Editar
                  </span>
                </button>
                <button v-if="user.id" @click="deleteUser(user.id)" class="p-2 bg-red-700 rounded-lg">
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


  <Modal v-if="isUserDeletionModal" @close="isUserDeletionModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isUserDeletionModal = false"
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
            Eliminar un usuario
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            ¿Estas seguro de realizar esta acción?
          </p>
        </div>
        <form class="flex flex-col">
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar eliminar el usuario"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="confirmUserDeletion" type="button"
              class="flex w-full justify-center rounded-lg bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto">
              Eliminar usuario
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>

  <Modal v-if="isUserEditionModal" @close="isUserEditionModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isUserEditionModal = false"
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
            Editar usuario
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Edita los datos de un usuario existente.
          </p>
        </div>
        <form class="flex flex-col">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div v-if="editedUser" class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre
                </label>
                <input type="text" v-model="editedUser.nombre"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Correo
                </label>
                <input type="text" v-model="editedUser.correo"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Rol
                </label>
                <select v-model="editedUser.rol"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                  <option value="Admin">Admin</option>
                  <option value="Asistente">Asistente</option>
                </select>
              </div>
            </div>
          </div>
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar editar el usuario"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="isUserEditionModal = false" type="button"
              class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
              Cerrar
            </button>
            <button @click="saveUserDetails" type="button"
              class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
              Actualizar usuario
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Modal from "@/components/profile/Modal.vue";
import Alert from "@/components/ui/Alert.vue";
import axios from 'axios'
import type { UsuarioTS } from '@/interfaces/UsuariosTS';
import instance from '@/libs/axios';
import { getToken } from '@/libs/authentication';
import event from '@/libs/event';
import Paginator from '@/components/common/Paginator.vue';

const errorAlert = ref(false);
const errorMessage = ref("");
const isUserDeletionModal = ref(false);
const isUserEditionModal = ref(false);
const userUnderDeletion = ref("");
const users = ref<UsuarioTS[]>([]);
const filteredUsers = ref<UsuarioTS[]>([])
const editedUser = ref<UsuarioTS | null>(null);
const itemsPerPage = ref(5);
const totalItems = ref(0);
const currentPage = ref(1);
const filter = ref("");
const paginatedItems = ref<UsuarioTS[]>([]);

const props = defineProps({ user_filter: { type: String, default: '' } })
const searchQuery = ref(props.user_filter);


const setPaginatedItems = async (value: number) => {
  currentPage.value = value;
  await getUserList(currentPage.value, itemsPerPage.value);
}

// Observa cambios en `props.user_filter`
watch(() => props.user_filter, (newValue) => {
  searchQuery.value = newValue;
  filterByUser();
});

const filterByUser = () => {
  if (searchQuery.value.trim() == "") {
    setPaginatedItems(1);
  } else {
    getUserByName(currentPage.value, itemsPerPage.value, searchQuery.value);
  }
}

const getUserList = async (page: number | 1, limit: number | 5) => {
  // Handle form submission
  try {
    errorAlert.value = false;
    if(searchQuery.value.trim() != ""){
      await getUserByName(currentPage.value, itemsPerPage.value, searchQuery.value);
      return;
    }
    const { data } = await instance.get('/users?page=' + page + '&limit=' + limit, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      paginatedItems.value = data.users;
      totalItems.value = data.count;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}


const getUserByName = async (page: number | 1, limit: number | 5, name?: string) => {
  // Handle form submission
  try {
    errorAlert.value = false;
    const { data } = await instance.get('/users?page=' + page + '&limit=' + limit + '&name=' + name, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      paginatedItems.value = data.users;
      totalItems.value = data.count;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const deleteUser = (id: string) => {
  userUnderDeletion.value = id;
  isUserDeletionModal.value = true;
}

const confirmUserDeletion = async () => {
  try {
    errorAlert.value = false;
    const { data } = await instance.delete('/users/' + userUnderDeletion.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      await getUserList(1,5);
      isUserDeletionModal.value = false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}


const editUser = (user: UsuarioTS) => {
  isUserEditionModal.value = true;
  editedUser.value = user;
}

const saveUserDetails = async () => {
  try {
    if(!editedUser.value){
      errorAlert.value = true;
      errorMessage.value = "Porfavor selecciona un cliente valido";
      return;
    }
    errorAlert.value = false;
    const { data } = await instance.put('/users/' + editedUser.value.id, editedUser.value, {headers: {
      Authorization: 'Bearer ' + getToken()
    }});

    if (data) {
      isUserEditionModal.value = false
      event.emit('reload-user-table');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

onMounted(async () => {
  await getUserList(1,5);
  event.on('reload-user-table', async () => {
    await getUserList(1,5)
  })
})
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
