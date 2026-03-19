async function getAudioDuration (file: File):Promise<number>  {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const result = e.target?.result
            if (typeof result !== 'string') return
            const audio = new Audio()
            audio.src = result
            audio.addEventListener('loadedmetadata', () => {
                console.log(audio.duration)
                resolve(audio.duration)
            })
        }
        reader.onerror = (err) => {
            console.log(err)
            reject(err)
        }
        reader.readAsDataURL(file)
    })
}