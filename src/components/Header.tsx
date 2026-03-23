import { useState, useEffect } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="w-full">
      {/* Main nav */}
      <div className={`bg-card sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg border-b border-border' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_37oySykXrlZ5YXKyzjL0vXOVtjM/1db82708-e438-45d8-8291-2da28cbd784a.png"
              alt="Yzepe Imóveis"
              style={{ height: '56px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { label: 'Imóveis', id: 'imoveis' },
              { label: 'Sobre', id: 'sobre' },
              { label: 'Serviços', id: 'servicos' },
              { label: 'Contato', id: 'contato' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-foreground hover:text-accent transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a href="tel:+5535998309575">
              <Button
                size="sm"
                variant="outline"
                className="border-border text-foreground hover:border-accent hover:text-accent font-medium gap-1.5 text-xs"
              >
                <Phone size={13} />
                (35) 99830-9575
              </Button>
            </a>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:opacity-80 font-semibold shadow-sm text-xs px-4"
              onClick={() => scrollTo('contato')}
            >
              Fale Conosco
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-foreground p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 py-5 flex flex-col gap-4">
            <a href="tel:+5535998309575" className="flex items-center gap-2 text-accent font-semibold text-sm">
              <Phone size={15} />
              (35) 99830-9575
            </a>
            {[
              { label: 'Imóveis', id: 'imoveis' },
              { label: 'Sobre', id: 'sobre' },
              { label: 'Serviços', id: 'servicos' },
              { label: 'Contato', id: 'contato' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-foreground text-left py-1.5 font-medium text-sm border-b border-border/50 last:border-0"
              >
                {item.label}
              </button>
            ))}
            <Button
              className="bg-primary text-primary-foreground font-semibold w-full shadow-md mt-1"
              onClick={() => scrollTo('contato')}
            >
              Fale Conosco
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
