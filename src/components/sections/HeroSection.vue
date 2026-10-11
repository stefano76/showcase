<script setup lang="ts">
    // noinspection ES6UnusedImports
    import { useScroll, useTransform, motion } from 'motion-v'
    import { useI18n } from 'vue-i18n'
    import Button from '@/components/Button.vue'

    const { tm } = useI18n()
    const { scrollY } = useScroll()
    const heroY = useTransform(scrollY, [0, 800], [0, 200])
</script>

<template>
    <section id="intro" class="page-section h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div :style="{ y: heroY }" class="text-center">
            <h1 class="text-5xl font-bold tracking-tight">
                <!--                <small class="block mb-4 font-normal text-[0.4em] font-primary text-muted">Hi, there! I'm</small>-->
                Stefano Bonuccelli
            </h1>
            <h2 class="mt-4 text-xl text-muted">Full-stack Web Developer</h2>
            <div class="max-w-2xl mt-6 leading-relaxed">
                <p>{{ tm('hero.text').join(' ') }}</p>
                <Button :text="'Let’s get in touch!'" />
            </div>
        </motion.div>
    </section>
</template>
