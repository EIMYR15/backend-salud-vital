import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Especialista extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre_completo: string

  @column()
  declare especialidad: string

  @column()
  declare registro_profesional: string

  @column({
    serialize: (value: any) => value ? JSON.parse(value) : [],
    prepare: (value: any) => JSON.stringify(value),
  })
  declare dias_horarios: any

  @column()
  declare activo: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}