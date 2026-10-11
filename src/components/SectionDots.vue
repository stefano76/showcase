<script setup lang="ts">
    // noinspection ES6UnusedImports
    import { motion } from 'motion-v'
    import { useSectionNav } from '@/composables/useSectionNav'

    const props = defineProps<{ sections: Record<string, string> }>()
    const sectionIds = Object.keys(props.sections)
    const { activeId, goTo } = useSectionNav(sectionIds)
</script>

<template>
    <!-- prettier-ignore -->
    <nav
        class="section-dots fixed top-1/2 -translate-y-1/2 left-[calc(50%+40rem)] flex flex-col items-center justify-center gap-8 z-50
        before:content-attr[''] before:absolute before:w-px before:h-full before:bg-muted/70"
        aria-label="Page sections"
    >
        <button
            v-for="id in sectionIds"
            :key="id"
            class="dot-button cursor-pointer relative z-60"
            :class="activeId === id ? 'active' : ''"
            :aria-label="props.sections[id]"
            v-tooltip="props.sections[id]"
            :aria-current="activeId === id ? 'true' : undefined"
            @click="goTo(id)"
        >
            <motion.span
                class="dot block w-4 h-4 rounded-xs"
                :animate="{
                    scale: activeId === id ? 1.4 : 1,
                    backgroundColor: activeId === id ? 'var(--color-highlight)' : 'var(--color-muted)'
                }"
                :transition="{ duration: 0.25, ease: 'easeOut' }"
            />
        </button>
    </nav>
</template>
