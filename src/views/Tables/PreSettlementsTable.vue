<script setup lang="ts">
import { ref, computed } from 'vue'
import type { LiquidacionMappedTS } from '@/interfaces/LiquidacionesTS'
import { LiquidacionStates, LiquidacionTypes } from '@/interfaces/LiquidacionesTS'

const subagentCodeSearch = ref('')
const clientNameSearch = ref('')

// Mock data, in a real app this would come from an API
const settlements = ref<LiquidacionMappedTS[]>([
  {
    id: '1',
    poliza: 'P-001',
    Cliente: { nombre: 'Juan Perez', correo: '', telefono: '', direccion: '' },
    Subagente: { codigo: 'SA-001', rol: 'Subagente', nombres: 'Carlos', apellidos: 'Gomez', correo: '', estatus: '' },
    valor_prima: 1200,
    comision: 120,
    estado: LiquidacionStates.LISTA,
    tipo: LiquidacionTypes.PRE_LIQUIDACIONES,
    fecha_vence: '2024-08-15',
    fecha_cobrada: null,
    fecha_pagada: null,
    fecha_factura_ciaros: null,
    fecha_liquidada: null
  },
  {
    id: '2',
    poliza: 'P-002',
    Cliente: { nombre: 'Maria Lopez', correo: '', telefono: '', direccion: '' },
    Subagente: { codigo: 'SA-002', rol: 'Subagente', nombres: 'Ana', apellidos: 'Martinez', correo: '', estatus: '' },
    valor_prima: 800,
    comision: 80,
    estado: LiquidacionStates.LISTA,
    tipo: LiquidacionTypes.PRE_LIQUIDACIONES,
    fecha_vence: '2024-08-20',
    fecha_cobrada: null,
    fecha_pagada: null,
    fecha_factura_ciaros: null,
    fecha_liquidada: null
  },
  {
    id: '3',
    poliza: 'P-003',
    Cliente: { nombre: 'Carlos Sanchez', correo: '', telefono: '', direccion: '' },
    Subagente: { codigo: 'SA-001', rol: 'Subagente', nombres: 'Carlos', apellidos: 'Gomez', correo: '', estatus: '' },
    valor_prima: 1500,
    comision: 150,
    estado: LiquidacionStates.LISTA,
    tipo: LiquidacionTypes.PRE_LIQUIDACIONES,
    fecha_vence: '2024-09-01',
    fecha_cobrada: null,
    fecha_pagada: null,
    fecha_factura_ciaros: null,
    fecha_liquidada: null
  }
])

const filteredSettlements = computed(() => {
  return settlements.value.filter((settlement) => {
    const subagentMatch =
      !subagentCodeSearch.value ||
      settlement.Subagente?.codigo.toLowerCase().includes(subagentCodeSearch.value.toLowerCase())
    const clientMatch =
      !clientNameSearch.value ||
      settlement.Cliente?.nombre.toLowerCase().includes(clientNameSearch.value.toLowerCase())
    return subagentMatch && clientMatch
  })
})
</script>

<template>
  <div class="p-4 sm:p-6 xl:p-10">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-title-md font-bold text-gray-900 dark:text-white">
        Pre Liquidaciones
      </h2>
    </div>

    <div class="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
      <div class="w-full sm:w-1/2">
        <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white" for="subagentCodeSearch">
          Buscar por Código de Subagente
        </label>
        <input
          id="subagentCodeSearch"
          v-model="subagentCodeSearch"
          type="text"
          placeholder="Código..."
          class="w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-brand-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-brand-500"
        />
      </div>

      <div class="w-full sm:w-1/2">
        <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white" for="clientNameSearch">
          Buscar por Nombre de Cliente
        </label>
        <input
          id="clientNameSearch"
          v-model="clientNameSearch"
          type="text"
          placeholder="Nombre..."
          class="w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-brand-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-brand-500"
        />
      </div>
    </div>

    <div
      class="mt-7.5 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-theme-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="text-left">
              <th class="min-w-[120px] px-4 py-4 font-medium text-gray-900 dark:text-white">
                Póliza
              </th>
              <th class="min-w-[150px] px-4 py-4 font-medium text-gray-900 dark:text-white">
                Cliente
              </th>
              <th class="min-w-[150px] px-4 py-4 font-medium text-gray-900 dark:text-white">
                Código Subagente
              </th>
              <th class="px-4 py-4 font-medium text-gray-900 dark:text-white">
                Prima
              </th>
              <th class="px-4 py-4 font-medium text-gray-900 dark:text-white">
                Comisión
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="settlement in filteredSettlements" :key="settlement.id">
              <td class="border-b border-gray-200 px-4 py-5 dark:border-gray-800">
                <p class="text-gray-900 dark:text-white">{{ settlement.poliza }}</p>
              </td>
              <td class="border-b border-gray-200 px-4 py-5 dark:border-gray-800">
                <p class="text-gray-900 dark:text-white">{{ settlement.Cliente?.nombre }}</p>
              </td>
              <td class="border-b border-gray-200 px-4 py-5 dark:border-gray-800">
                <p class="text-gray-900 dark:text-white">{{ settlement.Subagente?.codigo }}</p>
              </td>
              <td class="border-b border-gray-200 px-4 py-5 dark:border-gray-800">
                <p class="text-gray-900 dark:text-white">${{ settlement.valor_prima }}</p>
              </td>
              <td class="border-b border-gray-200 px-4 py-5 dark:border-gray-800">
                <p class="text-gray-900 dark:text-white">${{ settlement.comision }}</p>
              </td>
            </tr>
            <tr v-if="filteredSettlements.length === 0">
              <td colspan="5" class="py-5 text-center text-gray-500 dark:text-gray-400">
                No se encontraron resultados.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
