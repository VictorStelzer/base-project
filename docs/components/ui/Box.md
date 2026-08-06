# Box

`Box` é o primitivo de layout do projeto: um wrapper em cima do `Box` do MUI que adiciona
props de conveniência para espaçamento, flexbox, dimensão, posição, arredondamento, sombra,
cor de fundo, hover e visibilidade responsiva — tudo via props, sem precisar escrever `sx`
na mão.

## Quando usar

Use como substituto padrão do `Box` do MUI sempre que precisar de um container genérico
(div estilizada) com espaçamento, flex, tamanho, sombra ou hover. É a base sobre a qual
outros componentes do projeto (ex: `Icon`) são construídos.

Não use quando precisar de um elemento com semântica própria e comportamento nativo
(ex: um botão real — use `IconButton`/`Button`; um separador — use `Divider`). Para isso
existem componentes mais específicos.

## Props

Muitas props abaixo aceitam `ResponsiveProp<T>`, ou seja, o valor direto (`T`) ou um objeto
por breakpoint (`{ xs, sm, md, lg, xl }`), definido em `src/components/styles/types.ts`.

Além das props listadas, `Box` aceita todas as props nativas do `Box` do MUI (`sx`,
`component`, `className`, `children`, etc.) — não reproduzidas aqui por virem direto da
tipagem do MUI, não deste projeto.

### Props próprias

| Prop              | Tipo                  | Obrigatório | Padrão | Descrição |
|--------------------|-----------------------|-------------|--------|-----------|
| `shadow`           | `boolean \| number`   | Não         | —      | Sombra pré-definida do tema. `true` usa a sombra de índice 4; `number` usa `theme.shadows[n]` (0-24). |
| `shadowColor`      | `string`               | Não         | —      | Cor aplicada à sombra (`shadow` ou `shadowSecondary`). Aceita caminho do tema (ex: `primary.main`) ou cor CSS. |
| `shadowSecondary`  | `boolean`               | Não         | —      | Sombra suave alternativa (`theme.shadows[1]`). Se `shadow` também estiver definido, `shadowSecondary` vence (é aplicado por último). |
| `paper`            | `boolean`               | Não         | —      | Aplica `theme.palette.background.paper` como cor de fundo. |
| `bgcolor`          | `string`                | Não         | —      | Cor de fundo customizada. Aceita caminho do tema (ex: `primary.main`) ou cor CSS. |
| `hover`            | `boolean \| HoverProps` | Não         | —      | Efeito de hover. `true` aplica sombra padrão (`theme.shadows[6]`). Objeto customiza `shadow`, `shadowColor`, `bgcolor`, `color`, `borderColor`, `borderWidth`, `scale`, `zoom`, `opacity` (ver Notas). |

### Props herdadas de `SpacingProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `p`  | `ResponsiveProp<boolean \| number \| string>` | Não | — | Padding geral. `true` = 20px fixo; `number` = `theme.spacing(n)`; `string` = valor CSS direto. |
| `pr`, `pl`, `pt`, `pb` | `ResponsiveProp<string \| number>` | Não | — | Padding direcional (direita/esquerda/topo/baixo). `number` = `theme.spacing(n)`. |
| `px`, `py` | `ResponsiveProp<string \| number>` | Não | — | Padding horizontal (`px`) ou vertical (`py`), aplicado nos dois lados correspondentes. |
| `m`, `ml`, `mr`, `mt`, `mb` | `ResponsiveProp<string \| number>` | Não | — | Margin geral/direcional, mesma lógica de `p`/`pr`/etc. |
| `mx`, `my` | `ResponsiveProp<string \| number>` | Não | — | Margin horizontal (`mx`) ou vertical (`my`). |

### Props herdadas de `FlexProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `displayFlex` | `boolean \| 'row' \| 'column' \| 'center'` | Não | — | Ativa `display: flex`. `'column'` define a direção; `'center'` centraliza (`justifyContent` e `alignItems`). |
| `row` | `boolean \| BreakpointKey` | Não | — | Ativa flex em linha. Se receber um breakpoint (ex: `'md'`), o layout é `column` abaixo dele e `row` a partir dele. |
| `column` | `boolean \| BreakpointKey` | Não | — | Ativa flex em coluna. Com breakpoint, é `row` abaixo dele e `column` a partir dele. |
| `center` | `boolean` | Não | — | Ativa flex e centraliza (`justifyContent`/`alignItems: center`). |
| `between` | `boolean` | Não | — | Ativa flex com `justifyContent: space-between`. |
| `around` | `boolean` | Não | — | Ativa flex com `justifyContent: space-around`. |
| `evenly` | `boolean` | Não | — | Ativa flex com `justifyContent: space-evenly`. |
| `full` | `boolean` | Não | — | Aplica `width: 100%` e `height: 100%`. |
| `justifyContent` | `ResponsiveProp<boolean \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly' \| 'flex-start' \| 'flex-end'>` | Não | — | Valor bruto de `justify-content`. `true` equivale a `'center'`. Ativa flex. |
| `alignItems` | `ResponsiveProp<boolean \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly' \| 'flex-start' \| 'flex-end'>` | Não | — | Valor bruto de `align-items`. `true` equivale a `'center'`. Ativa flex. |
| `gap` | `ResponsiveProp<number \| string>` | Não | — | `gap` do flexbox. `number` = `theme.spacing(n)`. Ativa flex. |

### Props herdadas de `RadiusProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `radius` | `boolean \| number` | Não | — | `number` define `border-radius` em px direto; qualquer outro valor truthy usa `theme.shape.borderRadius`. |
| `circle` | `boolean` | Não | — | `border-radius: 50%`. Tem prioridade sobre `radius` e `square`. |
| `square` | `boolean` | Não | — | `border-radius: 0`. Tem prioridade sobre `radius` (mas não sobre `circle`). |

### Props herdadas de `SizeProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `height` | `ResponsiveProp<string \| number>` | Não | — | Valor CSS direto de `height` (não passa por `theme.spacing`). |
| `width`  | `ResponsiveProp<string \| number>` | Não | — | Valor CSS direto de `width` (não passa por `theme.spacing`). |

### Props herdadas de `PositionStyleProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `position` | `ResponsiveProp<'static' \| 'relative' \| 'absolute' \| 'fixed' \| 'sticky'>` | Não | — | Valor CSS direto de `position`. |
| `top`, `left`, `right`, `bottom` | `ResponsiveProp<string \| number>` | Não | — | Valores CSS diretos de posicionamento. |
| `zIndex` | `ResponsiveProp<number>` | Não | — | Valor CSS direto de `z-index`. |

### Props herdadas de `VisibilityProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `hideUp`   | `BreakpointKey` | Não | — | Esconde o componente (`display: none !important`) a partir do breakpoint informado (inclusive). Ex: `hideUp="md"` esconde em `md`, `lg`, `xl`. |
| `hideDown` | `BreakpointKey` | Não | — | Esconde o componente abaixo do breakpoint informado. Ex: `hideDown="md"` esconde em `xs`, `sm`. |

## Exemplo de uso

```tsx
import { Box } from '@/components';

<Box p={2} displayFlex="center" gap={1} radius={8} shadow bgcolor="background.paper">
  Conteúdo
</Box>
```

## Dependências relevantes

- Depende de um `ThemeProvider` do MUI no topo da árvore (usa `theme.spacing`, `theme.shadows`,
  `theme.shape.borderRadius`, `theme.palette` via `getColor`).
- Usa os helpers de `src/components/styles` (`getSpacingStyles`, `getFlexStyles`,
  `getRadiusStyles`, `getSizeStyles`, `getHoverStyles`, `getPositionStyles`,
  `getVisibilityStyles`, `getColor`, `applyColorToShadow`).
- É a base de outros componentes do projeto (ex: `Icon` estende `BoxProps` diretamente).

## Notas

- `shouldForwardProp` filtra todas as props customizadas (spacing, layout, hover, size,
  position, visibility, `shadow`, `shadowSecondary`, `shadowColor`, `paper`, `bgcolor`) para
  que não vazem para o DOM.
- Quando `shadow` e `shadowSecondary` são definidos juntos, `shadowSecondary` vence porque é
  aplicado por último no objeto de estilos — isso não está documentado no código-fonte como
  intencional, é uma consequência da ordem de aplicação. ⚠️ Comportamento não explicitamente
  definido como intencional; tratar como implementação atual, sujeita a mudança.
- `hover` como objeto aceita um subconjunto de `BaseHoverProps`:
  `shadow`, `shadowColor`, `bgcolor`, `color`, `borderColor`, `borderWidth`, `scale`, `zoom`,
  `opacity`.
