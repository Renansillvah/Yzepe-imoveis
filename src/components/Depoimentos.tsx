import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const depoimentos = [
  {
    nome: 'Carlos Mendonça',
    texto: 'Excelente atendimento! O corretor me ajudou a encontrar o apartamento perfeito em menos de 2 semanas. Muito profissional e atencioso durante todo o processo.',
    nota: 5,
    imovel: 'Apartamento - Jardins',
  },
  {
    nome: 'Ana Paula Silva',
    texto: 'Comprei minha primeira casa com a Yzepe Imóveis e foi uma experiência incrível. Eles cuidaram de toda a documentação e me deixaram tranquila em cada etapa.',
    nota: 5,
    imovel: 'Casa - Alphaville',
  },
  {
    nome: 'Roberto Fernandes',
    texto: 'Já é a segunda vez que faço negócio com eles. Sempre transparentes, rápidos e com ótimas opções. Indico para todos os meus amigos e familiares.',
    nota: 5,
    imovel: 'Apartamento - Moema',
  },
]

export default function Depoimentos() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Clientes</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-3">
            O que nossos clientes dizem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {depoimentos.map((dep) => (
            <Card key={dep.nome} className="bg-card/10 border-white/10 text-primary-foreground">
              <CardContent className="p-6">
                <Quote size={28} className="text-accent mb-3 opacity-80" />
                <p className="text-primary-foreground/90 text-sm leading-relaxed mb-4">
                  "{dep.texto}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: dep.nota }).map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-sm">{dep.nome}</div>
                  <div className="text-xs text-primary-foreground/60">{dep.imovel}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
