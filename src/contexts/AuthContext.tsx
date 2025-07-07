import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔐 AuthContext: Inicializando autenticação...');
    
    // Verificar usuário atual
    supabase.auth.getUser().then(({ data: { user } }) => {
      console.log('🔐 AuthContext: Usuário atual:', user ? 'Logado' : 'Não logado');
      setUser(user);
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔐 AuthContext: Mudança de estado:', event);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    console.log('🔐 AuthContext: Tentando criar conta para:', email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      console.error('🔐 AuthContext: Erro no cadastro:', error.message);
      toast.error(error.message);
      throw error;
    }

    console.log('🔐 AuthContext: Cadastro realizado com sucesso');
    toast.success('Conta criada! Verifique seu email para confirmar.');
  };

  const signIn = async (email: string, password: string) => {
    console.log('🔐 AuthContext: Tentando fazer login para:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('🔐 AuthContext: Erro no login:', error.message);
      toast.error(error.message);
      throw error;
    }

    console.log('🔐 AuthContext: Login realizado com sucesso');
    toast.success('Login realizado com sucesso!');
  };

  const signOut = async () => {
    console.log('🔐 AuthContext: Fazendo logout...');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('🔐 AuthContext: Erro no logout:', error.message);
      toast.error(error.message);
      throw error;
    }

    console.log('🔐 AuthContext: Logout realizado com sucesso');
    toast.success('Logout realizado com sucesso!');
  };

  const resetPassword = async (email: string) => {
    console.log('🔐 AuthContext: Enviando reset de senha para:', email);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      console.error('🔐 AuthContext: Erro no reset:', error.message);
      toast.error(error.message);
      throw error;
    }

    console.log('🔐 AuthContext: Reset enviado com sucesso');
    toast.success('Email de recuperação enviado!');
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
