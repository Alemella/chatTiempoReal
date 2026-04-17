<template>

  <UsernameGate v-if="!ready" @ready="onReady" />

  <div v-else class="app">

    <header class="app-header">
      <h1 class="app-title">Chat <span class="accent">Vue</span></h1>
      <div class="header-actions">
        <StatusIndicator />
        <button class="change-user-button" @click="changeUser">Cambiar usuario</button>
      </div>
    </header>

    <div class="app-body">
      <AvatarSelector />
      <ChatWindow />
      <MessageInput />
    </div>

  </div>

</template>

<script setup lang="ts">
  import { onUnmounted, ref } from "vue"
  import Swal from "sweetalert2"
  import { useChatStore } from "./stores/chatStore"
  import StatusIndicator from "./components/StatusIndicator.vue"
  import ChatWindow from "./components/ChatWindow.vue"
  import MessageInput from "./components/MessageInput.vue"
  import AvatarSelector from "./components/AvatarSelector.vue"
  import UsernameGate from "./components/UsernameGate.vue"

  const chat = useChatStore()
  const ready = ref(Boolean(localStorage.getItem("user")))

  if (ready.value) {
    chat.init()
  }

  function onReady() {
    ready.value = true
    chat.init()
  }

  async function changeUser() {
    const result = await Swal.fire({
      title: "Cambiar usuario",
      text: "Se borrara tu sesion local.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, continuar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#0284c7",
      cancelButtonColor: "#475569",
      reverseButtons: true,
      background: "#0f172a",
      color: "#e2e8f0"
    })

    if (!result.isConfirmed) return

    localStorage.clear()
    chat.cleanup()
    chat.resetState()
    ready.value = false
  }

  onUnmounted(() => {
    chat.cleanup()
  })
</script>

<style>
.template {
  background: red;
}

.body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: red;
  color: #e2e8f0;
}

.app {
  --accent-color: #057e6c;
  --accent-color-hover: #057e6c;
  --accent-rgb: 8, 214, 183;
  max-width: 520px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1c1c28;
  border-radius: 0;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
}

@media (min-width: 600px) {
  .app {
    min-height: auto;
    margin: 2rem auto;
    border-radius: 16px;
    overflow: hidden;
  }
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #242424;
  border-bottom: 3px solid var(--accent-color);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.change-user-button {
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(15, 23, 42, 0.65);
  color: #e2e8f0;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.75rem;
  cursor: pointer;
}

.change-user-button:hover {
  border-color: rgba(var(--accent-rgb), 0.9);
}

.app-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #fff;
}

.accent {
  color: var(--accent-color);
}

.app-body {
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

</style>