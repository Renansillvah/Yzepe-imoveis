-- Garantir RLS ativa na tabela imoveis
ALTER TABLE public.imoveis ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas para recriar corretamente
DROP POLICY IF EXISTS "Imoveis visiveis para todos" ON public.imoveis;
DROP POLICY IF EXISTS "Admin pode gerenciar imoveis" ON public.imoveis;
DROP POLICY IF EXISTS "imoveis_select" ON public.imoveis;
DROP POLICY IF EXISTS "imoveis_insert" ON public.imoveis;
DROP POLICY IF EXISTS "imoveis_update" ON public.imoveis;
DROP POLICY IF EXISTS "imoveis_delete" ON public.imoveis;

-- Qualquer pessoa pode visualizar imóveis disponíveis
CREATE POLICY "imoveis_select"
ON public.imoveis FOR SELECT
TO anon, authenticated
USING (true);

-- Usuários anônimos podem inserir (o admin usa a chave anon)
CREATE POLICY "imoveis_insert"
ON public.imoveis FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Usuários anônimos podem atualizar
CREATE POLICY "imoveis_update"
ON public.imoveis FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Usuários anônimos podem deletar
CREATE POLICY "imoveis_delete"
ON public.imoveis FOR DELETE
TO anon, authenticated
USING (true);

-- Adicionar coluna loteamento se não existir no tipo
-- (O banco guarda como text, então não precisa alterar o ENUM, só confirmar que aceita o valor)

-- Garantir que a tabela admins tem RLS correta
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins podem verificar login" ON public.admins;

CREATE POLICY "admins_select"
ON public.admins FOR SELECT
TO anon, authenticated
USING (true);