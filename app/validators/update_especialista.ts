import vine from '@vinejs/vine'

export const updateEspecialistaValidator = vine.compile(
  vine.object({
    nombreCompleto: vine.string().minLength(3),
    especialidad: vine.string(),
    registroProfesional: vine.string(),
    diasHorarios: vine.array(
      vine.object({
        dia: vine.string(),
        inicio: vine.string(),
        fin: vine.string(),
      })
    ),
  })
)