import { Home, Key, FileText, TrendingUp, Shield, Search } from 'lucide-react'

const servicos = [
  {
    icon: Search,
    titulo: 'Busca de Imóveis',
    descricao: 'Encontramos o imóvel ideal para você com base no seu perfil e necessidades na região.',
    numero: '01',
  },
  {
    icon: Home,
    titulo: 'Compra e Venda',
    descricao: 'Intermediamos negociações de compra e venda com segurança, agilidade e transparência.',
    numero: '02',
  },
  {
    icon: Key,
    titulo: 'Locação',
    descricao: 'Gerenciamos todo o processo de locação, desde a divulgação até a entrega das chaves.',
    numero: '03',
  },
  {
    icon: FileText,
    titulo: 'Assessoria Jurídica',
    descricao: 'Orientação completa sobre contratos, escritura, documentação e aspectos legais.',
    numero: '04',
  },
  {
    icon: TrendingUp,
    titulo: 'Avaliação de Imóveis',
    descricao: 'Avaliação profissional para saber o valor real do seu imóvel no mercado regional.',
    numero: '05',
  },
  {
    icon: Shield,
    titulo: 'Segurança na Transação',
    descricao: 'Processos seguros e transparentes em todas as etapas da negociação.',
    numero: '06',
  },
]

export default function Servicos() {
  return (
    <section id="servicos" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block bg-accent/15 text-accent font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            O que fazemos
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Oferecemos soluções completas para compra, venda e locação de imóveis em Toledo MG e região.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicos.map((servico) => {
            const Icon = servico.icon
            return (
              <div
                key={servico.titulo}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-accent/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Número decorativo */}
                <span className="absolute top-4 right-5 text-5xl font-bold text-foreground/5 font-serif select-none">
                  {servico.numero}
                </span>

                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300 relative z-10">
                  <Icon size={20} className="text-primary-foreground group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 relative z-10">{servico.titulo}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{servico.descricao}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
