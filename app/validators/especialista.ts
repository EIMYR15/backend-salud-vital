import vine from '@vinejs/vine'

export const createEspecialistaValidator = vine.compile(
  vine.object({
    nombreCompleto: vine.string().minLength(3),
    especialidad: vine.string(),
    registroProfesional: vine.string().unique(async (db, value) => {
      const exists = await db
        .from('especialistas')
        .where('registro_profesional', value)
        .first()
      return !exists
    }),
    diasHorarios: vine.array(
      vine.object({
        dia: vine.string(),
        inicio: vine.string(),
        fin: vine.string(),
      })
    ),
  })
)