import type { HttpContext } from '@adonisjs/core/http'
import Especialista from '#models/especialista'
import { DateTime } from 'luxon'
import { createEspecialistaValidator } from '#validators/especialista'
import { updateEspecialistaValidator } from '#validators/update_especialista'

export default class EspecialistasController {
  /**
   * Listar todos los especialistas activos
   */
  async index({ request }: HttpContext) {
    const { orderBy = 'id', order = 'desc' } = request.qs()
    const especialistas = await Especialista
      .query()
      .orderBy(orderBy, order)
    return especialistas
  }

  /**
   * Crear un especialista
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createEspecialistaValidator)
    const especialista = await Especialista.create(payload)
    return response.created(especialista)
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
    try {
      const data = await request.validateUsing(updateEspecialistaValidator)
      especialista.merge(data)
      await especialista.save()
      return especialista
    } catch (error) {
      return response.badRequest(error.messages || error.message)
    }
  }

  /**
   * Soft delete: marcar como inactivo y poner deletedAt
   */
  async destroy({ params, response }: HttpContext) {
    const especialista = await Especialista.find(params.id)
    if (!especialista) return response.notFound({ message: 'Especialista no encontrado' })
    especialista.deletedAt = DateTime.now()
    await especialista.save()
    return response.ok({ message: 'Especialista inactivado' })
  }

  /**
   * Restaurar especialista (opcional)
   */
  async restore({ params, response }: HttpContext) {
    const especialista = await Especialista.find(params.id)
    if (!especialista) return response.notFound({ message: 'Especialista no encontrado' })
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