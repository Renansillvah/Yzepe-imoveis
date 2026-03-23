import { useState } from 'react'
import { MapPin, Maximize, Heart, Phone, CheckCircle, Tag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const imoveis = [
  {
    id: 1,
    tipo: 'Casa',
    status: 'Venda',
    titulo: 'Casa Simples no Centro de Toledo',
    bairro: 'Centro',
    cidade: 'Toledo - MG',
    preco: 180000,
    area: 120,
    diferenciais: ['Aceita financiamento', 'Com escritura'],
    imagem: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    destaque: true,
  },
  {
    id: 2,
    tipo: 'Terreno',
    status: 'Venda',
    titulo: 'Terreno Plano no Bairro Novo',
    bairro: 'Bairro Novo',
    cidade: 'Toledo - MG',
    preco: 45000,
    area: 300,
    diferenciais: ['Aceita parcelamento', 'Com escritura'],
    imagem: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    destaque: false,
  },
  {
    id: 3,
    tipo: 'Chácara',
    status: 'Venda',
    titulo: 'Chácara com Nascente e Casa Sede',
    bairro: 'Zona Rural',
    cidade: 'Toledo - MG',
    preco: 320000,
    area: 20000,
    diferenciais: ['Com escritura', 'Aceita financiamento'],
    imagem: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
    destaque: true,
  },
  {
    id: 4,
    tipo: 'Lote',
    status: 'Venda',
    titulo: 'Lote em Loteamento Residencial',
    bairro: 'Jardim das Flores',
    cidade: 'Nepomuceno - MG',
    preco: 28000,
    area: 200,
    diferenciais: ['Aceita parcelamento'],
    imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    destaque: false,
  },
  {
    id: 5,
    tipo: 'Sítio',
    status: 'Venda',
    titulo: 'Sítio com Casa e Pomar',
    bairro: 'Estrada Velha',
    cidade: 'Toledo - MG',
    preco: 560000,
    area: 50000,
    diferenciais: ['Com escritura', 'Aceita financiamento'],
    imagem: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    destaque: false,
  },
  {
    id: 6,
    tipo: 'Casa',
    status: 'Aluguel',
    titulo: 'Casa para Alugar no Bairro São João',
    bairro: 'São João',
    cidade: 'Toledo - MG',
    preco: 900,
    area: 90,
    diferenciais: [],
    imagem: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&q=80',
    destaque: false,
  },
]

const tipos = ['Todos', 'Casa', 'Terreno', 'Lote', 'Chácara', 'Sítio']

function formatPreco(preco: number, status: string) {
  if (status === 'Aluguel') {
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
  const [filtro, setFiltro] = useState('Todos')
  const [finalidade, setFinalidade] = useState<'Todos' | 'Venda' | 'Aluguel'>('Todos')
  const [favoritos, setFavoritos] = useState<number[]>([])

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
  }

  const filtered = imoveis.filter((i) => {
    if (filtro !== 'Todos' && i.tipo !== filtro) return false
    if (finalidade !== 'Todos' && i.status !== finalidade) return false
    return true
  })

  const scrollContato = () => {
    const el = document.getElementById('contato')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="imoveis" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Portfólio</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Imóveis Disponíveis
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
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
              className={finalidade === f ? 'bg-primary text-primary-foreground' : ''}
            >
              {f}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {tipos.map((t) => (
            <button
              key={t}
              onClick={() => setFiltro(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                filtro === t
                  ? 'bg-accent text-accent-foreground border-accent'
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
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group border-border"
            >
              {/* Imagem */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={imovel.imagem}
                  alt={imovel.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-primary text-primary-foreground text-xs font-semibold">
                    {imovel.status}
                  </Badge>
                  {imovel.destaque && (
                    <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
                      Destaque
                    </Badge>
                  )}
                </div>
                <button
                  onClick={() => toggleFavorito(imovel.id)}
                  className="absolute top-3 right-3 bg-card rounded-full p-1.5 shadow transition-colors"
                >
                  <Heart
                    size={16}
                    className={favoritos.includes(imovel.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
                  />
                </button>
                {/* Tipo badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-card/90 backdrop-blur-sm text-foreground text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Tag size={11} />
                    {imovel.tipo}
                  </span>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1 leading-snug">{imovel.titulo}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
                  <MapPin size={12} />
                  {imovel.bairro}, {imovel.cidade}
                </div>

                {/* Área */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground border-y border-border py-2.5 mb-3">
                  <Maximize size={13} />
                  <span>{formatArea(imovel.area)}</span>
                </div>

                {/* Diferenciais */}
                {imovel.diferenciais.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {imovel.diferenciais.map((d) => (
                      <span
                        key={d}
                        className="flex items-center gap-0.5 text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full"
                      >
                        <CheckCircle size={10} />
                        {d}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {imovel.status === 'Aluguel' ? 'Aluguel' : 'Valor'}
                    </div>
                    <div className="text-lg font-bold text-accent">
                      {formatPreco(imovel.preco, imovel.status)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={scrollContato}
                    className="bg-primary text-primary-foreground hover:opacity-90 text-xs gap-1"
                  >
                    <Phone size={13} />
                    Consultar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum imóvel encontrado com os filtros selecionados.
          </div>
        )}
      </div>
    </section>
  )
}
