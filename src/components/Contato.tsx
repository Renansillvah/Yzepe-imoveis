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
            Estamos prontos para ajudar você a encontrar o imóvel ideal. Entre em contato agora!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <img
                src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_37oySykXrlZ5YXKyzjL0vXOVtjM/750e9e48-8561-4ea5-92e0-a52b75fca13c.png"
                alt="Yzepe Imóveis"
                className="h-14 w-auto object-contain mb-6"
              />
            </div>

            {[
              {
                icon: Phone,
                titulo: 'Telefone / WhatsApp',
                valor: '(11) 99999-9999',
                link: 'https://wa.me/5511999999999',
              },
              {
                icon: Mail,
                titulo: 'E-mail',
                valor: 'contato@yzepeimoveis.com.br',
                link: 'mailto:contato@yzepeimoveis.com.br',
              },
              {
                icon: MapPin,
                titulo: 'Endereço',
                valor: 'São Paulo, SP — Atendemos toda a Grande SP',
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

            <a
              href="https://wa.me/5511999999999?text=Olá,%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-[#25D366] hover:opacity-90 text-white font-semibold gap-2 mt-2">
                <MessageCircle size={18} />
                Chamar no WhatsApp
              </Button>
            </a>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6 shadow-sm">
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
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
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
                  <option value="comprar">Comprar um imóvel</option>
                  <option value="alugar">Alugar um imóvel</option>
                  <option value="vender">Vender meu imóvel</option>
                  <option value="avaliar">Avaliar meu imóvel</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleChange}
                  placeholder="Conte mais sobre o que você procura..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={enviando}
                className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold gap-2"
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
