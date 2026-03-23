import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

export interface Imovel {
  id: string
  titulo: string
  preco: number
  tipo: 'Casa' | 'Terreno' | 'Lote' | 'Loteamento' | 'Chácara' | 'Sítio'
  cidade: string
  bairro: string
  area: number
  descricao: string
  imagens: string[]
  status: 'Disponível' | 'Vendido'
  finalidade: 'Venda' | 'Aluguel'
  destaque: boolean
  urgencia: string
  diferenciais: string[]
  createdAt: number
}

interface ImoveisContextType {
  imoveis: Imovel[]
  loading: boolean
  addImovel: (imovel: Omit<Imovel, 'id' | 'createdAt'>) => Promise<void>
  updateImovel: (id: string, imovel: Partial<Imovel>) => Promise<void>
  deleteImovel: (id: string) => Promise<void>
  getImovel: (id: string) => Imovel | undefined
  recarregar: () => Promise<void>
}

const ImoveisContext = createContext<ImoveisContextType | undefined>(undefined)

// Converte do formato Supabase para o formato da app
function fromSupabase(row: Record<string, unknown>): Imovel {
  return {
    id: row.id as string,
    titulo: (row.titulo as string) || '',
    preco: (row.preco as number) || 0,
    tipo: ((row.tipo as string) || 'Casa') as Imovel['tipo'],
    cidade: (row.cidade as string) || '',
    bairro: (row.bairro as string) || '',
    area: (row.area as number) || 0,
    descricao: (row.descricao as string) || '',
    imagens: (row.imagens as string[]) || [],
    status: ((row.status as string) || 'Disponível') as Imovel['status'],
    finalidade: ((row.finalidade as string) || 'Venda') as Imovel['finalidade'],
    destaque: (row.destaque as boolean) || false,
    urgencia: (row.urgencia as string) || '',
    diferenciais: (row.diferenciais as string[]) || [],
    createdAt: (row.created_at_ts as number) || Date.now(),
  }
}

// Converte do formato da app para o formato Supabase
function toSupabase(imovel: Omit<Imovel, 'id' | 'createdAt'>) {
  return {
    titulo: imovel.titulo,
    preco: imovel.preco,
    tipo: imovel.tipo,
    cidade: imovel.cidade,
    bairro: imovel.bairro,
    area: imovel.area,
    descricao: imovel.descricao,
    imagens: imovel.imagens,
    status: imovel.status,
    finalidade: imovel.finalidade,
    destaque: imovel.destaque,
    urgencia: imovel.urgencia,
    diferenciais: imovel.diferenciais,
    ativo: imovel.status === 'Disponível',
    created_at_ts: Date.now(),
  }
}

export function ImoveisProvider({ children }: { children: ReactNode }) {
  const [imoveis, setImoveis] = useState<Imovel[]>([])
  const [loading, setLoading] = useState(true)

  const carregarImoveis = async () => {
    try {
      if (!supabase) {
        console.warn('Supabase não configurado')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('imoveis')
        .select('*')
        .order('destaque', { ascending: false })
        .order('created_at_ts', { ascending: false })

      if (error) {
        console.error('Erro ao carregar imóveis:', error)
        return
      }

      if (data) {
        setImoveis(data.map(fromSupabase))
      }
    } catch (err) {
      console.error('Erro ao carregar imóveis:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarImoveis()
  }, [])

  const addImovel = async (imovel: Omit<Imovel, 'id' | 'createdAt'>) => {
    if (!supabase) throw new Error('Supabase não configurado')
    const { data, error } = await supabase
      .from('imoveis')
      .insert(toSupabase(imovel))
      .select()
      .single()

    if (error) throw error
    if (data) {
      setImoveis((prev) => [fromSupabase(data), ...prev])
    }
  }

  const updateImovel = async (id: string, updates: Partial<Imovel>) => {
    const supabaseUpdates: Record<string, unknown> = {}
    if (updates.titulo !== undefined) supabaseUpdates.titulo = updates.titulo
    if (updates.preco !== undefined) supabaseUpdates.preco = updates.preco
    if (updates.tipo !== undefined) supabaseUpdates.tipo = updates.tipo
    if (updates.cidade !== undefined) supabaseUpdates.cidade = updates.cidade
    if (updates.bairro !== undefined) supabaseUpdates.bairro = updates.bairro
    if (updates.area !== undefined) supabaseUpdates.area = updates.area
    if (updates.descricao !== undefined) supabaseUpdates.descricao = updates.descricao
    if (updates.imagens !== undefined) supabaseUpdates.imagens = updates.imagens
    if (updates.status !== undefined) {
      supabaseUpdates.status = updates.status
      supabaseUpdates.ativo = updates.status === 'Disponível'
    }
    if (updates.finalidade !== undefined) supabaseUpdates.finalidade = updates.finalidade
    if (updates.destaque !== undefined) supabaseUpdates.destaque = updates.destaque
    if (updates.urgencia !== undefined) supabaseUpdates.urgencia = updates.urgencia
    if (updates.diferenciais !== undefined) supabaseUpdates.diferenciais = updates.diferenciais

    if (!supabase) throw new Error('Supabase não configurado')
    const { data, error } = await supabase
      .from('imoveis')
      .update(supabaseUpdates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    if (data) {
      setImoveis((prev) => prev.map((i) => (i.id === id ? fromSupabase(data) : i)))
    }
  }

  const deleteImovel = async (id: string) => {
    if (!supabase) throw new Error('Supabase não configurado')
    const { error } = await supabase.from('imoveis').delete().eq('id', id)
    if (error) throw error
    setImoveis((prev) => prev.filter((i) => i.id !== id))
  }

  const getImovel = (id: string) => imoveis.find((i) => i.id === id)

  return (
    <ImoveisContext.Provider value={{ imoveis, loading, addImovel, updateImovel, deleteImovel, getImovel, recarregar: carregarImoveis }}>
      {children}
    </ImoveisContext.Provider>
  )
}

export function useImoveis() {
  const ctx = useContext(ImoveisContext)
  if (!ctx) throw new Error('useImoveis must be used within ImoveisProvider')
  return ctx
}
