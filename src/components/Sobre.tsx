import { Award, Users, ThumbsUp, Star } from 'lucide-react'

const diferenciais = [
  {
    icon: Award,
    titulo: 'Experiência Comprovada',
    descricao: 'Mais de 10 anos atuando no mercado imobiliário de São Paulo com excelência.',
  },
  {
    icon: Users,
    titulo: 'Atendimento Personalizado',
    descricao: 'Cada cliente é único. Entendemos suas necessidades e encontramos o imóvel ideal.',
  },
  {
    icon: ThumbsUp,
    titulo: 'Transparência Total',
    descricao: 'Processo claro e honesto do início ao fim. Você sempre sabe o que está acontecendo.',
  },
  {
    icon: Star,
    titulo: 'Parceiro Imovel Web',
    descricao: 'Anunciamos no maior portal imobiliário do Brasil para maximizar a visibilidade dos seus imóveis.',
  },
]

export default function Sobre() {
  return (
    <section id="sobre" className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Quem Somos</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-5 leading-tight">
              Yzepe Imóveis: <br />Seu parceiro de confiança
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A Yzepe Imóveis é uma imobiliária especializada em imóveis residenciais e comerciais em São Paulo e Grande São Paulo. Com mais de uma década de experiência, somos referência em atendimento humanizado e resultados concretos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nossa equipe de corretores altamente qualificados está pronta para auxiliar você em todas as etapas — desde a busca pelo imóvel ideal até a assinatura do contrato. Trabalhamos com total transparência e dedicação para transformar seu sonho em realidade.
            </p>

            {/* CRECI */}
            <div className="mt-6 inline-flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-sm font-medium text-foreground">CRECI-SP Ativo</span>
              <span className="text-sm text-muted-foreground">• Credenciado Imovel Web</span>
            </div>
          </div>

          {/* Diferenciais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diferenciais.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.titulo}
                  className="bg-card rounded-xl p-5 shadow-sm border border-border hover:border-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-3">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">{item.titulo}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.descricao}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
