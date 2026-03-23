import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'yzepe2024'

export default function LoginAdmin() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setTimeout(() => {
      if (usuario === ADMIN_USER && senha === ADMIN_PASS) {
        sessionStorage.setItem('admin_auth', 'true')
        navigate('/admin/painel')
      } else {
        toast.error('Usuário ou senha incorretos')
        setCarregando(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="https://pub-c0bfb119504542e0b2e6ebc8f6b3b1df.r2.dev/user-uploads/user_37oySykXrlZ5YXKyzjL0vXOVtjM/1db82708-e438-45d8-8291-2da28cbd784a.png"
            alt="Yzepe Imóveis"
            className="h-20 w-auto object-contain mx-auto mb-6"
          />
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Lock size={18} className="text-accent" />
              Área Administrativa
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">Acesso restrito ao corretor</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="usuario" className="text-sm font-medium">Usuário</Label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="usuario"
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="pl-9"
                    placeholder="Digite seu usuário"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="senha" className="text-sm font-medium">Senha</Label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="senha"
                    type={mostrarSenha ? 'text' : 'password'}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="pl-9 pr-10"
                    placeholder="Digite sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {mostrarSenha ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-semibold mt-2"
                disabled={carregando}
              >
                {carregando ? 'Verificando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Acesso restrito — não compartilhe suas credenciais
        </p>
      </div>
    </div>
  )
}
