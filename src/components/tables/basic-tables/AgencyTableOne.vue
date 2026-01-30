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
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Contrato</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Dirección</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acciones</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700" v-if="paginatedItems.length > 0">
          <tr v-for="(agency, index) in paginatedItems" :key="index"
            class="border-t border-gray-100 dark:border-gray-800">
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ agency.nombre }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ agency.correo }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ agency.contrato }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ agency.direccion }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <button v-if="agency" @click="editAgency(agency)"
                  class="p-2 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    Editar
                  </span>
                </button>
                <button v-if="agency.id" @click="deleteAgency(agency.id)" class="p-2 bg-red-700 rounded-lg">
                  <span class="block font-medium text-gray-200 text-theme-sm dark:text-white/90">
                    Eliminar
                  </span>
                </button>
                <button v-if="agency.Sucursales && agency.id" @click="seeSubsidiaries(agency.Sucursales, agency.id)"
                  class="p-2 bg-brand-700 rounded-lg">
                  <span class="block font-medium text-gray-200 text-theme-sm dark:text-white/90">
                    Sucursales
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
      
      <Paginator :itemsPerPage="Number(itemsPerPage)" :total-items="totalItems"
        @update:current-page="setPaginatedItems">
      </Paginator>
    </div>
  </div>


  <Modal v-if="isAgencyDeletionModal" @close="isAgencyDeletionModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isAgencyDeletionModal = false"
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
            Eliminar una aseguradora
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            ¿Estas seguro de realizar esta acción?
          </p>
        </div>
        <form class="flex flex-col">
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar eliminar la aseguradora"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="confirmAgencyDeletion" type="button"
              class="flex w-full justify-center rounded-lg bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto">
              Eliminar aseguradora
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>
  <Modal v-if="isAgencyEditionModal" @close="isAgencyEditionModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isAgencyEditionModal = false"
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
            Editar aseguradora
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Edita los datos de una aseguradora existente.
          </p>
        </div>
        <form class="flex flex-col">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div v-if="editedAgency" class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre
                </label>
                <input type="text" v-model="editedAgency.nombre"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  RUC
                </label>
                <input type="text" v-model="editedAgency.ruc"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Correo
                </label>
                <input type="text" v-model="editedAgency.correo"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Contrato
                </label>
                <input type="text" v-model="editedAgency.contrato"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Dirección
                </label>
                <input type="text" v-model="editedAgency.direccion"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
            </div>
          </div>
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar editar la aseguradora"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="isAgencyEditionModal = false" type="button"
              class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
              Cerrar
            </button>
            <button @click="saveAgencyDetails" type="button"
              class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
              Actualizar aseguradora
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>

  <Modal v-if="isSubsidiariesModal" @close="isSubsidiariesModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isSubsidiariesModal = false"
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
            Sucursales de la Aseguradora
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Revisa las sucursales de una Aseguradora
          </p>
        </div>
        <div class=""></div>
        <form class="flex flex-col">
          <div class="px-2 overflow-y-auto custom-scrollbar grid gap-2" v-if="subsidiaries.length > 0">
            <div class="inline-flex gap-1" v-for="subsidiary in subsidiaries">
              <div class="w-full dark:bg-brand-800/15 border border-gray-200 dark:border-none rounded-md p-2">
                <h1 class="dark:text-white/90 text-gray-800">{{ subsidiary.encargado }} encargado/a en {{
                  subsidiary.ciudad }} su correo es {{ subsidiary.correo }}</h1>
              </div>
              <button type="button" v-if="subsidiary.id" @click="removeSubsidiary(subsidiary.id)" class="bg-error-600 p-2 rounded-md">
                <TrashIcon></TrashIcon>
              </button>
            </div>
          </div>
          <div class="px-2 overflow-y-auto custom-scrollbar grid gap-2" v-else>
            <h1 class="dark:text-white/50 text-gray-800 text-xl font-bold">No hay sucursales registradas actualmente</h1>
          </div>
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar editar las sucursales"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="isSubsidiariesModal = false" type="button"
              class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
              Cerrar
            </button>
            <button @click="toggleSubsidiaryCreation" type="button"
              class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
              Agregar sucursal
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>


  <Modal v-if="isSubsidiariesCreationModal" @close="isSubsidiariesCreationModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isSubsidiariesCreationModal = false"
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
            Agregar sucursal
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Añade una nueva sucursal
          </p>
        </div>
        <div class=""></div>
        <form class="flex flex-col">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre del encargado
                </label>
                <input type="text" v-model="editedSubsidiary.encargado"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Ciudad
                </label>
                <input type="text" v-model="editedSubsidiary.ciudad"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Correo del encargado
                </label>
                <input type="email" v-model="editedSubsidiary.correo"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
              </div>
            </div>
          </div>
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar crear la sucursal"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="isSubsidiariesCreationModal = false" type="button"
              class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
              Cerrar
            </button>
            <button @click="addSubsidiary" type="button"
              class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
              Confirmar
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
import type { AseguradoraTS } from '@/interfaces/AseguradoraTS';
import Modal from "@/components/profile/Modal.vue";
import Alert from "@/components/ui/Alert.vue";
import event from '@/libs/event';
import type { SubsidiariaTS } from '@/interfaces/SubsidiariaTS';
import TrashIcon from '@/icons/TrashIcon.vue';
import Paginator from '@/components/common/Paginator.vue';

const errorAlert = ref(false);
const errorMessage = ref("");
const isAgencyDeletionModal = ref(false);
const isAgencyEditionModal = ref(false);
const isSubsidiariesModal = ref(false);
const isSubsidiariesCreationModal = ref(false);
const agencyUnderDeletion = ref("");
const selectedAgency = ref("");
const agencies = ref<AseguradoraTS[]>([])
const subsidiaries = ref<SubsidiariaTS[]>([])
const filteredAgencies = ref<AseguradoraTS[]>([])
const editedAgency = ref<AseguradoraTS | null>(null);
const editedSubsidiary = ref<SubsidiariaTS>({ ciudad: "", correo: "", encargado: "" });
const itemsPerPage = ref(5);
const totalItems = ref(0);
const currentPage = ref(1);
const filter = ref("");
const paginatedItems = ref<AseguradoraTS[]>([]);

const props = defineProps({ user_filter: { type: String, default: '' } })
const searchQuery = ref(props.user_filter);

// Observa cambios en `props.user_filter`
watch(() => props.user_filter, (newValue) => {
  searchQuery.value = newValue;
  filterByUser();
});

const setPaginatedItems = async (value: number) => {
  currentPage.value = value;
  await getAgencyList(currentPage.value, itemsPerPage.value);
}

const filterByUser = () => {
  if (searchQuery.value.trim() == "") {
    setPaginatedItems(1);
  } else {
    getAgencyByName(currentPage.value, itemsPerPage.value, searchQuery.value);
  }
}

const getAgencyList = async (page?: number | 1, limit?: number | 5) => {
  // Handle form submission
  try {
    errorAlert.value = false;
    if(searchQuery.value.trim() != ""){
      await getAgencyByName(currentPage.value, itemsPerPage.value, searchQuery.value);
      return;
    }
    const { data } = await instance.get('/agency?page=' + page + '&limit=' + limit, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      paginatedItems.value = data.agencies;
      totalItems.value = data.count;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}


const getAgencyByName = async (page?: number | 1, limit?: number | 5, name?: string) => {
  // Handle form submission
  try {
    errorAlert.value = false;
    const { data } = await instance.get('/agency?page=' + page + '&limit=' + limit + '&name=' + name, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      paginatedItems.value = data.agencies;
      totalItems.value = data.count;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const toggleSubsidiaryCreation = () => {
  isSubsidiariesModal.value = false;
  isSubsidiariesCreationModal.value = true;
}

const seeSubsidiaries = (subs: SubsidiariaTS[], agency: string) => {
  subsidiaries.value = subs;
  selectedAgency.value = agency;
  isSubsidiariesCreationModal.value = false;
  isSubsidiariesModal.value = true;
}

const deleteAgency = (id: string) => {
  agencyUnderDeletion.value = id;
  isAgencyDeletionModal.value = true;
}

const confirmAgencyDeletion = async () => {
  try {
    errorAlert.value = false;
    const { data } = await instance.delete('/agency/' + agencyUnderDeletion.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      await getAgencyList(1,5);
      isAgencyDeletionModal.value = false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}


const editAgency = (agency: AseguradoraTS) => {
  isAgencyEditionModal.value = true;
  editedAgency.value = agency;
}

const saveAgencyDetails = async () => {
  try {
    if (!editedAgency.value) {
      errorAlert.value = true;
      errorMessage.value = "Porfavor selecciona un cliente valido";
      return;
    }
    errorAlert.value = false;
    const { data } = await instance.put('/agency/' + editedAgency.value.id, editedAgency.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      isAgencyEditionModal.value = false
      event.emit('reload-agency-table');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const addSubsidiary = async () => {
  try {
    if (editedSubsidiary.value.correo.trim() == "" || editedSubsidiary.value.ciudad.trim() == "") {
      errorAlert.value = true;
      errorMessage.value = "Porfavor rellena los campos";
      return;
    }
    errorAlert.value = false;
    editedSubsidiary.value.AseguradoraId = selectedAgency.value;
    const { data } = await instance.post('/agency/subsidiary/' + selectedAgency.value, editedSubsidiary.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      isSubsidiariesCreationModal.value = false
      event.emit('reload-agency-table');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const removeSubsidiary = async (id: string) => {
  try {
    errorAlert.value = false;
    const { data } = await instance.delete('/agency/subsidiary/' + id, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      isSubsidiariesModal.value = false
      event.emit('reload-agency-table');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

onMounted(async () => {
  await getAgencyList(1,5);
  event.on('reload-agency-table', async () => {
    await getAgencyList(1,5)
  })
})
</script>


<style scoped>
/* Add any additional styles here if needed */
</style>
