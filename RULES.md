# Reglas de Desarrollo y Agente (RULES.md)

Este archivo define las reglas estrictas de desarrollo para mantener un código profesional y evitar alucinaciones.

## 1. Principios del Agente AI
- **Cero Suposiciones (No Alucinaciones)**: Si un requerimiento es ambiguo, DEBO detener la ejecución y hacer una pregunta directa al usuario.
- **Ejecución Paso a Paso**: No generaré código masivo sin aprobación. Avanzaré estrictamente según las fases definidas en `task.md` y solicitaré validación al terminar cada fase.
- **Respeto Absoluto al Stack**: No introduciré librerías de terceros (especialmente pesadas) sin pedir permiso explícito.

## 2. Arquitectura (Clean Architecture)
El proyecto debe respetar la siguiente división de responsabilidades:
- `domain/`: Contiene exclusivamente los Tipos e Interfaces (`Tab`, `Block`, etc.). NO depende de ninguna otra capa ni de React.
- `infrastructure/`: Implementaciones de servicios externos. Aquí vivirá la lógica cruda de `localStorage`.
- `use-cases/`: Reglas de negocio. Funciones puras (o hooks sin UI) que orquestan el dominio y la infraestructura.
- `presentation/`: Exclusivamente componentes React, UI, y estado visual. NUNCA acceden a `localStorage` directamente.

## 3. Reglas de Código (React & TS)
- Todo el código debe estar fuertemente tipado con TypeScript. Modo estricto activado.
- Preferencia absoluta por Componentes Funcionales.
- Los componentes deben ser pequeños (idealmente < 150 líneas).
- Extraer lógica compleja a Custom Hooks ubicados en `presentation/hooks`.

## 4. Reglas UI/UX (Producto Notitas)
- **Local First**: Todo vive en el dispositivo. Prohibido añadir llamadas fetch a backends.
- **Diseño**: Tailwind CSS. Priorizar un "Dark Mode" estilo Chrome (grises oscuros limpios, contrastes sutiles, detalles vibrantes para acciones como "Copiar").
- **Velocidad sobre todo**: La carga debe ser instantánea. El diseño debe ser responsivo por defecto (Mobile First).
- **Feedback Constante**: Cada interacción (copiar, reordenar, añadir) debe tener una micro-animación o cambio de color que confirme el éxito instantáneamente.
