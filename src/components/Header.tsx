import { useState } from 'react'
import { Phone, Mail, Menu, X, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={13} />
              (11) 99999-9999
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail size={13} />
              contato@yzepeimoveis.com.br
            </span>
          </div>
          <div className="flex items-center gap-1 text-accent">
            <MapPin size={13} />
            <span>São Paulo, SP</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-card shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_37oySykXrlZ5YXKyzjL0vXOVtjM/750e9e48-8561-4ea5-92e0-a52b75fca13c.png"
              alt="Yzepe Imóveis"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={() => scrollTo('imoveis')} className="text-foreground hover:text-accent transition-colors">
              Imóveis
            </button>
            <button onClick={() => scrollTo('sobre')} className="text-foreground hover:text-accent transition-colors">
              Sobre
            </button>
            <button onClick={() => scrollTo('servicos')} className="text-foreground hover:text-accent transition-colors">
              Serviços
            </button>
            <button onClick={() => scrollTo('contato')} className="text-foreground hover:text-accent transition-colors">
              Contato
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:opacity-90 font-semibold"
              onClick={() => scrollTo('contato')}
            >
              Fale Conosco
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-4">
            <button onClick={() => scrollTo('imoveis')} className="text-foreground text-left py-1 font-medium">Imóveis</button>
            <button onClick={() => scrollTo('sobre')} className="text-foreground text-left py-1 font-medium">Sobre</button>
            <button onClick={() => scrollTo('servicos')} className="text-foreground text-left py-1 font-medium">Serviços</button>
            <button onClick={() => scrollTo('contato')} className="text-foreground text-left py-1 font-medium">Contato</button>
            <Button className="bg-accent text-accent-foreground font-semibold w-full" onClick={() => scrollTo('contato')}>
              Fale Conosco
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
