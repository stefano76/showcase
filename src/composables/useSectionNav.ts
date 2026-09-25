import { useActiveSection } from '@/composables/useActiveSection'
import { useLenis } from '@/composables/useLenis'

export function useSectionNav(sectionIds: string[]) {
    const { activeId } = useActiveSection(sectionIds)
    const lenis = useLenis()

    function goTo(id: string): void {
        const el = document.getElementById(id)
        if (!el) return
        if (id === 'intro') {
            lenis.value?.scrollTo(0, { duration: 1.2 })
        } else {
            lenis.value?.scrollTo(el, { offset: 0, duration: 1.2 })
        }
    }

    return { activeId, goTo }
}
