import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { i18n } from '@/i18n'
import '@/style.css'
import { vTooltip } from '@/directives/tooltip'

// No real routes needed for a single-page site —
// vite-ssg still wants a routes array, so we give it an empty one.
export const createApp = ViteSSG(App, { routes: [] }, ({ app }) => {
    app.use(i18n)
    app.directive('tooltip', vTooltip)
})
