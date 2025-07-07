
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Client: Verificando configuração...');
console.log('🔧 URL configurada:', supabaseUrl ? 'Sim' : 'Não');
console.log('🔧 Chave configurada:', supabaseAnonKey ? 'Sim' : 'Não');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('🔧 Supabase Client: Erro - Variáveis de ambiente não configuradas');
  throw new Error('Missing Supabase environment variables');
}

console.log('🔧 Supabase Client: Criando cliente...');
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('🔧 Supabase Client: Cliente criado com sucesso');
