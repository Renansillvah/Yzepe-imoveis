import { useState } from 'react'
import { Search, Home, Building2, CheckCircle, MessageCircle, MapPin } from 'lucide-react'
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
    <section className="relative bg-primary">
      {/* Fundo */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-16">
        {/* Badges de autoridade */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {[
            { icon: CheckCircle, text: '+80 imóveis disponíveis' },
            { icon: MessageCircle, text: 'Atendimento rápido via WhatsApp' },
            { icon: MapPin, text: 'Especialista na região' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.text}
                className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs text-primary-foreground font-medium"
              >
                <Icon size={13} className="text-accent" />
                {item.text}
              </div>
            )
          })}
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground leading-tight mb-3">
            Especialista em terrenos, chácaras<br className="hidden md:block" /> e imóveis em Toledo MG e região
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg font-light">
            Encontre o imóvel certo com quem conhece cada bairro, rua e oportunidade da região.
          </p>
        </div>

        {/* Caixa de busca avançada */}
        <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
          {/* Toggle Comprar / Alugar */}
          <div className="flex">
            {(['Comprar', 'Alugar'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFinalidade(f)}
                className={`flex-1 py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
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
              <div className="flex flex-wrap gap-2">
                {tiposImovel.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipo(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      tipo === t
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-foreground hover:border-accent'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Cidade e Bairro */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  Bairro (opcional)
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
                  placeholder="Preço mínimo"
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="text"
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value)}
                  placeholder="Preço máximo"
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Diferenciais */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                Diferenciais
              </label>
              <div className="flex flex-wrap gap-2">
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
              className="w-full bg-accent text-accent-foreground hover:opacity-90 font-bold text-base py-5 shadow-lg gap-2"
            >
              <Search size={20} />
              Buscar Imóveis
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
