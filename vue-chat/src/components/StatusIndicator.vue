<template>
  <div class="status-container">
    <div class="status-badge" :class="chat.connected ? 'connected' : 'disconnected'">
      <span class="status-dot"></span>
      <span class="status-text">{{ chat.connected ? 'Conectado' : 'Desconectado' }}</span>
      <button
        v-if="!chat.connected"
        type="button"
        class="status-reload"
        title="Reintentar conexión"
        aria-label="Reintentar conexión"
        @click="chat.reconnect()"
      >
        ↻
      </button>
    </div>
    <div v-if="chat.error" class="status-error">{{ chat.error }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useChatStore } from "../stores/chatStore";

  const chat = useChatStore();
</script>

<style>

  .status-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .status-badge.connected {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
    border: 1px solid rgba(74, 222, 128, 0.3);
  }

  .status-badge.disconnected {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border: 1px solid rgba(248, 113, 113, 0.3);
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .connected .status-dot {
    background: #4ade80;
    box-shadow: 0 0 5px #4ade80;
  }

  .disconnected .status-dot {
    background: #f87171;
  }

  .status-reload {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid rgba(248, 113, 113, 0.55);
    background: rgba(127, 29, 29, 0.2);
    color: #fecaca;
    font-size: 0.8rem;
    line-height: 1;
    cursor: pointer;
    padding: 0;
  }

  .status-reload:hover {
    filter: brightness(1.08);
  }

  .status-error {
    font-size: 0.75rem;
    color: #f87171;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

</style>

