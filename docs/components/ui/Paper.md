# Paper

`Paper` é um wrapper estilizado do `Paper` do MUI, com suporte a espaçamento, flexbox, tamanho, arredondamento, hover, cor de fundo customizada e efeito de vidro (glassmorphism), seguindo o mesmo sistema de estilos compartilhado dos demais componentes do projeto.

## Quando usar

Use para superfícies elevadas/contêineres visuais (cards, painéis, seções destacadas) que precisam de elevação/fundo consistentes com o design system, sem repetir `sx` manualmente. Para um agrupamento simples sem elevação/fundo, prefira `Box`.

## Props

| Prop      | Tipo                                                                                                      | Obrigatório | Padrão | Descrição                                                                 |
|-----------|-------------------------------------------------------------------------------------------------------------|-------------|--------|--------------------------------------------------------------------------|
| `hover`   | `boolean \| { shadow?, bgcolor?, color?, borderColor?, borderWidth?, scale?, opacity? }`                     | Não         | —      | Efeito de hover. `true` aplica um efeito padrão; objeto customiza propriedades específicas. |
| `bgcolor` | `string`                                                                                                      | Não         | —      | Cor de fundo customizada, acessando o tema (ex: `'primary.main'`).       |
| `glass`   | `boolean`                                                                                                     | Não         | —      | Efeito de vidro fosco (glassmorphism): fundo translúcido + blur + borda sutil, adaptado ao modo claro/escuro do tema. |

Props herdadas de tipos compartilhados (`SpacingProps`, `SizeProps`, `FlexProps`, `RadiusProps`, `VisibilityProps`):

| Prop                                                          | Tipo                                                                 | Obrigatório | Padrão | Descrição                                                        |
|-----------------------------------------------------------------|-------------------------------------------------------------------------|-------------|--------|--------------------------------------------------------------------|
| `p, pr, pl, pt, pb, px, py`                                      | `ResponsiveProp<string \| number>` (`p` aceita também `boolean`)         | Não         | —      | Padding (`SpacingProps`). `p={true}` equivale a `20px`, `p={false}` a `0`. |
| `m, ml, mr, mt, mb, mx, my`                                      | `ResponsiveProp<string \| number>`                                       | Não         | —      | Margin (`SpacingProps`).                                          |
| `height, width`                                                  | `ResponsiveProp<string \| number>`                                       | Não         | —      | Dimensões (`SizeProps`).                                          |
| `displayFlex, row, column, center, between, around, evenly, full, justifyContent, alignItems, gap` | vários (ver `FlexProps`)                          | Não         | —      | Layout flexbox (`FlexProps`).                                     |
| `radius, circle, square`                                         | `boolean \| number` / `boolean` / `boolean`                             | Não         | —      | Arredondamento (`RadiusProps`). `square` também é uma prop nativa do `Paper` do MUI — ambas convergem para o mesmo comportamento aqui. |
| `hideUp, hideDown`                                               | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                   | Não         | —      | Visibilidade responsiva (`VisibilityProps`).                     |

Além dessas, aceita as demais props nativas do `Paper` do MUI (`elevation`, `variant`, `component`, `sx`, `children`, etc.).

## Exemplo de uso

```tsx
import { Paper } from '@/components';

<Paper p={2} radius={16} hover={{ scale: 1.02, shadow: 8 }}>
  Conteúdo do card
</Paper>
```

Com efeito de vidro:

```tsx
<Paper glass p={3} radius={12}>
  Conteúdo sobre uma imagem de fundo
</Paper>
```

## Dependências relevantes

- `Paper` do MUI (`@mui/material`), estilizado via `styled()`.
- Tema MUI (`alpha`, `theme.palette.mode`, etc. — precisa de `ThemeProvider`).
- Funções `getColor`, `getSpacingStyles`, `getRadiusStyles`, `getFlexStyles`, `getHoverStyles`, `getSizeStyles`, `getVisibilityStyles` de `@/components/styles`.

## Notas

- `p` (e demais props de espaçamento) aceitam `boolean` além de `number`/`string`: `true` resolve para `20px` fixo, `false` para `0` — diferente de simplesmente omitir a prop.
- O efeito `glass` usa cores fixas (`alpha('#000', 0.2)` no modo escuro, `alpha('#fff', 0.2)` no modo claro) — não há prop para customizar a intensidade do blur ou a cor do vidro.
- `hover` desta versão do `Paper` só aceita um subconjunto das propriedades de `BaseHoverProps` (`shadow`, `bgcolor`, `color`, `borderColor`, `borderWidth`, `scale`, `opacity`) — não inclui `shadowColor` nem `zoom`, presentes em `Box`/`Image`.
