<script setup lang="ts">
    import { provide } from 'vue'
    import { useSmoothScroll } from '@/composables/useSmoothScroll'
    import { useI18n } from 'vue-i18n'
    import Logo from '@/components/Logo.vue'
    import NavBar from '@/components/NavBar.vue'
    import SectionDots from '@/components/SectionDots.vue'
    import HeroSection from '@/components/sections/HeroSection.vue'
    import AboutSection from '@/components/sections/AboutSection.vue'
    import WorkSection from '@/components/sections/WorkSection.vue'
    import ContactSection from '@/components/sections/ContactSection.vue'
    import SkillsSection from '@/components/sections/SkillsSection.vue'
    import { useRevealOnScroll } from '@/composables/useReavealOnScroll'

    const { lenis } = useSmoothScroll()
    provide('lenis', lenis)

    const sections = ['about', 'work', 'contact']
    useRevealOnScroll(sections)

    const { tm } = useI18n()
</script>

<template>
    <main>
        <header>
            <div class="container flex items-center justify-between">
                <Logo />
                <NavBar />
            </div>
        </header>

        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
        <SkillsSection />

        <SectionDots :sections="tm('nav')" />
    </main>
</template>
