<template>

    <div class="avatar-selector">

      <span class="avatar-label">Elige tu avatar:</span>

      <div class="avatar-options">
        <img
          v-for="avatar in avatars"
          :key="avatar"
          :src="avatar"
          class="avatar-option"
          :class="{ selected: selected === avatar }"
          @click="selectAvatar(avatar)"
        />
      </div>

    </div>

</template>

<script setup lang="ts">
  import { ref } from "vue"

  const avatars: string[] = [
    "/avatar/avatarBlue.png",
    "/avatar/avatarOrange.png",
  ]

  const selected = ref<string | null>(localStorage.getItem("avatar"))

  function selectAvatar(avatar: string): void {
    selected.value = avatar
    localStorage.setItem("avatar", avatar)
  }
</script>

<style>

    .avatar-selector {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .avatar-label {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 500;
      white-space: nowrap;
    }

    .avatar-options {
      display: flex;
      gap: 10px;
    }

    .avatar-option {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      border: 2.5px solid #4a5568;
      transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
      object-fit: cover;
    }

    .avatar-option:hover {
      border-color: #646cff;
      transform: scale(1.08);
    }

    .avatar-option.selected {
      border-color: #646cff;
      box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.35);
      transform: scale(1.05);
    }

</style>