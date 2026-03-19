import Form from '@/features/transcription/components/Form'
import Footer from '@/features/transcription/components/Footer'

import Header from '../components/Header'

export default function MainView() {
  
  return (
    <>
    <section className='bg-[#101622] min-h-full flex flex-col justify-between'>
    <Header/>
    <Form/>
    <Footer/>
    </section>
    </>
  )
}
