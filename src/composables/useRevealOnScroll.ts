import { onMounted, onBeforeUnmount } from 'vue'

interface RevealOptions {
    titleSelector?: string
    slotSelector?: string
    className?: string
    once?: boolean
    rootMargin?: string
}

export function useRevealOnScroll(sectionIds: string[], options: RevealOptions = {}): void {
    const {
        titleSelector = '.section-title',
        slotSelector = '.slot-content',
        className = 'active',
        once = true,
        rootMargin = '0px 0px -35% 0px'
    } = options

    let observer: IntersectionObserver | null = null

    onMounted((): void => {
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const title = entry.target.querySelector(titleSelector)
                    const slotContent = entry.target.querySelector(slotSelector)
                    if (!title || !slotContent) continue

                    if (entry.isIntersecting) {
                        title.classList.add(className)
                        slotContent.classList.add(className)
                        if (once) observer?.unobserve(entry.target)
                    } else if (!once) {
                        title.classList.remove(className)
                        slotContent.classList.remove(className)
                    }
                }
            },
            { rootMargin, threshold: 0 }
        )

        sectionIds.forEach((id: string): void => {
            const el = document.getElementById(id)
            if (el) observer!.observe(el)
        })
    })

    onBeforeUnmount((): void => observer?.disconnect())
}
