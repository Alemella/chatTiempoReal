<template>
  <div>
    <p v-if="error" class="input-error">{{ error }}</p>
    <div class="input-container">
      <input
        v-model="text"
        placeholder="Escribe un mensaje..."
        @keydown.enter="send"
      />
      <button @click="send">Enviar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useChatStore } from "../stores/chatStore";

  const chat = useChatStore();
  const text = ref<string>("");
  const error = ref<string>("");

  const user = ref<string>(localStorage.getItem("user") || "");

  if (!user.value) {
    user.value = prompt("Tu nombre") || "Anon";
    localStorage.setItem("user", user.value);
  }

  function send(): void {
    const avatar = localStorage.getItem("avatar");

    if (!avatar) {
      error.value = "Selecciona un avatar antes de enviar mensajes.";
      setTimeout(() => { error.value = ""; }, 9000);
      return;
    }

    if (!text.value.trim()) return;

    error.value = "";
    chat.sendMessage({ user: user.value, text: text.value, avatar });
    text.value = "";
  }
</script>

<style>

  .input-error {
    color: #f87171;
    font-size: 0.8rem;
    margin: 0 0 6px 4px;
  }

  .input-container {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  input {
    flex: 1;
    padding: 10px 16px;
    border: 1.5px solid #d1d5db;
    border-radius: 24px;
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    background: #ffffff;
    color: #1e293b;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input::placeholder {
    color: #000000;
  }

  input:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.15);
  }

  button {
    padding: 10px 20px;
    background: var(--accent-color);
    color: #ffffff;
    border: none;
    border-radius: 24px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(var(--accent-rgb), 0.35);
  }

  button:hover {
    background: var(--accent-color-hover);
    box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.45);
  }

  button:active {
    transform: scale(0.96);
  }

</style>