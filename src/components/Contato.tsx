import { useState } from 'react'
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function Contato() {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    interesse: '',
    mensagem: '',
  })
  const [enviando, setEnviando] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.telefone) {
      toast.error('Preencha nome e telefone.')
      return
    }
    setEnviando(true)
    await new Promise((r) => setTimeout(r, 1200))
    setEnviando(false)
    toast.success('Mensagem enviada!', {
      description: 'Em breve entraremos em contato com você.',
    })
    setForm({ nome: '', telefone: '', email: '', interesse: '', mensagem: '' })
  }

  return (
    <section id="contato" className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">Fale Conosco</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Entre em Contato
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Atendemos pelo WhatsApp com agilidade. Ou preencha o formulário e entraremos em contato.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <img
                src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_37oySykXrlZ5YXKyzjL0vXOVtjM/0ab4133d-ae3f-4eae-ac88-a0615e50bef4.png"
                alt="Yzepe Imóveis"
                className="h-14 w-auto object-cover object-top mb-4"
              />
            </div>

            {[
              {
                icon: Phone,
                titulo: 'Telefone / WhatsApp',
                valor: '(35) 99830-9575',
                link: 'tel:+5535998309575',
              },
              {
                icon: Mail,
                titulo: 'E-mail',
                valor: 'yzepeimoveis@outlook.com',
                link: 'mailto:yzepeimoveis@outlook.com',
              },
              {
                icon: MapPin,
                titulo: 'Localização',
                valor: 'Toledo - MG · Atendemos toda região',
                link: null,
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.titulo} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{item.titulo}</div>
                    {item.link ? (
                      <a href={item.link} className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                        {item.valor}
                      </a>
                    ) : (
                      <div className="text-sm font-medium text-foreground">{item.valor}</div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* CTA WhatsApp destaque */}
            <a
              href="https://wa.me/5535998309575?text=Olá,%20vim%20pelo%20site%20e%20quero%20mais%20informações"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-[#25D366] hover:opacity-90 text-white font-bold gap-2 py-5 shadow-lg text-base mt-2">
                <MessageCircle size={20} />
                Chamar no WhatsApp agora
              </Button>
            </a>

            <p className="text-xs text-muted-foreground text-center">
              Respondemos em minutos • Disponível fins de semana
            </p>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4 text-base">Ou deixe seu contato:</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="nome">Nome completo *</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(35) 99999-9999"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">E-mail (opcional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="interesse">Tenho interesse em</Label>
                <select
                  id="interesse"
                  name="interesse"
                  value={form.interesse}
                  onChange={handleChange}
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="comprar-casa">Comprar uma casa</option>
                  <option value="comprar-terreno">Comprar um terreno / lote</option>
                  <option value="comprar-chacara">Comprar chácara ou sítio</option>
                  <option value="alugar">Alugar um imóvel</option>
                  <option value="vender">Vender meu imóvel</option>
                  <option value="avaliar">Avaliar meu imóvel</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleChange}
                  placeholder="Descreva o que você procura: cidade, bairro, tamanho, orçamento..."
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={enviando}
                className="w-full bg-accent text-accent-foreground hover:opacity-90 font-bold gap-2 py-5 text-base shadow-md"
              >
                <Send size={16} />
                {enviando ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
