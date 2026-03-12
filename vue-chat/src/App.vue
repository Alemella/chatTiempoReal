<template>

  <div class="app">

    <header class="app-header">
      <h1 class="app-title">Chat <span class="accent">Vue</span></h1>
      <StatusIndicator />
    </header>

    <div class="app-body">
      <AvatarSelector />
      <ChatWindow />
      <MessageInput />
    </div>

  </div>

</template>

<script setup lang="ts">
  import { onMounted, onUnmounted } from "vue"
  import { useChatStore } from "./stores/chatStore"
  import StatusIndicator from "./components/StatusIndicator.vue"
  import ChatWindow from "./components/ChatWindow.vue"
  import MessageInput from "./components/MessageInput.vue"
  import AvatarSelector from "./components/AvatarSelector.vue"

  const chat = useChatStore()

  onMounted(() => {
    chat.init()
  })

  onUnmounted(() => {
    chat.cleanup()
  })
</script>

<style>

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