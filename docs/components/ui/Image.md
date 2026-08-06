# Image

`Image` é um wrapper de `<img>` construído sobre o `Box` (`component="img"`), que aplica `objectFit` e integra a imagem com o sistema de estilos compartilhado do projeto (spacing, flex, radius, size, position, visibility, shadow, hover, etc.).

## Quando usar

Use para qualquer imagem do site que precise se beneficiar das props de estilo padronizadas (radius, sombra, hover com zoom, responsividade). Para ícones vetoriais isolados, prefira os componentes de ícone diretamente em vez de `Image`.

## Props

| Prop        | Tipo                                                        | Obrigatório | Padrão    | Descrição                                                                 |
|-------------|--------------------------------------------------------------|-------------|-----------|------------------------------------------------------------------------------|
| `alt`       | `string`                                                      | **Sim**     | —         | Texto alternativo da imagem. Obrigatório por acessibilidade (decisão deliberada) — use `alt=""` apenas para imagens puramente decorativas. |
| `src`       | `string`                                                      | Não*        | —         | URL da imagem (atributo nativo de `<img>`). Tipado como opcional pelo `ImgHTMLAttributes`, mas necessário na prática para a imagem aparecer. |
| `objectFit` | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'`    | Não         | `'cover'` | Como a imagem se ajusta ao seu contêiner.                                    |

Props herdadas de `BoxProps` (o componente estende `BoxProps` por completo):

| Prop                                                          | Tipo                                                                 | Obrigatório | Padrão | Descrição                                                        |
|-----------------------------------------------------------------|-------------------------------------------------------------------------|-------------|--------|------------------------------------------------------------------|
| `p, pr, pl, pt, pb, px, py`                                      | `ResponsiveProp<string \| number>` (`p` aceita também `boolean`)         | Não         | —      | Padding (`SpacingProps`).                                        |
| `m, ml, mr, mt, mb, mx, my`                                      | `ResponsiveProp<string \| number>`                                       | Não         | —      | Margin (`SpacingProps`).                                         |
| `displayFlex, row, column, center, between, around, evenly, full, justifyContent, alignItems, gap` | vários (ver `FlexProps`)                          | Não         | —      | Layout flexbox (`FlexProps`).                                    |
| `radius, circle, square`                                         | `boolean \| number` / `boolean` / `boolean`                             | Não         | —      | Arredondamento (`RadiusProps`).                                  |
| `height, width`                                                  | `ResponsiveProp<string \| number>`                                       | Não         | —      | Dimensões (`SizeProps`).                                         |
| `position, top, left, right, bottom, zIndex`                     | vários (ver `PositionStyleProps`)                                        | Não         | —      | Posicionamento (`PositionStyleProps`).                           |
| `hideUp, hideDown`                                               | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                   | Não         | —      | Visibilidade responsiva (`VisibilityProps`).                     |
| `shadow`                                                         | `boolean \| number`                                                      | Não         | —      | Sombra pré-definida do MUI. `true` usa índice 4; `number` usa o índice (0–24). |
| `shadowColor`                                                    | `string`                                                                 | Não         | —      | Cor da sombra (path do tema aceito).                             |
| `shadowSecondary`                                                | `boolean`                                                                | Não         | —      | Sombra secundária suave (índice 1).                              |
| `paper`                                                          | `boolean`                                                                | Não         | —      | Aplica a cor de fundo `background.paper` do tema.                |
| `bgcolor`                                                        | `string`                                                                 | Não         | —      | Cor de fundo customizada (path do tema, ex: `primary.main`).     |
| `hover`                                                          | `boolean \| { shadow?, shadowColor?, bgcolor?, color?, borderColor?, borderWidth?, scale?, zoom?, opacity? }` | Não | — | Efeito de hover. `true` aplica efeito padrão; objeto customiza. `zoom` ativa o modo wrapper (ver Notas). |

Demais atributos nativos de `<img>` (`loading`, `crossOrigin`, `decoding`, `srcSet`, `sizes`, `onError`, `onLoad`, `referrerPolicy`, `className`, etc.) também são aceitos e repassados, exceto os que colidem com nomes de `BoxProps`.

## Exemplo de uso

```tsx
import { Image } from '@/components';

<Image
  src="/img/banner.jpg"
  alt="Banner da loja com produtos em destaque"
  objectFit="cover"
  radius={8}
  height={240}
/>
```

Com zoom no hover:

```tsx
<Image
  src="/img/produto.jpg"
  alt="Foto do produto"
  hover={{ zoom: 1.1 }}
  radius={12}
/>
```

## Dependências relevantes

- Componente `Box` de `@/components` (via `component="img"`).
- Tema MUI (para `shadow`, `bgcolor`, `radius`, etc. — precisa de `ThemeProvider`).
- Listas `LAYOUT_PROPS`, `SPACING_PROPS`, `HOVER_PROPS`, `SIZE_PROPS`, `POSITION_PROPS`, `VISIBILITY_PROPS` de `@/components/styles`, usadas internamente para separar props de estilo do wrapper das props nativas de `<img>` no modo zoom.

## Notas

- Quando `hover` inclui `zoom` (ex: `hover={{ zoom: 1.1 }}`), o componente renderiza automaticamente um `Box` wrapper (`displayFlex center`) em volta do `<img>`, porque CSS não permite aplicar `scale` num `<img>` sem que ele cresça visualmente para fora dos seus limites. Nesse modo:
  - `width`/`height` do próprio `<img>` interno passam a ser fixos em `100%`/`100%`.
  - As props de estilo (spacing, flex, radius, size, position, visibility, shadow, `bgcolor`, `paper`) vão para o `Box` wrapper.
  - Os demais atributos (ex: `onError`, `onLoad`, `crossOrigin`, `className`) vão para a tag `<img>` interna.
- Sem `hover.zoom`, não há wrapper extra: o componente é um único `<img>` (via `Box component="img"`).
- `alt` é obrigatório por acessibilidade — o TypeScript aponta erro de compilação se não for passado.
