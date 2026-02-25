# Nexo Frontend

O **Nexo Frontend** é uma plataforma moderna para orquestração e simulação visual de fluxos de automação. O projeto foi construído com foco em alta performance, interfaces ricas e tipagem estrita de ponta a ponta.

## 🚀 Stack Tecnológica

O projeto utiliza o que há de mais eficiente no ecossistema atual de desenvolvimento Web:

- **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vite.dev/)
- **Roteamento**: [TanStack Router](https://tanstack.com/router) (Roteamento 100% type-safe com suporte a layouts e preloading)
- **Engine de Fluxos**: [XYFlow / React Flow](https://reactflow.dev/) (Motor visual para construção de grafos e automações)
- **Estado de Servidor**: [TanStack Query v5](https://tanstack.com/query) & [Axios](https://axios-http.com/)
- **Estado Global**: [Zustand](https://docs.pmnd.rs/zustand/) (Gerenciamento de estado leve e escalável)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) (Estilização baseada em variáveis CSS nativas)
- **Autenticação**: [Better Auth](https://better-auth.com/)
- **Real-time**: [Socket.io](https://socket.io/) (Para feedback e simulações instantâneas)
- **Qualidade de Código**: [Biome](https://biomejs.dev/) (Linting e formatação ultrarrápida em uma única ferramenta)

## 🏗️ Arquitetura e Organização

A estrutura do projeto é organizada por **Módulos de Domínio (Features)**, facilitando a manutenção e a escalabilidade:

```text
src/
├── api/             # Configuração do Axios, instâncias e hooks globais de API
├── features/        # Regras de negócio divididas por domínios (flow, chat, etc)
│   └── [feature]/   # Componentes, hooks, stores e tipos locais da funcionalidade
├── pages/           # Definição das rotas e telas principais (File-based routing)
├── shared/          # Componentes de UI, contextos e hooks utilitários reutilizáveis
├── types/           # Definições de tipos globais e contratos de dados
└── utils/           # Funções auxiliares puras
```

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 18.x ou superior
- Gerenciador de pacotes (NPM, PNPM ou Yarn)

### Setup Inicial
1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto (ou `.env.local`):
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_SOCKET_URL=http://localhost:3000
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Principais Comandos
- `npm run dev`: Roda o ambiente de desenvolvimento.
- `npm run build`: Compila o projeto para produção usando o compilador do TypeScript (`tsc`) e Vite.
- `npm run lint`: Executa a análise estática do código.
- `npx @biomejs/biome check --write .`: Formata e corrige problemas de lint automaticamente via Biome.

## 📋 Padrões de Desenvolvimento

- **Screaming Architecture**: A estrutura de pastas deixa claro o que o sistema faz (Fluxos, Chat, Simulador).
- **Type Safety**: Priorizamos inferência de tipos e contratos rígidos com o backend.
- **Componentização**: Componentes de UI "burros" em `shared/` e componentes de negócio em `features/`.
- **CSS-in-JS Zero**: Foco total em utilitários CSS e variáveis nativas do Tailwind 4.

---
Desenvolvido com foco em qualidade e experiência de desenvolvedor (DX).
