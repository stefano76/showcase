<script setup lang="ts">
    import SectionModel from '@/components/SectionModel.vue'
    import { imageSrc } from '@/utils/image'
    import { works } from '@/data/works'
</script>

<style scoped>
    .description ul {
        color: var(--color-darker);
    }

    html.dark .description ul {
        color: var(--color-primary);
    }
</style>

<template>
    <SectionModel id="work" title="My work experiences">
        <div class="works-list text-left flex flex-col gap-4">
            <div
                v-for="work in works"
                class="collapse overflow-hidden rounded-sm bg-linear-to-r from-mist-500 to-mist-400/50 to-20%"
            >
                <input type="checkbox" />
                <div class="collapse-title text-primary flex justify-between items-center p-4">
                    <div class="company-data grid grid-cols-[200px_auto] grid-rows-2 gap-4">
                        <div class="logo row-span-2 flex items-center justify-center border-r border-r-primary/40 pr-4">
                            <img
                                :src="imageSrc(`/img/${work.companyLogo}`)"
                                :alt="work.companyName"
                                height="60"
                                :class="`w-auto ${work.logoHeight ?? ''}`"
                            />
                        </div>
                        <div class="name font-bold">{{ work.companyName }}</div>
                        <div class="location">{{ work.companyLocation }}</div>
                    </div>
                    <div class="my-data flex flex-col gap-2 text-right items-end">
                        <div class="role font-bold text-lg">{{ work.role }}</div>
                        <div class="dates">{{ work.dates }}</div>
                    </div>
                    <a href="#" class="absolute left-1/2 bottom-2.5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-chevron-down w-6 h-6"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                            />
                        </svg>
                    </a>
                </div>
                <div class="collapse-content">
                    <div class="description border-t border-t-primary/40">
                        <ul class="p-4 mt-4">
                            <li v-for="paragraph in work.description" class="text-center">
                                {{ paragraph }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </SectionModel>
</template>
