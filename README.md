# Backend - Sistema de Gestión de Especialistas Médicos

Proyecto backend para la clínica **Salud Vital**. Permite gestionar especialistas médicos y sus días/horarios de atención.

## Autor

- **Nombre:** eimy rodriguez
  
- **SENA - Examen Backend Node.js + AdonisJS**


---

## Tecnologías

- [AdonisJS](https://adonisjs.com/) (Node.js)
- MySQL

---

## Requisitos previos

- Node.js 18+
- MySQL 5.7+ o compatible
- Git

---

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/EIMYR15/backend-salud-vital.git
   cd backend-salud-vital
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura el archivo `.env`:**

   Copia el archivo `.env.example` a `.env` y edítalo con tus datos de conexión MySQL:

   ```
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_DATABASE=salud_vital
   ```

4. **Ejecuta las migraciones:**

   ```bash
   node ace migration:run
   ```

5. **Inicia el servidor:**

   ```bash
   node ace serve --watch
   ```

   El backend estará disponible en [http://localhost:3333](http://localhost:3333)

---

## Endpoints principales

- `GET    /especialistas`           → Listar especialistas activos
- `POST   /especialistas`           → Crear especialista
- `GET    /especialistas/:id`       → Ver especialista por ID
- `PUT    /especialistas/:id`       → Actualizar especialista
- `DELETE /especialistas/:id`       → Inactivar especialista (soft delete)
- `POST   /especialistas/:id/restore` → Restaurar especialista inactivo
- `DELETE /especialistas/:id/force` → Eliminar especialista definitivamente

---

## Pruebas rápidas con Postman

Ejemplo de body para crear especialista:

```json
{
  "nombre_completo": "Dr. Carlos Lopez",
  "especialidad": "Ginecologia",
  "registro_profesional": "CMP12345654",
  "dias_horarios": [
    { "dia": "Lunes", "inicio": "08:00", "fin": "12:00" }
  ]
}
```

---

## Notas

- El campo `dias_horarios` debe ser un array de objetos y la columna en MySQL debe ser tipo `JSON`.
- El sistema implementa soft delete y validaciones de negocio.
- Para restaurar o eliminar definitivamente un especialista, usa los endpoints indicados arriba.

---

## Licencia

Uso académico - SENA 2025
