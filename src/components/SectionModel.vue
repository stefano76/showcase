<script setup lang="ts">
    defineProps<{ title: string }>()
</script>

<style scoped>
    .section-title {
        font-size: 1.25rem;
        font-weight: 500;
        margin: 0 auto 2rem;
        width: fit-content;
        opacity: 0;
        position: relative;
        z-index: 10;
    }

    .section-title.active {
        animation: fx-gentle 2.5s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 1;
    }

    .section-title::after {
        content: '';
        position: absolute;
        bottom: -0.6rem;
        left: 0;
        width: 0;
        height: 0.3rem;
        border-radius: 0.2rem;
        background-color: var(--color-highlight);
        transition: width 2s ease-in-out 2s;
    }

    .section-title.active::after {
        width: 100%;
    }

    @keyframes fx-gentle {
        0% {
            transform: scale(0.35) translateY(-10rem);
            opacity: 0;
            filter: blur(6px);
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
            filter: blur(0);
        }
    }

    .slot-content {
        opacity: 0;
        transform: translateY(-100%);
        transition:
            transform 2s cubic-bezier(0.4, 0, 0.2, 1) 2s,
            opacity 2s ease-in 2s;
    }

    .slot-content.active {
        opacity: 1;
        transform: none;
    }
</style>

<template>
    <section class="page-section min-h-screen flex items-center justify-center pr-32">
        <div class="container">
            <h2 class="section-title">{{ title }}</h2>
            <div class="content text-center relative overflow-hidden">
                <div class="slot-content"><slot /></div>
            </div>
        </div>
    </section>
</template>
