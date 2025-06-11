import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Especialista extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({columnName: 'nombre_completo'})
  declare nombreCompleto: string

  @column()
  declare especialidad: string

  @column({columnName: 'registro_profesional'})
  declare registroProfesional: string

  @column({
    columnName: 'dias_horarios',
  prepare: (value: any[]) => JSON.stringify(value),
  serialize: (value: string) => {
    try { return JSON.parse(value) }
    catch { return [] }
  },
  })
  declare diasHorarios: any

  @column()
  declare activo: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}