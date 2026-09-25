import { inject, type ShallowRef } from 'vue'
import type Lenis from 'lenis'

export function useLenis(): ShallowRef<Lenis | null> {
    const lenis = inject<ShallowRef<Lenis | null>>('lenis')
    if (!lenis) {
        throw new Error('useLenis() called without a Lenis instance being provided')
    }
    return lenis
}
