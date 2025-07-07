
# Documentação Técnica - BíbliaV3

## 📋 Visão Geral do Projeto

O BíbliaV3 é uma aplicação web moderna para leitura e estudo da Bíblia, construída com React, TypeScript, Tailwind CSS e integração com Supabase para funcionalidades backend.

## 🏗️ Arquitetura do Projeto

### Stack Tecnológico
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/UI
- **Estado**: React Context API + TanStack Query
- **Roteamento**: React Router DOM
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Build Tool**: Vite
- **Deployment**: Lovable Platform

## 📁 Estrutura de Diretórios

```
src/
├── components/           # Componentes React reutilizáveis
├── contexts/            # Contextos React (Estado global)
├── hooks/               # Custom hooks
├── integrations/        # Integrações externas (Supabase)
├── pages/               # Páginas/Rotas da aplicação
├── services/            # Serviços de API
├── data/                # Dados estáticos (JSON da Bíblia)
├── utils/               # Funções utilitárias
└── lib/                 # Bibliotecas e configurações
```

## 🗂️ Detalhamento dos Arquivos

### 📱 Componentes Principais (`/components`)

#### Componentes de Autenticação (`/auth`)
- **AuthModal.tsx**: Modal de login/cadastro
- **UserProfile.tsx**: Perfil do usuário na sidebar

#### Componentes da Bíblia
- **BibleVerse.tsx**: Exibição de versículos individuais
- **BibleReader.tsx**: Leitor com síntese de voz
- **BibleSidebar.tsx**: Navegação lateral com livros/capítulos
- **ShareVerse.tsx**: Compartilhamento de versículos
- **ReadingHistoryPanel.tsx**: Painel de histórico de leitura

#### Componentes de UI (`/ui`)
- Componentes do Shadcn/UI (Button, Card, Dialog, etc.)

### 🎯 Contextos (`/contexts`)

#### AuthContext.tsx
- **Propósito**: Gerencia estado de autenticação
- **Funcionalidades**:
  - Login/Logout
  - Cadastro de usuários
  - Reset de senha
  - Estado do usuário logado
- **Integração**: Conecta com Supabase Auth

#### BibleContext.tsx
- **Propósito**: Gerencia estado da Bíblia
- **Funcionalidades**:
  - Versão atual da Bíblia
  - Livro/Capítulo atual
  - Configurações de leitura

### 🪝 Custom Hooks (`/hooks`)

#### useReadingHistory.tsx (291 linhas)
- **Propósito**: Gerencia histórico de leitura e notas de estudo
- **Funcionalidades**:
  - Salva histórico local e na nuvem
  - Gerencia notas de estudo
  - Sincronização automática
- **Integração**: Supabase (reading_history, study_notes)

#### useAccessibilityAssistant.tsx
- **Propósito**: Assistente de acessibilidade
- **Funcionalidades**:
  - Síntese de voz
  - Atalhos de teclado
  - Navegação por voz

#### useBibleData.tsx
- **Propósito**: Carregamento de dados bíblicos
- **Integração**: Arquivos JSON locais

### 🌐 Páginas (`/pages`)

#### VersoesBiblia.tsx
- **Rota**: `/versoes`
- **Propósito**: Seleção de versões da Bíblia

#### LeitorBiblia.tsx
- **Rota**: `/biblia/:livro/:capitulo`
- **Propósito**: Página principal de leitura

#### BibleSlide.tsx
- **Rota**: `/slide/:livro/:capitulo`
- **Propósito**: Modo apresentação para projeção

#### Dictionary.tsx
- **Rota**: `/dicionario`
- **Propósito**: Dicionário bíblico

### 🔧 Serviços (`/services`)

#### bibleService.ts
- **Propósito**: Serviços para busca de versículos
- **Funcionalidades**:
  - Carregamento de capítulos
  - Busca de versículos específicos
  - Cache de dados

### 🗄️ Integração com Supabase (`/integrations`)

#### client.ts
- **Propósito**: Cliente Supabase configurado
- **Configuração**: URL e chave anônima via variáveis de ambiente

## 🗃️ Banco de Dados (Supabase)

### Tabelas

#### 📖 reading_history
```sql
- id: uuid (PK)
- user_id: uuid (FK -> auth.users)
- livro: text
- capitulo: integer
- versiculo: integer
- versao: text
- texto: text
- created_at: timestamp
```
**Propósito**: Armazena histórico de leitura do usuário

#### 📝 study_notes
```sql
- id: uuid (PK)
- user_id: uuid (FK -> auth.users)
- livro: text
- capitulo: integer
- versiculo: integer
- versao: text
- note: text
- created_at: timestamp
- updated_at: timestamp
```
**Propósito**: Notas de estudo personalizadas

#### 🔖 bookmarks
```sql
- id: uuid (PK)
- user_id: uuid (FK -> auth.users)
- livro: text
- capitulo: integer
- versiculo: integer
- versao: text
- texto: text
- note: text
- created_at: timestamp
```
**Propósito**: Versículos favoritos/marcados

### 🔒 Políticas RLS (Row Level Security)
- Todos os dados são isolados por usuário
- Usuários só acessam seus próprios dados
- Políticas para SELECT, INSERT, UPDATE, DELETE

## 🔄 Fluxo de Dados

### Autenticação
1. **Login** → AuthContext → Supabase Auth → Estado global
2. **Dados do usuário** → Sincronização automática → Tabelas do usuário

### Leitura da Bíblia
1. **Seleção** → BibleContext → Carregamento JSON → Exibição
2. **Histórico** → useReadingHistory → Supabase/LocalStorage

### Notas e Favoritos
1. **Criação** → useReadingHistory → Supabase → Estado local
2. **Sincronização** → Automática entre dispositivos

## 🎨 Sistema de Estilos

### Tailwind CSS
- **Tema**: Azul como cor primária
- **Responsividade**: Mobile-first
- **Componentes**: Shadcn/UI

### Acessibilidade
- **Síntese de voz**: Web Speech API
- **Atalhos**: Navegação por teclado
- **Contraste**: Cores acessíveis

## 📦 Dependências Principais

### Runtime
- `@supabase/supabase-js`: Cliente Supabase
- `@tanstack/react-query`: Cache e estado servidor
- `react-router-dom`: Roteamento
- `sonner`: Notificações toast
- `lucide-react`: Ícones

### Build
- `vite`: Bundler
- `typescript`: Tipagem estática
- `tailwindcss`: Estilos

## 🚀 Build e Deploy

### Desenvolvimento
```bash
npm run dev  # Servidor local na porta 8080
```

### Produção
```bash
npm run build  # Build otimizado
```

### Deploy
- **Platform**: Lovable (automático)
- **Domínio**: *.lovable.app

## 🔧 Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

## 🔗 Interconexões entre Arquivos

### Principais Fluxos
1. **App.tsx** → Provedores → Roteamento → Páginas
2. **AuthContext** ↔ **UserProfile** ↔ **useReadingHistory**
3. **BibleContext** ↔ **LeitorBiblia** ↔ **BibleVerse**
4. **useReadingHistory** ↔ **Supabase** ↔ **LocalStorage**

### Dependências Críticas
- AuthContext depende de Supabase
- useReadingHistory depende de AuthContext
- BibleSidebar depende de UserProfile e ReadingHistoryPanel
- Todas as páginas dependem dos contextos globais
