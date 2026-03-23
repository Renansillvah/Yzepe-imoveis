import { Award, Users, ThumbsUp, Star, MessageCircle, MapPin, TrendingUp } from 'lucide-react'

const autoridade = [
  { valor: '+80', label: 'Imóveis Disponíveis', icon: TrendingUp },
  { valor: '+300', label: 'Clientes Atendidos', icon: Users },
  { valor: '+4', label: 'Anos de Experiência', icon: Award },
  { valor: '100%', label: 'Atendimento via WhatsApp', icon: MessageCircle },
]

const diferenciais = [
  {
    icon: MapPin,
    titulo: 'Especialista na Região',
    descricao: 'Conhecemos cada bairro, rua e oportunidade de Toledo MG e cidades vizinhas.',
  },
  {
    icon: Award,
    titulo: 'CRECI Ativo',
    descricao: 'Corretor credenciado, garantindo segurança e legalidade em cada negócio.',
  },
  {
    icon: ThumbsUp,
    titulo: 'Transparência Total',
    descricao: 'Processo claro e honesto do início ao fim — documentação e escritura sempre em dia.',
  },
  {
    icon: Star,
    titulo: 'Atendimento Rápido',
    descricao: 'Resposta no WhatsApp em minutos. Disponibilidade para visitas nos fins de semana.',
  },
]

export default function Sobre() {
  return (
    <section id="sobre" className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">

        {/* Números de autoridade */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {autoridade.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="bg-card rounded-xl p-5 text-center border border-border shadow-sm"
              >
                <div className="flex justify-center mb-2">
                  <Icon size={22} className="text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground">{item.valor}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Quem Somos</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-5 leading-tight">
              Yzepe Imóveis:<br />Seu parceiro em Toledo MG
            </h2>
            <h3 className="sr-only">Imóveis à venda em Toledo MG — Terrenos, Chácaras e Sítios</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Somos especializados em terrenos, lotes, chácaras, sítios e casas em Toledo MG e toda a região sul de Minas Gerais. Com mais de 4 anos de experiência, ajudamos famílias a realizarem o sonho da casa própria ou do imóvel rural.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Atuamos com imóveis para compra, venda e locação — sempre com documentação regularizada, escritura garantida e opções de financiamento e parcelamento para facilitar a sua compra.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['CRECI-MG Ativo', 'Escritura Garantida', 'Financiamento CAIXA', 'Parcelamento Próprio'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent block"></span>
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://wa.me/5535998309575?text=Olá,%20vim%20pelo%20site%20e%20quero%20mais%20informações"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366] text-white rounded-xl px-5 py-3 font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
            >
              <MessageCircle size={18} />
              Falar direto no WhatsApp
            </a>
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
