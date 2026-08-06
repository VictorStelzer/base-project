# Divider

`Divider` é um wrapper em cima do `Divider` do MUI. Traduz a prop de conveniência
`vertical` (boolean) para a prop real `orientation` do MUI antes de repassar ao componente
estilizado interno, além de aceitar cor, espessura, comprimento e arredondamento
customizados.

## Quando usar

Use para separar visualmente seções de conteúdo, itens de lista ou grupos de ações — tanto
na horizontal quanto na vertical (ex: entre botões em uma toolbar).

Não use como substituto de `border` genérico em um `Box` quando o elemento não representa
semanticamente uma separação de conteúdo (o MUI renderiza `role="separator"` /
`aria-orientation` conforme `orientation`).

## Props

Além das props abaixo, `Divider` aceita todas as props nativas do `Divider` do MUI
(`variant`, `flexItem`, `light`, `textAlign`, `component`, `children`, `sx`, etc.) — não
reproduzidas aqui por virem direto da tipagem do MUI, não deste projeto.

### Props próprias

| Prop          | Tipo               | Obrigatório | Padrão                     | Descrição |
|---------------|---------------------|-------------|-----------------------------|-----------|
| `vertical`    | `boolean`           | Não         | `false`                     | Atalho de conveniência para `orientation="vertical"`. Só afeta o CSS por si só — quem repassa o valor real para o `orientation` do MUI (elemento renderizado + `aria-orientation`) é o componente `Divider` (ver Notas). |
| `orientation` | `'horizontal' \| 'vertical'` (nativo do MUI) | Não | `'horizontal'` (padrão do MUI) | Orientação real do divisor. Controla o elemento HTML renderizado e o `aria-orientation` para acessibilidade. Se `vertical` for `true`, `orientation` é forçado para `'vertical'` internamente, independente do que for passado. |
| `color`       | `string`            | Não         | `theme.palette.divider`     | Cor da linha. Aceita caminho do tema (ex: `primary.main`) ou cor CSS. |
| `thickness`   | `number \| string`  | Não         | `1px`                       | Espessura do traço. Horizontal: `border-bottom-width`. Vertical: `border-right-width`. `number` é tratado como px. |
| `size`        | `number \| string`  | Não         | `100%` (da área flex)       | Comprimento do traço. Horizontal = `width`. Vertical = `height`. `number` é tratado como px. |
| `radius`      | `boolean`           | Não         | —                            | Arredonda as bordas da linha (via `getRadiusStyles`, usa `theme.shape.borderRadius` quando truthy). Prop local do `Divider` — não é a mesma `RadiusProps` compartilhada (não aceita `number`, `circle` nem `square`). |

### Props herdadas de `SpacingProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `p`  | `ResponsiveProp<boolean \| number \| string>` | Não | — | Padding geral. `true` = 20px fixo; `number` = `theme.spacing(n)`. |
| `pr`, `pl`, `pt`, `pb` | `ResponsiveProp<string \| number>` | Não | — | Padding direcional. |
| `px`, `py` | `ResponsiveProp<string \| number>` | Não | — | Padding horizontal (`px`) ou vertical (`py`). |
| `m`, `ml`, `mr`, `mt`, `mb` | `ResponsiveProp<string \| number>` | Não | — | Margin geral/direcional. |
| `mx`, `my` | `ResponsiveProp<string \| number>` | Não | — | Margin horizontal (`mx`) ou vertical (`my`). |

### Props herdadas de `VisibilityProps`

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `hideUp`   | `BreakpointKey` | Não | — | Esconde o divisor a partir do breakpoint informado (inclusive). |
| `hideDown` | `BreakpointKey` | Não | — | Esconde o divisor abaixo do breakpoint informado. |

## Exemplo de uso

```tsx
import { Divider } from '@/components';

// Horizontal (padrão)
<Divider color="primary.main" thickness={2} />

// Vertical, dentro de um container flex
<Divider vertical size={24} />
```

## Dependências relevantes

- Depende de um `ThemeProvider` do MUI (usa `theme.palette.divider`, `theme.shape.borderRadius`
  via `getColor`/`getRadiusStyles`).
- Usa os helpers de `src/components/styles` (`getSpacingStyles`, `getColor`, `getRadiusStyles`,
  `getVisibilityStyles`).
- Em layout vertical, depende do elemento pai ter `display: flex` com `align-items: stretch`
  (ou altura definida) para o traço vertical ficar visível — sem isso, `height: 100%` não tem
  uma referência de altura.

## Notas

- `Divider` é implementado como um `React.FC` (não um `styled()` puro) justamente para
  resolver `vertical` → `orientation` antes de repassar ao componente estilizado interno
  (`StyledDivider`). Isso é intencional: a prop `orientation` real do MUI decide o elemento
  HTML renderizado e o `aria-orientation`, então repassá-la corretamente é uma questão de
  acessibilidade, não só de estilo.
- Se `vertical` for `false`/omitido, o `orientation` passado segue o que foi informado
  explicitamente (ou o padrão do MUI, `'horizontal'`).
- `shouldForwardProp` filtra `color`, `thickness`, `size`, `vertical`, `radius` e as props de
  spacing/visibility para não vazarem ao DOM.
