import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { ImoveisProvider } from '@/contexts/ImoveisContext'

// Site público
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Imoveis from '@/components/Imoveis'
import Sobre from '@/components/Sobre'
import Servicos from '@/components/Servicos'
import Depoimentos from '@/components/Depoimentos'
import Contato from '@/components/Contato'
import Footer from '@/components/Footer'
import WhatsAppFlutuante from '@/components/WhatsAppFlutuante'

// Páginas
import DetalheImovel from '@/pages/DetalheImovel'
import Sitemap from '@/pages/Sitemap'

// Admin
import LoginAdmin from '@/pages/admin/LoginAdmin'
import PainelAdmin from '@/pages/admin/PainelAdmin'
import FormImovel from '@/pages/admin/FormImovel'

function SitePublico() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Imoveis />
      <Sobre />
      <Servicos />
      <Depoimentos />
      <Contato />
      <Footer />
      <WhatsAppFlutuante />
    </div>
  )
}

function App() {
  return (
    <ImoveisProvider>
      <Routes>
        {/* Site público */}
        <Route path="/" element={<SitePublico />} />
        <Route path="/imovel/:id" element={<DetalheImovel />} />
        <Route path="/sitemap.xml" element={<Sitemap />} />

        {/* Admin */}
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/admin/painel" element={<PainelAdmin />} />
        <Route path="/admin/imovel/:id" element={<FormImovel />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </ImoveisProvider>
  )
}

export default App
