<template>
  <admin-layout>
    <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Perfil</h3>
      <user-card />
    </div>


    <div class="rounded-2xl mt-4 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 class="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Configuración</h3>
      <form class="grid md:grid-cols-4 gap-2">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Numero empresa
          </label>
          <input type="text" v-model="configuration.numero_empresa"
            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Numero secuencial
          </label>
          <input type="text" v-model="configuration.numero_secuencial"
            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Forma de pago
          </label>
          <input type="text" v-model="configuration.forma_de_pago"
            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Tipo
          </label>
          <input type="text" v-model="configuration.tipo"
            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Moneda
          </label>
          <input type="text" v-model="configuration.moneda"
            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Código Broker
          </label>
          <input type="text" v-model="configuration.codigo_broker"
            class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
        </div>
      </form>
      <button @click="updateConfiguration" class="px-2 py-2 text-base font-semibold rounded-sm dark:bg-white/80 hover:dark:bg-indigo-100 inline-flex items-center gap-2 text-gray-800 border-1 dark:border-0 w-full mx-auto mt-4">Actualizar</button>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { getToken } from '@/libs/authentication';
import AdminLayout from '../../components/layout/AdminLayout.vue'
import UserCard from '../../components/profile/UserCard.vue'
import instance from '@/libs/axios';
import { onMounted, ref } from 'vue';

const configuration = ref({moneda: "", tipo: "", numero_empresa: "", numero_secuencial: "", forma_de_pago: "", codigo_broker: "", id: ""})

onMounted(async() => {
  await getConfiguration()
})

const deleteClients = async () => {
  // Handle form submission
  try {
    const { data } = await instance.delete('/clients/delete-all', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const deleteAgents = async () => {
  // Handle form submission
  try {
    const { data } = await instance.delete('/agents/delete-all', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const deleteAgencies = async () => {
  // Handle form submission
  try {
    const { data } = await instance.delete('/agency/delete-all', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const deleteSettlements = async () => {
  // Handle form submission
  try {
    const { data } = await instance.delete('/settlements/delete-all', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const updateConfiguration = async () => {
  // Handle form submission
  try {
    const { data } = await instance.put('/configuration', configuration.value, {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });
    await getConfiguration();
  } catch (error) {
    console.log(error);
  }
}

const getConfiguration = async () => {
  // Handle form submission
  try {
    const { data } = await instance.get('/configuration', {
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    });
    configuration.value = data;
  } catch (error) {
    console.log(error);
  }
}
</script>
