import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Router from './router/router.tsx'
import { themeStore, type Theme } from './shared/stores/theme.store.ts'

function Root() {
  const [theme] = useState<Theme>(themeStore.get())

  useEffect(() => {
    const html = document.documentElement
    html.classList.remove('dark', 'light')
    html.classList.add(theme)
  }, [theme])
  return <Router/>
}

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  
  <QueryClientProvider client={queryClient}>
  <StrictMode>
   <Root/>
  </StrictMode>
  </QueryClientProvider>

)
