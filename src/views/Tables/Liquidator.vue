<template>
    <BasicLayout>
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <div class="space-y-5 sm:space-y-6">
            <LiquidatorTable />
        </div>
    </BasicLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import BasicLayout from "@/components/layout/BasicLayout.vue";
import LiquidatorTable from "@/components/tables/basic-tables/LiquidatorTable.vue";

const currentPageTitle = ref("Generar Liquidación");
</script>