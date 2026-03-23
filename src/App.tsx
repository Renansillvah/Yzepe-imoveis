import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Imoveis from '@/components/Imoveis'
import Sobre from '@/components/Sobre'
import Servicos from '@/components/Servicos'
import Depoimentos from '@/components/Depoimentos'
import Contato from '@/components/Contato'
import Footer from '@/components/Footer'
import WhatsAppFlutuante from '@/components/WhatsAppFlutuante'

function App() {
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
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default App
