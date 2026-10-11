<script setup lang="ts">
    defineProps({
        text: String
    })
</script>

<template>
    <!-- prettier-ignore -->
    <button
        class="px-6 py-2 bg-primary text-background mt-8 cursor-pointer rounded-md transition duration-500 ease-in-out
        hover:bg-highlight hover:text-light hover:scale-110 hover:translate-y-1"
    >
        {{ text }}
    </button>
</template>
