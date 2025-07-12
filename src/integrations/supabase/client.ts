
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Client: Verificando configuração...');
console.log('🔧 URL configurada:', supabaseUrl ? 'Sim' : 'Não');
console.log('🔧 Chave configurada:', supabaseAnonKey ? 'Sim' : 'Não');

// Criar um cliente "mock" quando as variáveis não estão configuradas
let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('🔧 Supabase Client: Variáveis de ambiente não configuradas - modo offline');
  
  // Cliente mock que não faz nada mas não quebra a aplicação
  supabase = {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signUp: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
      signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
      signOut: () => Promise.resolve({ error: null }),
      resetPasswordForEmail: () => Promise.resolve({ error: new Error('Supabase não configurado') }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } }
      })
    },
    from: () => ({
      select: () => ({ 
        order: () => ({ 
          limit: () => Promise.resolve({ data: [], error: null }) 
        }),
        eq: () => Promise.resolve({ data: [], error: null })
      }),
      insert: () => Promise.resolve({ error: new Error('Supabase não configurado') }),
      delete: () => ({ 
        eq: () => Promise.resolve({ error: new Error('Supabase não configurado') })
      })
    })
  };
} else {
  console.log('🔧 Supabase Client: Criando cliente...');
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('🔧 Supabase Client: Cliente criado com sucesso');
}

export { supabase };
