import router from '@adonisjs/core/services/router'

const controllerEspecialistas = () => import('#controllers/especialistas_controller')

// Ruta de prueba
router.get('/', async () => {
  return { hello: 'world' }
})

// CRUD de especialistas
router.get('/especialistas', [controllerEspecialistas, 'index'])
router.post('/especialistas', [controllerEspecialistas, 'store'])
router.get('/especialistas/:id', [controllerEspecialistas, 'show'])
router.put('/especialistas/:id', [controllerEspecialistas, 'update'])
router.delete('/especialistas/:id', [controllerEspecialistas, 'destroy'])

// Restaurar especialista (soft delete)
router.post('/especialistas/:id/restore', [controllerEspecialistas, 'restore'])

// Eliminar definitivamente
router.delete('/especialistas/:id/force', [controllerEspecialistas, 'forceDelete'])

