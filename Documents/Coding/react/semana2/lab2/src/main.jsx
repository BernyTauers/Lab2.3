import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CustomHook } from './componentes/CustomHook.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomHook/>
  </StrictMode>,
)
