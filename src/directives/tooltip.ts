// directives/tooltip.ts
import type { Directive } from 'vue'
import { createApp, h } from 'vue'
import { defineComponent } from 'vue'
import { motion } from 'motion-v'

interface TooltipOptionsProps {
    forDots: boolean
    x: number
    y: number
}

const tooltipOptions = (props: TooltipOptionsProps) => {
    if (props.forDots) {
        return {
            wrapperStyle: {
                position: 'fixed' as const,
                right: `${props.x}px`,
                top: `${props.y}px`,
                transform: 'translateY(-50%)'
            },
            motionProps: {
                initial: { opacity: 0, x: 10, scale: 0.9 },
                animate: { opacity: 1, x: 0, scale: 1 },
                exit: { opacity: 0, x: 10, scale: 0.9 },
                transition: { duration: 0.6 },
                class: ['block whitespace-nowrap z-50 pointer-events-none text-sm font-medium text-primary']
            }
        }
    } else {
        return {
            wrapperStyle: {
                position: 'fixed' as const,
                left: `${props.x}px`,
                top: `${props.y}px`
                // transform: 'translateX(-50%)'
            },
            motionProps: {
                initial: { opacity: 0, y: 6, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 6, scale: 0.95 },
                transition: { duration: 0.6, delay: 0.3 },
                class: [
                    'block whitespace-nowrap z-50 pointer-events-none bg-primary border border-background text-background rounded text-xs px-2 py-1'
                ]
            }
        }
    }
}

const TooltipSpan = defineComponent({
    props: {
        text: { type: String, required: true },
        forDots: { type: Boolean, default: false },
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    setup(props) {
        return () => {
            const opts = tooltipOptions(props)
            return h(
                'div',
                { style: opts.wrapperStyle },
                h(motion.span, opts.motionProps, () => props.text)
            )
        }
    }
})

interface TooltipState {
    text: string
}

export const vTooltip: Directive<HTMLElement & { _tooltipState?: TooltipState }, string> = {
    mounted(el, binding) {
        const state: TooltipState = { text: binding.value }
        el._tooltipState = state

        let mountEl: HTMLDivElement | null = null
        let app: ReturnType<typeof createApp> | null = null

        const elClasses = [...el.classList]
        const forDots = elClasses.includes('dot-button')

        el.addEventListener('mouseenter', () => {
            const rect = el.getBoundingClientRect()
            const x = forDots ? document.documentElement.clientWidth - rect.left + 20 : rect.left
            const y = forDots ? rect.top + rect.height / 2 : rect.top + rect.height * 1.75

            mountEl = document.createElement('div')
            document.body.appendChild(mountEl)
            app = createApp(TooltipSpan, {
                text: state.text,
                forDots,
                x,
                y
            })
            app.mount(mountEl)
        })

        el.addEventListener('mouseleave', () => {
            app?.unmount()
            mountEl?.remove()
            app = null
            mountEl = null
        })
    },
    updated(el, binding) {
        if (el._tooltipState) {
            el._tooltipState.text = binding.value
        }
    },
    unmounted() {}
}
