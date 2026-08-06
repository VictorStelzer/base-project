# IconButton

`IconButton` é um wrapper em cima do `IconButton` do MUI que substitui os `size` e `color`
nativos por versões customizadas (tema/px livres) e adiciona props de espaçamento, flex,
arredondamento, dimensão, hover, fundo e visibilidade responsiva.

## Quando usar

Use para botões clicáveis que contêm só um ícone (ações de toolbar, fechar modal, favoritar
etc.).

Não use quando o botão precisa de texto (use `Button`/`TextButton`) nem para um ícone
puramente decorativo sem ação — nesse caso use `Icon`.

## Props

`IconButton` estende `Omit<MuiIconButtonProps, 'size' | 'color'>` — ou seja, herda as props
nativas do MUI (`onClick`, `disabled`, `edge`, `component`, `sx`, etc.), **exceto** `size` e
`color`, que são redefinidas abaixo com semântica própria (o `size` nativo do MUI era
`'small' | 'medium' | 'large'`; o `color` nativo era a paleta fixa `'default' | 'primary' |
...`).

### Props próprias

| Prop    | Tipo                        | Obrigatório | Padrão                              | Descrição |
|---------|------------------------------|-------------|---------------------------------------|-----------|
| `hover` | `boolean \| HoverProps`      | Não         | —                                      | Efeito de hover. `true` aplica sombra padrão (`theme.shadows[6]`). Objeto customiza `shadow`, `bgcolor`, `color`, `borderColor`, `borderWidth`, `scale`, `opacity` (ver Notas). |
| `size`  | `number \| string`           | Não         | — (ícone interno usa `1em`/`inherit`)  | Tamanho do ícone interno (`fontSize`/`width`/`height` de `svg`/`.MuiSvgIcon-root`). Substitui o `size` nativo do MUI. |
| `color` | `string`                     | Não         | — (usa `theme.palette.action.active`)  | Cor do botão/ícone. Aceita caminho do tema (ex: `primary.main`) ou cor CSS. Substitui o `color` nativo do MUI. |
| `bg`    | `boolean \| string`          | Não         | —                                      | Fundo do botão. `true` = 10% de opacidade da cor resolvida (`color` ou o fallback). `string` = cor customizada. Quando ativo, aplica `borderRadius` (`50%` se `circle`, senão `radius` numérico ou `12`) e `padding` padrão (`theme.spacing(1)`) se `p` não for informado. |

### Props herdadas de `SpacingProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `p`  | `ResponsiveProp<boolean \| number \| string>` | Não | — | Padding. `true` renderiza como `'8px'` quando `bg` está ativo (ver comportamento em `bg`); `number` = `theme.spacing(n)`. |
| `pr`, `pl`, `pt`, `pb` | `ResponsiveProp<string \| number>` | Não | — | Padding direcional. |
| `px`, `py` | `ResponsiveProp<string \| number>` | Não | — | Padding horizontal (`px`) ou vertical (`py`). |
| `m`, `ml`, `mr`, `mt`, `mb` | `ResponsiveProp<string \| number>` | Não | — | Margin geral/direcional. |
| `mx`, `my` | `ResponsiveProp<string \| number>` | Não | — | Margin horizontal (`mx`) ou vertical (`my`). |

### Props herdadas de `SizeProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `height` | `ResponsiveProp<string \| number>` | Não | — | Valor CSS direto de `height` do botão (contêiner, não do ícone). |
| `width`  | `ResponsiveProp<string \| number>` | Não | — | Valor CSS direto de `width` do botão (contêiner, não do ícone). |

### Props herdadas de `RadiusProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `radius` | `boolean \| number` | Não | — | `number` define o `border-radius` em px quando `bg` está ativo. Sem `bg` ativo, segue `getRadiusStyles` padrão (mesmo comportamento do `Box`). |
| `circle` | `boolean` | Não | — | Força `border-radius: 50%`. Tem prioridade sobre `radius` quando `bg` está ativo. |
| `square` | `boolean` | Não | — | `border-radius: 0` (via `getRadiusStyles`, fora do bloco de `bg`). |

### Props herdadas de `FlexProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `displayFlex` | `boolean \| 'row' \| 'column' \| 'center'` | Não | — | Ativa `display: flex` no botão. |
| `row`, `column` | `boolean \| BreakpointKey` | Não | — | Direção do flex, com suporte a breakpoint (mesma lógica do `Box`). |
| `center` | `boolean` | Não | — | Centraliza conteúdo (ativa flex). |
| `between`, `around`, `evenly` | `boolean` | Não | — | `justifyContent: space-between/around/evenly` (ativa flex). |
| `full` | `boolean` | Não | — | `width: 100%` e `height: 100%`. |
| `justifyContent`, `alignItems` | `ResponsiveProp<boolean \| string>` | Não | — | Valores brutos de `justify-content`/`align-items`. |
| `gap` | `ResponsiveProp<number \| string>` | Não | — | `gap` do flex. |

### Props herdadas de `VisibilityProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `hideUp`   | `BreakpointKey` | Não | — | Esconde o botão a partir do breakpoint informado (inclusive). |
| `hideDown` | `BreakpointKey` | Não | — | Esconde o botão abaixo do breakpoint informado. |

## Exemplo de uso

```tsx
import { IconButton } from '@/components';
import { X } from 'lucide-react';

<IconButton color="error.main" bg size={20} onClick={() => {}}>
  <X />
</IconButton>
```

## Dependências relevantes

- Depende de um `ThemeProvider` do MUI (`theme.palette.action.active`,
  `theme.palette.action.hoverOpacity`, `theme.spacing`, `alpha`, `getColor`).
- Usa os helpers de `src/components/styles` (`getSpacingStyles`, `getRadiusStyles`,
  `getFlexStyles`, `getHoverStyles`, `getSizeStyles`, `getVisibilityStyles`, `getColor`).

## Notas

- `hover` como objeto aceita um subconjunto de `BaseHoverProps`:
  `shadow`, `bgcolor`, `color`, `borderColor`, `borderWidth`, `scale`, `opacity` (sem
  `shadowColor` nem `zoom`, diferente do `Box`).
- No `:hover`, se `bg` estiver ativo, a cor de fundo do hover é derivada do próprio fundo
  (`alpha(backgroundColor, 0.8)` se `bg` for string, ou `alpha(resolvedColor, 0.2)` se `bg`
  for `true`); sem `bg`, usa `alpha(resolvedColor, theme.palette.action.hoverOpacity)`. Um
  `hover` customizado (objeto) tem suas próprias regras de `:hover` mescladas por cima dessas.
- O componente é exportado como `styled(...) as React.FC<IconButtonProps>` — um cast de tipo
  explícito no código-fonte, não uma prova de runtime.
- Sem `size` informado, o ícone interno usa `fontSize: 'inherit'` e `width/height: '1em'` —
  ou seja, herda o tamanho de fonte do contexto ao redor.
