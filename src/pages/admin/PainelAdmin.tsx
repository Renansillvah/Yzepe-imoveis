import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Home, Plus, Pencil, Trash2, LogOut, Building2, TrendingUp,
  CheckCircle, Star, AlertTriangle, Search, Eye, MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useImoveis } from '@/contexts/ImoveisContext'
import { toast } from 'sonner'

export default function PainelAdmin() {
  const navigate = useNavigate()
  const { imoveis, loading, deleteImovel } = useImoveis()
  const [busca, setBusca] = useState('')
  const [confirmarDelete, setConfirmarDelete] = useState<string | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') {
      navigate('/admin')
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    navigate('/admin')
  }

  const handleDelete = async (id: string) => {
    if (confirmarDelete === id) {
      try {
        await deleteImovel(id)
        toast.success('Imóvel excluído com sucesso')
      } catch {
        toast.error('Erro ao excluir imóvel')
      }
      setConfirmarDelete(null)
    } else {
      setConfirmarDelete(id)
      setTimeout(() => setConfirmarDelete(null), 3000)
    }
  }

  const filtrados = imoveis.filter((i) =>
    i.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    i.cidade.toLowerCase().includes(busca.toLowerCase())
  )

  const disponiveis = imoveis.filter((i) => i.status === 'Disponível').length
  const destaques = imoveis.filter((i) => i.destaque).length
  const vendidos = imoveis.filter((i) => i.status === 'Vendido').length

  const formatPreco = (preco: number, finalidade: string) => {
    if (finalidade === 'Aluguel') return `R$ ${preco.toLocaleString('pt-BR')}/mês`
    if (preco >= 1000000) return `R$ ${(preco / 1000000).toFixed(2).replace('.', ',')} mi`
    return `R$ ${preco.toLocaleString('pt-BR')}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Admin */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_37oySykXrlZ5YXKyzjL0vXOVtjM/1db82708-e438-45d8-8291-2da28cbd784a.png"
              alt="Yzepe Imóveis"
              className="h-14 w-auto object-contain brightness-0 invert"
            />
            <div className="hidden sm:block">
              <span className="text-xs text-primary-foreground/60 block">Painel</span>
              <span className="text-sm font-semibold">Administrativo</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank">
              <Button size="sm" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 text-xs gap-1.5 font-semibold">
                <Eye size={13} />
                Ver site
              </Button>
            </Link>
            <Button
              size="sm"
              variant="outline"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 text-xs gap-1.5 font-semibold"
              onClick={handleLogout}
            >
              <LogOut size={13} />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">Total</span>
                <Building2 size={16} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">{imoveis.length}</div>
              <p className="text-xs text-muted-foreground mt-0.5">imóveis cadastrados</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">Disponíveis</span>
                <CheckCircle size={16} className="text-green-500" />
              </div>
              <div className="text-2xl font-bold text-foreground">{disponiveis}</div>
              <p className="text-xs text-muted-foreground mt-0.5">para venda/aluguel</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">Destaques</span>
                <Star size={16} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">{destaques}</div>
              <p className="text-xs text-muted-foreground mt-0.5">em evidência</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">Vendidos</span>
                <TrendingUp size={16} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{vendidos}</div>
              <p className="text-xs text-muted-foreground mt-0.5">negócios fechados</p>
            </CardContent>
          </Card>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground">Imóveis Cadastrados</h1>
            <p className="text-sm text-muted-foreground">{filtrados.length} imóvel(is) encontrado(s)</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar imóvel..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
            <Link to="/admin/imovel/novo">
              <Button className="bg-accent text-accent-foreground hover:opacity-80 font-semibold gap-1.5 whitespace-nowrap shadow-sm">
                <Plus size={15} />
                Novo imóvel
              </Button>
            </Link>
          </div>
        </div>

        {/* Lista de imóveis */}
        {loading ? (
          <Card className="border-border">
            <CardContent className="py-16 text-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Carregando imóveis...</p>
            </CardContent>
          </Card>
        ) : filtrados.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-16 text-center">
              <Home size={40} className="text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">Nenhum imóvel encontrado</p>
              <Link to="/admin/imovel/novo" className="mt-4 inline-block">
                <Button className="bg-accent text-accent-foreground mt-3 gap-1.5">
                  <Plus size={14} />
                  Cadastrar primeiro imóvel
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtrados.map((imovel) => (
              <Card key={imovel.id} className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Miniatura */}
                    <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      {imovel.imagens[0] ? (
                        <img
                          src={imovel.imagens[0]}
                          alt={imovel.titulo}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Home size={20} className="text-muted-foreground/40" />
                        </div>
                      )}
                    </div>

                    {/* Informações */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground text-sm leading-snug truncate max-w-xs">
                          {imovel.titulo}
                        </h3>
                        <div className="flex gap-1.5 flex-wrap">
                          <Badge
                            className={`text-xs px-2 py-0 ${
                              imovel.status === 'Disponível'
                                ? 'bg-green-100 text-green-700 border-green-200'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {imovel.status}
                          </Badge>
                          {imovel.destaque && (
                            <Badge className="bg-accent/15 text-accent border-accent/30 text-xs px-2 py-0 gap-0.5">
                              <Star size={9} />
                              Destaque
                            </Badge>
                          )}
                          {imovel.urgencia && (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs px-2 py-0 gap-0.5">
                              <AlertTriangle size={9} />
                              {imovel.urgencia}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{imovel.tipo} · {imovel.cidade} · {imovel.finalidade}</p>
                      <p className="text-sm font-bold text-foreground mt-1">{formatPreco(imovel.preco, imovel.finalidade)}</p>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={`/imovel/${imovel.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-all"
                        title="Ver no site"
                      >
                        <Eye size={14} />
                      </a>
                      <a
                        href={`https://wa.me/5535998309575?text=Confira este imóvel: ${encodeURIComponent(imovel.titulo)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                        title="Compartilhar no WhatsApp"
                      >
                        <MessageCircle size={14} />
                      </a>
                      <Link to={`/admin/imovel/${imovel.id}`}>
                        <Button size="sm" variant="outline" className="h-8 px-3 gap-1.5 text-xs border-border hover:border-accent hover:text-accent">
                          <Pencil size={12} />
                          Editar
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className={`h-8 px-3 gap-1.5 text-xs transition-all ${
                          confirmarDelete === imovel.id
                            ? 'border-red-400 bg-red-50 text-red-600 hover:bg-red-100'
                            : 'border-border hover:border-red-400 hover:text-red-500'
                        }`}
                        onClick={() => handleDelete(imovel.id)}
                      >
                        <Trash2 size={12} />
                        {confirmarDelete === imovel.id ? 'Confirmar' : 'Excluir'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
