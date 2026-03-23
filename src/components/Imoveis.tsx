import { useState } from 'react'
import { MapPin, Bed, Bath, Car, Maximize, Heart, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const imoveis = [
  {
    id: 1,
    tipo: 'Apartamento',
    status: 'Venda',
    titulo: 'Apartamento Moderno no Jardins',
    bairro: 'Jardins',
    cidade: 'São Paulo',
    preco: 850000,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    area: 120,
    imagem: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    destaque: true,
  },
  {
    id: 2,
    tipo: 'Casa',
    status: 'Venda',
    titulo: 'Casa com Piscina no Alphaville',
    bairro: 'Alphaville',
    cidade: 'Barueri',
    preco: 1450000,
    quartos: 4,
    banheiros: 3,
    vagas: 3,
    area: 280,
    imagem: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    destaque: true,
  },
  {
    id: 3,
    tipo: 'Apartamento',
    status: 'Aluguel',
    titulo: 'Studio Completo na Vila Madalena',
    bairro: 'Vila Madalena',
    cidade: 'São Paulo',
    preco: 3200,
    quartos: 1,
    banheiros: 1,
    vagas: 1,
    area: 45,
    imagem: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    destaque: false,
  },
  {
    id: 4,
    tipo: 'Cobertura',
    status: 'Venda',
    titulo: 'Cobertura Duplex em Moema',
    bairro: 'Moema',
    cidade: 'São Paulo',
    preco: 2100000,
    quartos: 4,
    banheiros: 4,
    vagas: 4,
    area: 350,
    imagem: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    destaque: false,
  },
  {
    id: 5,
    tipo: 'Casa',
    status: 'Aluguel',
    titulo: 'Casa em Condomínio no Morumbi',
    bairro: 'Morumbi',
    cidade: 'São Paulo',
    preco: 8500,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    area: 200,
    imagem: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    destaque: false,
  },
  {
    id: 6,
    tipo: 'Apartamento',
    status: 'Venda',
    titulo: 'Apartamento na Paulista',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    preco: 620000,
    quartos: 2,
    banheiros: 1,
    vagas: 1,
    area: 75,
    imagem: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80',
    destaque: false,
  },
]

function formatPreco(preco: number, status: string) {
  if (status === 'Aluguel') {
    return `R$ ${preco.toLocaleString('pt-BR')}/mês`
  }
  if (preco >= 1000000) {
    return `R$ ${(preco / 1000000).toFixed(2).replace('.', ',')} mi`
  }
  return `R$ ${preco.toLocaleString('pt-BR')}`
}

export default function Imoveis() {
  const [filtro, setFiltro] = useState<'Todos' | 'Venda' | 'Aluguel'>('Todos')
  const [favoritos, setFavoritos] = useState<number[]>([])

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
  }

  const filtered = filtro === 'Todos' ? imoveis : imoveis.filter((i) => i.status === filtro)

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
            Nossos Imóveis
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Encontre o imóvel perfeito para você. Selecionamos as melhores opções do mercado.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center gap-2 mb-8">
          {(['Todos', 'Venda', 'Aluguel'] as const).map((f) => (
            <Button
              key={f}
              variant={filtro === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFiltro(f)}
              className={filtro === f ? 'bg-primary text-primary-foreground' : ''}
            >
              {f}
            </Button>
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
              <div className="relative h-52 overflow-hidden">
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
              </div>

              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">{imovel.tipo}</div>
                <h3 className="font-semibold text-foreground mb-1 leading-snug">{imovel.titulo}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
                  <MapPin size={12} />
                  {imovel.bairro}, {imovel.cidade}
                </div>

                {/* Características */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground border-y border-border py-3 mb-3">
                  <span className="flex items-center gap-1">
                    <Bed size={13} />
                    {imovel.quartos} qts
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={13} />
                    {imovel.banheiros} ban
                  </span>
                  <span className="flex items-center gap-1">
                    <Car size={13} />
                    {imovel.vagas} vaga{imovel.vagas > 1 ? 's' : ''}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize size={13} />
                    {imovel.area}m²
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {imovel.status === 'Aluguel' ? 'Aluguel' : 'Preço'}
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
      </div>
    </section>
  )
}
