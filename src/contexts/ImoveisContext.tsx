import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Imovel {
  id: string
  titulo: string
  preco: number
  tipo: 'Casa' | 'Terreno' | 'Lote' | 'Chácara' | 'Sítio'
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
  addImovel: (imovel: Omit<Imovel, 'id' | 'createdAt'>) => void
  updateImovel: (id: string, imovel: Partial<Imovel>) => void
  deleteImovel: (id: string) => void
  getImovel: (id: string) => Imovel | undefined
}

const ImoveisContext = createContext<ImoveisContextType | undefined>(undefined)

const STORAGE_KEY = 'yzepe_imoveis'

const imoveisIniciais: Imovel[] = [
  {
    id: '1',
    titulo: 'Casa Simples no Centro de Toledo',
    preco: 180000,
    tipo: 'Casa',
    cidade: 'Toledo - MG',
    bairro: 'Centro',
    area: 120,
    descricao: 'Casa simples localizada no centro de Toledo, excelente para moradia ou investimento. Imóvel bem conservado com boa localização, próximo ao comércio e serviços da cidade.',
    imagens: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80'],
    status: 'Disponível',
    finalidade: 'Venda',
    destaque: true,
    urgencia: '',
    diferenciais: ['Aceita financiamento', 'Com escritura'],
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: '2',
    titulo: 'Terreno Plano no Bairro Novo',
    preco: 45000,
    tipo: 'Terreno',
    cidade: 'Toledo - MG',
    bairro: 'Bairro Novo',
    area: 300,
    descricao: 'Terreno plano com excelente localização, pronto para construção. Documentação em dia, aceita parcelamento direto com o proprietário.',
    imagens: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'],
    status: 'Disponível',
    finalidade: 'Venda',
    destaque: false,
    urgencia: 'Oportunidade',
    diferenciais: ['Aceita parcelamento', 'Com escritura'],
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: '3',
    titulo: 'Chácara com Nascente e Casa Sede',
    preco: 320000,
    tipo: 'Chácara',
    cidade: 'Toledo - MG',
    bairro: 'Zona Rural',
    area: 20000,
    descricao: 'Chácara com nascente d\'água, casa sede em bom estado, área de lazer e pomar. Ideal para quem busca tranquilidade no campo sem abrir mão do conforto.',
    imagens: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80'],
    status: 'Disponível',
    finalidade: 'Venda',
    destaque: true,
    urgencia: '',
    diferenciais: ['Com escritura', 'Aceita financiamento'],
    createdAt: Date.now() - 86400000,
  },
]

export function ImoveisProvider({ children }: { children: ReactNode }) {
  const [imoveis, setImoveis] = useState<Imovel[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch (_) {}
    return imoveisIniciais
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(imoveis))
  }, [imoveis])

  const addImovel = (imovel: Omit<Imovel, 'id' | 'createdAt'>) => {
    const novo: Imovel = {
      ...imovel,
      id: Date.now().toString(),
      createdAt: Date.now(),
    }
    setImoveis((prev) => [novo, ...prev])
  }

  const updateImovel = (id: string, updates: Partial<Imovel>) => {
    setImoveis((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)))
  }

  const deleteImovel = (id: string) => {
    setImoveis((prev) => prev.filter((i) => i.id !== id))
  }

  const getImovel = (id: string) => imoveis.find((i) => i.id === id)

  return (
    <ImoveisContext.Provider value={{ imoveis, addImovel, updateImovel, deleteImovel, getImovel }}>
      {children}
    </ImoveisContext.Provider>
  )
}

export function useImoveis() {
  const ctx = useContext(ImoveisContext)
  if (!ctx) throw new Error('useImoveis must be used within ImoveisProvider')
  return ctx
}
