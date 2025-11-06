export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      calculos_revisionais: {
        Row: {
          cliente_id: string
          created_at: string
          dados_calculo: Json
          id: string
          negociacao_id: string
          resultado: Json | null
          updated_at: string
        }
        Insert: {
          cliente_id: string
          created_at?: string
          dados_calculo: Json
          id?: string
          negociacao_id: string
          resultado?: Json | null
          updated_at?: string
        }
        Update: {
          cliente_id?: string
          created_at?: string
          dados_calculo?: Json
          id?: string
          negociacao_id?: string
          resultado?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calculos_revisionais_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calculos_revisionais_negociacao_id_fkey"
            columns: ["negociacao_id"]
            isOneToOne: false
            referencedRelation: "negociacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          assigned_by: string | null
          assigned_to: string | null
          cpf: string
          created_at: string
          created_by: string | null
          data_cadastro: string
          id: string
          nome: string
          origem: Database["public"]["Enums"]["origem_lead"]
          status: Database["public"]["Enums"]["status_cliente"]
          telefone: string
          tipo_contrato: Database["public"]["Enums"]["tipo_contrato"]
          updated_at: string
        }
        Insert: {
          assigned_by?: string | null
          assigned_to?: string | null
          cpf: string
          created_at?: string
          created_by?: string | null
          data_cadastro?: string
          id?: string
          nome: string
          origem: Database["public"]["Enums"]["origem_lead"]
          status?: Database["public"]["Enums"]["status_cliente"]
          telefone: string
          tipo_contrato: Database["public"]["Enums"]["tipo_contrato"]
          updated_at?: string
        }
        Update: {
          assigned_by?: string | null
          assigned_to?: string | null
          cpf?: string
          created_at?: string
          created_by?: string | null
          data_cadastro?: string
          id?: string
          nome?: string
          origem?: Database["public"]["Enums"]["origem_lead"]
          status?: Database["public"]["Enums"]["status_cliente"]
          telefone?: string
          tipo_contrato?: Database["public"]["Enums"]["tipo_contrato"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clientes_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clientes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      negociacoes: {
        Row: {
          cliente_id: string
          consultor_id: string
          created_at: string
          horario_agendado: string | null
          id: string
          observacoes: string | null
          status: string
          updated_at: string
          valor_cobrado: number | null
        }
        Insert: {
          cliente_id: string
          consultor_id: string
          created_at?: string
          horario_agendado?: string | null
          id?: string
          observacoes?: string | null
          status?: string
          updated_at?: string
          valor_cobrado?: number | null
        }
        Update: {
          cliente_id?: string
          consultor_id?: string
          created_at?: string
          horario_agendado?: string | null
          id?: string
          observacoes?: string | null
          status?: string
          updated_at?: string
          valor_cobrado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "negociacoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: true
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "negociacoes_consultor_id_fkey"
            columns: ["consultor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          nome: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          nome: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          setor: Database["public"]["Enums"]["setor_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          setor: Database["public"]["Enums"]["setor_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          setor?: Database["public"]["Enums"]["setor_type"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_setor: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["setor_type"]
      }
      has_setor: {
        Args: {
          _setor: Database["public"]["Enums"]["setor_type"]
          _user_id: string
        }
        Returns: boolean
      }
      is_master: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      origem_lead: "facebook" | "google" | "instagram" | "tv" | "outros"
      setor_type:
        | "administrativo"
        | "comercial"
        | "supervisao_comercial"
        | "juridico"
        | "supervisao_juridico"
        | "gerencia"
        | "processual"
        | "master"
      status_cliente:
        | "lead_recebido"
        | "aguardando_designacao"
        | "designado"
        | "em_negociacao"
        | "contrato_assinado"
        | "cancelado"
      tipo_contrato:
        | "financiamento_veiculo"
        | "financiamento_imovel"
        | "emprestimo"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      origem_lead: ["facebook", "google", "instagram", "tv", "outros"],
      setor_type: [
        "administrativo",
        "comercial",
        "supervisao_comercial",
        "juridico",
        "supervisao_juridico",
        "gerencia",
        "processual",
        "master",
      ],
      status_cliente: [
        "lead_recebido",
        "aguardando_designacao",
        "designado",
        "em_negociacao",
        "contrato_assinado",
        "cancelado",
      ],
      tipo_contrato: [
        "financiamento_veiculo",
        "financiamento_imovel",
        "emprestimo",
      ],
    },
  },
} as const
