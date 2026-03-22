

export default function Footer() {
  return (
    <footer className='w-full px-8 py-4 md:py-8 bg-transparent border-t border-slate-800'>
      {/* Contenedor interno para manejar el layout flex */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo / Nombre - Ocupa un ancho fijo o proporcional para no empujar de más */}
        <div className="flex-1 flex justify-start">
          <h3 className='text-lg text-gray-300'>AudWave</h3>
        </div>
        
        {/* Navegación - Centrada */}
        <nav className='flex flex-col md:flex-row justify-center gap-2 md:gap-10 font-semibold'>
            <a className='text-gray-400/50 cursor-pointer'>Contacto</a>
            <a className='text-gray-400/50 cursor-pointer'>Términos</a>
            <a className='text-gray-400/50 cursor-pointer'>Soporte</a>
        </nav>

        {/* Copyright - Alineado a la derecha en desktop */}
        <div className="flex-1 flex justify-end">
          <small className='text-gray-400/70 text-center md:text-end'> 
            ©2026 AudWave. Transcribe videos y audios con precisión. 
          </small>
        </div>
        
      </div>
    </footer>
  )
}
