<template>
    <div class="inline-flex items-center justify-between w-full">
        <div class="inline-flex items-center gap-3">
            <div class="p-2 rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <p class="font-medium text-gray-500 text-theme-lg dark:text-gray-400">Fecha: {{ getTodayDate() }}</p>
            </div>
            <div :class="[
                'p-2 rounded-md inline-flex justify-center items-center gap-1',
                isDateInvalid
                    ? 'border border-red-500 bg-red-100 dark:bg-red-800/30'
                    : 'border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]'
            ]">
                <p :class="[
                    'font-medium text-theme-lg',
                    isDateInvalid
                        ? 'text-red-700 dark:text-red-400'
                        : 'text-gray-500 dark:text-gray-400'
                ]">
                    Liquidación N°:
                </p>

                <input type="text" placeholder="L/MM/YYYY" v-model="liquidation_number" @blur="validateDate" :class="[
                    'flex-1 max-w-[90px] text-end outline-none',
                    isDateInvalid ? 'text-red-700 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                ]" />
            </div>

        </div>
        <button @click="clearLiquidatorRows"
            class="bg-error-700 p-2 rounded-md text-white inline-flex items-center gap-2">
            <TrashIcon></TrashIcon>
            Eliminar filas
        </button>
    </div>
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="max-w-full overflow-x-auto custom-scrollbar">
            <table class="min-w-full">
                <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                        <th class="px-5 py-3 text-left w-1/11 sm:px-6">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Aseguradora</p>
                        </th>
                        <th class="px-5 py-3 text-left w-1/11 sm:px-6">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Factura</p>
                        </th>
                        <th class="px-5 py-3 text-left w-1/11 sm:px-6">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Ramo-Poliza
                            </p>
                        </th>
                        <th class="px-5 py-3 text-left w-1/11 sm:px-6">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Negocio</p>
                        </th>
                        <th class="px-5 py-3 text-left w-1/11 sm:px-6">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Cliente</p>
                        </th>
                        <th class="px-5 py-3 text-left w-1/11 sm:px-6">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Prima Neta</p>
                        </th>
                        <th class="px-5 py-3 text-left w-1/11 sm:px-6">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Comisión Ciaros</p>
                        </th>
                        <th class="px-5 py-3 text-left w-1/11 sm:px-6">
                            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Comisión Subagente</p>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="payout in settlements" class="relative border-gray-100 dark:border-gray-800">
                        <td class="px-5 py-4 sm:px-6">
                            <span
                                class="absolute text-rose-800 bg-rose-200 top-0 left-0 inline-block px-2 py-0.5 text-xs font-semibold rounded-br-lg"
                                v-if="payout.ori && payout.ori.trim() == 'AP'">
                                0% IVA
                            </span>
                            <div class="flex items-center gap-3">
                                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                    {{ payout.Aseguradora?.nombre }}
                                </span>
                            </div>
                        </td>
                        <td class="px-5 py-4 sm:px-6">
                            <div class="flex items-center gap-3">
                                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                    {{ payout.factura }}
                                </span>
                            </div>
                        </td>
                        <td class="px-5 py-4 sm:px-6">
                            <div class="flex items-center gap-3">
                                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                    {{ payout.poliza }}
                                </span>
                            </div>
                        </td>
                        <td class="px-5 py-4 sm:px-6">
                            <div class="flex items-center gap-3">
                                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                    {{ payout.endoso }}
                                </span>
                            </div>
                        </td>
                        <td class="px-5 py-4 sm:px-6">
                            <div class="flex items-center gap-3">
                                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                    {{ payout.Cliente?.nombre }}
                                </span>
                            </div>
                        </td>
                        <td class="px-5 py-4 sm:px-6">
                            <div class="flex items-center gap-3">
                                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                    {{ formatUSD(payout.valor_prima || 0) }}
                                </span>
                            </div>
                        </td>
                        <td class="px-5 py-4 sm:px-6">
                            <div class="flex items-center gap-3">
                                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                    {{ formatUSD(payout.comision || 0) }}
                                </span>
                            </div>
                        </td>
                        <td class="px-5 py-4 sm:px-6">
                            <div class="flex items-center gap-3">
                                <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                    {{ formatUSD((payout.comision || 0) * (fee / 100)) }}
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="flex w-full justify-between items-start">
        <div class="grid gap-3">
            <div
                class="dark:bg-white/[0.12] bg-gray-200 px-3 py-2 inline-flex items-center gap-3 border rounded-sm border-gray-200 dark:border-none text-2xl dark:text-white font-bold">
                <p>SUBTOTAL A FACTURAR</p>
                <p>{{ formatUSD(calcSubtotal()) }}</p>
            </div>
            <Alert v-if="liquidationAlert" class="mt-2" variant="error" title="Error al generar liquidación"
                :message="errorMessage" :showLink="false" />
            <button @click="liquidateRows"
                class="dark:bg-white/[0.12] bg-gray-200 text-center hover:bg-gray-300  hover:dark:bg-white/[0.20] px-3 py-2 inline-flex items-center gap-3 border rounded-sm border-gray-200 dark:border-none text-2xl dark:text-white font-bold">
                GENERAR PAGO
            </button>
        </div>
        <div class="grid gap-2" v-if="agent">
            <div
                class="border border-gray-200 divide-y divide-gray-800 bg-white dark:border-gray-800 dark:bg-white/[0.03] rounded-sm">
                <div class="grid grid-cols-2 items-center">
                    <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                        <p>NOMBRE DEL AGENTE</p>
                    </div>
                    <div class="p-1 dark:text-white text-end">
                        <input type="text" placeholder="Define el nombre" v-model="agent.nombres"
                            class="text-end outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-2 items-center">
                    <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                        <p>APELLIDO DEL AGENTE</p>
                    </div>
                    <div class="p-1 dark:text-white text-end">
                        <input type="text" placeholder="Define el nombre" v-model="agent.apellidos"
                            class="text-end outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-2 items-center">
                    <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                        <p>CIUDAD</p>
                    </div>
                    <div class="p-1 dark:text-white text-end">
                        <input type="text" placeholder="Define la ciudad" v-model="agent.ciudad"
                            class="text-end outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-2 items-center">
                    <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                        <p>REGIMEN</p>
                    </div>
                    <div class="p-1 dark:text-white text-end">
                        <input type="text" placeholder="Define el regimen" v-model="agent.tipo_de_regimen"
                            class="text-end outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-2 items-center">
                    <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                        <p>CODIGO</p>
                    </div>
                    <div class="p-1 dark:text-white text-end">
                        <input type="text" placeholder="Define el codigo" v-model="agent.codigo"
                            class="text-end outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-2 items-center">
                    <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                        <p>IVA</p>
                    </div>
                    <div class="p-1 dark:text-white text-end inline-flex items-center justify-between">%
                        <input type="number" max="100" min="0" v-model="iva" class="w-24 text-end outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-2 items-center">
                    <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                        <p>RETENCIÓN IVA</p>
                    </div>
                    <div class="p-1 dark:text-white text-end inline-flex items-center justify-between">%
                        <input type="number" max="100" min="0" v-model="ivaRetention"
                            class="w-24 text-end outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-2 items-center">
                    <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                        <p>RETENCIÓN RENTA</p>
                    </div>
                    <div class="p-1 dark:text-white text-end inline-flex items-center justify-between">%
                        <input type="number" max="100" min="0" v-model="rent" class="w-24 text-end outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-2 items-center">
                    <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                        <p>COMISIÓN</p>
                    </div>
                    <div class="p-1 dark:text-white text-end inline-flex items-center justify-between">%
                        <input type="number" max="100" min="0" v-model="fee" class="w-24 text-end outline-none">
                    </div>
                </div>
                <div class="grid grid-cols-2 items-center">
                    <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                        <p>ADMINISTRATIVOS</p>
                    </div>
                    <div class="p-1 dark:text-white text-end inline-flex items-center justify-between">%
                        <input type="number" max="100" min="0" v-model="adm" class="w-24 text-end outline-none">
                    </div>
                </div>
            </div>

            <Alert v-if="errorAlert" class="mt-6" variant="error" title="Error al editar el agente"
                :message="errorMessage" :showLink="false" />
            <Alert v-if="successAlert" class="mt-6" variant="success" title="Agente actualizado exitosamente"
                message="Los datos han sido actualizados" />
            <button @click="updateAgent" type="button"
                class="dark:bg-white/[0.12] bg-gray-200 hover:bg-gray-300  hover:dark:bg-white/[0.20] px-3 py-2 items-center gap-3 border rounded-sm border-gray-200 dark:border-none text-lg dark:text-white font-bold">
                ACTUALIZAR SUBAGENTE
            </button>
        </div>

        <div
            class="border border-gray-200 divide-y divide-gray-800 bg-white dark:border-gray-800 dark:bg-white/[0.03] rounded-sm">
            <div class="grid grid-cols-2 items-center">
                <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                    <p>CONTRIBUCIÓN SUPERCIAS</p>
                </div>
                <div class="p-1 dark:text-white text-end">
                    <p>({{ formatUSD(calcContribution()) }})</p>
                </div>
            </div>
            <div class="grid grid-cols-2 items-center">
                <div class="dark:bg-white/[0.10] bg-gray-200 py-2 px-1 dark:text-white font-bold">
                    <p>SUBTOTAL COMISIÓN</p>
                </div>
                <div class="py-2 px-1 dark:text-white text-end">
                    <p>{{ formatUSD(calcSubtotal()) }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 items-center">
                <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                    <p>IVA</p>
                </div>
                <div class="p-1 dark:text-white text-end">
                    <p>{{ formatUSD(calcIva()) }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 items-center">
                <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                    <p>RETENCIÓN IVA</p>
                </div>
                <div class="p-1 dark:text-white text-end">
                    <p>{{ formatUSD(calcIvaRetention()) }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 items-center">
                <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                    <p>RETENCIÓN RENTA</p>
                </div>
                <div class="p-1 dark:text-white text-end">
                    <p>{{ formatUSD(calcRent()) }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 items-center">
                <div class="dark:bg-white/[0.20] bg-gray-200 p-1 dark:text-white font-bold">
                    <p>COMISIÓN BRUTA</p>
                </div>
                <div class="p-1 dark:text-white text-end">
                    <p>{{ formatUSD(calcSubtotal() - calcRent()) }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 items-center">
                <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                    <p>GASTOS ADM</p>
                </div>
                <div class="p-1 dark:text-white text-end">
                    <p>{{ formatUSD(calcAdministrative()) }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 items-center">
                <div class="dark:bg-white/[0.10] bg-gray-200 p-1 dark:text-white font-bold">
                    <p>PRESTAMOS</p>
                </div>
                <div class="p-1 dark:text-white text-end">
                    <input type="number" max="100" min="0" v-model="loan" class="w-24 text-end outline-none">
                </div>
            </div>
            <div class="grid grid-cols-2 items-center">
                <div class="dark:bg-white/[0.20] bg-gray-200 py-2 px-1 dark:text-white font-bold">
                    <p>TOTAL A RECIBIR</p>
                </div>
                <div class="py-2 px-1 dark:text-white text-end font-bold">
                    <p>{{ formatUSD(calcTotal()) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import instance from '@/libs/axios';
import Alert from "@/components/ui/Alert.vue";
import type { LiquidacionMappedTS, LiquidacionTS } from '@/interfaces/LiquidacionesTS';
import { getToken } from '@/libs/authentication';
import { removeLiquidatorRows, getLiquidatorRows } from '@/libs/storage';
import { formatUSD } from '@/libs/formatter';
import type { SubagenteTS } from '@/interfaces/SubagentesTS';
import TrashIcon from '@/icons/TrashIcon.vue';


const settlements = ref<LiquidacionMappedTS[]>([])
const agent = ref<SubagenteTS | null>(null);
const iva = ref(15);
const rent = ref(10);
const ivaRetention = ref(100);
const contributon = ref(0.005);
const fee = ref(75);
const adm = ref(0);
const loan = ref(0);
const liquidationAlert = ref(false);
const errorAlert = ref(false);
const successAlert = ref(false);
const errorMessage = ref("");
const liquidationsCount = ref(0);
const liquidation_number = ref("");
const isDateInvalid = ref(false);


const validateDate = () => {
    // Regex para DD/MM/YYYY (sin validar si el día/mes es válido)
    const regex = /^\d{1,4}\/\d{1,2}\/\d{4}$/;
    isDateInvalid.value = !regex.test(liquidation_number.value);
}

const calcAdministrative = () => {
    return ((calcSubtotal() - calcRent()) * adm.value) / 100;
}

const calcContribution = () => {
    let total = 0;
    for (const payout of settlements.value) {
        if (payout.comision && payout.comision > 0) {
            total += (payout.comision || 0) * (fee.value / 100);
        }
    }
    return total * contributon.value * 1;
}

const calcIva = () => {
    let total = 0;
    for (const payout of settlements.value) {
        if (payout.ori?.trim() !== 'AP') {
            total += (payout.comision || 0) * (fee.value / 100);
        }
    }
    return (total * iva.value) / 100;
}

const calcIvaRetention = () => {
    return (calcIva() * ivaRetention.value) / 100;
}

const calcRent = () => {
    return (calcSubtotal() * rent.value) / 100;
}

const calcSubtotal = () => {
    let total = 0;
    for (const payout of settlements.value) {
        total += (payout.comision || 0) * (fee.value / 100);
    }
    return total - calcContribution();
}

const calcTotal = () => {
    return calcSubtotal() + calcIva() - calcIvaRetention() - calcRent() - calcAdministrative() - loan.value;
}

const getTodayDate = () => {
    const date = new Date();
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}
const getMonthAndYear = () => {
    const date = new Date();
    return "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

const clearLiquidatorRows = () => {
    settlements.value = [];
    liquidationsCount.value = 0;
    agent.value = null;
    removeLiquidatorRows();
}


const generateLiquidationPDF = async (liquidation_number: string) => {
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
}


const getSettlementList = async () => {
    // Handle form submission
    const rowsIdentifiers = getLiquidatorRows()?.map(item => item.id);
    if (rowsIdentifiers != null) {

    }
    try {
        const { data } = await instance.get('/settlements/multiple', {
            headers: {
                Authorization: 'Bearer ' + getToken()
            },
            params: {
                id: rowsIdentifiers
            }
        });

        if (data) {
            settlements.value = data.payouts;
            if (settlements.value.length == 0) {
                clearLiquidatorRows();
                return;
            }
            liquidationsCount.value = data.count;
            liquidation_number.value = liquidationsCount.value + getMonthAndYear();
            if (settlements.value[0].Subagente) {
                agent.value = settlements.value[0].Subagente;
                if(settlements.value.find(s => s.ori?.trim() == 'AP')){
                    iva.value = 0;
                } else {
                    iva.value = Number(agent.value.iva) || 15;
                }
                ivaRetention.value = Number(agent.value.ret_iva) || 100;
                rent.value = Number(agent.value.ret_renta) || 10;
                adm.value = Number(agent.value.gastos_adm) || 0;
                fee.value = Number(agent.value.tarifa_comision) || 75;
            }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
        }
    }
}


const updateAgent = async () => {
    // Implement save profile logic here
    // Handle form submission
    try {
        errorAlert.value = false;
        if (agent.value) {
            const id = agent.value.id
            delete agent.value.id;
            agent.value.iva = iva.value;
            agent.value.ret_iva = ivaRetention.value;
            agent.value.ret_renta = rent.value;
            agent.value.gastos_adm = adm.value;
            agent.value.tarifa_comision = fee.value;
            await instance.put('/agents/' + id, agent.value, {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            });
            successAlert.value = true;
            setTimeout(() => successAlert.value = false, 3000);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            successAlert.value = false;
            errorAlert.value = true;
            errorMessage.value = error.response?.data.message;
        }
    }
}


const liquidateRows = async () => {
    try {
        if (isDateInvalid.value) {
            successAlert.value = false;
            liquidationAlert.value = true;
            errorMessage.value = "Este numero de liquidación no es valido";
            return;
        }

        const rows = getLiquidatorRows()?.map(item => item.id);
        const liquidation_date = getTodayDate();
        const total = calcTotal();
        const { data } = await instance.post('/settlements/liquidate', {
            rows: rows, liquidation_date: liquidation_date, liquidation_number: liquidation_number.value, total: total, loan: loan.value, iva: iva.value, ret_iva: ivaRetention.value, ret_renta: rent.value, gastos_adm: adm.value, tarifa_comision: fee.value, agent: agent.value?.codigo
        }, {
            headers: {
                Authorization: 'Bearer ' + getToken()
            }
        });
        if (data.message) {
            clearLiquidatorRows();
            generateLiquidationPDF(liquidation_number.value)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            successAlert.value = false;
            liquidationAlert.value = true;
            errorMessage.value = error.response?.data.message;
        }
    }
}

onMounted(async () => {
    await getSettlementList();
})
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>