# Switch

Wrapper em cima do `Switch` do MUI. Adiciona suporte a `label` (envolvendo o switch em um `FormControlLabel`) e props de espaçamento/visibilidade padronizadas do kit.

## Quando usar

Use para alternar um valor booleano (ligado/desligado) com o visual padrão do MUI. Se precisar de um toggle de tema com visual customizado (animação de sol/lua), use o `ToggleTheme` em vez deste. Se precisar de texto ao lado do controle, passe a prop `label` em vez de montar um `FormControlLabel` manualmente.

## Props

| Prop        | Tipo                                             | Obrigatório | Padrão | Descrição |
|-------------|---------------------------------------------------|-------------|--------|-----------|
| `label`     | `ReactNode`                                        | Não         | —      | Texto (ou nó) exibido ao lado do switch. Se informado, o switch é envolvido em um `FormControlLabel`. |
| `p`         | `boolean \| number \| string` (responsivo)         | Não         | —      | Padding geral. |
| `pr`        | `string \| number` (responsivo)                    | Não         | —      | Padding direito. |
| `pl`        | `string \| number` (responsivo)                    | Não         | —      | Padding esquerdo. |
| `pt`        | `string \| number` (responsivo)                    | Não         | —      | Padding superior. |
| `pb`        | `string \| number` (responsivo)                    | Não         | —      | Padding inferior. |
| `px`        | `string \| number` (responsivo)                    | Não         | —      | Padding horizontal. |
| `py`        | `string \| number` (responsivo)                    | Não         | —      | Padding vertical. |
| `m`         | `string \| number` (responsivo)                    | Não         | —      | Margin geral. |
| `ml`        | `string \| number` (responsivo)                    | Não         | —      | Margin esquerda. |
| `mr`        | `string \| number` (responsivo)                    | Não         | —      | Margin direita. |
| `mt`        | `string \| number` (responsivo)                    | Não         | —      | Margin superior. |
| `mb`        | `string \| number` (responsivo)                    | Não         | —      | Margin inferior. |
| `mx`        | `string \| number` (responsivo)                    | Não         | —      | Margin horizontal. |
| `my`        | `string \| number` (responsivo)                    | Não         | —      | Margin vertical. |
| `hideUp`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`              | Não         | —      | Esconde o componente a partir do breakpoint informado (inclusive para cima). |
| `hideDown`  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`              | Não         | —      | Esconde o componente abaixo do breakpoint informado. |

Além dessas, o `Switch` aceita todas as props nativas do `Switch` do MUI (`checked`, `defaultChecked`, `onChange`, `disabled`, `color`, `size`, `edge`, `disableRipple`, `inputProps`, `name`, `value`, `required`, etc.), exceto as que colidem com `p`/`pr`/`pl`/.../`hideUp`/`hideDown` acima (essas foram sobrescritas pelas versões do kit).

## Exemplo de uso

```tsx
import { Switch } from '@/components';

<Switch label="Receber notificações" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />

// Sem label, apenas o switch:
<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} hideDown="sm" />
```

## Dependências relevantes

- `@mui/material` (`Switch`, `FormControlLabel`).
- `Box` (`@/components`) — usado internamente para aplicar `hideUp`/`hideDown` ao redor do `FormControlLabel` quando há `label`.
- `@/components/styles` — helpers `getSpacingStyles`, `getVisibilityStyles` e as constantes `SPACING_PROPS`/`VISIBILITY_PROPS`.

## Notas

- Quando `label` é informado, `hideUp`/`hideDown` são aplicados no `Box` que envolve o `FormControlLabel` inteiro (não só no switch) — isso é proposital, para o texto do label não ficar órfão na tela quando o switch some no breakpoint. Está documentado como comentário no próprio código-fonte.
- Sem `label`, o switch é renderizado direto (`StyledSwitch`), sem `FormControlLabel`.
- Não possui props de `hover`, `radius`, `size`/`width`/`height` ou `flex` customizadas do kit — só espaçamento e visibilidade.
