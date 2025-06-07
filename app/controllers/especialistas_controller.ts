import type { HttpContext } from '@adonisjs/core/http'
import Especialista from '#models/especialista'

export default class EspecialistasController {
  /**
   * Listar todos los especialistas activos
   */
  async index({ request }: HttpContext) {
    const { orderBy = 'nombre_completo', order = 'asc' } = request.qs()
    const especialistas = await Especialista
      .query()
      .where('activo', true)
      .orderBy(orderBy, order)
    return especialistas
  }

  /**
   * Crear un especialista
   */
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'nombre_completo',
      'especialidad',
      'registro_profesional',
      'dias_horarios'
    ])
    // Validaciones aquí (puedes agregar un validator aparte)
    try {
      const especialista = await Especialista.create({ ...data, activo: true })
      return response.created(especialista)
    } catch (error) {
      return response.badRequest(error)
    }
  }

  /**
   * Mostrar un especialista por id
   */
  async show({ params, response }: HttpContext) {
    const especialista = await Especialista.find(params.id)
    if (!especialista) return response.notFound({ message: 'Especialista no encontrado' })
    return especialista
  }

  /**
   * Actualizar un especialista
   */
  async update({ params, request, response }: HttpContext) {
    const especialista = await Especialista.find(params.id)
    if (!especialista) return response.notFound({ message: 'Especialista no encontrado' })
    const data = request.only([
      'nombre_completo',
      'especialidad',
      'registro_profesional',
      'dias_horarios'
    ])
    especialista.merge(data)
    await especialista.save()
    return especialista
  }

  /**
   * Soft delete: marcar como inactivo y poner deletedAt
   */
  async destroy({ params, response }: HttpContext) {
    const especialista = await Especialista.find(params.id)
    if (!especialista) return response.notFound({ message: 'Especialista no encontrado' })
    especialista.activo = false
    especialista.deletedAt = new Date()
    await especialista.save()
    return response.ok({ message: 'Especialista inactivado' })
  }

  /**
   * Restaurar especialista (opcional)
   */
  async restore({ params, response }: HttpContext) {
    const especialista = await Especialista.find(params.id)
    if (!especialista) return response.notFound({ message: 'Especialista no encontrado' })
    especialista.activo = true
    especialista.deletedAt = null
    await especialista.save()
    return response.ok({ message: 'Especialista restaurado' })
  }

  /**
   * Eliminar definitivamente
   */
  async forceDelete({ params, response }: HttpContext) {
    const especialista = await Especialista.find(params.id)
    if (!especialista) return response.notFound({ message: 'Especialista no encontrado' })
    await especialista.delete()
    return response.ok({ message: 'Especialista eliminado definitivamente' })
  }
}