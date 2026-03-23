-- Adicionar campos faltantes na tabela imoveis
ALTER TABLE public.imoveis
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'Disponível',
  ADD COLUMN IF NOT EXISTS urgencia TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS diferenciais TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS created_at_ts BIGINT DEFAULT 0;

-- Garantir RLS habilitado
ALTER TABLE public.imoveis ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem e recriar
DROP POLICY IF EXISTS "Imoveis visiveis para todos" ON public.imoveis;
DROP POLICY IF EXISTS "Admin pode gerenciar imoveis" ON public.imoveis;

-- Permitir leitura pública (site visível para todos)
CREATE POLICY "Imoveis visiveis para todos"
ON public.imoveis FOR SELECT
TO anon, authenticated
USING (true);

-- Permitir write para anon (admin sem autenticação)
CREATE POLICY "Admin pode gerenciar imoveis"
ON public.imoveis FOR ALL
TO anon
USING (true)
WITH CHECK (true);
