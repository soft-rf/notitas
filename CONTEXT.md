# Project Context: Notitas

Este documento preserva la visión, el producto y el "User Journey" para que todo desarrollador (humano o IA) entienda el objetivo final.

## El Producto
"Notitas" es un gestor de snippets local, ultra-rápido y sin backend. Diseñado para tener tu información clave (respuestas, perfiles, enlaces, mensajes pre-armados) siempre a un clic de distancia. El enfoque está en la acción: ENTRAR -> COPIAR -> SALIR en segundos.

## User Journey Core
1. **Aterrizaje Instantáneo**: No hay Login. Al entrar a la URL se accede directamente al área de trabajo. Si es la primera vez, el usuario ve una pestaña de ejemplo llamada "Bienvenida".
2. **Organización**: El usuario crea Pestañas (Tabs) temáticas (ej: "Perfil Frontend", "Respuestas HR").
3. **Carga de Contenido**: El usuario crea "Blocks" (Tarjetas) con un título y contenido. Puede usar negritas para resaltar.
4. **La Acción (Copiar)**: Al pulsar "Copiar" en una tarjeta, se guarda en el portapapeles y se da feedback visual instantáneo.
5. **Reordenamiento**: Drag and drop para ordenar las tarjetas según prioridad.
6. **Mobile First**: Diseñado para ser usado "en el colectivo", con el pulgar.
7. **Acción Masiva**: Posibilidad de copiar toda la pestaña de un solo golpe.

## Jerarquía de Datos
El estado de la aplicación sigue este modelo estricto:
- `Workspace` (La aplicación completa)
  - `Tabs` (Array de pestañas temáticas)
    - `Blocks` (Array de snippets dentro de cada pestaña)

## Limitaciones y Reglas de Negocio
- Toda la data vive exclusivamente en `localStorage`.
- No hay sincronización en la nube.
- Priorizar velocidad de renderizado. No bloquear el main thread en el pintado de UI.
