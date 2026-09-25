import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useActiveSection(sectionIds: string[]) {
    const activeId = ref(sectionIds[0] ?? '')
    let observer: IntersectionObserver | null = null

    onMounted((): void => {
        const els: HTMLElement[] = sectionIds
            .map((id: string): HTMLElement | null => document.getElementById(id))
            .filter((el: HTMLElement | null): el is HTMLElement => !!el)

        observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting)
                if (visible.length === 0) return
                const closest = visible.reduce((a, b) =>
                    Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
                )
                activeId.value = closest.target.id
            },
            {
                rootMargin: '-45% 0px -45% 0px',
                threshold: 0
            }
        )

        els.forEach((el: HTMLElement): void => observer!.observe(el))
    })

    onBeforeUnmount((): void => observer?.disconnect())

    return { activeId }
}
