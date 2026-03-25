import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { generateIaSummary, getSaved } from '../api/savedsApi'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router'
import Header from '../components/Header'
import { formatTime } from '@/shared/utils/minutes'
import Footer from '../components/Footer'
import { generatePDF, generateSRT } from '@/features/document/api/documentApi'
import { DropdownMenuBasic } from '@/components/DropdownMenuBasic'
import EditFileDialog from '../components/EditFileDialog'
import { motion } from 'motion/react'
import Summary from '../components/SummarySection'
import SummarySection from '../components/SummarySection'
import { isAxiosError } from 'axios'
import { tokenStore } from '@/lib/token.store'
import { useSummary } from '../hooks/useSummary'
import { container, item } from '../stores/motion'



export default function SavedsView() {
    const [isOpen, setIsOpen] = useState(false)
    const [isReadySummary, setIsReadySummary] = useState(false)
    const { summary, isLoading, id, handleGenerateIaSummary } = useSummary()
    const navigate = useNavigate()
    const { data, error } = useQuery({
        queryKey: ['saveds', id],
        queryFn: () => getSaved(id!),
        enabled: !!id
    })




    const generatePdf = useMutation({
        mutationFn: generatePDF,
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const generateSrt = useMutation({
        mutationFn: generateSRT,
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleGenerateTranscriptionPdf = (text: string) => {
        generatePdf.mutate(text)
    }

    const handleGenerateTranscriptionSrt = (segments: { start: number, end: number, text: string }[]) => {
        generateSrt.mutate(segments)
    }




    if (error) {
        return (
            <aside className="p-4 text-red-400 md:text-center">
                {error.message}
            </aside>
        )
    }

    if (data) {
        const formattedFileText = data[0].segments.map((s: { start: number, end: number, text: string }) => {
            return `[${s.start}:${s.end}] ${s.text}`
        }).join('\n')
        return (
            <>
                {isOpen && <EditFileDialog isOpen={isOpen} setIsOpen={setIsOpen} id={id!} title={data[0].title} />}
                <Header />
                <section className='w-full min-h-screen flex flex-col items-center justify-center py-12 md:py-20'>
                    <aside className='w-full md:w-3/4 lg:w-2/4 flex flex-col bg-slate-900/60 rounded-xl border border-slate-800/50 backdrop-blur shadow-xl overflow-hidden'>

                        {/* Header */}
                        <header className='flex justify-between items-center w-full px-5 py-3.5 bg-slate-800/60 border-b border-slate-700/50'>
                            <h2 className='text-sm font-semibold text-gray-100 truncate max-w-xs'>
                                {data[0].title}
                                <span className="text-xs font-normal text-slate-500 ml-2">(Original)</span>
                            </h2>
                            <div className='flex items-center justify-center gap-2'>
                                <button
                                    onClick={() => handleGenerateTranscriptionPdf(formattedFileText)}
                                    className='flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition-colors border border-slate-600/50 cursor-pointer'
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2zM13 3v6h6" />
                                    </svg>
                                    PDF
                                </button>
                                <button
                                    onClick={() => handleGenerateTranscriptionSrt(data[0].segments)}
                                    className='flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium rounded-lg transition-colors border border-slate-600/50 cursor-pointer'
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    SRT
                                </button>
                                
                                    <DropdownMenuBasic id={data[0].fileId} setIsOpen={setIsOpen} />

                                <button onClick={() => navigate('/')} className='p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </header>

                        {/* Body - dos columnas */}
                        <div className='flex flex-col lg:flex-row flex-1 min-h-0'>

                            {/* columna izquierda - transcripción */}
                            <div className='flex flex-col flex-1 border-r border-slate-700/50'>
                                <div className='px-5 py-3 border-b border-slate-700/30'>
                                    <h3 className='text-xs font-semibold text-slate-400 uppercase tracking-widest'>Transcripción</h3>
                                </div>
                                <motion.div
                                    className='flex-1 overflow-y-auto p-5 space-y-1 max-h-96'
                                    variants={container}
                                    initial='hidden'
                                    animate='show'
                                >
                                    {data[0].segments.map((s: { start: number, end: number, text: string }) => (
                                        <motion.p
                                            key={s.start}
                                            variants={item}
                                            whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
                                            transition={{ duration: 0.15 }}
                                            className='text-sm text-gray-200 leading-relaxed rounded-md px-2 py-1'
                                        >
                                            <span className='text-[#0d59f2] text-xs mr-2 font-mono'>[{s.start.toFixed(2)}:{s.end.toFixed(2)}]</span>
                                            {s.text}
                                        </motion.p>
                                    ))}
                                </motion.div>
                            </div>

                            <SummarySection summary={summary} isLoading={isLoading} handleGenerateIaSummary={handleGenerateIaSummary} />
                        </div>
                    </aside>
                </section>
                <Footer />
            </>
        )
    }

}
