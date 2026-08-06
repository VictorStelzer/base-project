# IconText

`IconText` renderiza um ícone ao lado de um texto (`Text`), com posição, cor, tamanho e espaçamento entre os dois configuráveis via prop `icon`. É um wrapper de layout (`Box` em flex) + `Text`.

## Quando usar

Use para rótulos com ícone: item de lista, texto informativo com ícone ao lado, badges simples, etc. Não é um botão — não tem tratamento de clique próprio (só recebe handlers nativos se forem passados via props do `Typography`, sem estado de interação/foco). Se precisar de algo clicável, envolva em outro componente (ex: `Button`) ou trate o clique fora dele.

## Props

| Prop      | Tipo                                              | Obrigatório | Padrão                                   | Descrição                                                                 |
|-----------|----------------------------------------------------|-------------|-------------------------------------------|----------------------------------------------------------------------------|
| `icon`    | `IconSettings` (ver tabela abaixo)                 | Sim         | —                                          | Configurações do ícone.                                                    |
| `color`   | `string`                                           | Não         | `theme.palette.primary.main`               | Cor geral aplicada ao ícone e ao texto, a menos que sobrescrita em `icon.color`. |
| `size`    | `string \| number`                                 | Não         | `20` (ícone) / padrão do `Text` (texto)    | Tamanho do texto e base do tamanho do ícone (ícone = `size * 1.3` quando `size` é number, senão usa `icon.size` ou `20`). |

Props herdadas de `TextProps` (com `color` sobrescrita pela definição acima, via `Omit<TextProps, 'color'>`):

| Prop            | Tipo                                                        | Obrigatório | Padrão | Descrição                                                                 |
|-----------------|---------------------------------------------------------------|-------------|--------|------------------------------------------------------------------------------|
| `truncate`      | `number`                                                      | Não         | —      | Limita o texto a N linhas com reticências (ellipsis).                        |
| `gradient`      | `boolean \| { from: string; to: string; dir?: string }`       | Não         | —      | Aplica gradiente no texto. `true` usa gradiente padrão.                      |
| `p, pr, pl, pt, pb, px, py` | `ResponsiveProp<string \| number>` (`p` aceita também `boolean`) | Não | — | Padding (herdado de `SpacingProps`).                                          |
| `m, ml, mr, mt, mb, mx, my` | `ResponsiveProp<string \| number>`                        | Não         | —      | Margin (herdado de `SpacingProps`).                                          |
| `height, width` | `ResponsiveProp<string \| number>`                            | Não         | —      | Dimensões (herdado de `SizeProps`).                                          |
| `fontSize, fontWeight, textAlign, letterSpacing, lineHeight` | `ResponsiveProp<...>`       | Não         | —      | Tipografia (herdado de `TypographyStyleProps`).                              |
| `hideUp, hideDown` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                      | Não         | —      | Visibilidade responsiva (herdado de `VisibilityProps`).                      |

Além disso, aceita as demais props nativas do `Typography` do MUI (`variant`, `component`, `noWrap`, `sx`, `children`, etc.), já que `TextProps` estende `TypographyProps`.

### Objeto `IconSettings` (prop `icon`)

| Prop       | Tipo                                        | Obrigatório | Padrão                     | Descrição                                                        |
|------------|-----------------------------------------------|-------------|------------------------------|----------------------------------------------------------------------|
| `icon`     | `ReactNode`                                   | Sim         | —                             | Elemento do ícone (ex: `<HomeIcon />`).                              |
| `color`    | `string`                                      | Não         | usa `color` do `IconText` ou `theme.palette.primary.main` | Cor específica do ícone, sobrescreve `color` geral.                  |
| `size`     | `string \| number`                            | Não         | `size * 1.3` (se `size` numérico) ou `20` | Tamanho específico do ícone.                                          |
| `gap`      | `string \| number`                            | Não         | `1`                           | Espaçamento (spacing do tema) entre ícone e texto.                   |
| `position` | `'left' \| 'right' \| 'top' \| 'bottom'`      | Não         | `'left'`                      | Posição do ícone em relação ao texto. `top`/`bottom` centralizam em coluna. |

## Exemplo de uso

```tsx
import { IconText } from '@/components';
import HomeIcon from '@mui/icons-material/Home';

<IconText icon={{ icon: <HomeIcon />, position: 'left' }} size={16}>
  Início
</IconText>
```

## Dependências relevantes

- `useTheme` do MUI — precisa estar dentro de um `ThemeProvider`.
- Componentes internos `Box` e `Text` de `@/components`.
- `getColor` de `@/components/styles`.

## Notas

- Se `icon.icon` for um elemento React válido, o componente clona-o injetando `size` e (quando `icon.color` ou `color` estiverem definidos) `color`. Isso funciona bem com ícones que aceitam essas props via `props` (ex: libs como `react-icons`). Para ícones `SvgIcon` do MUI, a prop `size` injetada é ignorada pelo componente do MUI, mas o tamanho visual final é garantido de qualquer forma via CSS aplicado no wrapper (`fontSize`/`width`/`height` no `Box` que envolve o ícone).
- `position: 'top'` ou `'bottom'` mudam o layout para coluna centralizada (`justifyContent`/`textAlign: center`); `'left'` (padrão) e `'right'` ficam em linha.
- Não é interativo por padrão — não expõe `onClick` tipado como prop própria (herda apenas os handlers nativos do `Typography`, se passados manualmente).
