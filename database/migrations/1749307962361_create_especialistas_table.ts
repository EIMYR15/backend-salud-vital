import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Especialistas extends BaseSchema {
  protected tableName = 'especialistas'

  async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre_completo').notNullable()
      table.string('especialidad').notNullable()
      table.string('registro_profesional').notNullable().unique()
      table.json('dias_horarios').notNullable()
      table.boolean('activo').defaultTo(true)
      table.timestamps(true)
      table.timestamp('deleted_at').nullable()
    })
  }

  async down () {
    this.schema.dropTable(this.tableName)
  }
}