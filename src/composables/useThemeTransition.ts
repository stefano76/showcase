export function toggleThemeWithTransition(event: MouseEvent, toggleFn: () => void): void {
    // fallback for browsers without View Transitions support (older Safari/Firefox)
    if (!document.startViewTransition) {
        toggleFn()
        return
    }

    const x: number = event.clientX
    const y: number = event.clientY
    const endRadius: number = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition: ViewTransition = document.startViewTransition((): void => {
        toggleFn()
    })

    transition.ready.then((): void => {
        document.documentElement.animate(
            {
                clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
            },
            {
                duration: 500,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)'
            }
        )
    })
}
