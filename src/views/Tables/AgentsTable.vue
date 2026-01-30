<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <nav class="flex justify-between gap-2 items-center mb-4">
      <div class="flex gap-2 w-1/2">
        <SearchBar @update:modelValue="applyUserFilter" :placeholder="'Buscar por nombre o codigo'"></SearchBar>
        <SearchBar @update:modelValue="applyDocumentFilter" :placeholder="'Buscar por cedula'"></SearchBar>
      </div>

      <div class="inline-flex gap-2 items-center">
        <select v-model="state" @change="filterByState"
          class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
          <option value="">Estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="Suspendido">Suspendido</option>
        </select>
        <RouterLink to="/subagentes/crear"
          class="px-3 py-2 text-base font-semibold rounded-lg dark:bg-white text-gray-800 border-1 dark:border-0">
          Nuevo
        </RouterLink>
      </div>
    </nav>
    <div class="space-y-5 sm:space-y-6">
      <AgentsTableOne :user_filter="user_filter" :document_filter="document_filter"/>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import AgentsTableOne from "../../components/tables/basic-tables/AgentsTableOne.vue";
import SearchBar from "@/components/layout/header/SearchBar.vue";
import event from "@/libs/event";
const user_filter = ref("");
const document_filter = ref("");
const currentPageTitle = ref("SubAgentes");
const state = ref("");

const applyUserFilter = async (data) => {
  user_filter.value = data;
}

const applyDocumentFilter = async (data) => {
  document_filter.value = data;
}

const filterByState = () => {
  event.emit('filter-by-agent-state', state.value);
}
</script>
