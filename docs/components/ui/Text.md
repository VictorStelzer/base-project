# Text

Wrapper em cima do `Typography` do MUI. Adiciona truncamento por número de linhas (`truncate`), efeito de gradiente no texto (`gradient`) e as props compartilhadas de espaçamento, dimensão, tipografia e visibilidade do kit.

## Quando usar

Use para qualquer texto da aplicação em vez do `Typography` puro do MUI, especialmente quando precisar de truncamento com reticências, gradiente de cor, ou das props de espaçamento/dimensão padronizadas (`p`, `m`, `width`, `height`, etc.) direto no componente de texto.

## Props

| Prop            | Tipo                                                          | Obrigatório | Padrão | Descrição |
|-----------------|-----------------------------------------------------------------|-------------|--------|-----------|
| `truncate`      | `number`                                                         | Não         | —      | Limita o texto a N linhas e adiciona reticências (`line-clamp`). |
| `gradient`      | `boolean \| { from: string; to: string; dir?: string }`          | Não         | —      | Aplica gradiente no texto. `true` usa gradiente padrão (primary → secondary/light do tema, 45deg). Objeto permite customizar cores (`from`/`to`, aceitam caminhos do tema) e direção (`dir`, ex: `'45deg'`, `'to right'`). |
| `height`        | `string \| number` (responsivo)                                  | Não         | —      | Altura. |
| `width`         | `string \| number` (responsivo)                                  | Não         | —      | Largura. |
| `fontSize`      | `string \| number` (responsivo)                                  | Não         | —      | Tamanho da fonte. |
| `fontWeight`    | `string \| number` (responsivo)                                  | Não         | —      | Peso da fonte. |
| `textAlign`     | `'left' \| 'center' \| 'right' \| 'justify' \| 'inherit'` (responsivo) | Não  | —      | Alinhamento do texto. |
| `letterSpacing` | `string \| number` (responsivo)                                  | Não         | —      | Espaçamento entre letras. |
| `lineHeight`    | `string \| number` (responsivo)                                  | Não         | —      | Altura da linha. |
| `p`, `pr`, `pl`, `pt`, `pb`, `px`, `py` | `boolean \| number \| string` (responsivo, `p`); `string \| number` (responsivo, demais) | Não | — | Padding (geral/direcional). |
| `m`, `ml`, `mr`, `mt`, `mb`, `mx`, `my` | `string \| number` (responsivo)                  | Não         | —      | Margin (geral/direcional). |
| `hideUp`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                            | Não         | —      | Esconde o componente a partir do breakpoint informado (inclusive para cima). |
| `hideDown`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                            | Não         | —      | Esconde o componente abaixo do breakpoint informado. |

Além dessas, o `Text` aceita todas as props nativas do `Typography` do MUI (`variant`, `component`, `color`, `align`, `noWrap`, `gutterBottom`, `paragraph`, `children`, `sx`, etc.), exceto as que colidem com as props de espaçamento/dimensão/tipografia acima.

## Exemplo de uso

```tsx
import { Text } from '@/components';

<Text variant="h4" fontWeight={700} mb={2}>Título da seção</Text>

<Text truncate={2}>
  Texto longo que será cortado em duas linhas com reticências no final...
</Text>

<Text gradient variant="h2">Texto com gradiente</Text>

<Text gradient={{ from: 'secondary.main', to: '#ff0080', dir: 'to right' }}>
  Gradiente customizado
</Text>
```

## Dependências relevantes

- `@mui/material` (`Typography`).
- `@/components/styles` — helpers `getColor`, `getSpacingStyles`, `getSizeStyles`, `getTypographyStyles`, `getVisibilityStyles` e as constantes de props correspondentes.

## Notas

- O gradiente é implementado com `background` + `WebkitBackgroundClip: 'text'` + `color: transparent` — em navegadores sem suporte a `background-clip: text` o texto pode ficar invisível (comportamento herdado da técnica CSS, não tratado com fallback no componente).
- `truncate` usa `-webkit-line-clamp`, uma propriedade não padrão mas amplamente suportada; não há fallback para navegadores que não a suportam.
- Não há prop de `flex`/`radius`/`hover` — só espaçamento, dimensão, tipografia e visibilidade.
