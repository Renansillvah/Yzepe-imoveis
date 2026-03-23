import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Maximize, CheckCircle, MessageCircle,
  Phone, ChevronLeft, ChevronRight, Star, AlertTriangle, Tag, Share2,
  Copy, X, Facebook, Twitter, Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useImoveis } from '@/contexts/ImoveisContext'
import { toast } from 'sonner'

function formatPreco(preco: number, finalidade: string) {
  if (finalidade === 'Aluguel') return `R$ ${preco.toLocaleString('pt-BR')}/mês`
  if (preco >= 1000000) return `R$ ${(preco / 1000000).toFixed(2).replace('.', ',')} mi`
  return `R$ ${preco.toLocaleString('pt-BR')}`
}

function formatArea(area: number) {
  if (area >= 10000) return `${(area / 10000).toFixed(1)} ha`
  return `${area.toLocaleString('pt-BR')} m²`
}

export default function DetalheImovel() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getImovel, imoveis } = useImoveis()
  const [imgAtiva, setImgAtiva] = useState(0)

  const imovel = id ? getImovel(id) : undefined

  if (!imovel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Imóvel não encontrado</p>
          <Button onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft size={14} />
            Voltar ao início
          </Button>
        </div>
      </div>
    )
  }

  const imagens = imovel.imagens.length > 0
    ? imovel.imagens
    : ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80']

  const relacionados = imoveis
    .filter((i) => i.id !== imovel.id && i.tipo === imovel.tipo && i.status === 'Disponível')
    .slice(0, 3)

  const [modalCompartilhar, setModalCompartilhar] = useState(false)

  const whatsappMsg = `Olá, tenho interesse neste imóvel: ${imovel.titulo}`
  const whatsappUrl = `https://wa.me/5535998309575?text=${encodeURIComponent(whatsappMsg)}`

  const urlAtual = window.location.href
  const textoCompartilhar = `Confira este imóvel: ${imovel.titulo} - ${urlAtual}`

  const compartilharWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(textoCompartilhar)}`, '_blank')
  }

  const compartilharFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlAtual)}`, '_blank')
  }

  const compartilharTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(textoCompartilhar)}`, '_blank')
  }

  const compartilharTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(urlAtual)}&text=${encodeURIComponent(imovel.titulo)}`, '_blank')
  }

  const copiarLink = () => {
    navigator.clipboard.writeText(urlAtual)
    toast.success('Link copiado!')
    setModalCompartilhar(false)
  }

  const compartilhar = () => {
    if (navigator.share) {
      navigator.share({ title: imovel.titulo, url: urlAtual })
    } else {
      setModalCompartilhar(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Modal de Compartilhamento */}
      {modalCompartilhar && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-4" onClick={() => setModalCompartilhar(false)}>
          <div
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-foreground text-base">Compartilhar imóvel</h3>
              <button onClick={() => setModalCompartilhar(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-5">
              <button
                onClick={compartilharWhatsApp}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-md">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">WhatsApp</span>
              </button>
              <button
                onClick={compartilharFacebook}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center shadow-md">
                  <Facebook size={22} className="text-white" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">Facebook</span>
              </button>
              <button
                onClick={compartilharTwitter}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-md">
                  <Twitter size={22} className="text-white" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">X / Twitter</span>
              </button>
              <button
                onClick={compartilharTelegram}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#229ED9] flex items-center justify-center shadow-md">
                  <Send size={22} className="text-white" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">Telegram</span>
              </button>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-xl">
              <p className="text-xs text-muted-foreground flex-1 truncate">{urlAtual}</p>
              <button
                onClick={copiarLink}
                className="flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 transition-colors flex-shrink-0"
              >
                <Copy size={14} />
                Copiar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header simples */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
          <img
            src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_37oySykXrlZ5YXKyzjL0vXOVtjM/1db82708-e438-45d8-8291-2da28cbd784a.png"
            alt="Yzepe Imóveis"
            className="h-14 w-auto object-contain"
          />
          <button
            onClick={compartilhar}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 size={16} />
            Compartilhar
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galeria */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-video">
                <img
                  src={imagens[imgAtiva]}
                  alt={imovel.titulo}
                  className="w-full h-full object-cover"
                />

                {/* Status badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={`text-xs font-bold shadow-md px-3 py-1 ${
                    imovel.status === 'Disponível' ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {imovel.status}
                  </Badge>
                  {imovel.destaque && (
                    <Badge className="bg-accent text-accent-foreground text-xs font-bold shadow-md px-3 py-1 gap-1">
                      <Star size={10} />
                      Destaque
                    </Badge>
                  )}
                  {imovel.urgencia && (
                    <Badge className="bg-orange-500 text-white text-xs font-bold shadow-md px-3 py-1 gap-1">
                      <AlertTriangle size={10} />
                      {imovel.urgencia}
                    </Badge>
                  )}
                </div>

                {/* Navegação da galeria */}
                {imagens.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgAtiva((prev) => (prev - 1 + imagens.length) % imagens.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setImgAtiva((prev) => (prev + 1) % imagens.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {imagens.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgAtiva(i)}
                          className={`w-2 h-2 rounded-full transition-all ${i === imgAtiva ? 'bg-white w-5' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    {imgAtiva + 1}/{imagens.length}
                  </span>
                </div>
              </div>

              {/* Miniaturas */}
              {imagens.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {imagens.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgAtiva(i)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        i === imgAtiva ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Título e info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-muted text-muted-foreground text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag size={10} />
                  {imovel.tipo}
                </span>
                <span className="text-muted-foreground text-xs">{imovel.finalidade}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                {imovel.titulo}
              </h1>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <MapPin size={14} className="text-accent" />
                {imovel.bairro && `${imovel.bairro}, `}{imovel.cidade}
              </div>
            </div>

            {/* Área */}
            {imovel.area > 0 && (
              <div className="flex items-center gap-2 p-4 bg-muted/40 rounded-xl border border-border">
                <Maximize size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">{formatArea(imovel.area)}</span>
                <span className="text-xs text-muted-foreground">de área</span>
              </div>
            )}

            {/* Descrição */}
            {imovel.descricao && (
              <div className="space-y-2">
                <h2 className="text-base font-bold text-foreground">Descrição</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {imovel.descricao}
                </p>
              </div>
            )}

            {/* Diferenciais */}
            {imovel.diferenciais.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-base font-bold text-foreground">Diferenciais</h2>
                <div className="grid grid-cols-2 gap-2">
                  {imovel.diferenciais.map((d) => (
                    <div key={d} className="flex items-center gap-2 p-3 bg-accent/5 border border-accent/20 rounded-xl">
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      <span className="text-xs font-medium text-foreground">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Imóveis relacionados */}
            {relacionados.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h2 className="text-base font-bold text-foreground">Imóveis similares</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relacionados.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/imovel/${rel.id}`}
                      className="group block rounded-xl overflow-hidden border border-border hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="h-32 bg-muted overflow-hidden">
                        {rel.imagens[0] ? (
                          <img
                            src={rel.imagens[0]}
                            alt={rel.titulo}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <MapPin size={20} className="text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-semibold text-foreground truncate">{rel.titulo}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{rel.cidade}</p>
                        <p className="text-sm font-bold text-foreground mt-1">{formatPreco(rel.preco, rel.finalidade)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — Preço e CTA */}
          <div className="space-y-4">
            <div className="sticky top-24 space-y-4">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                    {imovel.finalidade === 'Aluguel' ? 'Valor do Aluguel' : 'Valor do Imóvel'}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatPreco(imovel.preco, imovel.finalidade)}
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1ebe5a] transition-all shadow-md active:scale-95"
                  >
                    <MessageCircle size={18} />
                    Falar no WhatsApp
                  </a>

                  <a
                    href="tel:+5535998309575"
                    className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl border-2 border-border text-foreground font-semibold text-sm hover:border-accent hover:text-accent transition-all"
                  >
                    <Phone size={16} />
                    (35) 99830-9575
                  </a>
                </div>

                <button
                  onClick={() => setModalCompartilhar(true)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-6 rounded-xl border border-border text-muted-foreground font-medium text-sm hover:border-accent hover:text-accent transition-all mt-1"
                >
                  <Share2 size={15} />
                  Compartilhar este imóvel
                </button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  Atendimento rápido e personalizado
                </p>
              </div>

              {/* Info adicional */}
              <div className="bg-muted/40 border border-border rounded-2xl p-4 space-y-3">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Informações</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Tipo</span>
                    <span className="font-medium text-foreground">{imovel.tipo}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Cidade</span>
                    <span className="font-medium text-foreground">{imovel.cidade}</span>
                  </div>
                  {imovel.bairro && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Bairro</span>
                      <span className="font-medium text-foreground">{imovel.bairro}</span>
                    </div>
                  )}
                  {imovel.area > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Área</span>
                      <span className="font-medium text-foreground">{formatArea(imovel.area)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Finalidade</span>
                    <span className="font-medium text-foreground">{imovel.finalidade}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
