-- Limpar estrutura de usuários do zero (com CASCADE para remover dependências)

-- 1. Remover todas as políticas das tabelas que dependem das funções
DROP POLICY IF EXISTS "Comercial pode ver clientes atribuidos" ON public.clientes;
DROP POLICY IF EXISTS "Administrativo pode ver todos clientes" ON public.clientes;
DROP POLICY IF EXISTS "Administrativo pode inserir clientes" ON public.clientes;
DROP POLICY IF EXISTS "Supervisao comercial pode ver todos clientes" ON public.clientes;
DROP POLICY IF EXISTS "Supervisao comercial pode atualizar clientes" ON public.clientes;
DROP POLICY IF EXISTS "Master pode ver todos clientes" ON public.clientes;
DROP POLICY IF EXISTS "Master pode inserir clientes" ON public.clientes;
DROP POLICY IF EXISTS "Master pode atualizar clientes" ON public.clientes;
DROP POLICY IF EXISTS "Master pode deletar clientes" ON public.clientes;

-- Remover políticas de calculos_revisionais
DROP POLICY IF EXISTS "Consultor pode ver seus calculos" ON public.calculos_revisionais;
DROP POLICY IF EXISTS "Consultor pode inserir calculos" ON public.calculos_revisionais;
DROP POLICY IF EXISTS "Master pode ver todos calculos" ON public.calculos_revisionais;
DROP POLICY IF EXISTS "Master pode inserir calculos" ON public.calculos_revisionais;
DROP POLICY IF EXISTS "Master pode atualizar calculos" ON public.calculos_revisionais;
DROP POLICY IF EXISTS "Master pode deletar calculos" ON public.calculos_revisionais;

-- Remover políticas de negociacoes
DROP POLICY IF EXISTS "Comercial pode ver suas negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Comercial pode inserir suas negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Comercial pode atualizar suas negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Master pode ver todas negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Master pode inserir negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Master pode atualizar negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Master pode deletar negociacoes" ON public.negociacoes;

-- 2. Remover políticas de user_roles e profiles
DROP POLICY IF EXISTS "Usuários podem ver seus próprios setores" ON public.user_roles;
DROP POLICY IF EXISTS "Sistema pode inserir setores" ON public.user_roles;
DROP POLICY IF EXISTS "Master pode ver todos setores" ON public.user_roles;
DROP POLICY IF EXISTS "Master pode inserir setores" ON public.user_roles;
DROP POLICY IF EXISTS "Master pode atualizar setores" ON public.user_roles;
DROP POLICY IF EXISTS "Master pode deletar setores" ON public.user_roles;

DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Master pode ver todos os perfis" ON public.profiles;
DROP POLICY IF EXISTS "Master pode atualizar todos os perfis" ON public.profiles;

-- 3. Remover trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 4. Remover funções COM CASCADE
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.has_setor(uuid, setor_type) CASCADE;
DROP FUNCTION IF EXISTS public.is_master(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.get_user_setor(uuid) CASCADE;

-- 5. Recriar tabelas
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome text NOT NULL,
  email text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  setor setor_type NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (id),
  UNIQUE(user_id)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 6. Criar funções auxiliares
CREATE OR REPLACE FUNCTION public.get_user_setor(_user_id uuid)
RETURNS setor_type
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT setor FROM public.user_roles 
  WHERE user_id = _user_id LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.has_setor(_user_id uuid, _setor setor_type)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id AND setor = _setor
  );
$$;

CREATE OR REPLACE FUNCTION public.is_master(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id AND setor = 'master'
  );
$$;

-- 7. Criar trigger para profile automático
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Criar políticas RLS para user_roles
CREATE POLICY "Usuários podem ver seu próprio setor"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio setor"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Master pode fazer tudo"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (is_master(auth.uid()));

-- 9. Criar políticas RLS para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Master pode ver todos os perfis"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (is_master(auth.uid()));

CREATE POLICY "Master pode atualizar todos os perfis"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (is_master(auth.uid()));

-- 10. Recriar políticas das outras tabelas
CREATE POLICY "Comercial pode ver clientes atribuidos"
  ON public.clientes
  FOR SELECT
  TO authenticated
  USING (has_setor(auth.uid(), 'comercial'::setor_type) AND assigned_to = auth.uid());

CREATE POLICY "Administrativo pode ver todos clientes"
  ON public.clientes
  FOR SELECT
  TO authenticated
  USING (has_setor(auth.uid(), 'administrativo'::setor_type));

CREATE POLICY "Administrativo pode inserir clientes"
  ON public.clientes
  FOR INSERT
  TO authenticated
  WITH CHECK (has_setor(auth.uid(), 'administrativo'::setor_type));

CREATE POLICY "Supervisao comercial pode ver todos clientes"
  ON public.clientes
  FOR SELECT
  TO authenticated
  USING (has_setor(auth.uid(), 'supervisao_comercial'::setor_type));

CREATE POLICY "Supervisao comercial pode atualizar clientes"
  ON public.clientes
  FOR UPDATE
  TO authenticated
  USING (has_setor(auth.uid(), 'supervisao_comercial'::setor_type));

CREATE POLICY "Master pode ver todos clientes"
  ON public.clientes
  FOR SELECT
  TO authenticated
  USING (is_master(auth.uid()));

CREATE POLICY "Master pode inserir clientes"
  ON public.clientes
  FOR INSERT
  TO authenticated
  WITH CHECK (is_master(auth.uid()));

CREATE POLICY "Master pode atualizar clientes"
  ON public.clientes
  FOR UPDATE
  TO authenticated
  USING (is_master(auth.uid()));

CREATE POLICY "Master pode deletar clientes"
  ON public.clientes
  FOR DELETE
  TO authenticated
  USING (is_master(auth.uid()));

-- Políticas para negociacoes
CREATE POLICY "Comercial pode ver suas negociacoes"
  ON public.negociacoes
  FOR SELECT
  TO authenticated
  USING (consultor_id = auth.uid());

CREATE POLICY "Comercial pode inserir suas negociacoes"
  ON public.negociacoes
  FOR INSERT
  TO authenticated
  WITH CHECK (consultor_id = auth.uid());

CREATE POLICY "Comercial pode atualizar suas negociacoes"
  ON public.negociacoes
  FOR UPDATE
  TO authenticated
  USING (consultor_id = auth.uid());

CREATE POLICY "Master pode ver todas negociacoes"
  ON public.negociacoes
  FOR SELECT
  TO authenticated
  USING (is_master(auth.uid()));

CREATE POLICY "Master pode inserir negociacoes"
  ON public.negociacoes
  FOR INSERT
  TO authenticated
  WITH CHECK (is_master(auth.uid()));

CREATE POLICY "Master pode atualizar negociacoes"
  ON public.negociacoes
  FOR UPDATE
  TO authenticated
  USING (is_master(auth.uid()));

CREATE POLICY "Master pode deletar negociacoes"
  ON public.negociacoes
  FOR DELETE
  TO authenticated
  USING (is_master(auth.uid()));

-- Políticas para calculos_revisionais
CREATE POLICY "Consultor pode ver seus calculos"
  ON public.calculos_revisionais
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM negociacoes
      WHERE negociacoes.id = calculos_revisionais.negociacao_id
        AND negociacoes.consultor_id = auth.uid()
    )
  );

CREATE POLICY "Consultor pode inserir calculos"
  ON public.calculos_revisionais
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM negociacoes
      WHERE negociacoes.id = calculos_revisionais.negociacao_id
        AND negociacoes.consultor_id = auth.uid()
    )
  );

CREATE POLICY "Master pode ver todos calculos"
  ON public.calculos_revisionais
  FOR SELECT
  TO authenticated
  USING (is_master(auth.uid()));

CREATE POLICY "Master pode inserir calculos"
  ON public.calculos_revisionais
  FOR INSERT
  TO authenticated
  WITH CHECK (is_master(auth.uid()));

CREATE POLICY "Master pode atualizar calculos"
  ON public.calculos_revisionais
  FOR UPDATE
  TO authenticated
  USING (is_master(auth.uid()));

CREATE POLICY "Master pode deletar calculos"
  ON public.calculos_revisionais
  FOR DELETE
  TO authenticated
  USING (is_master(auth.uid()));