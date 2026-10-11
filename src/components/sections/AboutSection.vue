<script setup lang="ts">
    import SectionModel from '@/components/SectionModel.vue'
    import { imageSrc } from '@/utils/image'
    import { ref } from 'vue'
    import AboutLightSwitch from '@/components/AboutLightSwitch.vue'

    const lightsOn = ref(false)
</script>

<style scoped>
    .image.active .image-color {
        opacity: 1;
    }
    .image.active .image-bn {
        opacity: 0;
    }
</style>

<template>
    <SectionModel id="about" title="Something about me">
        <div class="flex justify-between items-center bg-darker">
            <div class="image w-1/3 relative self-end" :class="{ active: lightsOn }">
                <img
                    :src="imageSrc('/img/stefano-color.png', 512)"
                    alt="Hero"
                    width="512"
                    height="512"
                    loading="lazy"
                    class="image-color opacity-0 transition-opacity duration-1000 mix-blend-screen"
                />
                <img
                    :src="imageSrc('/img/stefano-bn.png', 512)"
                    alt="Hero"
                    width="512"
                    height="512"
                    loading="lazy"
                    class="image-bn absolute top-0 left-0 w-full h-full transition-opacity duration-1000 mix-blend-color-dodge"
                />
                <AboutLightSwitch v-model="lightsOn" />
            </div>
            <div class="texts w-2/3 py-8 pr-16 text-light text-left font-thin leading-loose flex flex-col gap-y-4">
                <p class="first-letter:text-5xl first-letter:font-bold first-letter:tracking-widest">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut nulla nec libero imperdiet
                    tincidunt. Pellentesque suscipit gravida felis, eget vulputate ligula ultrices nec. Pellentesque at
                    euismod mi.
                </p>
                <p>
                    Vivamus imperdiet et eros sed ultrices. Phasellus suscipit aliquam consequat. Aliquam erat volutpat.
                    Nulla scelerisque lacus in placerat egestas. Nunc fermentum ante at neque ultricies pulvinar.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </p>
                <p>
                    Suspendisse eget elit tortor. Nulla nec sem sagittis, cursus est quis, sagittis magna. Nullam sit
                    amet elementum libero. Fusce venenatis augue in aliquet elementum. Cras sollicitudin accumsan
                    finibus. Donec fringilla arcu augue. Duis maximus viverra gravida.
                </p>
            </div>
        </div>
    </SectionModel>
</template>
