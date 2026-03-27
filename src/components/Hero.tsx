import { useState } from 'react'
import { Search, Home, Building2, CheckCircle, MessageCircle, MapPin, ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useImoveis } from '@/contexts/ImoveisContext'

const tiposImovel = ['Todos', 'Casa', 'Terreno', 'Terreno 20.000 m²', 'Lote', 'Loteamento', 'Chácara', 'Sítio']

const cidades = [
  'Todas as cidades',
  'Toledo MG',
  'Munhoz MG',
  'Itapeva MG',
  'Extrema MG',
  'Cambuí MG',
  'Camanducaia MG',
  'Pouso Alegre MG',
  'Bueno Brandão MG',
  'Bragança Paulista SP',
  'Socorro SP',
  'Pedra Bela SP',
  'Pinhalzinho SP',
  'Consolação MG',
  'Córrego do Bom Jesus MG',
  'Senador Amaral MG',
  'Bom Repouso MG',
]

export default function Hero() {
  const { setFiltrosBusca } = useImoveis()
  const [finalidade, setFinalidade] = useState<'Comprar' | 'Alugar'>('Comprar')
  const [tipo, setTipo] = useState('Todos')
  const [cidade, setCidade] = useState('Todas as cidades')
  const [bairro, setBairro] = useState('')
  const [diferenciais, setDiferenciais] = useState<string[]>([])

  const toggleDiferencial = (d: string) => {
    setDiferenciais((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    )
  }

  const handleBuscar = () => {
    setFiltrosBusca({ finalidade, tipo, cidade, bairro, diferenciais })
    const el = document.getElementById('imoveis')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative flex flex-col justify-between"
      style={{
        minHeight: '96vh',
        backgroundImage: `url('https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_37oySykXrlZ5YXKyzjL0vXOVtjM/ff02bd4f-ed7c-4cd6-98aa-9bc86c099e15.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay escuro uniforme para leitura */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.42)' }}
      />

      {/* CONTEÚDO PRINCIPAL — centralizado verticalmente */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-8">

        {/* Badges de autoridade */}
        <div className="flex flex-wrap justify-center gap-2 mb-7">
          {[
            { icon: CheckCircle, text: '+80 imóveis disponíveis' },
            { icon: MessageCircle, text: 'Atendimento rápido' },
            { icon: MapPin, text: 'Toledo MG e região' },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.text}
                className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/25 rounded-full px-3 py-1.5 text-xs text-white font-medium"
              >
                <Icon size={12} className="text-accent" />
                {item.text}
              </div>
            )
          })}
        </div>

        {/* Título */}
        <h1
          className="font-serif font-bold text-white leading-tight mb-4 drop-shadow-lg"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', maxWidth: '720px' }}
        >
          Terrenos, chácaras e imóveis<br />
          <span className="text-accent">em Toledo MG</span> e região
        </h1>

        {/* Subtítulo */}
        <p
          className="text-white/85 text-base md:text-lg leading-relaxed mb-8 drop-shadow"
          style={{ maxWidth: '480px' }}
        >
          Negócios seguros, atendimento direto e as melhores oportunidades da região.
        </p>

        {/* Botões CTA */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleBuscar}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold text-sm px-7 py-3 rounded-md shadow-lg transition-all"
            style={{ opacity: 1 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Search size={16} />
            Ver Imóveis
            <ArrowRight size={15} />
          </button>
          <a
            href="https://wa.me/5535998309575?text=Olá,%20vim%20pelo%20site%20e%20quero%20mais%20informações"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-sm px-7 py-3 rounded-md shadow-lg hover:bg-[#1ebe5a] transition-all"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>

      {/* FILTRO — ancorado na base da hero */}
      <div className="relative z-10 w-full px-4 pb-6">
        <div
          className="max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.7)',
          }}
        >
          {/* Toggle Comprar / Alugar */}
          <div className="flex border-b border-black/8">
            {(['Comprar', 'Alugar'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFinalidade(f)}
                className={`px-6 py-2.5 text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  finalidade === f
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-black/5'
                }`}
              >
                {f === 'Comprar' ? <Home size={13} /> : <Building2 size={13} />}
                {f}
              </button>
            ))}
          </div>

          {/* Linha de filtros inline */}
          <div className="flex flex-wrap lg:flex-nowrap items-end gap-3 px-4 py-3">

            {/* Tipo de imóvel */}
            <div className="flex-1 min-w-[130px]">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                Tipo
              </label>
              <div className="relative">
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none pr-8"
                >
                  {tiposImovel.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Cidade */}
            <div className="flex-1 min-w-[150px]">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                Cidade
              </label>
              <div className="relative">
                <select
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none pr-8"
                >
                  {cidades.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Bairro */}
            <div className="flex-1 min-w-[130px]">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                Bairro
              </label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Digite o bairro..."
                className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Diferenciais */}
            <div className="flex-1 min-w-[180px]">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                Diferenciais
              </label>
              <div className="flex flex-wrap gap-1">
                {['Financiamento', 'Escritura', 'Parcelamento'].map((d, i) => {
                  const fullLabel = ['Aceita financiamento', 'Com escritura', 'Aceita parcelamento'][i]
                  return (
                    <button
                      key={d}
                      onClick={() => toggleDiferencial(fullLabel)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
                        diferenciais.includes(fullLabel)
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'border-border text-foreground hover:border-accent'
                      }`}
                    >
                      {diferenciais.includes(fullLabel) ? '✓ ' : ''}{d}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Botão buscar */}
            <div className="flex-shrink-0">
              <Button
                onClick={handleBuscar}
                className="bg-primary text-primary-foreground hover:opacity-80 font-bold text-sm px-6 py-2 h-9 gap-2 whitespace-nowrap shadow"
              >
                <Search size={15} />
                Buscar Imóveis
              </Button>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}
