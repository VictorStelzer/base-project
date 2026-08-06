# Chip

`Chip` é um wrapper em cima do `Chip` do MUI que adiciona props de espaçamento, dimensão,
visibilidade responsiva, cor de texto e hover, seguindo o mesmo padrão de props do resto do
projeto.

## Quando usar

Use para tags, badges, filtros selecionáveis ou labels compactos com ação opcional
(`onClick`, `onDelete`) — tudo isso já vem do `Chip` nativo do MUI.

Não use como substituto de botão de ação principal (para isso existe `Button`/`TextButton`/
`IconButton`) — o `Chip` é pensado para representar um item/tag, não uma ação primária de
tela.

## Props

Além das props abaixo, `Chip` aceita todas as props nativas do `Chip` do MUI (`label`,
`icon`, `onDelete`, `variant`, `color` — a paleta nativa do MUI, ex: `'primary'`,
`'default'` —, `size` nativo `'small' | 'medium'`, `component`, `sx`, etc.) — não
reproduzidas aqui por virem direto da tipagem do MUI, não deste projeto. O `color` nativo do
MUI (fundo/paleta do chip) coexiste com o `textColor` customizado abaixo (cor do texto).

### Props próprias

| Prop        | Tipo                    | Obrigatório | Padrão | Descrição |
|-------------|--------------------------|-------------|--------|-----------|
| `hover`     | `boolean \| HoverProps`  | Não         | —      | Efeito de hover. `true` aplica sombra padrão (`theme.shadows[6]`). Objeto customiza `shadow`, `shadowColor`, `bgcolor`, `color`, `borderColor`, `borderWidth`, `scale`, `opacity` (ver Notas). |
| `textColor` | `string`                 | Não         | —      | Cor do texto do chip. Aceita caminho do tema (ex: `primary.main`) ou cor CSS. Independente do `color` nativo do MUI (que controla a paleta de fundo). |

### Props herdadas de `SpacingProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `p`  | `ResponsiveProp<boolean \| number \| string>` | Não | — | Padding geral. `true` = 20px fixo; `number` = `theme.spacing(n)`; `string` = valor CSS direto. |
| `pr`, `pl`, `pt`, `pb` | `ResponsiveProp<string \| number>` | Não | — | Padding direcional. `number` = `theme.spacing(n)`. |
| `px`, `py` | `ResponsiveProp<string \| number>` | Não | — | Padding horizontal (`px`) ou vertical (`py`). |
| `m`, `ml`, `mr`, `mt`, `mb` | `ResponsiveProp<string \| number>` | Não | — | Margin geral/direcional, mesma lógica de `p`. |
| `mx`, `my` | `ResponsiveProp<string \| number>` | Não | — | Margin horizontal (`mx`) ou vertical (`my`). |

### Props herdadas de `SizeProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `height` | `ResponsiveProp<string \| number>` | Não | — | Valor CSS direto de `height`. |
| `width`  | `ResponsiveProp<string \| number>` | Não | — | Valor CSS direto de `width`. |

### Props herdadas de `VisibilityProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `hideUp`   | `BreakpointKey` | Não | — | Esconde o chip a partir do breakpoint informado (inclusive). |
| `hideDown` | `BreakpointKey` | Não | — | Esconde o chip abaixo do breakpoint informado. |

## Exemplo de uso

```tsx
import { Chip } from '@/components';

<Chip label="React" textColor="primary.main" hover onDelete={() => {}} />
```

## Dependências relevantes

- Depende de um `ThemeProvider` do MUI (usa `theme.spacing`, `theme.shadows`, `theme.palette`
  via `getColor`).
- Usa os helpers de `src/components/styles` (`getSpacingStyles`, `getSizeStyles`,
  `getHoverStyles`, `getColor`, `getVisibilityStyles`).

## Notas

- `shouldForwardProp` filtra `p`/`m`/etc, `hover`, `height`, `width`, `hideUp`/`hideDown` e
  `textColor` para não vazarem ao DOM.
- `hover` como objeto aceita um subconjunto de `BaseHoverProps`:
  `shadow`, `shadowColor`, `bgcolor`, `color`, `borderColor`, `borderWidth`, `scale`,
  `opacity` (sem `zoom`, diferente do `Box`).
- Não há `RadiusProps` nem `FlexProps` aqui — `Chip` não aceita `radius`, `circle`, `square`,
  `displayFlex`, `gap`, etc. Para arredondamento/layout, use as props nativas do MUI Chip
  (`sx`) ou envolva o `Chip` em um `Box`.
