# Button

Wrapper estilizado sobre o `Button` do MUI. Adiciona espaçamento, hover customizado, loading state com spinner, efeito "glass" e as props compartilhadas de estilo do kit (spacing, size, radius, flex, visibility).

## Quando usar

Usar para qualquer botão de ação da aplicação — é a base para outros componentes do kit (ex: `BackButton`). Não usar diretamente quando já existir um componente mais específico que já embale o `Button` para um caso de uso (ex: `BackButton` para "voltar").

## Props

| Prop         | Tipo                                                                                          | Obrigatório | Padrão        | Descrição                                                                 |
|--------------|--------------------------------------------------------------------------------------------------|-------------|----------------|------------------------------------------------------------------------------|
| `textColor`  | `string`                                                                                         | Não         | —              | Cor do texto. Aceita caminho do tema (ex: `'primary.main'`) ou cor CSS.     |
| `hover`      | `{ shadow?: number; color?: string; textColor?: string; borderColor?: string; borderWidth?: number; scale?: number; opacity?: number }` | Não | — | Efeito de hover customizado (ver detalhamento abaixo).                    |
| `uppercase`  | `boolean`                                                                                         | Não         | `false`        | Transforma o texto do botão em maiúsculo (`textTransform: 'uppercase'`; padrão do MUI já é `'none'` aqui, diferente do padrão nativo do MUI que é uppercase). |
| `fontSize`   | `string \| number`                                                                                | Não         | —              | Tamanho da fonte.                                                          |
| `fontWeight` | `string \| number`                                                                                | Não         | —              | Peso da fonte.                                                             |
| `loading`    | `boolean`                                                                                         | Não         | `false`        | Exibe um `CircularProgress` no lugar do conteúdo, desabilita o botão e oculta o `startIcon`. |
| `glass`      | `boolean`                                                                                         | Não         | `false`        | Aplica efeito "glass" (fundo translúcido + `backdrop-filter: blur`), adaptado ao modo claro/escuro do tema. |
| `variant`    | `'text' \| 'outlined' \| 'contained'` (MUI)                                                      | Não         | `'contained'`  | Variante visual do botão (prop nativa do MUI, com padrão sobrescrito pelo componente). |
| `disabled`   | `boolean` (MUI)                                                                                   | Não         | `false`        | Desabilita o botão. Fica `true` automaticamente quando `loading` é `true`. |
| `startIcon`  | `ReactNode` (MUI)                                                                                 | Não         | —              | Ícone inicial. É ocultado (`null`) automaticamente quando `loading` é `true`. |
| `p`, `pr`, `pl`, `pt`, `pb`, `px`, `py`, `m`, `mr`, `ml`, `mt`, `mb`, `mx`, `my` | `ResponsiveProp<string \| number>` (`p` também aceita `boolean`) | Não | — | Espaçamento (`SpacingProps`, herdado). |
| `height`, `width` | `ResponsiveProp<string \| number>`                                                          | Não         | —              | Dimensões (`SizeProps`, herdado).                                          |
| `radius`     | `boolean \| number`                                                                               | Não         | —              | Arredondamento de borda (`RadiusProps`, herdado).                          |
| `circle`     | `boolean`                                                                                          | Não         | —              | Força formato circular (`RadiusProps`, herdado).                          |
| `square`     | `boolean`                                                                                          | Não         | —              | Remove arredondamento (`RadiusProps`, herdado).                           |
| `displayFlex`, `row`, `column`, `center`, `between`, `around`, `evenly`, `full`, `justifyContent`, `alignItems`, `gap` | vários (ver `FlexProps`) | Não | — | Layout flexbox (`FlexProps`, herdado). |
| `hideUp`, `hideDown` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                     | Não         | —              | Visibilidade responsiva (`VisibilityProps`, herdado).                     |
| `...props`  | `ButtonProps` do MUI                                                                              | Não         | —              | Demais props nativas do `Button` do MUI (`onClick`, `type`, `color`, `size`, `fullWidth`, `href`, etc.). |

Detalhamento de `hover`:

| Campo (`hover.*`) | Tipo     | Descrição                                              |
|---------------------|-----------|------------------------------------------------------------|
| `shadow`            | `number`  | Índice da sombra do tema (`theme.shadows[n]`) aplicada no hover. |
| `color`             | `string`  | Cor de fundo no hover (caminho do tema ou CSS).             |
| `textColor`         | `string`  | Cor do texto no hover.                                       |
| `borderColor`       | `string`  | Cor da borda no hover (a borda já nasce transparente para transição suave). |
| `borderWidth`       | `number`  | Espessura da borda no hover. Padrão `1` (px) quando `borderColor` é informado. |
| `scale`             | `number`  | Fator de escala (`transform: scale(...)`) no hover.         |
| `opacity`           | `number`  | Opacidade no hover.                                           |

## Exemplo de uso

```tsx
import { Button } from '@/components';

<Button variant="contained" onClick={() => {}}>
  Salvar
</Button>

// Com loading e hover customizado
<Button loading hover={{ scale: 1.05, shadow: 4 }}>
  Enviar
</Button>
```

## Dependências relevantes

- Requer `ThemeProvider` do MUI (usa `theme` para resolver cores via `getColor`, sombras, e o modo claro/escuro para o efeito `glass`).
- Usa utilitários internos de `@/components/styles` (`getColor`, `getSpacingStyles`, `getRadiusStyles`, `getFlexStyles`, `getSizeStyles`, `getVisibilityStyles`).

## Notas

- Quando `loading` é `true`: o botão fica desabilitado, `startIcon` é forçado a `null`, o conteúdo (`children`) é substituído por um `CircularProgress` (`size={24}`, `color="inherit"`), e é adicionado `aria-busy`. Se não houver `aria-label` explícito e `children` for uma `string`, essa string vira o `aria-label` automaticamente (para leitores de tela, já que o texto visível some).
- `uppercase` tem padrão `false`, invertendo o padrão nativo do MUI (que aplica `uppercase` por padrão via `textTransform`).
- O efeito `hover` é próprio do `Button` (mapeamento `hover.color` → cor de fundo, `hover.textColor` → cor do texto) e é diferente do `hover` de outros componentes do kit como `Box` (que usa `bgcolor` em vez de `color` dentro do objeto de hover).
