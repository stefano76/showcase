import en from '@/locales/en.json'

type NavKey = keyof typeof en.nav

export const navItems: { key: NavKey }[] = (
    Object.keys(en.nav) as NavKey[]
).map((key) => ({ key }))
