<script setup lang="ts">
    // noinspection ES6UnusedImports
    import { motion, animate } from 'motion-v'
    import { useI18n } from 'vue-i18n'
    import { nextTick } from 'vue'

    const { locale } = useI18n()

    async function toggleLocale(): Promise<void> {
        await animate('.language-fade', { opacity: 0 }, { duration: 0.5, ease: 'easeInOut' }).finished
        locale.value = locale.value === 'en' ? 'it' : 'en'
        await nextTick() // wait for Vue to actually update the DOM with the new text before fading back in
        await animate('.language-fade', { opacity: 1 }, { duration: 0.5, ease: 'easeInOut' }).finished
    }

    const fillVariants = {
        rest: { clipPath: 'inset(100% 0 0 0)' },
        hover: { clipPath: 'inset(0% 0 0 0)' }
    }
</script>

<template>
    <motion.button
        @click="toggleLocale"
        class="language-switch language-fade group border border-primary rounded-sm w-12 h-10 cursor-pointer relative overflow-hidden"
        initial="rest"
        whileHover="hover"
        v-tooltip="$t('tip.languageSwitch')"
    >
        <motion.div
            :transition="{ duration: 0.3, ease: 'easeInOut' }"
            :variants="fillVariants"
            class="absolute inset-0 bg-primary w-full h-full top-0 left-0"
        ></motion.div>
        <div class="transition-colors duration-200 relative z-10 group-hover:text-background font-medium">
            {{ locale === 'en' ? 'IT' : 'EN' }}
        </div>
    </motion.button>
</template>
