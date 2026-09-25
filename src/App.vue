<script setup lang="ts">
    // noinspection ES6UnusedImports
    import { useScroll, useTransform, motion } from 'motion-v'
    import { provide } from 'vue'
    import { useSmoothScroll } from '@/composables/useSmoothScroll'
    import { imageSrc } from '@/utils/image'
    import Logo from '@/components/Logo.vue'
    import NavBar from '@/components/NavBar.vue'
    import SectionDots from '@/components/SectionDots.vue'
    import { useI18n } from 'vue-i18n'

    const { lenis } = useSmoothScroll()
    provide('lenis', lenis)

    const { scrollY } = useScroll()
    const heroY = useTransform(scrollY, [0, 800], [0, 200])

    const { tm } = useI18n()
</script>

<template>
    <main class="p-8 max-w-7xl mx-auto">
        <header class="">
            <div class="container flex items-center justify-between">
                <Logo />
                <NavBar />
            </div>
        </header>
        <section id="intro" class="page-section h-screen flex items-center justify-center relative overflow-hidden">
            <motion.div :style="{ y: heroY }" class="text-center">
                <h1 class="text-6xl font-bold tracking-tight">Stefano Bonuccelli</h1>
                <p class="mt-4 text-2xl text-muted">Full-stack Web Developer</p>
            </motion.div>
        </section>

        <section id="about" class="page-section min-h-screen flex items-center justify-center">
            <h2 class="text-4xl">{{ $t('nav.about') }}</h2>
        </section>

        <section id="work" class="page-section min-h-screen flex items-center justify-center">
            <h2 class="text-4xl">{{ $t('nav.work') }}</h2>
        </section>

        <section id="contact" class="page-section min-h-screen flex items-center justify-center">
            <h2 class="text-4xl">{{ $t('nav.contact') }}</h2>
        </section>

        <SectionDots :sections="tm('nav')" />
    </main>
</template>
