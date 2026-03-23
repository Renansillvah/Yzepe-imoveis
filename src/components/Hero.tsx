import { useState } from 'react'
import { Search, Home, Building2, CheckCircle, MessageCircle, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const tiposImovel = ['Todos', 'Casa', 'Terreno', 'Lote', 'Loteamento', 'Chácara', 'Sítio']

const cidades = [
  'Todas as cidades',
  'Toledo',
  'Três Corações',
  'Nepomuceno',
  'Lavras',
  'Itajubá',
  'Varginha',
  'Pouso Alegre',
]

export default function Hero() {
  const [finalidade, setFinalidade] = useState<'Comprar' | 'Alugar'>('Comprar')
  const [tipo, setTipo] = useState('Todos')
  const [cidade, setCidade] = useState('Todas as cidades')
  const [bairro, setBairro] = useState('')
  const [precoMin, setPrecoMin] = useState('')
  const [precoMax, setPrecoMax] = useState('')
  const [diferenciais, setDiferenciais] = useState<string[]>([])

  const toggleDiferencial = (d: string) => {
    setDiferenciais((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    )
  }

  const handleBuscar = () => {
    const el = document.getElementById('imoveis')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[92vh] flex items-center" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.25,
        }}
      />

      {/* Overlay escuro sutil no topo e base */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.6) 100%)' }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado esquerdo - Texto */}
          <div>
            {/* Badges de autoridade */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { icon: CheckCircle, text: '+80 imóveis disponíveis' },
                { icon: MessageCircle, text: 'Atendimento rápido' },
                { icon: MapPin, text: 'Toledo MG e região' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs text-white font-medium"
                  >
                    <Icon size={12} className="text-accent" />
                    {item.text}
                  </div>
                )
              })}
            </div>

            {/* Título principal */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-5">
              Especialista em<br />
              <span className="text-accent">terrenos, chácaras</span><br />
              e imóveis
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Encontre o imóvel certo com quem conhece cada bairro, rua e oportunidade da região de Toledo MG.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleBuscar}
                className="bg-accent text-accent-foreground hover:opacity-90 font-bold text-sm px-6 py-5 shadow-lg gap-2"
              >
                <Search size={16} />
                Ver Imóveis
                <ArrowRight size={15} />
              </Button>
              <a
                href="https://wa.me/5535998309575?text=Olá,%20vim%20pelo%20site%20e%20quero%20mais%20informações"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 font-semibold text-sm px-6 py-5 gap-2"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Lado direito - Caixa de busca */}
          <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border/50">
            {/* Toggle Comprar / Alugar */}
            <div className="flex">
              {(['Comprar', 'Alugar'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFinalidade(f)}
                  className={`flex-1 py-3.5 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
                    finalidade === f
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {f === 'Comprar' ? <Home size={15} /> : <Building2 size={15} />}
                  {f}
                </button>
              ))}
            </div>

            <div className="p-5 space-y-4">
              {/* Tipo de imóvel */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                  Tipo de imóvel
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {tiposImovel.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTipo(t)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                        tipo === t
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-foreground hover:border-accent hover:text-accent'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cidade e Bairro */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                    Cidade
                  </label>
                  <select
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {cidades.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                    Bairro
                  </label>
                  <input
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    placeholder="Digite o bairro..."
                    className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Faixa de preço */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">
                  Faixa de preço
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={precoMin}
                    onChange={(e) => setPrecoMin(e.target.value)}
                    placeholder="Mínimo"
                    className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="text"
                    value={precoMax}
                    onChange={(e) => setPrecoMax(e.target.value)}
                    placeholder="Máximo"
                    className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Diferenciais */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                  Diferenciais
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['Aceita financiamento', 'Com escritura', 'Aceita parcelamento'].map((d) => (
                    <button
                      key={d}
                      onClick={() => toggleDiferencial(d)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                        diferenciais.includes(d)
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'border-border text-foreground hover:border-accent'
                      }`}
                    >
                      {diferenciais.includes(d) ? '✓ ' : ''}{d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão buscar */}
              <Button
                onClick={handleBuscar}
                className="w-full bg-primary text-primary-foreground hover:opacity-80 font-bold text-sm py-5 shadow-lg gap-2"
              >
                <Search size={18} />
                Buscar Imóveis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
