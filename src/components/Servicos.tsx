import { Home, Key, FileText, TrendingUp, Shield, Search } from 'lucide-react'

const servicos = [
  {
    icon: Search,
    titulo: 'Busca de Imóveis',
    descricao: 'Encontramos o imóvel ideal para você com base no seu perfil e necessidades.',
  },
  {
    icon: Home,
    titulo: 'Compra e Venda',
    descricao: 'Intermediamos negociações de compra e venda com segurança e agilidade.',
  },
  {
    icon: Key,
    titulo: 'Locação',
    descricao: 'Gerenciamos todo o processo de locação, desde a divulgação até a entrega das chaves.',
  },
  {
    icon: FileText,
    titulo: 'Assessoria Jurídica',
    descricao: 'Orientação completa sobre contratos, documentação e aspectos legais.',
  },
  {
    icon: TrendingUp,
    titulo: 'Avaliação de Imóveis',
    descricao: 'Avaliação profissional para saber o valor real do seu imóvel no mercado.',
  },
  {
    icon: Shield,
    titulo: 'Segurança na Transação',
    descricao: 'Processos seguros e transparentes em todas as etapas da negociação.',
  },
]

export default function Servicos() {
  return (
    <section id="servicos" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">O que fazemos</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Oferecemos soluções completas para compra, venda e locação de imóveis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((servico) => {
            const Icon = servico.icon
            return (
              <div
                key={servico.titulo}
                className="group p-6 rounded-xl border border-border bg-card hover:border-accent hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                  <Icon size={22} className="text-primary-foreground group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{servico.titulo}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{servico.descricao}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
