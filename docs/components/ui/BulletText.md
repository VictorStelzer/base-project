# BulletText

Texto precedido por um marcador circular ("bullet") colorido. É um `Box` em linha (`row`) contendo um pequeno círculo (`Box` com `circle`) e um `Text`.

## Quando usar

Usar para listas de itens com marcador customizado (cor, tamanho) fora de uma lista `<ul>`/`<li>` nativa — ex: legendas, listas de features, resumos. Não usar quando já se precisa de semântica de lista HTML (`ul`/`li`) — o componente não gera essa estrutura.

## Props

`BulletTextProps` estende `Omit<TextProps, 'color'>` (props do componente `Text` do kit — `src/components/ui/Text/types.ts` —, exceto `color`, que é redefinida aqui). O `Text` ainda não tem documentação própria nesta pasta.

| Prop            | Tipo                                        | Obrigatório | Padrão                                  | Descrição                                                                                   |
|------------------|-----------------------------------------------|-------------|-------------------------------------------|-------------------------------------------------------------------------------------------------|
| `children`       | `ReactNode`                                   | Não         | —                                          | Texto/conteúdo exibido ao lado do bullet.                                                      |
| `bullet`         | `BulletSettings` (`{ color?: string; size?: string \| number; gap?: string \| number }`) | Não | `{}` | Configurações específicas do bullet. `color` sobrescreve a prop `color` geral só para o bullet. |
| `color`          | `string`                                      | Não         | `theme.palette.text.primary` (só bullet)  | Cor geral, aplicada ao bullet e ao texto, a menos que `bullet.color` seja informado. Sem `color`, o texto usa a cor padrão do `Text`. |
| `size`           | `string \| number`                            | Não         | —                                          | Tamanho de fonte do texto (aplicado via `sx.fontSize`).                                        |
| `truncate`       | `number`                                      | Não         | —                                          | Limita o texto a N linhas com reticências (herdado de `TextProps`).                            |
| `gradient`       | `boolean \| { from: string; to: string; dir?: string }` | Não | —                                    | Aplica gradiente ao texto (herdado de `TextProps`).                                            |
| `fontSize`, `fontWeight`, `textAlign`, `letterSpacing`, `lineHeight` | `ResponsiveProp<...>` | Não | — | Tipografia (`TypographyStyleProps`, herdado via `TextProps`).                            |
| `p`, `pr`, `pl`, `pt`, `pb`, `px`, `py`, `m`, `mr`, `ml`, `mt`, `mb`, `mx`, `my` | `ResponsiveProp<string \| number>` (`p` também aceita `boolean`) | Não | — | Espaçamento (`SpacingProps`, herdado via `TextProps`). |
| `height`, `width` | `ResponsiveProp<string \| number>`           | Não         | —                                          | Dimensões (`SizeProps`, herdado via `TextProps`).                                              |
| `hideUp`, `hideDown` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`     | Não         | —                                          | Visibilidade responsiva (`VisibilityProps`, herdado via `TextProps`).                          |
| `...textProps`  | `Omit<TypographyProps do MUI, ...>`           | Não         | —                                          | Demais props nativas do `Typography`/`Text` (ex: `variant`, `component`, `noWrap`, `sx`).      |

Detalhes de `bullet`:

| Campo (`bullet.*`) | Tipo               | Obrigatório | Padrão                          | Descrição                    |
|---------------------|---------------------|-------------|-----------------------------------|--------------------------------|
| `color`             | `string`            | Não         | `color` geral ou `text.primary`  | Cor específica do bullet.      |
| `size`              | `string \| number`  | Não         | `'6px'`                           | Diâmetro do bullet.            |
| `gap`               | `string \| number`  | Não         | `1` (spacing do tema)             | Espaço entre o bullet e o texto. |

## Exemplo de uso

```tsx
import { BulletText } from '@/components';

<BulletText color="primary.main" bullet={{ size: '8px' }}>
  Item da lista com marcador colorido
</BulletText>
```

## Dependências relevantes

- Requer `ThemeProvider` do MUI (usa `useTheme` e `getColor`).
- Depende dos componentes `Box` e `Text` do kit (`@/components`).

## Notas

- ⚠️ `size` (prop de nível superior do `BulletText`) é aplicado via `sx.fontSize` diretamente, e coexiste com `fontSize` herdado de `TextProps` (que é processado internamente pelo `Text` via `getTypographyStyles`). Se ambos forem passados ao mesmo tempo, o comportamento de qual prevalece não está claramente definido pelo código — evitar usar os dois juntos.
- O bullet é um círculo (`Box` com `circle`) com `width`/`height` iguais a `bullet.size` e `minWidth` travado no mesmo valor via `sx`, para não encolher em textos longos (`flex` no `Box` pai).
- `color` da prop raiz não é repassado para `Text` como `color` (foi omitido do tipo); em vez disso, vira `sx.color`.
