# Realtime Chat

Este repositorio contiene una pequeña prueba técnica: dos clientes de chat en tiempo real, uno hecho con React y otro con Vue 3, ambos conectados al mismo servidor Socket.io.

La idea fue mantener el ejercicio simple, pero con una estructura razonable para que no todo quedara mezclado en un solo componente. El foco estuvo en separar la UI, el estado y la conexión por socket, además de cubrir algunos extras que suelen aparecer en este tipo de pruebas.

## Qué incluye

- Un servidor Node.js con Socket.io para retransmitir mensajes.
- Una implementación en React con componentes funcionales, hooks y Context API.
- Una implementación en Vue 3 con Composition API y Pinia.
- Historial de mensajes guardado en localStorage.
- Indicador de conexión y manejo básico de errores.
- Selección de avatar y scroll automático al final del chat.


## Instrucciones para ejecutar el proyecto

Primero hay que iniciar el servidor:

```bash
cd server
npm install
node server.js
```

Después se puede levantar cualquiera de los clientes.

React:

```bash
cd react-chat
npm install
npm run dev
```

Vue:

```bash
cd vue-chat
npm install
npm run dev
```

Con el servidor corriendo, lo práctico es abrir React en una ventana y Vue en otra. Así se puede comprobar que un mensaje enviado desde un cliente aparece en el otro sin necesidad de recargar la pagina.

## Arquitectura utilizada

La solución está separada en tres partes:

- server: servidor Node.js con Socket.io que recibe mensajes y los emite a todos los clientes conectados.
- react-chat: cliente hecho con React, donde la UI consume un contexto central que concentra el estado del chat y la comunicación por socket.
- vue-chat: cliente hecho con Vue 3, donde la UI consume un store de Pinia que centraliza mensajes, conexión y acciones del chat.

## Decisiones técnicas

# React

En la versión de React usé Context API porque para el tamaño de esta prueba me pareció suficiente. Redux o Zustand también eran opciones válidas, pero aquí el estado compartido es corto: mensajes, estado de conexión y acción para enviar mensajes.

La lógica de socket vive fuera de los componentes visuales. Los componentes se limitan a consumir el contexto y renderizar la interfaz.

# Vue 3

En Vue opté por Pinia porque encaja bien con Composition API y deja la lógica de conexión y actualización del estado en un solo lugar. También permite evitar que el socket termine controlado desde varios componentes al mismo tiempo.

# Socket.io

En ambos clientes hay un servicio de socket dedicado. La intención fue que la app tenga un único punto de entrada para la conexión y que los listeners no queden repartidos por toda la interfaz.

## Extras agregados

Además de lo pedido en el enunciado, agregué algunos detalles que mejoran un poco la experiencia:

- Reconexión automática del cliente.
- Persistencia local de mensajes.
- Avatar de usuario.
- Scroll automático al último mensaje.
- Feedback cuando hay error de conexión.

## Notas

en Vue se valida que exista avatar antes de enviar un mensaje, mientras que en React hay uno por defecto.




