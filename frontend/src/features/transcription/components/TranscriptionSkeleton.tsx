import { useEffect, useState } from 'react'

const awaitPhrases = ['Procesando audio...', 'Extrayendo texto...', 'Dando coherencia a las frases...']

export default function TranscriptionSkeleton() {

    const [phrase, setPhrase] = useState(awaitPhrases[0])
    const [index, setIndex] = useState(0)
    const [fade, setFade] = useState(true)




    useEffect(() => {
        if (index >= awaitPhrases.length) setIndex(0)
        const timeOut = setTimeout(() => {
            setFade(false)
            setTimeout(() => {
                setIndex(prev => prev + 1)
                setPhrase(awaitPhrases[index + 1])
                setFade(true)
            }, 300)
        }, 6000)
        return () => clearTimeout(timeOut)
    }, [index, awaitPhrases.length])



    return (
        <section className='w-full h-full fixed inset-0 flex flex-col items-center justify-center z-30 bg-slate-900/60 backdrop-blur-md p-8'>

            {/* titulo */}
            <div className='flex items-center gap-3 mb-8'>
                <div className='w-3 h-3 bg-blue-500 rounded-full animate-pulse'></div>
                <p className='text-sm font-medium text-slate-200'>Procesando transcripción</p>
            </div>

            {/* skeleton */}
            <div className="space-y-4 w-full max-w-2xl">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex gap-4 items-start">

                        {/* timestamp */}
                        <div className="w-12 h-4 bg-slate-700/80 rounded animate-pulse shrink-0" />

                        {/* linea texto */}
                        <div
                            className="h-4 bg-slate-700/80 rounded animate-pulse"
                            style={{ width: `${Math.random() * 40 + 50}%` }}
                        />

                    </div>
                ))}
            </div>

            {/* frase */}
            <small
                className={`mt-8 text-slate-300 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                {awaitPhrases[index]}
            </small>

        </section>
    )
}
