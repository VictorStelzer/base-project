# TextButton

Link estilizado como texto (baseado no `Link` do MUI), com integração automática ao `react-router-dom`: decide sozinho se deve navegar via `RouterLink` (rota interna), fazer scroll suave até uma âncora (`#id`) ou abrir um link externo (`http`, `mailto`, `tel`) em nova aba.

## Quando usar

Use para links de texto (navegação interna, âncoras na mesma página, ou links externos) que precisam se comportar corretamente sem lógica manual de navegação no componente que os usa. Não é um botão de ação (`<button>`) — para isso use um componente de botão dedicado; este é semanticamente um link (`<a>`).

## Props

| Prop            | Tipo                                                          | Obrigatório | Padrão   | Descrição |
|-----------------|-----------------------------------------------------------------|-------------|----------|-----------|
| `href`          | `string`                                                         | Não         | —        | Destino do link. Se começar com `#`, faz scroll suave até o elemento com esse `id` na página. Se começar com `http`, `mailto` ou `tel`, abre como link externo (`target="_blank"`, `rel="noopener noreferrer"`). Caso contrário, é tratado como rota interna. |
| `to`            | `string`                                                         | Não         | —        | Rota interna (via `react-router-dom`). Usado quando `href` não é âncora nem externo; se ambos forem informados, `to` tem prioridade sobre `href` como destino (`to || href || '#'`). |
| `underline`     | `'none' \| 'hover' \| 'always'`                                   | Não         | `'none'` | Estilo de sublinhado do link (prop nativa do MUI `Link`). |
| `hover`         | `{ color?: string; scale?: number; opacity?: number }`            | Não         | —        | Efeito de hover customizado — versão simplificada do `BaseHoverProps` do kit, só com cor, escala e opacidade. |
| `height`        | `string \| number` (responsivo)                                  | Não         | —        | Altura. |
| `width`         | `string \| number` (responsivo)                                  | Não         | —        | Largura. |
| `displayFlex`   | `boolean \| 'row' \| 'column' \| 'center'`                        | Não         | —        | Ativa `display: flex` no layout interno. |
| `row`           | `boolean \| BreakpointKey`                                       | Não         | —        | Direção flex em linha. |
| `column`        | `boolean \| BreakpointKey`                                       | Não         | —        | Direção flex em coluna. |
| `center`        | `boolean`                                                         | Não         | —        | Centraliza itens (flex). |
| `between`       | `boolean`                                                         | Não         | —        | `justify-content: space-between`. |
| `around`        | `boolean`                                                         | Não         | —        | `justify-content: space-around`. |
| `evenly`        | `boolean`                                                         | Não         | —        | `justify-content: space-evenly`. |
| `full`          | `boolean`                                                         | Não         | —        | Ocupa 100% de largura/altura disponível. |
| `justifyContent`| valores de `justify-content` (responsivo)                         | Não         | —        | Controle direto de `justify-content`. |
| `alignItems`    | valores de `align-items` (responsivo)                             | Não         | —        | Controle direto de `align-items`. |
| `gap`           | `number \| string` (responsivo)                                   | Não         | —        | Espaçamento entre itens flex. |
| `fontSize`      | `string \| number` (responsivo)                                  | Não         | —        | Tamanho da fonte. |
| `fontWeight`    | `string \| number` (responsivo)                                  | Não         | —        | Peso da fonte. |
| `textAlign`     | `'left' \| 'center' \| 'right' \| 'justify' \| 'inherit'` (responsivo) | Não  | —        | Alinhamento do texto. |
| `letterSpacing` | `string \| number` (responsivo)                                  | Não         | —        | Espaçamento entre letras. |
| `lineHeight`    | `string \| number` (responsivo)                                  | Não         | —        | Altura da linha. |
| `p`, `pr`, `pl`, `pt`, `pb`, `px`, `py` | `boolean \| number \| string` (responsivo, `p`); `string \| number` (responsivo, demais) | Não | — | Padding (geral/direcional). |
| `m`, `ml`, `mr`, `mt`, `mb`, `mx`, `my` | `string \| number` (responsivo)                  | Não         | —        | Margin (geral/direcional). |
| `hideUp`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                            | Não         | —        | Esconde o componente a partir do breakpoint informado (inclusive para cima). |
| `hideDown`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                            | Não         | —        | Esconde o componente abaixo do breakpoint informado. |

Além dessas, aceita as demais props nativas do `Link` do MUI (`color`, `variant`, `onClick`, `children`, `sx`, etc.) e parcialmente as do `Link` do `react-router-dom` (exceto `color`, que é sobrescrita pela do MUI), exceto as que colidem com as props de espaçamento/dimensão/flex/tipografia acima.

## Exemplo de uso

```tsx
import { TextButton } from '@/components';

// Rota interna
<TextButton to="/sobre">Sobre nós</TextButton>

// Âncora na mesma página (scroll suave)
<TextButton href="#contato">Ir para contato</TextButton>

// Link externo (abre em nova aba)
<TextButton href="https://exemplo.com">Site externo</TextButton>

// Com hover customizado
<TextButton to="/produtos" hover={{ color: 'primary.main', scale: 1.05 }}>
  Produtos
</TextButton>
```

## Dependências relevantes

- `@mui/material` (`Link`).
- `react-router-dom` (`Link` como `RouterLink`, `useNavigate`) — necessário que o componente esteja dentro de um `Router` (ex: `BrowserRouter`) da aplicação.
- `@/components/styles` — helpers `getSpacingStyles`, `getHoverStyles`, `getFlexStyles`, `getSizeStyles`, `getTypographyStyles`, `getVisibilityStyles`.

## Notas

- A lógica de decisão de comportamento (âncora / externo / rota interna) é baseada só no prefixo da string de `href` (`#`, `http`, `mailto`, `tel`). Se `href` não bater com nenhum desses prefixos e `to` não for informado, o componente usa `href` como valor de `to` (rota interna) — ou `'#'` se nenhum dos dois for passado.
- Para âncoras e links externos, o clique também dispara `onClick` (se informado) depois da lógica interna (`scrollIntoView` ou nada, no caso de externo). Para rotas internas, `onClick` é passado direto ao `RouterLink` sem lógica adicional (o `handleClick` com `preventDefault`/`navigate` só é usado no caminho de âncora/externo).
- Em links externos, `target="_blank"` e `rel="noopener noreferrer"` são aplicados automaticamente — não há como desativar isso via prop.
