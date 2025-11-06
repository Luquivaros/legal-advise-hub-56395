-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM (
  'setor-administrativo',
  'supervisor-comercial',
  'consultor-comercial',
  'consultor-juridico',
  'supervisor-juridico',
  'gerencia',
  'escritorio-processual',
  'escritorio-audiencias'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create enums for clients
CREATE TYPE public.tipo_contrato AS ENUM (
  'financiamento_veiculo',
  'financiamento_imovel',
  'emprestimo'
);

CREATE TYPE public.origem_lead AS ENUM (
  'facebook',
  'google',
  'instagram',
  'tv',
  'outros'
);

CREATE TYPE public.status_cliente AS ENUM (
  'lead_recebido',
  'aguardando_designacao',
  'designado',
  'em_negociacao',
  'contrato_assinado',
  'cancelado'
);

-- Create clientes table
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  tipo_contrato tipo_contrato NOT NULL,
  origem origem_lead NOT NULL,
  data_cadastro DATE NOT NULL DEFAULT CURRENT_DATE,
  status status_cliente NOT NULL DEFAULT 'lead_recebido',
  created_by UUID REFERENCES public.profiles(id),
  assigned_to UUID REFERENCES public.profiles(id),
  assigned_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on clientes
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

-- Create negociacoes table
CREATE TABLE public.negociacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE NOT NULL,
  consultor_id UUID REFERENCES public.profiles(id) NOT NULL,
  valor_cobrado DECIMAL(10, 2),
  horario_agendado TIMESTAMP WITH TIME ZONE,
  observacoes TEXT,
  status TEXT NOT NULL DEFAULT 'em_andamento',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(cliente_id)
);

-- Enable RLS on negociacoes
ALTER TABLE public.negociacoes ENABLE ROW LEVEL SECURITY;

-- Create calculos_revisionais table
CREATE TABLE public.calculos_revisionais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  negociacao_id UUID REFERENCES public.negociacoes(id) ON DELETE CASCADE NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE NOT NULL,
  dados_calculo JSONB NOT NULL,
  resultado JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on calculos_revisionais
ALTER TABLE public.calculos_revisionais ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for clientes
CREATE POLICY "Setor administrativo can insert clientes"
  ON public.clientes FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'setor-administrativo'));

CREATE POLICY "Setor administrativo can view all clientes"
  ON public.clientes FOR SELECT
  USING (public.has_role(auth.uid(), 'setor-administrativo'));

CREATE POLICY "Supervisor comercial can view all clientes"
  ON public.clientes FOR SELECT
  USING (public.has_role(auth.uid(), 'supervisor-comercial'));

CREATE POLICY "Supervisor comercial can update clientes for assignment"
  ON public.clientes FOR UPDATE
  USING (public.has_role(auth.uid(), 'supervisor-comercial'));

CREATE POLICY "Consultor comercial can view assigned clientes"
  ON public.clientes FOR SELECT
  USING (
    public.has_role(auth.uid(), 'consultor-comercial') 
    AND assigned_to = auth.uid()
  );

-- RLS Policies for negociacoes
CREATE POLICY "Consultor comercial can view their negociacoes"
  ON public.negociacoes FOR SELECT
  USING (consultor_id = auth.uid());

CREATE POLICY "Consultor comercial can insert their negociacoes"
  ON public.negociacoes FOR INSERT
  WITH CHECK (consultor_id = auth.uid());

CREATE POLICY "Consultor comercial can update their negociacoes"
  ON public.negociacoes FOR UPDATE
  USING (consultor_id = auth.uid());

-- RLS Policies for calculos_revisionais
CREATE POLICY "Consultor can view their calculos"
  ON public.calculos_revisionais FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.negociacoes
      WHERE negociacoes.id = calculos_revisionais.negociacao_id
      AND negociacoes.consultor_id = auth.uid()
    )
  );

CREATE POLICY "Consultor can insert calculos"
  ON public.calculos_revisionais FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.negociacoes
      WHERE negociacoes.id = negociacao_id
      AND negociacoes.consultor_id = auth.uid()
    )
  );

-- Trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clientes_updated_at
  BEFORE UPDATE ON public.clientes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_negociacoes_updated_at
  BEFORE UPDATE ON public.negociacoes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_calculos_revisionais_updated_at
  BEFORE UPDATE ON public.calculos_revisionais
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
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