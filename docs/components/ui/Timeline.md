# Timeline

Linha do tempo vertical/horizontal baseada no `Timeline` do `@mui/lab`. É o componente mais complexo do kit: suporta 3 modos de uso diferentes (lista via prop `items`, filhos React via `Timeline.Item`, ou item único standalone) e customiza marcador (bullet), linha conectora, cor, tamanho e conteúdo oposto de cada item.

## Quando usar

Use para exibir uma sequência cronológica de eventos (histórico, etapas de um processo, experiência profissional, etc.). Para uma lista simples sem marcadores/linha conectora, prefira um `Box` com `map` manual — o `Timeline` existe especificamente para o visual de linha do tempo com bullets e conectores.

## Os 3 modos de uso

1. **Prop `items`** — array de objetos (`TimelineItemProps[]`). Renderiza todos os itens de uma vez em um único container. É o modo recomendado para listas dinâmicas (ex: vindas de uma API ou de um array de config).
2. **Filhos React (compound component)** — `<Timeline><Timeline.Item ... /><Timeline.Item ... /></Timeline>`. Útil quando cada item precisa de JSX mais customizado no lugar de chamada. Só é ativado quando `children` é passado **e** a prop `title` não é informada no `Timeline` pai (ver Notas).
3. **Item único standalone** — passar `title`/`children` direto no `<Timeline title="..." >conteúdo</Timeline>`, sem `items` nem filhos React. Renderiza o próprio `Timeline` como um item isolado (usa `SingleTimelineItem` internamente).

Nos 3 modos, props de bullet/linha/cor/tamanho informadas diretamente no `<Timeline>` (`bulletColor`, `lineColor`, `color`, `size`, `bulletVariant`, `icon`/`bulletIcon`, `oppositeContent`, `hideConnector`, `isLast`) funcionam como **valor padrão** aplicado a todos os itens — cada item (via `items[i]` ou via props do `Timeline.Item`) pode sobrescrever individualmente.

## Props

`TimelineProps` estende `TimelineItemProps` (ou seja, todas as props de item abaixo também podem ser passadas direto no `Timeline` pai, ver seção acima), mais `SpacingProps`, `SizeProps`, `VisibilityProps` e `PositionStyleProps` (sem a prop `position`, que é redefinida com significado próprio).

### Props específicas do `Timeline`

| Prop             | Tipo                                                          | Obrigatório | Padrão    | Descrição |
|------------------|-----------------------------------------------------------------|-------------|-----------|-----------|
| `items`          | `TimelineItemProps[]`                                            | Não         | —         | Lista de itens. Se informada (e não vazia), ativa o modo 1 e ignora `children`. |
| `position`       | `'left' \| 'right' \| 'alternate' \| 'alternate-reverse'`         | Não         | `'right'` | Lado em que o conteúdo dos itens é renderizado em relação à linha do tempo (prop nativa do MUI `Timeline`). |
| `className`      | `string`                                                          | Não         | —         | Classe CSS adicional no container. |
| `style`          | `React.CSSProperties`                                             | Não         | —         | Estilo inline adicional no container. |
| `sx`             | `MuiTimelineProps['sx']`                                          | Não         | —         | `sx` do MUI aplicado ao container. |

### Props de item (`TimelineItemProps` — usadas em `items[i]`, em `Timeline.Item`, ou como default/standalone no `Timeline` pai)

| Prop             | Tipo                                     | Obrigatório | Padrão     | Descrição |
|------------------|---------------------------------------------|-------------|------------|-----------|
| `title`          | `React.ReactNode`                           | Não         | —          | Título do item. String usa estilo destacado padrão (`h6`, peso 700); outro `ReactNode` é renderizado como veio. |
| `children`       | `React.ReactNode`                           | Não         | —          | Conteúdo do item. String usa estilo padrão (`body1`, cor secundária); outro `ReactNode` é renderizado como veio. |
| `oppositeContent`| `React.ReactNode`                           | Não         | —          | Conteúdo do lado oposto do item (ex: data). Só é renderizado se informado — sem ele, o `TimelineOppositeContent` não aparece. |
| `bulletColor`    | `string`                                     | Não         | —          | Cor do marcador. Aceita caminhos do tema (ex: `'primary.main'`) ou valores CSS diretos. Fallback: `color` → `'text.secondary'`. |
| `bulletIcon`     | `React.ReactNode`                           | Não         | —          | Ícone exibido dentro do marcador. |
| `icon`           | `React.ReactNode`                           | Não         | —          | Alias de `bulletIcon` (se ambos forem passados, `bulletIcon` vence). |
| `bulletVariant`  | `'filled' \| 'outlined'`                     | Não         | `'filled'` | Estilo visual do marcador. |
| `lineColor`      | `string`                                     | Não         | —          | Cor da linha conectora abaixo do item. Fallback: `color` → `'text.secondary'`. |
| `color`          | `string`                                     | Não         | —          | Cor global usada como fallback para `bulletColor` e `lineColor` (não afeta a cor do texto do título/conteúdo). |
| `size`           | `number \| string`                           | Não         | ⚠️ ver Notas | Tamanho do marcador (diâmetro) e espessura da linha conectora. |
| `hideConnector`  | `boolean`                                    | Não         | `false`    | Esconde a linha conectora abaixo deste item. |
| `isLast`         | `boolean`                                    | Não         | —          | Alias de `hideConnector` (qualquer um dos dois esconde a linha). |
| `className`      | `string`                                     | Não         | —          | Classe CSS adicional no item (`TimelineItem`). |
| `style`          | `React.CSSProperties`                        | Não         | —          | Estilo inline adicional no item. |

### Props herdadas de espaçamento/dimensão/visibilidade/posição (aplicadas ao container `Timeline`)

| Prop        | Tipo                                             | Obrigatório | Padrão | Descrição |
|-------------|---------------------------------------------------|-------------|--------|-----------|
| `height`    | `string \| number` (responsivo)                    | Não         | —      | Altura do container. |
| `width`     | `string \| number` (responsivo)                    | Não         | —      | Largura do container. |
| `top`       | `string \| number` (responsivo)                    | Não         | —      | Posição `top` (usa junto de `position` do CSS — cuidado com a prop `position` do MUI Timeline, que tem outro significado, ver acima). |
| `left`      | `string \| number` (responsivo)                    | Não         | —      | Posição `left`. |
| `right`     | `string \| number` (responsivo)                    | Não         | —      | Posição `right`. |
| `bottom`    | `string \| number` (responsivo)                    | Não         | —      | Posição `bottom`. |
| `zIndex`    | `number` (responsivo)                              | Não         | —      | `z-index`. |
| `p`, `pr`, `pl`, `pt`, `pb`, `px`, `py` | `boolean \| number \| string` (responsivo, `p`); `string \| number` (responsivo, demais) | Não | — | Padding (geral/direcional). |
| `m`, `ml`, `mr`, `mt`, `mb`, `mx`, `my` | `string \| number` (responsivo)      | Não         | —      | Margin (geral/direcional). |
| `hideUp`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`              | Não         | —      | Esconde o componente a partir do breakpoint informado (inclusive para cima). |
| `hideDown`  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`              | Não         | —      | Esconde o componente abaixo do breakpoint informado. |

## Exemplo de uso

**Modo 1 — `items`:**

```tsx
import { Timeline } from '@/components';

<Timeline
  color="primary.main"
  items={[
    { title: 'Empresa A', oppositeContent: '2022 – atual', children: 'Desenvolvedor Frontend' },
    { title: 'Empresa B', oppositeContent: '2020 – 2022', children: 'Estagiário' },
  ]}
/>
```

**Modo 2 — filhos React (`Timeline.Item`):**

```tsx
<Timeline color="primary.main">
  <Timeline.Item title="Empresa A" oppositeContent="2022 – atual">
    Desenvolvedor Frontend
  </Timeline.Item>
  <Timeline.Item title="Empresa B" oppositeContent="2020 – 2022">
    Estagiário
  </Timeline.Item>
</Timeline>
```

**Modo 3 — item único standalone:**

```tsx
<Timeline title="Empresa A" oppositeContent="2022 – atual">
  Desenvolvedor Frontend
</Timeline>
```

## Dependências relevantes

- `@mui/lab` (`Timeline`, `TimelineItem`, `TimelineSeparator`, `TimelineConnector`, `TimelineContent`, `TimelineDot`, `TimelineOppositeContent`) — precisa estar instalado (`@mui/lab` é uma dependência separada do `@mui/material`).
- `Box` e `Text` (`@/components`) — usados internamente para renderizar título/conteúdo em string e o wrapper do título.
- `@/components/styles` — helpers `getColor`, `getSpacingStyles`, `getSizeStyles`, `getVisibilityStyles`, `getPositionStyles`.

## Notas

- **Prioridade entre os modos**: o componente checa `items` primeiro (modo 1); se `items` não for informado ou vier vazio, checa se há `children` **e** `title` não foi informado no pai (modo 2); caso nenhuma dessas condições seja atendida, cai no modo 3 (standalone). Isso significa que passar `title` no `Timeline` pai junto com filhos React desativa o modo 2 (compound) e força o modo 3 — comportamento pouco óbvio pela API, vale atenção ao combinar `title` com `children`.
- ⚠️ **`size` sem valor padrão explícito por prop**: não há um valor de "padrão" declarado na interface — o componente calcula um tamanho interno (`16px` sem ícone, `28px` com `bulletIcon`/`icon`) quando `size` não é informado ou não é numérico. É comportamento de implementação, não documentado como contrato público na tipagem.
- O último item de uma lista (via `items` ou via filhos) tem a linha conectora escondida automaticamente, mesmo sem `hideConnector`/`isLast` — isso é calculado pelo índice (`index === length - 1`).
- No modo standalone (3), a linha conectora abaixo do item some por padrão, a não ser que `hideConnector` ou `isLast` sejam explicitamente definidos (como `false`) — ver comentário no código-fonte sobre essa regra.
- `TimelineOppositeContent` só é renderizado quando `oppositeContent` é informado (o próprio componente decide se cria ou não o elemento) — não há como reservar o espaço vazio sem conteúdo.
