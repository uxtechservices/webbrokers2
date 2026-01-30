import { getToken } from '@/libs/authentication'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/:pathMatch(.*)*', // Captura todas las rutas no existentes
      redirect: '/error-404', // Cambia esta URL según lo necesario
    },
    {
      path: '/',
      name: 'Ecommerce',
      component: () => import('../views/Ecommerce.vue'),
      meta: {
        title: 'Inicio',
        requiresAuth: true
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Perfil',
        requiresAuth: true
      },
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: {
        title: 'Usuarios',
        requiresAuth: true
      },
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: () => import('../views/Tables/ClientsTable.vue'),
      meta: {
        title: 'Clientes',
        requiresAuth: true
      },
    },
    {
      path: '/subagentes',
      name: 'SubAgentes',
      component: () => import('../views/Tables/AgentsTable.vue'),
      meta: {
        title: 'SubAgentes',
        requiresAuth: true
      },
    },
    {
      path: '/subagentes/crear',
      name: 'SubAgentes-Crear',
      component: () => import('../views/Forms/AgentCreation.vue'),
      meta: {
        title: 'SubAgentes - Crear nuevo',
        requiresAuth: true
      },
    },
    {
      path: '/subagentes/editar/:id',
      name: 'SubAgentes-Editar',
      component: () => import('../views/Forms/AgentEdition.vue'),
      meta: {
        title: 'SubAgentes - Editar',
        requiresAuth: true
      },
    },
    {
      path: '/aseguradoras',
      name: 'Aseguradoras',
      component: () => import('../views/Tables/AgencyTable.vue'),
      meta: {
        title: 'Aseguradoras',
        requiresAuth: true
      },
    },
    {
      path: '/kanban',
      name: 'Kanban',
      component: () => import('../views/Others/Kanban.vue'),
      meta: {
        title: 'Kanban',
        requiresAuth: true
      },
    },
    {
      path: '/liquidaciones/generar-reportes',
      name: 'Reportes',
      component: () => import('../views/Others/Reports.vue'),
      meta: {
        title: 'Generar Reportes',
        requiresAuth: true
      },
    },
    {
      path: '/liquidaciones/generar',
      name: 'Liquidador',
      component: () => import('../views/Tables/Liquidator.vue'),
      meta: {
        title: 'Generar Liquidación',
        requiresAuth: true
      },
    },
    {
      path: '/liquidaciones/crear',
      name: 'Crear Liquidacion',
      component: () => import('../views/Forms/SettlementCreation.vue'),
      meta: {
        title: 'Crear Pre-liquidación',
        requiresAuth: true
      },
    },
    {
      path: '/liquidaciones/arreglar-subida',
      name: 'Arreglar filas de Liquidacion',
      component: () => import('../views/Forms/SettlementCorrection.vue'),
      meta: {
        title: 'Arreglar filas',
        requiresAuth: true
      },
    },
    {
      path: '/liquidaciones/editar/:id',
      name: 'Editar Liquidacion',
      component: () => import('../views/Forms/SettlementEdition.vue'),
      meta: {
        title: 'Editar Pre-liquidación',
        requiresAuth: true
      },
    },
    {
      path: '/liquidaciones/pre-liquidaciones',
      name: 'Pre-Liquidaciones',
      component: () => import('../views/Tables/PreSettlementsTable.vue'),
      meta: {
        title: 'Pre Liquidaciones',
        requiresAuth: true
      },
    },
    {
      path: '/liquidaciones/negocios-pendientes',
      name: 'Negocios pendientes por liberar',
      component: () => import('../views/Tables/PendingSettlementsTable.vue'),
      meta: {
        title: 'Negocios pendientes por liberar',
        requiresAuth: true
      },
    },
    {
      path: '/liquidaciones/negocios-liberados',
      name: 'Negocios pendientes por facturar',
      component: () => import('../views/Tables/InvoicedSettlementsTable.vue'),
      meta: {
        title: 'Negocios pendientes por facturar',
        requiresAuth: true
      },
    },
    {
      path: '/liquidaciones/negocios-consolidados',
      name: 'Consolidados',
      component: () => import('../views/Tables/FinishedSettlementsTable.vue'),
      meta: {
        title: 'Consolidados',
        requiresAuth: true
      },
    },
    {
      path: '/liquidaciones/negocios-archivados',
      name: 'Archivados',
      component: () => import('../views/Tables/ArchivedSettlementsTable.vue'),
      meta: {
        title: 'Archivados',
        requiresAuth: true
      },
    },
    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
        requiresAuth: false
      },
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
        requiresAuth: false
      },
    }
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `Ciaros - ${to.meta.title}`

  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth && !getToken()) {
    return next({ path: '/signin' }) // Redirige al login si no hay token
  } else if (!to.meta.requiresAuth && getToken()) {
    return next({ path: '/' }) // Redirige al login si no hay token
  }

  next() // Permite el acceso si tiene token o no requiere autenticación
})
