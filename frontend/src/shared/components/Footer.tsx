import React from 'react'

export default function Footer() {
  return (
    <footer className='w-screen min-w-screen pl-4 pr-4 pt-8 pb-8 bg-transparent flex justify-between gap-4 border-t border-slate-800'>
        <h3 className='text-lg text-gray-300'>Transcriber AI</h3>
        <nav  className='flex justify-between gap-10 font-semibold'>
            <a className='text-gray-400'>Contacto</a>
            <a className='text-gray-400'>Términos</a>
            <a className='text-gray-400'>Soporte</a>
        </nav>
        <small className='text-gray-400'> ©2026  Transcriber AI. Transcribe videos y audios. </small>
    </footer>
  )
}
