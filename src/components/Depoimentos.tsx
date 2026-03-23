import { Star, Quote } from 'lucide-react'

const depoimentos = [
  {
    nome: 'Carlos Mendonça',
    texto: 'Excelente atendimento! Me ajudou a encontrar o terreno perfeito em Toledo em menos de 2 semanas. Muito profissional e atencioso durante todo o processo.',
    nota: 5,
    imovel: 'Terreno - Centro, Toledo MG',
    inicial: 'C',
  },
  {
    nome: 'Ana Paula Silva',
    texto: 'Comprei minha chácara com a Yzepe Imóveis e foi uma experiência incrível. Eles cuidaram de toda a documentação e me deixaram tranquila em cada etapa.',
    nota: 5,
    imovel: 'Chácara - Zona Rural, Toledo MG',
    inicial: 'A',
  },
  {
    nome: 'Roberto Fernandes',
    texto: 'Já é a segunda vez que faço negócio com eles. Sempre transparentes, rápidos e com ótimas opções. Indico para todos os meus amigos e familiares.',
    nota: 5,
    imovel: 'Casa - Bairro São João, Toledo MG',
    inicial: 'R',
  },
]

export default function Depoimentos() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/10 text-accent font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Clientes
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-primary-foreground/60 text-sm max-w-md mx-auto">
            Famílias que realizaram o sonho do imóvel próprio com a nossa ajuda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {depoimentos.map((dep) => (
            <div
              key={dep.nome}
              className="bg-white/8 border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-colors backdrop-blur-sm"
            >
              <Quote size={26} className="text-accent mb-4 opacity-90" />
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-5">
                "{dep.texto}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: dep.nota }).map((_, i) => (
                  <Star key={i} size={13} className="fill-accent text-accent" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm flex-shrink-0">
                  {dep.inicial}
                </div>
                <div>
                  <div className="font-semibold text-primary-foreground text-sm">{dep.nome}</div>
                  <div className="text-xs text-primary-foreground/50">{dep.imovel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
