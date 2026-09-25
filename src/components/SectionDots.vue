<script setup lang="ts">
    // noinspection ES6UnusedImports
    import { motion } from 'motion-v'
    import { useSectionNav } from '@/composables/useSectionNav'

    const props = defineProps<{ sections: Record<string, string> }>()
    const sectionIds = Object.keys(props.sections)
    const { activeId, goTo } = useSectionNav(sectionIds)
</script>

<template>
    <nav
        class="section-dots fixed top-1/2 -translate-y-1/2 left-[calc(50%+40rem)] flex flex-col items-center justify-center gap-6"
        aria-label="Page sections"
    >
        <button
            v-for="id in sectionIds"
            :key="id"
            class="dot-button cursor-pointer"
            :class="activeId === id ? 'active' : ''"
            :aria-label="props.sections[id]"
            v-tooltip="props.sections[id]"
            :aria-current="activeId === id ? 'true' : undefined"
            @click="goTo(id)"
        >
            <motion.span
                class="dot block w-3 h-6 rounded"
                :animate="{
                    scale: activeId === id ? 1.4 : 1,
                    backgroundColor: activeId === id ? 'var(--color-highlight)' : 'var(--color-primary)',
                    opacity: activeId === id ? '1' : '0.5'
                }"
                :transition="{ duration: 0.25, ease: 'easeOut' }"
            />
        </button>
    </nav>
</template>
