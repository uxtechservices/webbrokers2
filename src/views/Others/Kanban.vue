<template>
  <basic-layout>
    <KanbanBreadcrumb :pageTitle="currentPageTitle" :cluster-viewer="clusterRows.length > 0" />
    <div class="grid grid-cols-4 gap-4 items-start" v-if="clusterRows.length == 0">
      <!-- Lista 1 -->
      <div class="grid gap-3">
        <h1 class="font-bold text-xl dark:text-white/80 text-zinc-700">Emitidas</h1>
        <draggable v-model="listOne" group="items" item-key="id" @change="($event) => onChange($event, 'Emitida')"
          class="p-2 rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] kanban-column">
          <template #item="{ element }">
            <div class="p-2 mb-2 dark:bg-white/[0.09] bg-zinc-600/5 dark:text-white rounded cursor-grab grid gap-2">
              <div class="inline-flex justify-between items-center">
                <div class="inline-flex items-center gap-1">
                  <h2 class="text-lg">N° {{ element.numero_liquidacion }}</h2>
                </div>
                <router-link :to='"/kanban?cluster=" + element.numero_liquidacion' class="bg-indigo-500 rounded-md p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                    <path fill="#fff" fill-rule="evenodd"
                      d="M42.667 426.668h192v-20.837l21.83-21.83h-43.164v-42.667h85.334v.497l43.163-43.163h-.497v-42.667h43.164l24.836-24.836l17.334 16.308l42.666 40.143V85.335H42.667zm384-179.195v-34.139h-85.334v-42.666h85.334zM85.334 170.668h85.333v42.666H85.334zm127.999 128v-42.667h85.334v42.667zm-42.666 0v-42.667H85.334v42.667zm-85.333 42.666h85.333v42.667H85.334zm127.999-128h85.334v-42.666h-85.334zm196 48L464 316l-34.457 34.458l-54.667-54.667zm-49.542 49.542l54.667 54.667l-103.791 103.791H256v-54.667z"
                      clip-rule="evenodd" />
                  </svg>
                </router-link>
              </div>
              <div class="inline-flex items-center gap-1">
                <CalenderIcon></CalenderIcon>
                <h2 class="text-lg">{{ element.fecha_liquidacion }}</h2>
              </div>
              <div class="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-gray-800 dark:fill-white/90" width="24" height="24"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.77 20v-1h6.615q.25 0 .432-.154q.183-.154.183-.404v-6.888q0-2.81-2.066-4.693Q14.867 4.977 12 4.977T7.066 6.861Q5 8.744 5 11.554v5.677h-.5q-.613 0-1.057-.415Q3 16.402 3 15.79v-1.885q0-.448.291-.795q.292-.348.709-.565l.017-1.229q.027-1.565.68-2.9t1.744-2.323t2.524-1.54T12 4t3.033.552t2.513 1.538t1.735 2.32t.702 2.9L20 12.513q.398.187.699.503q.301.315.301.757v2.166q0 .442-.301.757t-.699.502v1.244q0 .652-.472 1.105T18.385 20zm-2.385-6.461q-.31 0-.54-.211q-.23-.21-.23-.52t.23-.53t.54-.22t.539.22t.23.53t-.23.52t-.54.21m5.232 0q-.31 0-.54-.21t-.23-.52t.23-.53t.54-.22t.539.22t.23.53t-.23.52t-.54.21M6.718 11.95q-.136-2.246 1.447-3.829q1.582-1.583 3.886-1.583q1.936 0 3.432 1.163t1.826 3.055q-1.987-.025-3.688-1.014t-2.61-2.75q-.362 1.731-1.505 3.034q-1.144 1.303-2.788 1.924" />
                </svg>
                <h2 class="text-lg font-semibold">{{ element.Subagente.nombres + " " + element.Subagente.apellidos }}
                </h2>
              </div>
              <div class="inline-flex items-center gap-1">
                <h2 class="text-lg font-bold">Monto {{ formatUSD(element.total_liquidado) }}</h2>
              </div>
              <button v-if="!downloadingArchive" @click="generateLiquidationPDF(element.numero_liquidacion)"
                class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
                <DocsIcon></DocsIcon>
                Generar PDF
              </button>
              <button v-if="downloadingArchive"
                class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
                <div style="border-top-color:transparent"
                  class="w-6 h-6 mx-auto border-4 border-gray-800 border-solid rounded-full animate-spin"></div>
              </button>
            </div>
          </template>
        </draggable>
      </div>

      <!-- Lista 2 -->
      <div class="grid gap-3">
        <h1 class="font-bold text-xl dark:text-white/80 text-zinc-700">Enviadas al Subagente</h1>
        <draggable v-model="listTwo" group="items" item-key="id" @change="($event) => onChange($event, 'Enviada')"
          class="p-2 rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] kanban-column">
          <template #item="{ element }">
            <div class="p-2 mb-2 dark:bg-white/[0.09] bg-zinc-600/5 dark:text-white rounded cursor-grab grid gap-2">
              <div class="inline-flex justify-between items-center">
                <div class="inline-flex items-center gap-1">
                  <h2 class="text-lg">N° {{ element.numero_liquidacion }}</h2>
                </div>
                <router-link :to='"/kanban?cluster=" + element.numero_liquidacion' class="bg-indigo-500 rounded-md p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                    <path fill="#fff" fill-rule="evenodd"
                      d="M42.667 426.668h192v-20.837l21.83-21.83h-43.164v-42.667h85.334v.497l43.163-43.163h-.497v-42.667h43.164l24.836-24.836l17.334 16.308l42.666 40.143V85.335H42.667zm384-179.195v-34.139h-85.334v-42.666h85.334zM85.334 170.668h85.333v42.666H85.334zm127.999 128v-42.667h85.334v42.667zm-42.666 0v-42.667H85.334v42.667zm-85.333 42.666h85.333v42.667H85.334zm127.999-128h85.334v-42.666h-85.334zm196 48L464 316l-34.457 34.458l-54.667-54.667zm-49.542 49.542l54.667 54.667l-103.791 103.791H256v-54.667z"
                      clip-rule="evenodd" />
                  </svg>
                </router-link>
              </div>
              <div class="inline-flex items-center gap-1">
                <CalenderIcon></CalenderIcon>
                <h2 class="text-lg">{{ element.fecha_liquidacion }}</h2>
              </div>
              <div class="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-gray-800 dark:fill-white/90" width="24" height="24"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.77 20v-1h6.615q.25 0 .432-.154q.183-.154.183-.404v-6.888q0-2.81-2.066-4.693Q14.867 4.977 12 4.977T7.066 6.861Q5 8.744 5 11.554v5.677h-.5q-.613 0-1.057-.415Q3 16.402 3 15.79v-1.885q0-.448.291-.795q.292-.348.709-.565l.017-1.229q.027-1.565.68-2.9t1.744-2.323t2.524-1.54T12 4t3.033.552t2.513 1.538t1.735 2.32t.702 2.9L20 12.513q.398.187.699.503q.301.315.301.757v2.166q0 .442-.301.757t-.699.502v1.244q0 .652-.472 1.105T18.385 20zm-2.385-6.461q-.31 0-.54-.211q-.23-.21-.23-.52t.23-.53t.54-.22t.539.22t.23.53t-.23.52t-.54.21m5.232 0q-.31 0-.54-.21t-.23-.52t.23-.53t.54-.22t.539.22t.23.53t-.23.52t-.54.21M6.718 11.95q-.136-2.246 1.447-3.829q1.582-1.583 3.886-1.583q1.936 0 3.432 1.163t1.826 3.055q-1.987-.025-3.688-1.014t-2.61-2.75q-.362 1.731-1.505 3.034q-1.144 1.303-2.788 1.924" />
                </svg>
                <h2 class="text-lg font-semibold">{{ element.Subagente.nombres + " " + element.Subagente.apellidos }}
                </h2>
              </div>
              <div class="inline-flex items-center gap-1">
                <h2 class="text-lg font-bold">Monto {{ formatUSD(element.total_liquidado) }}</h2>
              </div>

              <button v-if="!downloadingArchive" @click="generateLiquidationPDF(element.numero_liquidacion)"
                class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
                <DocsIcon></DocsIcon>
                Generar PDF
              </button>
              <button v-if="downloadingArchive"
                class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
                <div style="border-top-color:transparent"
                  class="w-6 h-6 mx-auto border-4 border-gray-800 border-solid rounded-full animate-spin"></div>
              </button>
            </div>
          </template>
        </draggable>
      </div>


      <!-- Lista 3 -->
      <div class="grid gap-3">
        <h1 class="font-bold text-xl dark:text-white/80 text-zinc-700">Lista para el pago</h1>
        <draggable v-model="listThree" group="items" item-key="id" @change="($event) => onChange($event, 'Lista')"
          class="p-2 rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] kanban-column">
          <template #item="{ element }">
            <div class="p-2 mb-2 dark:bg-white/[0.09] bg-zinc-600/5 dark:text-white rounded cursor-grab grid gap-2">
              <div class="inline-flex justify-between items-center">
                <div class="inline-flex items-center gap-1">
                  <h2 class="text-lg">N° {{ element.numero_liquidacion }}</h2>
                </div>
                <router-link :to='"/kanban?cluster=" + element.numero_liquidacion' class="bg-indigo-500 rounded-md p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                    <path fill="#fff" fill-rule="evenodd"
                      d="M42.667 426.668h192v-20.837l21.83-21.83h-43.164v-42.667h85.334v.497l43.163-43.163h-.497v-42.667h43.164l24.836-24.836l17.334 16.308l42.666 40.143V85.335H42.667zm384-179.195v-34.139h-85.334v-42.666h85.334zM85.334 170.668h85.333v42.666H85.334zm127.999 128v-42.667h85.334v42.667zm-42.666 0v-42.667H85.334v42.667zm-85.333 42.666h85.333v42.667H85.334zm127.999-128h85.334v-42.666h-85.334zm196 48L464 316l-34.457 34.458l-54.667-54.667zm-49.542 49.542l54.667 54.667l-103.791 103.791H256v-54.667z"
                      clip-rule="evenodd" />
                  </svg>
                </router-link>
              </div>
              <div class="inline-flex items-center gap-1">
                <CalenderIcon></CalenderIcon>
                <h2 class="text-lg">{{ element.fecha_liquidacion }}</h2>
              </div>
              <div class="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-gray-800 dark:fill-white/90" width="24" height="24"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.77 20v-1h6.615q.25 0 .432-.154q.183-.154.183-.404v-6.888q0-2.81-2.066-4.693Q14.867 4.977 12 4.977T7.066 6.861Q5 8.744 5 11.554v5.677h-.5q-.613 0-1.057-.415Q3 16.402 3 15.79v-1.885q0-.448.291-.795q.292-.348.709-.565l.017-1.229q.027-1.565.68-2.9t1.744-2.323t2.524-1.54T12 4t3.033.552t2.513 1.538t1.735 2.32t.702 2.9L20 12.513q.398.187.699.503q.301.315.301.757v2.166q0 .442-.301.757t-.699.502v1.244q0 .652-.472 1.105T18.385 20zm-2.385-6.461q-.31 0-.54-.211q-.23-.21-.23-.52t.23-.53t.54-.22t.539.22t.23.53t-.23.52t-.54.21m5.232 0q-.31 0-.54-.21t-.23-.52t.23-.53t.54-.22t.539.22t.23.53t-.23.52t-.54.21M6.718 11.95q-.136-2.246 1.447-3.829q1.582-1.583 3.886-1.583q1.936 0 3.432 1.163t1.826 3.055q-1.987-.025-3.688-1.014t-2.61-2.75q-.362 1.731-1.505 3.034q-1.144 1.303-2.788 1.924" />
                </svg>
                <h2 class="text-lg font-semibold">{{ element.Subagente.nombres + " " + element.Subagente.apellidos }}
                </h2>
              </div>
              <div class="inline-flex items-center gap-1">
                <h2 class="text-lg font-bold">Monto {{ formatUSD(element.total_liquidado) }}</h2>
              </div>

              <button @click="generateLiquidationTXT(element.numero_liquidacion)"
                class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
                <DocsIcon></DocsIcon>
                Generar TXT
              </button>

              <button v-if="!downloadingArchive" @click="generateLiquidationPDF(element.numero_liquidacion)"
                class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
                <DocsIcon></DocsIcon>
                Generar PDF
              </button>
              <button v-if="downloadingArchive"
                class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
                <div style="border-top-color:transparent"
                  class="w-6 h-6 mx-auto border-4 border-gray-800 border-solid rounded-full animate-spin"></div>
              </button>
            </div>
          </template>
        </draggable>
      </div>

      <!-- Lista 4 -->
      <div class="grid gap-3">
        <h1 class="font-bold text-xl dark:text-white/80 text-zinc-700">Pagadas</h1>
        <draggable v-model="listFour" group="items" item-key="id" @change="($event) => onChange($event, 'Pagada')"
          class="p-2 rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] kanban-column">
          <template #item="{ element }">
            <div class="p-2 mb-2 dark:bg-white/[0.09] bg-zinc-600/5 dark:text-white rounded cursor-grab grid gap-2">
              <div class="inline-flex justify-between items-center">
                <div class="inline-flex items-center gap-1">
                  <h2 class="text-lg">N° {{ element.numero_liquidacion }}</h2>
                </div>
                <router-link :to='"/kanban?cluster=" + element.numero_liquidacion' class="bg-indigo-500 rounded-md p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                    <path fill="#fff" fill-rule="evenodd"
                      d="M42.667 426.668h192v-20.837l21.83-21.83h-43.164v-42.667h85.334v.497l43.163-43.163h-.497v-42.667h43.164l24.836-24.836l17.334 16.308l42.666 40.143V85.335H42.667zm384-179.195v-34.139h-85.334v-42.666h85.334zM85.334 170.668h85.333v42.666H85.334zm127.999 128v-42.667h85.334v42.667zm-42.666 0v-42.667H85.334v42.667zm-85.333 42.666h85.333v42.667H85.334zm127.999-128h85.334v-42.666h-85.334zm196 48L464 316l-34.457 34.458l-54.667-54.667zm-49.542 49.542l54.667 54.667l-103.791 103.791H256v-54.667z"
                      clip-rule="evenodd" />
                  </svg>
                </router-link>
              </div>
              <div class="inline-flex items-center gap-1">
                <CalenderIcon></CalenderIcon>
                <h2 class="text-lg">{{ element.fecha_liquidacion }}</h2>
              </div>
              <div class="inline-flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="fill-gray-800 dark:fill-white/90" width="24" height="24"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.77 20v-1h6.615q.25 0 .432-.154q.183-.154.183-.404v-6.888q0-2.81-2.066-4.693Q14.867 4.977 12 4.977T7.066 6.861Q5 8.744 5 11.554v5.677h-.5q-.613 0-1.057-.415Q3 16.402 3 15.79v-1.885q0-.448.291-.795q.292-.348.709-.565l.017-1.229q.027-1.565.68-2.9t1.744-2.323t2.524-1.54T12 4t3.033.552t2.513 1.538t1.735 2.32t.702 2.9L20 12.513q.398.187.699.503q.301.315.301.757v2.166q0 .442-.301.757t-.699.502v1.244q0 .652-.472 1.105T18.385 20zm-2.385-6.461q-.31 0-.54-.211q-.23-.21-.23-.52t.23-.53t.54-.22t.539.22t.23.53t-.23.52t-.54.21m5.232 0q-.31 0-.54-.21t-.23-.52t.23-.53t.54-.22t.539.22t.23.53t-.23.52t-.54.21M6.718 11.95q-.136-2.246 1.447-3.829q1.582-1.583 3.886-1.583q1.936 0 3.432 1.163t1.826 3.055q-1.987-.025-3.688-1.014t-2.61-2.75q-.362 1.731-1.505 3.034q-1.144 1.303-2.788 1.924" />
                </svg>
                <h2 class="text-lg font-semibold">{{ element.Subagente.nombres + " " + element.Subagente.apellidos }}
                </h2>
              </div>
              <div class="inline-flex items-center gap-1">
                <h2 class="text-lg font-bold">Monto {{ formatUSD(element.total_liquidado) }}</h2>
              </div>

              <button v-if="!downloadingArchive" @click="generateLiquidationPDF(element.numero_liquidacion)"
                class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
                <DocsIcon></DocsIcon>
                Generar PDF
              </button>
              <button v-if="downloadingArchive"
                class="px-2 py-1 self-end text-base font-semibold rounded-lg dark:bg-white hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0">
                <div style="border-top-color:transparent"
                  class="w-6 h-6 mx-auto border-4 border-gray-800 border-solid rounded-full animate-spin"></div>
              </button>
            </div>
          </template>
        </draggable>
      </div>
    </div>


    <!-- Visualizador de columnas -->

    <div class="max-w-full overflow-x-auto custom-scrollbar border-[3px] border-gray-800 rounded-lg"
      v-if="clusterRows.length > 0">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400"># de Liquidación</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Subagente</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Prima Neta</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Comisión Ciaros</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Tarifa</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Comisión Subagente</p>
            </th>
            <th class="px-5 py-3 text-left w-2/11 sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Acciones</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700" v-if="clusterRows.length > 0">
          <tr v-for="(settlement, index) in clusterRows" :key="index"
            class="relative border-t border-gray-100 dark:border-gray-800">
            <td class="px-5 py-4 sm:px-6 relative">
              <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {{ settlement.FinalizadaNumeroLiquidacion }}
              </span>
            </td>
            <td class="px-5 py-4 sm:px-6 relative">
              <div class="flex items-center gap-3 py-2">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ settlement.Subagente?.nombres }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ formatUSD(settlement.valor_prima || 0) }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ formatUSD(settlement.comision || 0) }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ settlement.tarifa_comision ?? settlement.Finalizada?.tarifa_comision ?? clusterData.tarifa_comision }} %
                  </span>
                </div>
              </div>
            </td>
            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ formatUSD(((settlement.comision || 0) * (settlement.tarifa_comision ?? settlement.Finalizada?.tarifa_comision ?? clusterData.tarifa_comision ?? 0)) / 100) }}
                  </span>
                </div>
              </div>
            </td>

            <td class="px-5 py-4 sm:px-6">
              <div class="flex items-center gap-3">
                <RouterLink v-if="settlement.id" :to="'/liquidaciones/editar/' + settlement.id"
                  class="p-2 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    Editar
                  </span>
                </RouterLink>
                <button v-if="settlement.id" @click="deleteSettlemet(settlement.id)" class="p-2 bg-red-700 rounded-lg">
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

    <div class="inline-flex gap-4 w-full justify-between items-start">
      <div class="grid gap-2 my-6 justify-self-center" v-if="clusterRows.length > 0">
        <div class="border-[3px] border-gray-800 rounded-lg">
          <div class="grid grid-cols-2 items-center">
            <div class="dark:bg-white/[0.10] bg-gray-200 p-3 dark:text-white font-bold">
              <p>TOTAL LIQUIDADO</p>
            </div>
            <div class="flex items-center text-center w-full justify-center gap-3">
              <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {{ formatUSD(clusterData.total_liquidado) }}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center">
            <div class="dark:bg-white/[0.10] bg-gray-200 p-3 dark:text-white font-bold">
              <p>SUBAGENTE</p>
            </div>
            <div class="flex items-center text-center w-full justify-center gap-3">
              <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {{ clusterData.subagente }}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center">
            <div class="dark:bg-white/[0.10] bg-gray-200 p-3 dark:text-white font-bold">
              <p>FECHA LIQUIDACIÓN</p>
            </div>
            <div class="flex items-center text-center w-full justify-center gap-3">
              <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {{ clusterData.fecha_liquidacion }}
              </span>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center">
            <div class="dark:bg-white/[0.10] bg-gray-200 p-3 dark:text-white font-bold">
              <p>N° LIQUIDACIÓN</p>
            </div>
            <div class="flex items-center text-center w-full justify-center gap-3">
              <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {{ clusterData.FinalizadaNumeroLiquidacion }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="grid gap-2 my-6 md:w-2/5 justify-self-center" v-if="clusterRows.length > 0">
        <div class="border-[3px] border-gray-800 rounded-lg">
          <div class="grid grid-cols-2 items-center">
            <div class="dark:bg-white/[0.10] bg-gray-200 p-3 dark:text-white font-bold">
              <p>IVA</p>
            </div>
            <div class="p-1 dark:text-white text-end inline-flex items-center justify-between">%
              <input type="number" max="100" min="0" v-model="clusterData.iva" class="w-24 text-end outline-none">
            </div>
          </div>
          <div class="grid grid-cols-2 items-center">
            <div class="dark:bg-white/[0.10] bg-gray-200 p-3 dark:text-white font-bold">
              <p>RETENCIÓN IVA</p>
            </div>
            <div class="p-1 dark:text-white text-end inline-flex items-center justify-between">%
              <input type="number" max="100" min="0" v-model="clusterData.ret_iva" class="w-24 text-end outline-none">
            </div>
          </div>
          <div class="grid grid-cols-2 items-center">
            <div class="dark:bg-white/[0.10] bg-gray-200 p-3 dark:text-white font-bold">
              <p>RETENCIÓN RENTA</p>
            </div>
            <div class="p-1 dark:text-white text-end inline-flex items-center justify-between">%
              <input type="number" max="100" min="0" v-model="clusterData.ret_renta" class="w-24 text-end outline-none">
            </div>
          </div>
          <div class="grid grid-cols-2 items-center">
            <div class="dark:bg-white/[0.10] bg-gray-200 p-3 dark:text-white font-bold">
              <p>COMISIÓN</p>
            </div>
            <div class="p-1 dark:text-white text-end inline-flex items-center justify-between">%
              <input type="number" max="100" min="0" v-model="clusterData.tarifa_comision"
                class="w-24 text-end outline-none">
            </div>
          </div>
          <div class="grid grid-cols-2 items-center">
        <div class="dark:bg-white/[0.10] bg-gray-200 p-3 dark:text-white font-bold">
          <p>PRÉSTAMOS</p>
        </div>
        <div class="p-1 dark:text-white text-end inline-flex items-center justify-between">$
          <input type="number" min="0" v-model="clusterData.prestamo" class="w-24 text-end outline-none">
        </div>
        </div>
        </div>
        <button v-if="updatingLiquidation"
          class="bg-indigo-600 hover:bg-indigo-800 transition-colors duration-300 ease-in-out rounded-sm p-4 text-white text-center w-full">
          <div style="border-top-color:transparent"
            class="w-6 h-6 mx-auto border-4 border-white border-solid rounded-full animate-spin"></div>
        </button>
        <button v-if="!updatingLiquidation" @click="updateLiquidation"
          class="bg-indigo-600 hover:bg-indigo-800 transition-colors duration-300 ease-in-out rounded-sm p-4 text-white text-center w-full">Actualizar
          Liquidación</button>
      </div>
    </div>
  </basic-layout>

  <Modal v-if="isSettlementDeletionModal" @close="isSettlementDeletionModal = false">
    <template #body>
      <div
        class="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="isSettlementDeletionModal = false"
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
            Eliminar una liquidación
          </h4>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            ¿Estas seguro de realizar esta acción?
          </p>
        </div>
        <form class="flex flex-col">
          <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al intentar eliminar la liquidación"
            :message="errorMessage" :showLink="false" />
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button @click="confirmSettlementDeletion" type="button"
              class="flex w-full justify-center rounded-lg bg-error-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-600 sm:w-auto">
              Eliminar liquidación
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { getToken } from '@/libs/authentication';
import BasicLayout from '../../components/layout/BasicLayout.vue'
import instance from '@/libs/axios';
import draggable from 'vuedraggable'
import { onMounted, ref, watch } from 'vue';
import type { DragChangeEvent } from '@/interfaces/EventTS';
import { KanbanStates, type LiquidacionClusterTS, type LiquidacionMappedTS } from '@/interfaces/LiquidacionesTS';
import axios from 'axios';
import CalenderIcon from '@/icons/CalenderIcon.vue';
import { formatUSD } from '@/libs/formatter';
import DocsIcon from '@/icons/DocsIcon.vue';
import KanbanBreadcrumb from '@/components/common/KanbanBreadcrumb.vue';
import event from '@/libs/event';
import { useRoute, useRouter } from 'vue-router';
import Modal from '@/components/profile/Modal.vue';
import type { FinalizadaTS } from '@/interfaces/FinalizadaTS';
import Alert from '@/components/ui/Alert.vue';

const currentPageTitle = ref("Kanban");

const errorAlert = ref(false);
const errorMessage = ref("");
const listOne = ref<LiquidacionClusterTS[]>([])
const listTwo = ref<LiquidacionClusterTS[]>([])
const listThree = ref<LiquidacionClusterTS[]>([])
const listFour = ref<LiquidacionClusterTS[]>([])
const searchQuery = ref("");
const clusterRows = ref<LiquidacionMappedTS[]>([]);
const downloadingArchive = ref(false);
const updatingLiquidation = ref(false);
const settlementUnderDeletion = ref("");
const isSettlementDeletionModal = ref(false);
const clusterData = ref({
  FinalizadaNumeroLiquidacion: "",
  iva: 0,
  ret_iva: 0,
  ret_renta: 0,
  tarifa_comision: 0,
  prestamo: 0,
  total_liquidado: 0,
  subagente: "",
  fecha_liquidacion: ""
})

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  if (route.query.cluster != undefined && route.query.cluster != null) {
    searchQuery.value = String(route.query.cluster);
    await getClusterSettlements();
  } else {
    await getSettlements();
  }

  event.on('reload-kanban', async () => {
    await getSettlements();
  })

  event.on('close-cluster-viewer', () => {
    clusterRows.value = [];
    router.go(-1);
  })
})

watch(() => route.query, async (newValue) => {
  if (route.query.cluster != undefined && route.query.cluster != null) {
    searchQuery.value = String(route.query.cluster);
    await getClusterSettlements();
  } else {
    await getSettlements();
  }
})


const deleteSettlemet = (id: string) => {
  settlementUnderDeletion.value = id;
  isSettlementDeletionModal.value = true;
}

function onChange(event: DragChangeEvent<LiquidacionClusterTS>, state: string) {
  if (event.added) {
    const states = KanbanStates;
    const findState = Object.values(states).find(arg => arg == state);
    if (findState) {
      updateSettlementStatus(event.added.element.numero_liquidacion, findState);
    }
  }
}


const confirmSettlementDeletion = async () => {
  try {
    errorAlert.value = false;
    const { data } = await instance.delete('/settlements/' + settlementUnderDeletion.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      isSettlementDeletionModal.value = false;
      event.emit('close-cluster-viewer');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorAlert.value = true;
      errorMessage.value = error.response?.data.message;
    }
  }
}

const generateLiquidationTXT = async (liquidation_number: string) => {
  const { data, headers } = await instance.get('/settlements/generate-liquidation-txt', {
    headers: {
      Authorization: 'Bearer ' + getToken()
    },
    params: {
      id: liquidation_number
    },
    responseType: 'blob',
  });

  const blob = new Blob([data], { type: headers['content-type'] || 'application/pdf' });

  // Obtener el nombre del archivo desde el header o usar uno por defecto
  const contentDisposition = headers['content-disposition'];
  const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
  const fileName = fileNameMatch ? fileNameMatch[1] : 'pagos_liquidacion.txt';

  // Crear enlace de descarga
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}


const generateLiquidationPDF = async (liquidation_number: string) => {
  downloadingArchive.value = true;
  const { data, headers } = await instance.get('/settlements/generate-liquidation-pdf', {
    headers: {
      Authorization: 'Bearer ' + getToken()
    },
    params: {
      id: liquidation_number
    },
    responseType: 'blob',
  });

  const blob = new Blob([data], { type: headers['content-type'] || 'application/pdf' });

  // Obtener el nombre del archivo desde el header o usar uno por defecto
  const contentDisposition = headers['content-disposition'];
  const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
  const fileName = fileNameMatch ? fileNameMatch[1] : 'liquidacion.pdf';

  // Crear enlace de descarga
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  downloadingArchive.value = false;
}

const getSettlements = async () => {
  try {
    const { data } = await instance.get('/settlements?finished=true', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data.payouts) {
      const aux: FinalizadaTS[] = data.payouts;
      listOne.value = mapLiquidationClusters(aux.filter((i) => i.kanban == "Emitida"));
      listTwo.value = mapLiquidationClusters(aux.filter((i) => i.kanban == "Enviada"));
      listThree.value = mapLiquidationClusters(aux.filter((i) => i.kanban == "Lista"));
      listFour.value = mapLiquidationClusters(aux.filter((i) => i.kanban == "Pagada"));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
}

const updateLiquidation = async () => {
  try {
    updatingLiquidation.value = true;
    const { data } = await instance.put('/settlements/finished', clusterData.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data.message) {
      await getClusterSettlements();
      updatingLiquidation.value = false;
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    updatingLiquidation.value = false;
  }
}


const getClusterSettlements = async () => {
  try {
    const { data } = await instance.get('/settlements?cluster=' + searchQuery.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });

    if (data) {
      clusterRows.value = data.payouts;
      if (clusterRows.value.length > 0) {
        clusterData.value.iva = clusterRows.value[0].Finalizada?.iva || 0;
        clusterData.value.ret_iva = clusterRows.value[0].Finalizada?.ret_iva || 0;
        clusterData.value.ret_renta = clusterRows.value[0].Finalizada?.ret_renta || 0;
        clusterData.value.tarifa_comision = clusterRows.value[0].Finalizada?.tarifa_comision || 0;
        clusterData.value.prestamo = clusterRows.value[0].Finalizada?.prestamo || 0;
        clusterData.value.FinalizadaNumeroLiquidacion = clusterRows.value[0].Finalizada?.numero_liquidacion || "0";
        clusterData.value.subagente = clusterRows.value[0].Subagente?.nombres || "" + clusterRows.value[0].Subagente?.apellidos || "";
        clusterData.value.total_liquidado = clusterRows.value[0].Finalizada?.total_liquidado || 0;
        clusterData.value.fecha_liquidacion = clusterRows.value[0].Finalizada?.fecha_liquidacion || "";
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
}

const mapLiquidationClusters = (list: FinalizadaTS[]) => {
  // Toma la lista,
  const clusters: LiquidacionClusterTS[] = [];

  for (const item of list) {
    // Si algun item no tiene los mismos datos que un Cluster
    if (!clusters.some(c => c.numero_liquidacion === item.fecha_liquidacion && c.SubagenteCodigo === item.SubagenteCodigo)) {
      if (item.Liquidaciones && item.Liquidaciones.length > 0) {
        clusters.push({
          fecha_liquidacion: item.fecha_liquidacion || "",
          numero_liquidacion: item.numero_liquidacion || "",
          total_liquidado: item.total_liquidado || 0,
          SubagenteCodigo: item.SubagenteCodigo || "",
          Subagente: item.Liquidaciones[0].Subagente,
          Aseguradora: item.Liquidaciones[0].Aseguradora,
          Cliente: item.Liquidaciones[0].Cliente,
          filas: item.Liquidaciones.map((i) => i.id || "")
        })
      }
    } else {
      clusters.find(c => c.numero_liquidacion == item.numero_liquidacion && c.SubagenteCodigo === item.SubagenteCodigo);
    }
  }
  return clusters;
}

const updateSettlementStatus = async (rows: string, status: string) => {
  try {
    if (status != KanbanStates.LISTA) {
      await instance.put('/settlements/set-status', { status }, {
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        params: {
          id: rows
        }
      });
    } else {
      const { data, headers } = await instance.put('/settlements/set-status', { status }, {
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        params: {
          id: rows
        },
        responseType: 'blob',
      });
      const blob = new Blob([data], { type: headers['content-type'] || 'application/zip' });

      // Obtener el nombre del archivo desde el header o usar uno por defecto
      const contentDisposition = headers['content-disposition'];
      const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : 'pago_liquidacion.txt';

      // Crear enlace de descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }

    await getSettlements();
  } catch (error) {
    if (axios.isAxiosError(error)) {
    }
  }
}
</script>

<style scoped>
.kanban-column {
  min-height: 100vh;       /* Ocupa todo el alto de la pantalla */
  max-height: 100vh;       /* Evita que crezca indefinidamente */
  overflow-y: auto;        /* Scroll interno */
  display: flex;
  flex-direction: column;
}
</style>