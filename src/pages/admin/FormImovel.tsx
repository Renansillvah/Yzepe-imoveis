import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, Save, Plus, X, ImagePlus, Star, AlertTriangle,
  Home, Upload, Link as LinkIcon, Loader2, Crown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useImoveis, type Imovel } from '@/contexts/ImoveisContext'
import { toast } from 'sonner'
import { supabaseAdmin } from '@/lib/supabase'

const TIPOS = ['Casa', 'Terreno', 'Lote', 'Loteamento', 'Chácara', 'Sítio'] as const

const CIDADES = [
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
const URGENCIAS = ['', 'Oportunidade', 'Abaixo do preço', 'Última unidade', 'Urgente']

type TipoImovel = typeof TIPOS[number]

type FormData = {
  titulo: string
  preco: string
  tipo: TipoImovel
  cidade: string
  bairro: string
  area: string
  descricao: string
  imagens: string[]
  status: Imovel['status']
  finalidade: Imovel['finalidade']
  destaque: boolean
  urgencia: string
  diferenciais: string[]
}

const formVazio: FormData = {
  titulo: '',
  preco: '',
  tipo: 'Casa' as TipoImovel,
  cidade: '',
  bairro: '',
  area: '',
  descricao: '',
  imagens: [],
  status: 'Disponível',
  finalidade: 'Venda',
  destaque: false,
  urgencia: '',
  diferenciais: [],
}

export default function FormImovel() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { addImovel, updateImovel, getImovel } = useImoveis()
  const isEdicao = id !== 'novo'

  const [form, setForm] = useState<FormData>(formVazio)
  const [novaImagem, setNovaImagem] = useState('')
  const [novoDiferencial, setNovoDiferencial] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [uploadando, setUploadando] = useState(false)
  const [carregado, setCarregado] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { imoveis, loading } = useImoveis()

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') {
      navigate('/admin')
      return
    }
  }, [navigate])

  useEffect(() => {
    if (!isEdicao || !id || loading || carregado) return
    const imovel = getImovel(id)
    if (imovel) {
      setForm({
        titulo: imovel.titulo,
        preco: imovel.preco.toString(),
        tipo: imovel.tipo,
        cidade: imovel.cidade,
        bairro: imovel.bairro,
        area: imovel.area.toString(),
        descricao: imovel.descricao,
        imagens: imovel.imagens,
        status: imovel.status,
        finalidade: imovel.finalidade,
        destaque: imovel.destaque,
        urgencia: imovel.urgencia,
        diferenciais: imovel.diferenciais,
      })
      setCarregado(true)
    } else if (!loading && imoveis.length > 0) {
      toast.error('Imóvel não encontrado')
      navigate('/admin/painel')
    }
  }, [id, isEdicao, getImovel, navigate, loading, imoveis, carregado])

  const set = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const adicionarImagem = () => {
    const url = novaImagem.trim()
    if (!url) return
    if (form.imagens.length >= 30) {
      toast.error('Máximo de 30 imagens por imóvel')
      return
    }
    set('imagens', [...form.imagens, url])
    setNovaImagem('')
  }

  const removerImagem = (index: number) => {
    set('imagens', form.imagens.filter((_, i) => i !== index))
  }

  const definirPrincipal = (index: number) => {
    if (index === 0) return
    const novas = [...form.imagens]
    const [principal] = novas.splice(index, 1)
    novas.unshift(principal)
    set('imagens', novas)
    toast.success('Imagem definida como principal!')
  }

  const handleUploadArquivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    if (!supabaseAdmin) {
      toast.error('Erro de configuração. Contate o suporte.')
      return
    }

    const arquivos = Array.from(files)
    const limite = 30 - form.imagens.length
    if (arquivos.length > limite) {
      toast.error(`Você pode adicionar no máximo ${limite} imagem(ns) mais`)
      return
    }

    setUploadando(true)
    const novasUrls: string[] = []

    for (const arquivo of arquivos) {
      if (!arquivo.type.startsWith('image/')) {
        toast.error(`${arquivo.name} não é uma imagem válida`)
        continue
      }
      if (arquivo.size > 10 * 1024 * 1024) {
        toast.error(`${arquivo.name} excede 10MB`)
        continue
      }

      const ext = arquivo.name.split('.').pop()
      const nome = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { data, error } = await supabaseAdmin.storage
        .from('imoveis-imagens')
        .upload(nome, arquivo, { upsert: false })

      if (error) {
        toast.error(`Erro ao enviar ${arquivo.name}`)
        continue
      }

      const { data: urlData } = supabaseAdmin.storage
        .from('imoveis-imagens')
        .getPublicUrl(data.path)

      novasUrls.push(urlData.publicUrl)
    }

    if (novasUrls.length > 0) {
      set('imagens', [...form.imagens, ...novasUrls])
      toast.success(`${novasUrls.length} imagem(ns) adicionada(s) com sucesso!`)
    }

    setUploadando(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const adicionarDiferencial = () => {
    const d = novoDiferencial.trim()
    if (!d) return
    if (form.diferenciais.includes(d)) return
    set('diferenciais', [...form.diferenciais, d])
    setNovoDiferencial('')
  }

  const removerDiferencial = (d: string) => {
    set('diferenciais', form.diferenciais.filter((x) => x !== d))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.titulo || !form.preco || !form.cidade) {
      toast.error('Preencha os campos obrigatórios')
      return
    }
    setSalvando(true)
    // Remove pontos de milhar e troca vírgula decimal por ponto
    const precoLimpo = form.preco.replace(/\./g, '').replace(',', '.')
    const areaLimpa = form.area.replace(/\./g, '').replace(',', '.')
    const dados = {
      titulo: form.titulo,
      preco: parseFloat(precoLimpo) || 0,
      tipo: form.tipo,
      cidade: form.cidade,
      bairro: form.bairro,
      area: parseFloat(areaLimpa) || 0,
      descricao: form.descricao,
      imagens: form.imagens,
      status: form.status,
      finalidade: form.finalidade,
      destaque: form.destaque,
      urgencia: form.urgencia,
      diferenciais: form.diferenciais,
    }
    try {
      if (isEdicao && id) {
        await updateImovel(id, dados)
        toast.success('Imóvel atualizado com sucesso!')
      } else {
        await addImovel(dados)
        toast.success('Imóvel cadastrado com sucesso!')
      }
      navigate('/admin/painel')
    } catch (err) {
      toast.error('Erro ao salvar imóvel. Tente novamente.')
      console.error(err)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/painel">
              <Button size="sm" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 gap-1.5 text-xs font-semibold">
                <ArrowLeft size={13} />
                Voltar
              </Button>
            </Link>
            <span className="font-semibold text-sm">{isEdicao ? 'Editar Imóvel' : 'Novo Imóvel'}</span>
          </div>
          <Button
            type="submit"
            form="form-imovel"
            className="bg-accent text-accent-foreground hover:opacity-80 font-semibold gap-1.5 text-sm shadow-sm"
            disabled={salvando}
          >
            <Save size={14} />
            {salvando ? 'Salvando...' : 'Salvar imóvel'}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <form id="form-imovel" onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Principais */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Home size={16} className="text-accent" />
                Informações do Imóvel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="titulo" className="text-sm font-medium">
                  Título do imóvel <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="titulo"
                  value={form.titulo}
                  onChange={(e) => set('titulo', e.target.value)}
                  placeholder="Ex: Casa com 3 quartos no Centro"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="preco" className="text-sm font-medium">
                    Preço (R$) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="preco"
                    value={form.preco}
                    onChange={(e) => set('preco', e.target.value.replace(/[^0-9.,]/g, ''))}
                    placeholder="Ex: 180000"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="area" className="text-sm font-medium">Área (m²)</Label>
                  <Input
                    id="area"
                    value={form.area}
                    onChange={(e) => set('area', e.target.value.replace(/[^0-9.]/g, ''))}
                    placeholder="Ex: 120"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Tipo</Label>
                  <select
                    value={form.tipo}
                    onChange={(e) => set('tipo', e.target.value as Imovel['tipo'])}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Finalidade</Label>
                  <select
                    value={form.finalidade}
                    onChange={(e) => set('finalidade', e.target.value as Imovel['finalidade'])}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Venda">Venda</option>
                    <option value="Aluguel">Aluguel</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Status</Label>
                  <select
                    value={form.status}
                    onChange={(e) => set('status', e.target.value as Imovel['status'])}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Disponível">Disponível</option>
                    <option value="Vendido">Vendido</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cidade" className="text-sm font-medium">
                    Cidade <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="cidade"
                    value={form.cidade}
                    onChange={(e) => set('cidade', e.target.value)}
                    required
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Selecione a cidade</option>
                    {CIDADES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bairro" className="text-sm font-medium">Bairro / Localidade</Label>
                  <Input
                    id="bairro"
                    value={form.bairro}
                    onChange={(e) => set('bairro', e.target.value)}
                    placeholder="Ex: Centro, Zona Rural"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="descricao" className="text-sm font-medium">Descrição completa</Label>
                <textarea
                  id="descricao"
                  value={form.descricao}
                  onChange={(e) => set('descricao', e.target.value)}
                  placeholder="Descreva o imóvel detalhadamente: características, localização, diferenciais..."
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* Destaque e Urgência */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Star size={16} className="text-accent" />
                Destaque e Urgência
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                <input
                  type="checkbox"
                  id="destaque"
                  checked={form.destaque}
                  onChange={(e) => set('destaque', e.target.checked)}
                  className="w-4 h-4 rounded accent-current cursor-pointer"
                />
                <div>
                  <Label htmlFor="destaque" className="text-sm font-medium cursor-pointer flex items-center gap-1.5">
                    <Star size={13} className="text-accent" />
                    Marcar como destaque
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">Aparece em evidência no site</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <AlertTriangle size={13} className="text-orange-500" />
                  Tag de urgência
                </Label>
                <select
                  value={form.urgencia}
                  onChange={(e) => set('urgencia', e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {URGENCIAS.map((u) => <option key={u} value={u}>{u || 'Nenhuma'}</option>)}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Imagens */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ImagePlus size={16} className="text-accent" />
                Imagens ({form.imagens.length}/30)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload do computador */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleUploadArquivo}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadando || form.imagens.length >= 30}
                  className="w-full flex flex-col items-center justify-center gap-2 p-6 rounded-lg border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadando ? (
                    <>
                      <Loader2 size={28} className="text-accent animate-spin" />
                      <span className="text-sm font-medium text-foreground">Enviando imagens...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={28} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Clique para selecionar fotos do computador</span>
                      <span className="text-xs text-muted-foreground">JPG, PNG, WEBP até 10MB por foto • Várias fotos de uma vez</span>
                    </>
                  )}
                </button>
              </div>

              {/* Ou por URL */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground px-2">ou cole um link</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={novaImagem}
                    onChange={(e) => setNovaImagem(e.target.value)}
                    placeholder="Cole a URL da imagem (https://...)"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarImagem())}
                    className="pl-9"
                  />
                </div>
                <Button
                  type="button"
                  onClick={adicionarImagem}
                  variant="outline"
                  className="gap-1.5 border-border hover:border-accent hover:text-accent"
                >
                  <Plus size={14} />
                  Adicionar
                </Button>
              </div>

              {form.imagens.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Clique em <Crown size={11} className="inline" /> para definir como capa principal</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {form.imagens.map((img, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden bg-muted aspect-video">
                        <img src={img} alt={`Imagem ${index + 1}`} className="w-full h-full object-cover" />
                        {index === 0 && (
                          <span className="absolute top-1 left-1 bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                            <Crown size={10} />
                            Principal
                          </span>
                        )}
                        {index !== 0 && (
                          <button
                            type="button"
                            onClick={() => definirPrincipal(index)}
                            title="Definir como principal"
                            className="absolute top-1 left-1 bg-black/60 text-white rounded px-1.5 py-0.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent flex items-center gap-1"
                          >
                            <Crown size={10} />
                            Principal
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removerImagem(index)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Diferenciais */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Diferenciais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {['Aceita financiamento', 'Aceita parcelamento', 'Com escritura', 'FGTS aceito', 'Nascente d\'água', 'Energia elétrica', 'Porteira fechada', 'Piscina', 'Tanque de peixe', 'Rio/Riacho'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() =>
                      form.diferenciais.includes(d)
                        ? removerDiferencial(d)
                        : set('diferenciais', [...form.diferenciais, d])
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                      form.diferenciais.includes(d)
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={novoDiferencial}
                  onChange={(e) => setNovoDiferencial(e.target.value)}
                  placeholder="Adicionar diferencial personalizado..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarDiferencial())}
                  className="flex-1"
                />
                <Button type="button" onClick={adicionarDiferencial} variant="outline" className="gap-1.5">
                  <Plus size={14} />
                  Adicionar
                </Button>
              </div>
              {form.diferenciais.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.diferenciais.map((d) => (
                    <span
                      key={d}
                      className="flex items-center gap-1 bg-accent/10 text-accent border border-accent/20 text-xs px-2.5 py-1 rounded-full font-medium"
                    >
                      {d}
                      <button type="button" onClick={() => removerDiferencial(d)} className="hover:text-red-500 transition-colors">
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botões de ação mobile */}
          <div className="flex gap-3 pb-6">
            <Link to="/admin/painel" className="flex-1">
              <Button type="button" variant="outline" className="w-full border-border gap-1.5">
                <ArrowLeft size={14} />
                Cancelar
              </Button>
            </Link>
            <Button
              type="submit"
              className="flex-1 bg-accent text-accent-foreground hover:opacity-80 font-semibold gap-1.5 shadow-sm"
              disabled={salvando}
            >
              <Save size={14} />
              {salvando ? 'Salvando...' : 'Salvar imóvel'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
