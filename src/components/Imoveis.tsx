import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Maximize, Heart, Phone, CheckCircle, Tag, ArrowRight, MessageCircle, Eye, Star, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useImoveis } from '@/contexts/ImoveisContext'

const tipos = ['Todos', 'Casa', 'Terreno', 'Lote', 'Chácara', 'Sítio']

function formatPreco(preco: number, finalidade: string) {
  if (finalidade === 'Aluguel') {
    return `R$ ${preco.toLocaleString('pt-BR')}/mês`
  }
  if (preco >= 1000000) {
    return `R$ ${(preco / 1000000).toFixed(2).replace('.', ',')} mi`
  }
  return `R$ ${preco.toLocaleString('pt-BR')}`
}

function formatArea(area: number) {
  if (area >= 10000) return `${(area / 10000).toFixed(1)} ha`
  return `${area.toLocaleString('pt-BR')} m²`
}

export default function Imoveis() {
  const { imoveis } = useImoveis()
  const [filtro, setFiltro] = useState('Todos')
  const [finalidade, setFinalidade] = useState<'Todos' | 'Venda' | 'Aluguel'>('Todos')
  const [favoritos, setFavoritos] = useState<string[]>([])

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
  }

  // Apenas imóveis disponíveis, destaques primeiro
  const disponiveis = imoveis.filter((i) => i.status === 'Disponível')
  const ordenados = [
    ...disponiveis.filter((i) => i.destaque),
    ...disponiveis.filter((i) => !i.destaque),
  ]

  const filtered = ordenados.filter((i) => {
    if (filtro !== 'Todos' && i.tipo !== filtro) return false
    if (finalidade !== 'Todos' && i.finalidade !== finalidade) return false
    return true
  })

  return (
    <section id="imoveis" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-accent/15 text-accent font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Imóveis Disponíveis
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Terrenos, chácaras, sítios e casas em Toledo MG e cidades da região.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {(['Todos', 'Venda', 'Aluguel'] as const).map((f) => (
            <Button
              key={f}
              variant={finalidade === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFinalidade(f)}
              className={finalidade === f ? 'bg-primary text-primary-foreground' : 'hover:border-accent hover:text-accent'}
            >
              {f}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tipos.map((t) => (
            <button
              key={t}
              onClick={() => setFiltro(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filtro === t
                  ? 'bg-accent text-accent-foreground border-accent shadow-sm'
                  : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((imovel) => (
            <Card
              key={imovel.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-border hover:-translate-y-1"
            >
              {/* Imagem */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={imovel.imagens[0] || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80'}
                  alt={imovel.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)' }} />

                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                  <Badge className={`text-xs font-bold shadow-sm ${imovel.finalidade === 'Venda' ? 'bg-primary text-primary-foreground' : 'bg-foreground text-background'}`}>
                    {imovel.finalidade}
                  </Badge>
                  {imovel.destaque && (
                    <Badge className="bg-accent text-accent-foreground text-xs font-bold shadow-sm gap-0.5">
                      <Star size={9} />
                      Destaque
                    </Badge>
                  )}
                  {imovel.urgencia && (
                    <Badge className="bg-orange-500 text-white text-xs font-bold shadow-sm gap-0.5">
                      <AlertTriangle size={9} />
                      {imovel.urgencia}
                    </Badge>
                  )}
                </div>

                <button
                  onClick={() => toggleFavorito(imovel.id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md transition-all hover:scale-110"
                >
                  <Heart
                    size={15}
                    className={favoritos.includes(imovel.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
                  />
                </button>

                {/* Tipo badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/95 text-foreground text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Tag size={10} />
                    {imovel.tipo}
                  </span>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1.5 leading-snug text-sm">{imovel.titulo}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
                  <MapPin size={11} />
                  {imovel.bairro && `${imovel.bairro}, `}{imovel.cidade}
                </div>

                {/* Área */}
                {imovel.area > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-y border-border py-2.5 mb-3">
                    <Maximize size={12} />
                    <span className="font-medium">{formatArea(imovel.area)}</span>
                  </div>
                )}

                {/* Diferenciais */}
                {imovel.diferenciais.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {imovel.diferenciais.slice(0, 2).map((d) => (
                      <span
                        key={d}
                        className="flex items-center gap-0.5 text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full"
                      >
                        <CheckCircle size={9} />
                        {d}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-1">
                  <div className="mb-3">
                    <div className="text-xs text-muted-foreground">
                      {imovel.finalidade === 'Aluguel' ? 'Aluguel' : 'Valor'}
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {formatPreco(imovel.preco, imovel.finalidade)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Botão Telefone - discreto */}
                    <a
                      href="tel:+5535998309575"
                      className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:border-accent hover:text-accent transition-all flex-shrink-0"
                      title="Ligar"
                    >
                      <Phone size={15} />
                    </a>
                    {/* Botão WhatsApp - verde */}
                    <a
                      href={`https://wa.me/5535998309575?text=Olá,%20tenho%20interesse%20neste%20imóvel:%20${encodeURIComponent(imovel.titulo)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1ebe5a] transition-all flex-shrink-0 shadow-sm"
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </a>
                    {/* Botão Ver detalhes - principal */}
                    <Link to={`/imovel/${imovel.id}`} className="flex-1">
                      <Button
                        size="sm"
                        className="w-full bg-primary text-primary-foreground hover:opacity-80 text-xs gap-1.5 font-semibold"
                      >
                        <Eye size={12} />
                        Ver detalhes
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <div className="text-4xl mb-3 opacity-30">⌂</div>
            Nenhum imóvel encontrado com os filtros selecionados.
          </div>
        )}

        {/* CTA ver mais */}
        <div className="text-center mt-12">
          <a
            href="https://wa.me/5535998309575?text=Olá,%20vim%20pelo%20site%20e%20quero%20ver%20mais%20imóveis"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="border-border hover:border-accent hover:text-accent font-semibold gap-2">
              Ver todos os imóveis
              <ArrowRight size={16} />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
