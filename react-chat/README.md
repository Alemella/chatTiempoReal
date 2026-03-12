# React Chat

Cliente del chat implementado con React, TypeScript y Vite.

La versión de React está pensada como una implementación simple, con componentes funcionales y una capa de estado compartido usando Context API. Para una prueba de este tamaño preferí esa opción porque mantiene el código corto y evita meter una librería extra solo para guardar mensajes y estado de conexión.

## Ejecutar

```bash
npm install
npm run dev
```

Por defecto la aplicación se conecta a http://localhost:3001, así que el servidor Socket.io tiene que estar levantado antes.

## Estructura principal

```text
src/
|-- components/
|-- context/
|-- services/
|-- App.tsx
`-- main.tsx
```

## Cómo está organizada

- components: piezas visuales como la ventana del chat, input, selector de avatar e indicador de estado.
- context: estado global del chat y listeners del socket.
- services: cliente Socket.io reutilizable.

## Decisiones de implementación

La lógica de conexión no está dentro de los componentes visuales. El objetivo fue evitar que cada componente se conecte por su cuenta o cree listeners duplicados.

El contexto expone lo mínimo necesario:

- messages
- connected
- error
- sendMessage

Además se guarda el historial en localStorage para que al recargar no se pierda todo inmediatamente.

## Qué cubre

- envío de mensajes
- recepción en tiempo real
- indicador de conexión
- scroll al último mensaje
- avatar persistido localmente

## Mejoras pendientes

Si esto pasara de prueba técnica a proyecto real, lo primero que ajustaría sería mover la URL del socket a variables de entorno y hacer una limpieza de listeners más fina usando callbacks nombrados en lugar de hacer off solo por nombre de evento.
