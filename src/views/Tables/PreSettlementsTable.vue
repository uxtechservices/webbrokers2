<script setup lang="ts">
import { ref, computed } from 'vue'

const tableData = ref([
  {
    poliza: 'P-001',
    cliente: 'Juan Perez',
    codigoSubagente: 'SA-001',
    prima: 1200,
    comision: 120
  },
  {
    poliza: 'P-002',
    cliente: 'Maria Lopez',
    codigoSubagente: 'SA-002',
    prima: 800,
    comision: 80
  },
  {
    poliza: 'P-003',
    cliente: 'Carlos Sanchez',
    codigoSubagente: 'SA-001',
    prima: 1500,
    comision: 150
  }
])

const searchSubagent = ref('')
const searchClient = ref('')

const filteredData = computed(() => {
  return tableData.value.filter((item) => {
    const subagentMatch = item.codigoSubagente
      .toLowerCase()
      .includes(searchSubagent.value.toLowerCase())
    const clientMatch = item.cliente.toLowerCase().includes(searchClient.value.toLowerCase())
    return subagentMatch && clientMatch
  })
})
</script>

<template>
  <div class="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Pre Liquidaciones</h2>
    </div>

    <div class="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label for="searchSubagent" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Buscar por Código de Subagente</label
        >
        <input
          v-model="searchSubagent"
          type="text"
          id="searchSubagent"
          placeholder="Código..."
          class="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-4 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>
      <div>
        <label for="searchClient" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Buscar por Nombre de Cliente</label
        >
        <input
          v-model="searchClient"
          type="text"
          id="searchClient"
          placeholder="Nombre..."
          class="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-4 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>

    <div
      class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <table class="w-full text-left">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Póliza</th>
            <th class="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
              Cliente
            </th>
            <th class="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
              Código Subagente
            </th>
            <th class="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Prima</th>
            <th class="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
              Comisión
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
          <tr v-for="item in filteredData" :key="item.poliza">
            <td class="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{{ item.poliza }}</td>
            <td class="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{{ item.cliente }}</td>
            <td class="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
              {{ item.codigoSubagente }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">${{ item.prima }}</td>
            <td class="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">${{ item.comision }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
