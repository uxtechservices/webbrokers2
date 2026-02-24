<script setup lang="ts">
import { ref, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// Data for the table
interface PreLiquidacion {
  cliente: string
  aseguradora: string
  codSubagente: string
  fechaVencimiento: string
  nPoliza: string
  endoso: string
  factura: number
  prima: number
  comision: number
  estado: string
  tipo: string
}

const tableData = ref<PreLiquidacion[]>([
    {
    cliente: 'ANDRADE FERRIN NELLY MARIUXI',
    aseguradora: 'SEGUROS ALIANZA S A (STO.DOMIGO)',
    codSubagente: 'XBVM',
    fechaVencimiento: '04/2/2026',
    nPoliza: '08-5002334',
    endoso: 'R',
    factura: 162451,
    prima: 473.70,
    comision: 93.18,
    estado: 'Por Liquidar',
    tipo: 'Factura'
  },
  {
    cliente: 'MERA HERRERA BAYRON ROLANDO',
    aseguradora: 'SEGUROS ALIANZA S A (QUITO)',
    codSubagente: 'KB',
    fechaVencimiento: '03/2/2026',
    nPoliza: '08-0400156',
    endoso: 'R',
    factura: 54362,
    prima: 322.95,
    comision: 73.24,
    estado: 'Liquidada',
    tipo: ''
  },
  {
    cliente: 'CEDEÑO CEPEDA NESTOR JACINTO',
    aseguradora: 'SEGUROS ALIANZA SA (GUAYAQUIL)',
    codSubagente: 'UVUD',
    fechaVencimiento: '24/1/2026',
    nPoliza: '08-5002435',
    endoso: 'R',
    factura: 53793,
    prima: 374.00,
    comision: 93.50,
    estado: 'Por Liquidar',
    tipo: 'Factura'
  },
  {
    cliente: 'VERGARA ORRALA ANDRES FERNANDO',
    aseguradora: 'SEGUROS ALIANZA SA (GUAYAQUIL)',
    codSubagente: '14',
    fechaVencimiento: '24/1/2026',
    nPoliza: '08-0398736',
    endoso: 'R',
    factura: 53814,
    prima: 534.00,
    comision: 126.00,
    estado: 'Por Liquidar',
    tipo: 'Factura'
  },
  {
    cliente: 'MONCAYO SALGADO LEONARDO ALBERTO',
    aseguradora: 'SEGUROS ALIANZA S A (GUAYAQUIL)',
    codSubagente: 'RT',
    fechaVencimiento: '24/1/2026',
    nPoliza: '08-0398706',
    endoso: 'R',
    factura: 53799,
    prima: 279.00,
    comision: 69.75,
    estado: 'Liquidada',
    tipo: ''
  }
])

const pageTitle = ref('Pre Liquidaciones')
const searchQueryCliente = ref('')
const searchQuerySubagente = ref('')

const filteredTableData = computed(() => {
  return tableData.value.filter((item) => {
    const clienteMatch = item.cliente.toLowerCase().includes(searchQueryCliente.value.toLowerCase())
    const subagenteMatch = item.codSubagente.toLowerCase().includes(searchQuerySubagente.value.toLowerCase())
    return clienteMatch && subagenteMatch
  })
})
</script>

<template>
  <DefaultLayout>
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-title-md2 font-semibold text-black dark:text-white">
        Pre Liquidaciones
      </h2>
    </div>

    <div
      class="rounded-lg border border-gray-200 bg-white px-5 pt-6 pb-2.5 shadow-theme-sm dark:border-gray-800 dark:bg-gray-dark sm:px-7.5 xl:pb-1"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div class="flex gap-2 flex-wrap">
            <input v-model="searchQueryCliente" type="text" placeholder="Buscar por cliente" class="rounded-md border border-gray-200 bg-white py-2 px-4 text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            <input v-model="searchQuerySubagente" type="text" placeholder="Buscar por cód. subagente" class="rounded-md border border-gray-200 bg-white py-2 px-4 text-gray-700 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white">
        </div>

        <div class="flex gap-2 justify-end flex-wrap">
            <button class="rounded-md border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5">N/A</button>
            <button class="rounded-md border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5">N/A</button>
            <button class="rounded-md border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/5">Total</button>
            <button class="rounded-md bg-gray-100 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">Importar</button>
            <button class="rounded-md bg-brand-500 py-2 px-4 text-sm font-medium text-white hover:bg-brand-600">Nueva</button>
        </div>
      </div>

      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-gray-dark">
              <th class="w-12 py-4 px-4 font-medium text-black dark:text-white">
                <input type="checkbox" class="form-check-input">
              </th>
              <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                Cliente
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Aseguradora
              </th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Cod. Subagente
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Fecha de vencimiento
              </th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                N° Poliza
              </th>
              <th class="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                Endoso
              </th>
              <th class="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                Factura
              </th>
              <th class="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                Prima
              </th>
              <th class="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                Comisión
              </th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in filteredTableData" :key="key">
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                <input type="checkbox" class="form-check-input">
              </td>
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                 <div class="flex flex-col">
                    <div class="flex items-center gap-2 mb-1">
                      <template v-if="item.estado === 'Liquidada'">
                        <span class="inline-flex rounded-full bg-blue-light-100 px-2.5 py-0.5 text-xs font-medium text-blue-light-700">Liquidada</span>
                      </template>
                      <template v-else-if="item.estado === 'Por Liquidar'">
                        <span v-if="item.tipo" class="inline-flex rounded-full bg-warning-100 px-2.5 py-0.5 text-xs font-medium text-warning-700">{{ item.tipo }}</span>
                        <span class="inline-flex rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">{{ item.estado }}</span>
                      </template>
                    </div>
                    <p class="font-medium text-black dark:text-white mt-1">{{ item.cliente }}</p>
                 </div>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                <p class="text-black dark:text-white">{{ item.aseguradora }}</p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                <p class="text-black dark:text-white">{{ item.codSubagente }}</p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                <p class="text-black dark:text-white">{{ item.fechaVencimiento }}</p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                <p class="text-black dark:text-white">{{ item.nPoliza }}</p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                <p class="text-black dark:text-white">{{ item.endoso }}</p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                <p class="text-black dark:text-white">{{ item.factura }}</p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                <p class="text-black dark:text-white">${{ item.prima.toFixed(2) }}</p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                <p class="text-black dark:text-white">${{ item.comision.toFixed(2) }}</p>
              </td>
              <td class="border-b border-[#eee] py-5 px-4 dark:border-gray-700">
                <div class="flex items-center space-x-3.5">
                  <button class="rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">Editar</button>
                  <button class="rounded-md bg-error-500 py-2 px-4 text-white hover:bg-error-600">Eliminar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

       <div class="flex justify-between items-center mt-4 pb-4">
        <div>
          <span class="mr-2">Filas por pagina</span>
          <select class="rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
            <button class="px-3 py-1 border rounded-md">Anterior</button>
            <button class="px-3 py-1 border rounded-md bg-brand-500 text-white">1</button>
            <button class="px-3 py-1 border rounded-md">2</button>
            <button class="px-3 py-1 border rounded-md">3</button>
            <span>...</span>
            <button class="px-3 py-1 border rounded-md">64</button>
            <button class="px-3 py-1 border rounded-md">Siguiente</button>
        </div>
      </div>

    </div>
  </DefaultLayout>
</template>
