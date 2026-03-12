<template>

  <div ref="chatContainer" class="chat-container">

    <div
      v-for="msg in chat.messages"
      :key="msg.id"
      class="message"
    >

      <img
        :src="msg.avatar"
        class="avatar"
      />

      <div class="message-content">
        <strong>{{ msg.user }}</strong>
        <div>{{ msg.text }}</div>
      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
  import { ref, watch, nextTick } from "vue"
  import { useChatStore } from "../stores/chatStore"

  const chat = useChatStore()

  const chatContainer = ref<HTMLDivElement | null>(null)

  watch(
    () => chat.messages.length,
    async () => {
      await nextTick()

      if (chatContainer.value) {
        chatContainer.value.scrollTop =
          chatContainer.value.scrollHeight
      }
    }
  )
</script>

<style>

  .chat-container {
    height: 320px;
    overflow-y: auto;
    border: 1px solid #e2e8f0;
    padding: 12px;
    border-radius: 12px;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    gap: 8px;
    scroll-behavior: smooth;
  }

  .chat-container::-webkit-scrollbar {
    width: 5px;
  }

  .chat-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .chat-container::-webkit-scrollbar-thumb {
    background: #c7d2e0;
    border-radius: 10px;
  }

  .message {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    width: 100%;
  }

  .avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 2px solid #000000;
  }

  .message-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    background: #dcfce7;
    padding: 8px 12px;
    border-radius: 10px;
    color: #14532d;
    box-shadow: 0 1px 4px rgba(34, 197, 94, 0.2);
    transition: box-shadow 0.15s;
    border: 1px solid #bbf7d0;
    width: fit-content;
    max-width: calc(100% - 52px);
  }

  .message-content:hover {
    box-shadow: 0 3px 8px rgba(34, 197, 94, 0.25);
  }

  .message-content strong {
    font-size: 0.84rem;
    color: #000000;
    font-weight: 600;
  }

  .message-content div {
    font-size: 0.93rem;
    line-height: 1.35;
    color: #14532d;
    word-break: break-word;
  }

</style>