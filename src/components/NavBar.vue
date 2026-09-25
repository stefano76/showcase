<script setup lang="ts">
    import { useSectionNav } from '@/composables/useSectionNav'
    import { navItems } from '@/composables/navigation'
    import ModeSwitch from '@/components/ColorMode.vue'
    import Social from '@/components/Social.vue'
    // import LanguageSwitch from '@/components/LanguageSwitch.vue'

    const { activeId, goTo } = useSectionNav(navItems.map((item) => item.key))
    const visibleItems = navItems.filter((item) => item.key !== 'intro')
</script>

<style scoped>
    .nav-item a::after {
        content: '';
        position: absolute;
        bottom: -0.25rem;
        left: 0;
        width: 0;
        height: 0.25rem;
        background-color: var(--color-highlight);
        transition: width 0.3s;
    }

    .nav-item:hover a::after {
        width: 100%;
    }

    /*.nav-item a.active::after {
        width: 100%;
    }*/
</style>

<template>
    <nav>
        <ul class="flex items-center gap-x-12 list-none">
            <li v-for="item in visibleItems" :key="item.key" class="nav-item language-fade">
                <a
                    :href="`#${item}`"
                    class="font-medium block hover:scale-110 transition-transform relative"
                    :class="{ active: activeId === item.key }"
                    @click.prevent="goTo(item.key)"
                >
                    {{ $t(`nav.${item.key}`) }}
                </a>
            </li>
            <li><Social type="github" /></li>
            <li><Social type="linkedin" /></li>
            <!-- <li><LanguageSwitch /></li>-->
            <li><ModeSwitch /></li>
        </ul>
    </nav>
</template>
