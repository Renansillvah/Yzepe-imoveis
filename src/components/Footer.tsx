import { Phone, Mail, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react'

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo e descrição */}
          <div className="md:col-span-5">
            <img
              src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_37oySykXrlZ5YXKyzjL0vXOVtjM/d103dfd1-af19-4a79-91b1-fb784db07586.jpeg"
              alt="Yzepe Imóveis"
              className="h-40 w-auto object-contain mb-5"
            />
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs mb-6">
              Especialistas em terrenos, chácaras, sítios e imóveis residenciais em Toledo MG e toda a região sul de Minas Gerais.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-widest text-accent">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { label: 'Imóveis', id: 'imoveis' },
                { label: 'Sobre Nós', id: 'sobre' },
                { label: 'Serviços', id: 'servicos' },
                { label: 'Contato', id: 'contato' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-primary-foreground/60 hover:text-accent transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-3.5 group-hover:ml-0" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="md:col-span-4">
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-widest text-accent">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+5535998309575" className="flex items-start gap-2.5 text-primary-foreground/60 hover:text-accent transition-colors text-sm group">
                  <Phone size={14} className="mt-0.5 flex-shrink-0 text-accent" />
                  <span>(35) 99830-9575</span>
                </a>
              </li>
              <li>
                <a href="mailto:contato@yzepeimoveis.com.br" className="flex items-start gap-2.5 text-primary-foreground/60 hover:text-accent transition-colors text-sm">
                  <Mail size={14} className="mt-0.5 flex-shrink-0 text-accent" />
                  contato@yzepeimoveis.com.br
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-primary-foreground/60 text-sm">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>Toledo - MG<br /><span className="text-xs opacity-70">Atendemos toda a região</span></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/40">
          <span>© 2024 Yzepe Imóveis. Todos os direitos reservados.</span>
          <span>CRECI-MG Ativo • Toledo MG e Região</span>
        </div>
      </div>
    </footer>
  )
}
