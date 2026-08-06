# ToggleTheme

Botão para alternar entre tema claro e escuro da aplicação. Tem duas variantes visuais: um `IconButton` animado (padrão) ou um switch customizado com trilho e thumb animados (prop `switch`).

## Quando usar

Use em qualquer lugar da aplicação (header, menu, configurações) onde o usuário deva poder alternar entre tema claro/escuro. Não use fora da árvore de um `AppThemeProvider` — o componente depende do contexto de tema da aplicação e lança erro sem ele (ver Dependências).

## Props

| Prop            | Tipo                                                          | Obrigatório | Padrão | Descrição |
|-----------------|-----------------------------------------------------------------|-------------|--------|-----------|
| `switch`        | `boolean`                                                        | Não         | `false` (variante `IconButton`) | Se `true`, renderiza como um switch customizado (trilho + thumb animados). Se `false`/omitido, renderiza como `IconButton`. |
| `style`         | `React.CSSProperties`                                            | Não         | —      | Estilo inline adicional. |
| `className`     | `string`                                                         | Não         | —      | Classe CSS adicional. |
| `position`      | `'static' \| 'relative' \| 'absolute' \| 'fixed' \| 'sticky'` (responsivo) | Não | —  | Posicionamento CSS. |
| `top`           | `string \| number` (responsivo)                                  | Não         | —      | Posição `top`. |
| `left`          | `string \| number` (responsivo)                                  | Não         | —      | Posição `left`. |
| `right`         | `string \| number` (responsivo)                                  | Não         | —      | Posição `right`. |
| `bottom`        | `string \| number` (responsivo)                                  | Não         | —      | Posição `bottom`. |
| `zIndex`        | `number` (responsivo)                                            | Não         | —      | `z-index`. |
| `height`        | `string \| number` (responsivo)                                  | Não         | —      | Altura. |
| `width`         | `string \| number` (responsivo)                                  | Não         | —      | Largura. |
| `displayFlex`   | `boolean \| 'row' \| 'column' \| 'center'`                        | Não         | —      | Ativa `display: flex`. |
| `row`           | `boolean \| BreakpointKey`                                       | Não         | —      | Direção flex em linha. |
| `column`        | `boolean \| BreakpointKey`                                       | Não         | —      | Direção flex em coluna. |
| `center`        | `boolean`                                                         | Não         | —      | Centraliza itens (flex). |
| `between`       | `boolean`                                                         | Não         | —      | `justify-content: space-between`. |
| `around`        | `boolean`                                                         | Não         | —      | `justify-content: space-around`. |
| `evenly`        | `boolean`                                                         | Não         | —      | `justify-content: space-evenly`. |
| `full`          | `boolean`                                                         | Não         | —      | Ocupa 100% de largura/altura disponível. |
| `justifyContent`| valores de `justify-content` (responsivo)                         | Não         | —      | Controle direto de `justify-content`. |
| `alignItems`    | valores de `align-items` (responsivo)                             | Não         | —      | Controle direto de `align-items`. |
| `gap`           | `number \| string` (responsivo)                                   | Não         | —      | Espaçamento entre itens flex. |
| `p`, `pr`, `pl`, `pt`, `pb`, `px`, `py` | `boolean \| number \| string` (responsivo, `p`); `string \| number` (responsivo, demais) | Não | — | Padding (geral/direcional). |
| `m`, `ml`, `mr`, `mt`, `mb`, `mx`, `my` | `string \| number` (responsivo)                  | Não         | —      | Margin (geral/direcional). |
| `hideUp`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                            | Não         | —      | Esconde o componente a partir do breakpoint informado (inclusive para cima). |
| `hideDown`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                            | Não         | —      | Esconde o componente abaixo do breakpoint informado. |

## Exemplo de uso

```tsx
import { ToggleTheme } from '@/components';

// Variante padrão (IconButton)
<ToggleTheme />

// Variante switch customizado
<ToggleTheme switch />
```

## Dependências relevantes

- `@/hooks/useThemeMode` — obtém `mode` (`'light' | 'dark'`) e `toggleTheme` do contexto de tema. **Lança um erro** (`'useThemeMode must be used within an AppThemeProvider'`) se usado fora de um `AppThemeProvider`.
- `@/contexts/ThemeContext` (`AppThemeProvider`) — precisa envolver a árvore da aplicação para o componente funcionar.
- `IconButton`, `Box`, `Icon` (`@/components`).
- `@mui/icons-material` (`LightModeIcon`, `DarkModeIcon`).

## Notas

- ⚠️ **Props de posicionamento (`position`, `top`, `left`, `right`, `bottom`, `zIndex`) não funcionam de forma consistente entre as duas variantes.** Na variante `switch` (spread sobre um `Box` interno), essas props são processadas normalmente pelo `Box`, que suporta `PositionStyleProps`. Na variante padrão (`IconButton`, quando `switch` não é `true`), as props são repassadas via spread para o `IconButton` do kit — mas o `IconButtonProps` **não** inclui `PositionStyleProps` e seu `shouldForwardProp` não filtra essas chaves, então elas vazam como atributos brutos para o DOM em vez de virar CSS. Isso é uma inconsistência real do código-fonte, não um comportamento documentado/intencional — comportamento ainda não definido/em desenvolvimento nesse ponto.
- Os `aria-label="Alternar tema"` são fixos (hardcoded em português) nas duas variantes — não há prop para customizar o texto de acessibilidade.
- Na variante `switch`, o componente já implementa `role="switch"`, `aria-checked` e navegação por teclado (Enter/Espaço) manualmente, já que não usa o `Switch` nativo do MUI.
- Não há prop para controlar a cor do ícone/trilho fora dos valores fixos definidos internamente (a cor muda automaticamente com o tema, mas não é customizável via prop).
