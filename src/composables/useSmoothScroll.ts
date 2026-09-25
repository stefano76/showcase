import { shallowRef, onMounted, onUnmounted, type ShallowRef } from 'vue'
import Lenis from 'lenis'

export function useSmoothScroll(): { lenis: ShallowRef<Lenis | null> } {
    const lenis = shallowRef<Lenis | null>(null)

    onMounted(() => {
        lenis.value = new Lenis({ duration: 1.2, smoothWheel: true })

        function raf(time: number) {
            lenis.value?.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    })

    onUnmounted((): void => {
        lenis.value?.destroy()
    })

    return { lenis }
}
