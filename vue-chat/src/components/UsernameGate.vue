<template>
  <main class="username-gate">
    <section class="username-card">
      <p class="username-eyebrow">Realtime Chat</p>
      <h1 class="username-title">Elige tu nombre para entrar</h1>
      <p class="username-subtitle">
        Con este nombre se mostraran tus mensajes en el chat compartido.
      </p>

      <form class="username-form" @submit.prevent="submit">
        <label for="username">Nombre de usuario</label>
        <input
          id="username"
          v-model="username"
          placeholder="Ej: User123"
          maxlength="24"
          autofocus
        />
        <button type="submit" :disabled="!username.trim()">Entrar al chat</button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  ready: [string];
}>();

const username = ref(localStorage.getItem("user") || "");

function submit(): void {
  const normalized = username.value.trim();
  if (!normalized) return;

  localStorage.setItem("user", normalized);

  if (!localStorage.getItem("avatar")) {
    localStorage.setItem("avatar", "/avatar/avatarBlue.png");
  }

  emit("ready", normalized);
}
</script>

<style scoped>
.username-gate {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at 16% 14%, rgba(8, 214, 183, 0.27), transparent 44%),
    radial-gradient(circle at 82% 82%, rgba(14, 165, 233, 0.2), transparent 45%),
    linear-gradient(165deg, #08101e 0%, #102236 52%, #0d1d32 100%);
}

.username-card {
  width: min(460px, 100%);
  padding: 28px;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(7, 22, 32, 0.78);
  box-shadow: 0 20px 55px rgba(2, 6, 23, 0.5);
  backdrop-filter: blur(8px);
}

.username-eyebrow {
  margin: 0 0 8px;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #5eead4;
}

.username-title {
  margin: 0;
  font-size: clamp(1.45rem, 1.8vw + 1rem, 2rem);
  line-height: 1.2;
  color: #f8fafc;
}

.username-subtitle {
  margin: 10px 0 0;
  color: #cbd5e1;
  font-size: 0.94rem;
}

.username-form {
  margin-top: 22px;
  display: grid;
  gap: 12px;
}

.username-form label {
  font-size: 0.82rem;
  color: #ccfbf1;
}

.username-form input {
  border: 1px solid rgba(148, 163, 184, 0.45);
  border-radius: 12px;
  padding: 11px 14px;
  font-size: 0.98rem;
  color: #f8fafc;
  background: rgba(15, 23, 42, 0.72);
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.username-form input::placeholder {
  color: #94a3b8;
}

.username-form input:focus {
  border-color: #5eead4;
  box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.2);
}

.username-form button {
  margin-top: 6px;
  border: none;
  border-radius: 12px;
  padding: 11px 16px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #f8fafc;
  background: linear-gradient(130deg, #0f766e 0%, #0284c7 100%);
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
}

.username-form button:hover:not(:disabled) {
  transform: translateY(-1px);
  filter: brightness(1.08);
}

.username-form button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
</style>
