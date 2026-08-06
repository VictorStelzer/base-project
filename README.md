# base-project

Base reutilizável em **React + TypeScript + MUI (Material UI)** para começar novos sites.
Não é um site pronto — é um ponto de partida: clone o projeto e já tem um kit de
componentes estilizáveis (Box, Button, Input, Modal, Timeline, etc.), tema customizado,
rotas e contextos básicos configurados.

> ⚠️ Projeto em desenvolvimento ativo. Existem componentes incompletos, stubs e partes
> ainda não conectadas a nada (ex.: `Badge` é hoje só um re-export do MUI, páginas
> privadas e alguns dados de navegação são placeholder). Isso é esperado.

## Stack

- React 19 (function components + hooks)
- TypeScript
- MUI (Material UI) v9 — tema customizado, `sx`, `styled()`
- React Router 7
- Vite 8

## Como rodar

```bash
npm install
npm run dev          # ambiente de desenvolvimento (com --host)
```

Outros scripts disponíveis:

| Script            | O que faz                                  |
|--------------------|---------------------------------------------|
| `npm run dev`      | Sobe o servidor de desenvolvimento (Vite)   |
| `npm run build:dev`| Build usando o modo `dev`                   |
| `npm run build:hml`| Build usando o modo `hml` (homologação)     |
| `npm run build:prd`| Build usando o modo `prd` (produção)        |
| `npm run lint`     | Roda o ESLint no projeto                    |
| `npm run preview`  | Serve o build gerado localmente             |

## Estrutura de pastas

```
src/
├── components/     # kit de componentes reutilizáveis (o coração do projeto)
│   ├── ui/         # componentes de UI genéricos (Button, Input, Modal, Timeline...)
│   ├── feedback/   # Drawer, Modal, Snackbar
│   ├── layout/     # Header, Footer, Container
│   ├── commons/    # reservada para componentes compartilhados (vazia hoje)
│   └── styles/     # helpers internos de estilo (spacing, cor, hover, etc.), usados
│                   # por todos os componentes acima — não são componentes em si,
│                   # então não têm doc própria
├── constants/      # dados estáticos (links de navegação, imagens, rotas)
├── contexts/       # ThemeContext, NotificationContext, MobileContext
├── hooks/          # useThemeMode, useNotification, useMobile
├── layouts/        # layouts de página (autenticado / não autenticado)
├── pages/          # páginas da aplicação
├── routes/         # definição de rotas (públicas/privadas)
├── schemas/        # (vazio hoje — reservado para schemas de validação)
├── services/       # (vazio hoje — reservado para chamadas de API)
├── themes/         # configuração de tema claro/escuro do MUI
├── types/          # tipos globais compartilhados
└── utils/          # funções utilitárias (máscaras, validação)
```

## Documentação dos componentes

Cada componente do kit (`src/components/ui/`, `src/components/feedback/` e
`src/components/layout/`) tem sua própria página em [`docs/components/`](./docs/components),
com props, exemplo de uso e dependências. Comece por lá antes de usar um componente pela
primeira vez.
