<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps({
    totalItems: { type: Number, required: true }, // total de ítems en DB
    itemsPerPage: { type: Number, default: 10 }
})
const emit = defineEmits(['update:currentPage'])

const currentPage = ref(1)

const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.itemsPerPage)
})

watch(currentPage, (newPage) => {
    emit('update:currentPage', newPage)
})

// Navegación
function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

// Rango de botones
const maxButtons = 3

const pagesInRange = computed(() => {
    const pages: number[] = []
    const total = totalPages.value
    let start = Math.max(1, currentPage.value - Math.floor(maxButtons / 2))
    let end = start + maxButtons - 1

    if (end > total) {
        end = total
        start = Math.max(1, end - maxButtons + 1)
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
})

const showFirst = computed(() => pagesInRange.value[0] > 1)
const showLast = computed(() => pagesInRange.value[pagesInRange.value.length - 1] < totalPages.value)
</script>

<template>
    <div class="flex items-center justify-center my-4 space-x-2">
        <button @click="prevPage" :disabled="currentPage === 1"
            class="px-3 py-1 dark:bg-gray-200 border-1 rounded hover:bg-gray-300 disabled:opacity-50">
            Anterior
        </button>

        <button v-if="showFirst" @click="goToPage(1)"
            class="px-3 py-1 rounded dark:bg-gray-100 border-1 hover:bg-gray-200">
            1
        </button>

        <span v-if="showFirst" class="px-2 select-none dark:text-gray-200">...</span>

        <button v-for="page in pagesInRange" :key="page" @click="goToPage(page)" :class="[ 
            'px-3 py-1 rounded', 
            page === currentPage ? 'dark:bg-indigo-900/20 bg-indigo-600/50 text-white' : 'dark:bg-gray-100 border-1 hover:bg-gray-200' 
        ]">
            {{ page }}
        </button>

        <span v-if="showLast" class="px-2 select-none dark:text-gray-200">...</span>

        <button v-if="showLast" @click="goToPage(totalPages)"
            class="px-3 py-1 rounded dark:bg-gray-100 border-1 hover:bg-gray-200">
            {{ totalPages }}
        </button>

        <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-3 py-1 dark:bg-gray-200 border-1 rounded hover:bg-gray-300 disabled:opacity-50">
            Siguiente
        </button>
    </div>
</template>
