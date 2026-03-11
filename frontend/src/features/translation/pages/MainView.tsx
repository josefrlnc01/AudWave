import Form from '@/features/translation/components/Form'
import Footer from '@/shared/components/Footer'

import Header from '@/shared/components/Header'

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
