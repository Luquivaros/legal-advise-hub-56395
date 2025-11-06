-- Atualizar políticas RLS para permitir acesso master a clientes
CREATE POLICY "Master can view all clientes"
ON public.clientes
FOR SELECT
USING (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can insert clientes"
ON public.clientes
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can update clientes"
ON public.clientes
FOR UPDATE
USING (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can delete clientes"
ON public.clientes
FOR DELETE
USING (has_role(auth.uid(), 'master'));

-- Atualizar políticas RLS para permitir acesso master a negociacoes
CREATE POLICY "Master can view all negociacoes"
ON public.negociacoes
FOR SELECT
USING (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can insert negociacoes"
ON public.negociacoes
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can update negociacoes"
ON public.negociacoes
FOR UPDATE
USING (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can delete negociacoes"
ON public.negociacoes
FOR DELETE
USING (has_role(auth.uid(), 'master'));

-- Atualizar políticas RLS para permitir acesso master a calculos_revisionais
CREATE POLICY "Master can view all calculos"
ON public.calculos_revisionais
FOR SELECT
USING (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can insert calculos"
ON public.calculos_revisionais
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can update calculos"
ON public.calculos_revisionais
FOR UPDATE
USING (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can delete calculos"
ON public.calculos_revisionais
FOR DELETE
USING (has_role(auth.uid(), 'master'));

-- Atualizar políticas RLS para permitir acesso master a profiles
CREATE POLICY "Master can view all profiles"
ON public.profiles
FOR SELECT
USING (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can update all profiles"
ON public.profiles
FOR UPDATE
USING (has_role(auth.uid(), 'master'));

-- Atualizar políticas RLS para permitir acesso master a user_roles
CREATE POLICY "Master can view all roles"
ON public.user_roles
FOR SELECT
USING (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can update roles"
ON public.user_roles
FOR UPDATE
USING (has_role(auth.uid(), 'master'));

CREATE POLICY "Master can delete roles"
ON public.user_roles
FOR DELETE
USING (has_role(auth.uid(), 'master'));