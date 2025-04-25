export function getImage(source: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image()
        img.src = source
        img.onload = () => resolve(img)
        img.onerror = (e) => reject(e)
    })
}