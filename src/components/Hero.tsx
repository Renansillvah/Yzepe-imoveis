import { useState } from 'react'
import { Search, Home, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Hero() {
  const [busca, setBusca] = useState('')
  const [tipo, setTipo] = useState<'comprar' | 'alugar'>('comprar')

  const handleBuscar = () => {
    const el = document.getElementById('imoveis')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-primary-foreground">
        <div className="flex items-center justify-center gap-2 mb-4">
          <img
            src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_37oySykXrlZ5YXKyzjL0vXOVtjM/750e9e48-8561-4ea5-92e0-a52b75fca13c.png"
            alt="Yzepe Imóveis"
            className="h-16 w-auto object-contain brightness-0 invert"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 leading-tight">
          Encontre o imóvel dos seus sonhos
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-85 font-light">
          Especialistas em imóveis residenciais e comerciais em São Paulo
        </p>

        {/* Search box */}
        <div className="bg-card rounded-xl p-2 shadow-2xl max-w-2xl mx-auto">
          {/* Toggle */}
          <div className="flex mb-3 gap-1 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setTipo('comprar')}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                tipo === 'comprar'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Home size={15} />
              Comprar
            </button>
            <button
              onClick={() => setTipo('alugar')}
              className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                tipo === 'alugar'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Building2 size={15} />
              Alugar
            </button>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Busque por bairro, cidade ou tipo de imóvel..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="flex-1 border-border text-foreground"
              onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
            />
            <Button
              onClick={handleBuscar}
              className="bg-accent text-accent-foreground hover:opacity-90 font-semibold px-6"
            >
              <Search size={18} className="mr-1" />
              Buscar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-10">
          {[
            { label: 'Imóveis Disponíveis', value: '150+' },
            { label: 'Clientes Satisfeitos', value: '500+' },
            { label: 'Anos de Experiência', value: '10+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-accent">{stat.value}</div>
              <div className="text-xs opacity-80 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
