
import { z } from 'zod';


const userBaseSchema = z.object({
    id: z.string().min(1, "El ID es requerido"),
    nombre_completo: z.string(),
    correo: z.string()
        .email("Correo electrónico inválido")
        .refine(
            (email) => email.endsWith("@insightflow.cl"),
            "El correo debe terminar en @insightflow.cl"
        )
        .toLowerCase(),
    usuario: z.string(),
    contrasenia: z.string(),
    fecha_nacimiento: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    Direccion: z.string(),
    telefono: z.string()
        .regex(/^\+56 [0-9] [0-9]{4} [0-9]{4}$/, "Teléfono inválido"),
    estado: z.enum(["activo", "inactivo"], {
        errorMap: () => ({ message: "El estado debe ser 'activo' o 'inactivo'" })
    })
});

// Schema para CREAR usuario (sin id y estado)
export const crearUsuarioSchema = z.object({
    nombre_completo: z.string().min(1, "El nombre es requerido"),
    apellidos: z.string().min(1, "Los apellidos son requeridos"),
    correo: z.string()
        .email("Correo electrónico inválido")
        .refine(
            (email) => email.endsWith("@insightflow.cl"),
            "El correo debe terminar en @insightflow.cl"
        )
        .toLowerCase(),
    usuario: z.string(),
    contrasenia: z.string(),
    fecha_nacimiento: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    direccion: z.string(),
    telefono: z.string()
        .regex(/^\+56 [0-9] [0-9]{4} [0-9]{4}$/, "Formato inválido. Usar: +56 9 1234 5678")
});

// Schema para LOGIN
export const loginSchema = z.object({
    usuario: z.string().min(1, "El usuario es requerido"),
    contrasenia: z.string().min(1, "La contraseña es requerida")
});

// Schema para ACTUALIZAR usuario (todos opcionales excepto id)
export const actualizarUsuarioSchema = z.object({
    id: z.string().min(1, "El ID es requerido"),
    nombre_completo: z.string()
        .optional(),
    correo: z.string()
        .email("Correo electrónico inválido")
        .refine(
            (email) => email.endsWith("@insightflow.cl"),
            "El correo debe terminar en @insightflow.cl"
        )
        .toLowerCase()
        .optional(),
    usuario: z.string()
        .optional(),
    contrasenia: z.string()
        .optional(),
    fecha_nacimiento: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)")
        .optional(),
    Direccion: z.string()
        .optional(),
    telefono: z.string()
        .regex(/^\+56 [0-9] [0-9]{4} [0-9]{4}$/, "Teléfono inválido")
        .optional()
}).refine(
    (data) => {
        // Al menos un campo además del id debe estar presente
        const { id, ...resto } = data;
        return Object.keys(resto).length > 0;
    },
    {
        message: "Debe proporcionar al menos un campo para actualizar"
    }
);

// Schema para ELIMINAR usuario (solo id)
export const eliminarUsuarioSchema = z.object({
    id: z.string().min(1, "El ID es requerido")
});

// Schema para obtener usuario por ID
export const obtenerUsuarioPorIdSchema = z.object({
    id: z.string().min(1, "El ID es requerido")
});