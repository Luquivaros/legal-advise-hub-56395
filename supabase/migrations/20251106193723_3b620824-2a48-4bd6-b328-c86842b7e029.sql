-- =====================================================
-- LIMPEZA COMPLETA: Remover todas políticas
-- =====================================================

DROP POLICY IF EXISTS "Consultor can insert calculos" ON public.calculos_revisionais;
DROP POLICY IF EXISTS "Consultor can view their calculos" ON public.calculos_revisionais;
DROP POLICY IF EXISTS "Master can delete calculos" ON public.calculos_revisionais;
DROP POLICY IF EXISTS "Master can insert calculos" ON public.calculos_revisionais;
DROP POLICY IF EXISTS "Master can update calculos" ON public.calculos_revisionais;
DROP POLICY IF EXISTS "Master can view all calculos" ON public.calculos_revisionais;

DROP POLICY IF EXISTS "Consultor comercial can view assigned clientes" ON public.clientes;
DROP POLICY IF EXISTS "Master can delete clientes" ON public.clientes;
DROP POLICY IF EXISTS "Master can insert clientes" ON public.clientes;
DROP POLICY IF EXISTS "Master can update clientes" ON public.clientes;
DROP POLICY IF EXISTS "Master can view all clientes" ON public.clientes;
DROP POLICY IF EXISTS "Setor administrativo can insert clientes" ON public.clientes;
DROP POLICY IF EXISTS "Setor administrativo can view all clientes" ON public.clientes;
DROP POLICY IF EXISTS "Supervisor comercial can update clientes for assignment" ON public.clientes;
DROP POLICY IF EXISTS "Supervisor comercial can view all clientes" ON public.clientes;

DROP POLICY IF EXISTS "Consultor comercial can insert their negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Consultor comercial can update their negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Consultor comercial can view their negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Master can delete negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Master can insert negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Master can update negociacoes" ON public.negociacoes;
DROP POLICY IF EXISTS "Master can view all negociacoes" ON public.negociacoes;

DROP POLICY IF EXISTS "Master can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Master can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

DROP POLICY IF EXISTS "Master can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Master can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Master can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Master can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- =====================================================
-- CRIAR NOVO ENUM E MIGRAR DADOS
-- =====================================================

CREATE TYPE public.setor_type AS ENUM (
  'administrativo',
  'comercial',
  'supervisao_comercial',
  'juridico',
  'supervisao_juridico',
  'gerencia',
  'processual',
  'master'
);

ALTER TABLE public.user_roles ADD COLUMN setor_text text;
UPDATE public.user_roles SET setor_text = role::text;

UPDATE public.user_roles SET setor_text = 
  CASE setor_text
    WHEN 'setor-administrativo' THEN 'administrativo'
    WHEN 'consultor-comercial' THEN 'comercial'
    WHEN 'supervisor-comercial' THEN 'supervisao_comercial'
    WHEN 'consultor-juridico' THEN 'juridico'
    WHEN 'supervisor-juridico' THEN 'supervisao_juridico'
    WHEN 'gerencia' THEN 'gerencia'
    WHEN 'escritorio' THEN 'processual'
    WHEN 'master' THEN 'master'
    ELSE 'comercial'
  END;

ALTER TABLE public.user_roles ADD COLUMN setor public.setor_type;
UPDATE public.user_roles SET setor = setor_text::setor_type;
ALTER TABLE public.user_roles ALTER COLUMN setor SET NOT NULL;

ALTER TABLE public.user_roles DROP COLUMN setor_text;
ALTER TABLE public.user_roles DROP COLUMN role;

DROP INDEX IF EXISTS user_roles_user_id_role_key;
CREATE UNIQUE INDEX user_roles_user_id_key ON public.user_roles(user_id);

DROP TYPE IF EXISTS public.app_role CASCADE;

ALTER TABLE public.profiles RENAME COLUMN name TO nome;

-- =====================================================
-- NOVAS FUNÇÕES
-- =====================================================

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

CREATE OR REPLACE FUNCTION public.get_user_setor(user_id uuid)
RETURNS setor_type
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT setor FROM public.user_roles 
  WHERE user_roles.user_id = $1 LIMIT 1;
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
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- POLÍTICAS RLS
-- =====================================================

CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Master pode ver todos os perfis"
  ON public.profiles FOR SELECT TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Master pode atualizar todos os perfis"
  ON public.profiles FOR UPDATE TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Usuários podem ver seus próprios setores"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Sistema pode inserir setores"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Master pode ver todos setores"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Master pode inserir setores"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.is_master(auth.uid()));

CREATE POLICY "Master pode atualizar setores"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Master pode deletar setores"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Consultor pode ver seus calculos"
  ON public.calculos_revisionais FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM negociacoes 
    WHERE negociacoes.id = calculos_revisionais.negociacao_id 
    AND negociacoes.consultor_id = auth.uid()
  ));

CREATE POLICY "Consultor pode inserir calculos"
  ON public.calculos_revisionais FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM negociacoes 
    WHERE negociacoes.id = calculos_revisionais.negociacao_id 
    AND negociacoes.consultor_id = auth.uid()
  ));

CREATE POLICY "Master pode ver todos calculos"
  ON public.calculos_revisionais FOR SELECT TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Master pode inserir calculos"
  ON public.calculos_revisionais FOR INSERT TO authenticated
  WITH CHECK (public.is_master(auth.uid()));

CREATE POLICY "Master pode atualizar calculos"
  ON public.calculos_revisionais FOR UPDATE TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Master pode deletar calculos"
  ON public.calculos_revisionais FOR DELETE TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Comercial pode ver clientes atribuidos"
  ON public.clientes FOR SELECT TO authenticated
  USING (public.has_setor(auth.uid(), 'comercial') AND assigned_to = auth.uid());

CREATE POLICY "Administrativo pode ver todos clientes"
  ON public.clientes FOR SELECT TO authenticated
  USING (public.has_setor(auth.uid(), 'administrativo'));

CREATE POLICY "Administrativo pode inserir clientes"
  ON public.clientes FOR INSERT TO authenticated
  WITH CHECK (public.has_setor(auth.uid(), 'administrativo'));

CREATE POLICY "Supervisao comercial pode ver todos clientes"
  ON public.clientes FOR SELECT TO authenticated
  USING (public.has_setor(auth.uid(), 'supervisao_comercial'));

CREATE POLICY "Supervisao comercial pode atualizar clientes"
  ON public.clientes FOR UPDATE TO authenticated
  USING (public.has_setor(auth.uid(), 'supervisao_comercial'));

CREATE POLICY "Master pode ver todos clientes"
  ON public.clientes FOR SELECT TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Master pode inserir clientes"
  ON public.clientes FOR INSERT TO authenticated
  WITH CHECK (public.is_master(auth.uid()));

CREATE POLICY "Master pode atualizar clientes"
  ON public.clientes FOR UPDATE TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Master pode deletar clientes"
  ON public.clientes FOR DELETE TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Comercial pode ver suas negociacoes"
  ON public.negociacoes FOR SELECT TO authenticated
  USING (consultor_id = auth.uid());

CREATE POLICY "Comercial pode inserir suas negociacoes"
  ON public.negociacoes FOR INSERT TO authenticated
  WITH CHECK (consultor_id = auth.uid());

CREATE POLICY "Comercial pode atualizar suas negociacoes"
  ON public.negociacoes FOR UPDATE TO authenticated
  USING (consultor_id = auth.uid());

CREATE POLICY "Master pode ver todas negociacoes"
  ON public.negociacoes FOR SELECT TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Master pode inserir negociacoes"
  ON public.negociacoes FOR INSERT TO authenticated
  WITH CHECK (public.is_master(auth.uid()));

CREATE POLICY "Master pode atualizar negociacoes"
  ON public.negociacoes FOR UPDATE TO authenticated
  USING (public.is_master(auth.uid()));

CREATE POLICY "Master pode deletar negociacoes"
  ON public.negociacoes FOR DELETE TO authenticated
  USING (public.is_master(auth.uid()));