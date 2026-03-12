# Vue Chat

Cliente del mismo chat en tiempo real, pero resuelto con Vue 3, TypeScript, Composition API y Pinia.

La idea en esta versión fue mantener la misma funcionalidad del cliente de React, pero usando una organización más natural para el ecosistema Vue: componentes para la UI, store central para el estado y un servicio de socket separado.

## Ejecutar

```bash
npm install
npm run dev
```

Al igual que la app de React, este cliente espera encontrar el servidor Socket.io en http://localhost:3001.

## Estructura principal

```text
src/
|-- components/
|-- services/
|-- stores/
|-- App.vue
`-- main.ts
```

## Cómo está organizada

- components: interfaz del chat, input, selector de avatar y estado de conexión.
- stores: store de Pinia con mensajes, conexión y acciones del chat.
- services: instancia compartida del cliente Socket.io.

## Decisiones de implementación

Pinia me pareció una buena elección para esta prueba porque deja toda la lógica del chat bastante concentrada. La inicialización del socket se hace desde el store y App.vue solo se encarga de montar y limpiar.

También hay una bandera de inicialización para evitar listeners duplicados si la app vuelve a montar el flujo del chat.

## Qué cubre

- mensajes en tiempo real
- persistencia local del historial
- estado conectado / desconectado
- scroll automático
- selección de avatar

## Mejoras pendientes

Igual que en React, si esto siguiera evolucionando movería la URL del socket a configuración por entorno y endurecería un poco más la validación de mensajes antes de emitirlos o mostrarlos.
