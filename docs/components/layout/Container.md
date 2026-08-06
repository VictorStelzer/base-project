# Container

> Exportado de `src/components/layout/PageContainer` como `Container` (o arquivo-fonte se chama `Container.tsx`, dentro da pasta `PageContainer`).

Wrapper de layout que combina três camadas: um `Box` customizado do kit (padding), o `Container` do MUI (`maxWidth="xl"`, altura 100%) e outro `Box` customizado interno em flexbox (`displayFlex`, `full`, mais as props de flex recebidas). Usado para centralizar e limitar a largura de uma seção de página, com atalhos de padding/flexbox/tamanho/posição/visibilidade do kit em vez de `sx` manual.

## Quando usar

Usar para envolver o conteúdo de uma seção ou página inteira que precisa ficar centralizada e com largura máxima controlada pelo grid do MUI (`xl`), controlando o layout interno via props do kit (`row`, `column`, `center`, `gap`, etc.). É o que `Header` e `Footer` usam como wrapper principal. Não usar para elementos que precisam ocupar a tela toda sem limite de largura (ex: um fundo full-bleed) — nesse caso use `Box` diretamente, já que o `maxWidth="xl"` do MUI `Container` é fixo e não é configurável via prop.

## Props

`ContainerProps` (`src/components/layout/PageContainer/types.ts`) estende `BoxProps` (`src/components/ui/Box/types.ts`) e adiciona `children`:

```ts
export interface ContainerProps extends BoxProps {
    children?: React.ReactNode;
}
```

`BoxProps`, por sua vez, estende `SpacingProps`, `FlexProps`, `RadiusProps`, `SizeProps`, `PositionStyleProps`, `VisibilityProps` (todos em `src/components/styles/types.ts`) e `Omit<MuiBoxProps, ConflictingProps>`, além de props próprias (`shadow`, `shadowColor`, `shadowSecondary`, `paper`, `hover`, `bgcolor`).

Todas as props abaixo, exceto `children` e `sx`, são repassadas via `{...props}` para o `Box` externo. As props de flexbox (`row`, `column`, `center`, `between`, `around`, `evenly`, `justifyContent`, `alignItems`, `gap`) são repassadas de novo, explicitamente, para o `Box` interno — ver Notas.

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `children` | `React.ReactNode` | Não | — | Conteúdo renderizado dentro do container. |
| `sx` | `SxProps` (MUI) | Não | — | Aplicado **apenas** no `Box` interno (o mais aninhado), não no `Box` externo nem no `Container` do MUI. |
| `row` | `boolean \| BreakpointKey` | Não | — | Direção flex em linha. Se for uma `BreakpointKey` (ex: `'md'`), fica em coluna abaixo do breakpoint e vira linha a partir dele. |
| `column` | `boolean \| BreakpointKey` | Não | — | Direção flex em coluna (mesma lógica responsiva de `row`, invertida). |
| `center` | `boolean` | Não | — | Centraliza (`justifyContent` e `alignItems` como `center`). |
| `between` | `boolean` | Não | — | `justifyContent: space-between`. |
| `around` | `boolean` | Não | — | `justifyContent: space-around`. |
| `evenly` | `boolean` | Não | — | `justifyContent: space-evenly`. |
| `justifyContent` | `ResponsiveProp<boolean \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly' \| 'flex-start' \| 'flex-end'>` | Não | — | `justify-content` customizado (responsivo). |
| `alignItems` | `ResponsiveProp<boolean \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly' \| 'flex-start' \| 'flex-end'>` | Não | — | `align-items` customizado (responsivo). |
| `gap` | `ResponsiveProp<number \| string>` | Não | — | Espaçamento entre itens flex (responsivo). |
| `displayFlex` | `boolean \| 'row' \| 'column' \| 'center'` | Não | — | Liga o `Box` externo em modo flex (o `Box` interno já é sempre flex, independentemente desta prop). |
| `full` | `boolean` | Não | — | `width: 100%; height: 100%`. Só afeta o `Box` externo — o `Box` interno já recebe `full` fixo no código, sempre ocupando 100% do `Container` do MUI. |
| `p`, `pt`, `pb`, `pl`, `pr`, `px`, `py` | `ResponsiveProp<string \| number>` (`p` também aceita `boolean`) | Não | `p` e `px={1}` aplicados por padrão no `Box` externo | Padding (`SpacingProps`, herdado). Passar `p`/`px` explicitamente sobrescreve o padrão. |
| `m`, `mt`, `mb`, `ml`, `mr`, `mx`, `my` | `ResponsiveProp<string \| number>` | Não | — | Margin (`SpacingProps`, herdado). |
| `radius` | `boolean \| number` | Não | — | Arredondamento de borda (`RadiusProps`, herdado). Aplicado só no `Box` externo. |
| `circle` | `boolean` | Não | — | Força formato circular (`RadiusProps`, herdado). |
| `square` | `boolean` | Não | — | Remove arredondamento (`RadiusProps`, herdado). |
| `height`, `width` | `ResponsiveProp<string \| number>` | Não | — | Dimensões (`SizeProps`, herdado). Aplicadas só no `Box` externo — o `Container` do MUI interno já tem `height: '100%'` fixo via `sx`. |
| `position` | `ResponsiveProp<'static' \| 'relative' \| 'absolute' \| 'fixed' \| 'sticky'>` | Não | — | Posicionamento CSS (`PositionStyleProps`, herdado). Aplicado só no `Box` externo. |
| `top`, `left`, `right`, `bottom` | `ResponsiveProp<string \| number>` | Não | — | Offsets de posicionamento (`PositionStyleProps`, herdado). |
| `zIndex` | `ResponsiveProp<number>` | Não | — | `z-index` (`PositionStyleProps`, herdado). |
| `hideUp` | `BreakpointKey` | Não | — | Esconde o componente a partir do breakpoint informado (`VisibilityProps`, herdado). |
| `hideDown` | `BreakpointKey` | Não | — | Esconde o componente abaixo do breakpoint informado (`VisibilityProps`, herdado). |
| `shadow` | `boolean \| number` | Não | — | Sombra pré-definida do MUI (índice 0–24, ou `true` = índice 4). |
| `shadowColor` | `string` | Não | — | Cor da sombra (aceita caminho do tema). |
| `shadowSecondary` | `boolean` | Não | — | Sombra suave alternativa (índice 1). |
| `paper` | `boolean` | Não | — | Aplica `background.paper` do tema como cor de fundo. |
| `bgcolor` | `string` | Não | — | Cor de fundo customizada (aceita caminho do tema, ex: `'primary.main'`). |
| `hover` | `boolean \| HoverProps` | Não | — | Efeito de hover. `true` aplica um padrão; objeto customiza `shadow`, `shadowColor`, `bgcolor`, `color`, `borderColor`, `borderWidth`, `scale`, `zoom`, `opacity`. |
| `...props` (nativas do MUI `Box`) | `Omit<MuiBoxProps, ConflictingProps>` | Não | — | Demais props nativas do `Box` do MUI não sobrescritas pelo kit (ex: `component`, `className`, `id`, `onClick`, `role`, etc.), repassadas ao `Box` externo. |

## Exemplo de uso

```tsx
import { Container } from '@/components';

<Container row center gap={4} py={6}>
  <div>Conteúdo à esquerda</div>
  <div>Conteúdo à direita</div>
</Container>
```

## Dependências relevantes

- `@mui/material` — usa o `Container` do MUI internamente (importado como `ContainerMUI`), com `maxWidth="xl"` fixo.
- `Box` (`src/components/ui/Box`) — usado duas vezes: uma vez como wrapper externo (padding) e uma vez como wrapper interno (flexbox). É de onde vêm a maioria das props herdadas (`BoxProps`).
- Requer um `ThemeProvider` do MUI ativo para os estilos de `Box` (espaçamento, cores, sombra, etc.) resolverem corretamente.

## Notas

- Estrutura de renderização: `Box` (externo, padding) → `Container` do MUI (`maxWidth="xl"`, `height: 100%`) → `Box` (interno, flexbox, `full`, `sx`).
- Padding padrão: o `Box` externo recebe `p` e `px={1}` como valores literais no JSX; se `p`/`px` forem passados via props, eles sobrescrevem esses literais (a ordem do spread `{...props}` vem depois).
- As props de flexbox (`row`, `column`, `center`, `between`, `around`, `evenly`, `justifyContent`, `alignItems`, `gap`) são repassadas duas vezes: uma vez implicitamente para o `Box` externo (fazem parte do `{...props}` espalhado nele) e uma vez explicitamente para o `Box` interno. Na prática, isso pode fazer com que ambos os `Box`es apliquem `display: flex` e a mesma direção/alinhamento simultaneamente. ⚠️ Não está claro pelo código se essa duplicação é intencional ou um efeito colateral — comportamento não documentado no código-fonte.
- `sx` só chega ao `Box` interno — não há como estilizar via `sx` o `Box` externo ou o `Container` do MUI diretamente por essa prop.
- `maxWidth` do `Container` do MUI é fixo em `"xl"` no código-fonte — não existe prop para configurá-lo.
- `displayFlex` e `full` passados via props só afetam o `Box` externo; o `Box` interno já tem ambos fixos no JSX (`displayFlex` e `full` sem valor, ou seja, `true`), então o conteúdo sempre ocupa 100% do `Container` do MUI em modo flex, independentemente dessas props.
