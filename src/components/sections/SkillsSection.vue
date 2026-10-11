<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue'
    import { logos } from '@/data/logos'

    const track = ref<HTMLElement | null>(null)
    const duration = 5000 // seconds for one full sequence

    let animation: Animation | undefined

    onMounted(() => {
        const element = track.value
        if (!element) return

        // Two identical sets; shift by one set's width to create the loop.
        animation = element.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], {
            duration: duration * 1000,
            iterations: Infinity,
            easing: 'linear'
        })
    })

    onUnmounted(() => animation?.cancel())
</script>

<template>
    <section class="section-full overflow-hidden" aria-label="Skills">
        <div ref="track" class="flex w-max items-center gap-24 py-10 bg-darker">
            <div
                v-for="logo in logos"
                :key="logo.name"
                class="flex shrink-0 items-center gap-24"
                :aria-label="logo.name"
            >
                <img
                    v-for="logo in logos"
                    :key="`#${logo.name}`"
                    :src="logo.svg"
                    :alt="logo.name"
                    class="h-12 w-auto"
                    :style="{ height: logo.height ? `${logo.height}px` : undefined }"
                    v-tooltip="logo.name"
                />
            </div>
        </div>
    </section>
</template>
