# Icon

`Icon` é um wrapper que renderiza qualquer elemento de ícone (React node) dentro de um `Box`,
aplicando tamanho e cor consistentes com o tema, e opcionalmente um fundo colorido/suave
atrás do ícone.

## Quando usar

Use sempre que for renderizar um ícone solto na tela (fora de um `IconButton`) e quiser que
ele siga tamanho/cor do tema de forma padronizada, com ou sem fundo (ex: ícone dentro de um
card de feature, badge de status).

Não use para ícones clicáveis — para isso existe `IconButton`, que já cuida de área de toque,
hover e foco.

## Props

`Icon` estende `BoxProps` (`Omit<BoxProps, 'color'>`) — ou seja, herda **todas** as props do
componente `Box` (spacing, flex, radius, size, position, hover, shadow, `bgcolor`,
visibilidade etc.), exceto `color`, que aqui tem semântica própria (cor do ícone, não cor de
fundo). Ver [`Box.md`](./Box.md) para a lista completa de props herdadas — não repetidas
integralmente aqui para evitar duplicação, mas as principais estão resumidas abaixo.

### Props próprias

| Prop    | Tipo                        | Obrigatório | Padrão         | Descrição |
|---------|------------------------------|-------------|-----------------|-----------|
| `icon`  | `React.ReactNode`            | Sim         | —               | O ícone a renderizar. Pode ser um elemento de componente de ícone (ex: Lucide, MUI `SvgIcon`) ou qualquer SVG/node. |
| `color` | `string`                     | Não         | `'primary.main'`| Cor aplicada ao ícone. Aceita hexadecimal ou caminho do tema (ex: `primary.main`). Aplicada via CSS (`& svg, & .MuiSvgIcon-root { color }`) e também clonada como prop `color` no elemento `icon` (ver Notas). |
| `size`  | `string \| number`           | Não         | `24`            | Tamanho do ícone. `number` = px. Aplicado via CSS (`fontSize`/`width`/`height`) e clonado como prop `size` no elemento `icon` (ver Notas). |
| `bg`    | `boolean \| string`          | Não         | —               | Fundo atrás do ícone. `true` = versão com 10% de opacidade da cor resolvida (`color`). `string` = cor customizada (caminho do tema ou CSS). Quando ativo, também aplica `radius={12}` e `p={0.7}` por padrão (se não sobrescritos). |

### Props herdadas de `Box` (resumo)

Herdadas via `BoxProps` — mesmos tipos e comportamento documentados em `Box.md`:

| Grupo | Props |
|-------|-------|
| Espaçamento (`SpacingProps`) | `p`, `pr`, `pl`, `pt`, `pb`, `px`, `py`, `m`, `ml`, `mr`, `mt`, `mb`, `mx`, `my` |
| Flexbox (`FlexProps`) | `displayFlex`, `row`, `column`, `center`, `between`, `around`, `evenly`, `full`, `justifyContent`, `alignItems`, `gap` |
| Arredondamento (`RadiusProps`) | `radius`, `circle`, `square` |
| Dimensão (`SizeProps`) | `height`, `width` |
| Posição (`PositionStyleProps`) | `position`, `top`, `left`, `right`, `bottom`, `zIndex` |
| Visibilidade (`VisibilityProps`) | `hideUp`, `hideDown` |
| Próprias do `Box` | `shadow`, `shadowColor`, `shadowSecondary`, `paper`, `bgcolor`, `hover` |

## Exemplo de uso

```tsx
import { Icon } from '@/components';
import { Home } from 'lucide-react';

<Icon icon={<Home />} color="primary.main" size={32} bg />
```

## Dependências relevantes

- Depende de um `ThemeProvider` do MUI (`useTheme`, `getColor`, `alpha`).
- Renderiza internamente um `Box` (`@/components`) — depende dele para todo o layout/estilo.

## Notas

- O ícone passado em `icon` recebe `size` e `color` automaticamente via
  `React.cloneElement` — funciona bem com bibliotecas de ícone que aceitam essas props como
  props diretas (padrão estilo lucide-react). Ícones do MUI (`SvgIcon`) ignoram um `color`
  string desconhecido nessa prop clonada, mas o efeito visual final funciona do mesmo jeito
  porque a cor também é aplicada via CSS cascade (`& .MuiSvgIcon-root { color }`, que o
  `SvgIcon` respeita via `currentColor`).
- Como `IconProps` estende `BoxProps` (menos `color`), a prop `bgcolor` do `Box` também fica
  tecnicamente disponível em `Icon` e é repassada por último (`{...props}` depois de
  `bgcolor={backgroundColor}` no JSX interno). Passar `bgcolor` manualmente sobrescreve o
  fundo calculado a partir de `bg`. ⚠️ Esse comportamento não está documentado/testado como
  intencional no código-fonte — é uma consequência da ordem de spread das props.
- Quando `icon` não é um elemento React válido (`React.isValidElement` retorna `false`), ele é
  renderizado como está, sem clonagem de `size`/`color`.
