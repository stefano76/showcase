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
    import { useRevealOnScroll } from '@/composables/useRevealOnScroll'

    const { lenis } = useSmoothScroll()
    provide('lenis', lenis)

    const sections = ['about', 'work', 'contact']
    useRevealOnScroll(sections)

    const { tm } = useI18n()
    const year = new Date().getFullYear()
</script>

<style scoped>
    @reference '@/style.css';

    html.dark footer .container {
        @apply pt-0;
    }

    html.dark footer .credit {
        @apply border-t border-light pt-8;
    }
</style>

<template>
    <header>
        <div class="container flex items-center justify-between">
            <Logo />
            <NavBar />
        </div>
    </header>

    <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
        <SkillsSection />

        <SectionDots :sections="tm('nav')" />
    </main>

    <footer>
        <div class="container">
            <div class="credit flex items-center justify-center gap-2 text-xs">
                <h6>&copy; {{ year }}</h6>
                <h6 class="flex items-center gap-2">
                    Built with Vue and Vite <span>&bull;</span> Hosted on Netlify <span>&bull;</span> Deployed with
                    GitHub Actions
                </h6>
            </div>
        </div>
    </footer>
</template>
