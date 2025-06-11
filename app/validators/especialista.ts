import vine from '@vinejs/vine'

export const createEspecialistaValidator = vine.compile(
  vine.object({
    nombre_completo: vine.string().minLength(3),
    especialidad: vine.string(),
    registro_profesional: vine.string().unique(async (db, value) => {
      const exists = await db
        .from('especialistas')
        .where('registro_profesional', value)
        .first()
      return !exists
    }),
    dias_horarios: vine.array(
      vine.object({
        dia: vine.string(),
        inicio: vine.string(),
        fin: vine.string(),
      })
    ),
  })
)