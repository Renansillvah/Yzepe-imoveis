-- Criar tabela de admins para controle de acesso
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  nome TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Política: leitura para verificar login
CREATE POLICY "Admins podem verificar login"
ON public.admins FOR SELECT
TO anon, authenticated
USING (true);

-- Inserir usuários admin
INSERT INTO public.admins (usuario, senha, nome)
VALUES
  ('renan.silva', 'Warcraft782r', 'Renan Silva'),
  ('ricardo.yzepe', 'ricadardoyyzepe321', 'Ricardo Yzepe')
ON CONFLICT (usuario) DO UPDATE SET
  senha = EXCLUDED.senha,
  nome = EXCLUDED.nome;