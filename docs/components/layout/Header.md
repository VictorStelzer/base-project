# Header

Componente de seção de cabeçalho da página. Renderiza logo (clicável, navega para `/`), links de navegação e o botão de alternância de tema (`ToggleTheme`). Fica fixo no topo (`sticky`). Todo o conteúdo é lido de arquivos de constants — não recebe nada via props.

## Quando usar

Usar uma vez por layout/página, no topo da árvore de componentes (ex: dentro do layout raiz do app). Não é feito para ser reaproveitado com conteúdos diferentes por instância — links e logo devem ser alterados em `src/constants/header.ts` e `src/constants/images.ts`, não via props. Precisa estar renderizado dentro de um contexto de rotas do `react-router-dom` (ex: dentro de `<BrowserRouter>`), pois usa `useNavigate` internamente.

## Props

Este componente **não aceita props** — é declarado como `React.FC` sem props (`export const Header: React.FC = () => {...}`), assim como o `Footer`. Todo o conteúdo exibido vem fixo de:

- `HEADER` (`src/constants/header.ts`) — links de navegação.
- `IMAGES.site.logo` (`src/constants/images.ts`) — logo exibida.

Para alterar o conteúdo do header, edite esses arquivos de constants.

## Exemplo de uso

```tsx
import { Header } from '@/components';

// Precisa estar dentro de um Router do react-router-dom
<Header />
```

## Dependências relevantes

- `react-router-dom` — usa o hook `useNavigate` para navegar até `/` ao interagir com o logo. Sem um `Router` (`BrowserRouter`/equivalente) envolvendo o componente, `useNavigate` lança erro em runtime.
- `src/constants/header.ts` (`HEADER.Home`) — lista de links de navegação exibidos (`{ label, href }`).
- `src/constants/images.ts` (`IMAGES.site.logo`) — `src` do logo exibido no header.
- Componentes internos do kit usados: `Container` (de `src/components/layout/PageContainer`), `Image`, `TextButton`, `ToggleTheme` — todos importados de `@/components`.
- Requer um `ThemeProvider` do MUI ativo (usa cores de tema: `background.default`, `text.secondary`, `primary.main`).

## Notas

- ⚠️ Conteúdo ainda não definido / em desenvolvimento: `HEADER.Home` hoje tem um único link placeholder (`{ label: '', href: '#' }`) — não é bug.
- ⚠️ `IMAGES.site.logo` está vazio (`''`) — a `Image` do logo ainda não tem uma imagem real configurada.
- O logo é tratado como elemento interativo customizado para acessibilidade: recebe `role="button"`, `tabIndex={0}` e um handler de teclado (`Enter` ou `Espaço` disparam `goHome`), além do `onClick` — mas continua sendo uma tag `<img>` (`Image`), não um `<button>` nativo.
- O `Container` usado como wrapper é fixado com `position="sticky"`, `top={0}`, `zIndex={1100}` e `height="10vh"` diretamente no JSX — não configurável, pois o componente não recebe props.
- O layout distribui logo, links e `ToggleTheme` com `alignItems` + `between` (justify `space-between`) no `Container`; como hoje só existe um link em `HEADER.Home`, o efeito visual do espaçamento só fica evidente quando mais links forem adicionados à constant.
