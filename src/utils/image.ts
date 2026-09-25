export function imageSrc(path: string, width?: number) : string {
    if (import.meta.env.DEV) {
        return path
    }

    const params = new URLSearchParams({ url: path })
    if (width) params.set('w', String(width))

    return `/.netlify/images?${params.toString()}`
}