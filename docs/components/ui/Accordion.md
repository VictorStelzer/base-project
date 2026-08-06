# Accordion

Wrapper estilizado sobre o `Accordion` do MUI (`Accordion` + `AccordionSummary` + `AccordionDetails` combinados em um único componente). Recebe um título e um conteúdo, e já vem com ícone de expansão, cores de tema e espaçamento padrão configurados.

## Quando usar

Usar para blocos de conteúdo expansível/recolhível (FAQ, listas de detalhes, painéis de configuração). Não usar quando o conteúdo deve estar sempre visível — nesse caso um `Box`/`Paper` simples é mais direto.

## Props

| Prop                | Tipo                                     | Obrigatório | Padrão                              | Descrição                                                                 |
|----------------------|-------------------------------------------|-------------|--------------------------------------|-----------------------------------------------------------------------------|
| `title`              | `ReactNode`                               | Sim         | —                                     | Título do accordion. Se for `string`, é renderizado num `Typography` (`variant="subtitle1"`, `fontWeight: 600`); se for outro `ReactNode`, é renderizado como está. |
| `children`           | `ReactNode`                               | Sim         | —                                     | Conteúdo do accordion. Se for `string`, é renderizado num `Typography` (`variant="body2"`); caso contrário, renderizado como está. |
| `bgcolor`            | `string`                                  | Não         | `theme.palette.background.paper`     | Cor de fundo. Aceita caminho do tema (ex: `'primary.main'`) ou cor CSS.    |
| `titleColor`         | `string`                                  | Não         | `text.primary`                       | Cor do título (aplicada só quando `title` é `string`).                    |
| `titleStyle`         | `TypographyProps` (MUI)                   | Não         | —                                     | Props extras repassadas ao `Typography` do título (só quando `title` é `string`). |
| `textColor`          | `string`                                  | Não         | `text.secondary`                     | Cor do conteúdo (aplicada só quando `children` é `string`).               |
| `textStyle`          | `TypographyProps` (MUI)                   | Não         | —                                     | Props extras repassadas ao `Typography` do conteúdo (só quando `children` é `string`). |
| `icon`               | `ReactNode`                               | Não         | `<ExpandMore />`                     | Ícone de expansão customizado. Quando informado, `iconColor` é ignorado (só se aplica ao ícone padrão). |
| `iconColor`          | `string`                                  | Não         | —                                     | Cor do ícone padrão de expansão. Sem efeito se `icon` for informado.      |
| `iconPosition`       | `'start' \| 'end'`                        | Não         | `'end'`                               | Posição do ícone de expansão em relação ao título.                        |
| `divider`            | `boolean`                                 | Não         | `false`                               | Exibe uma linha divisória entre o título e o conteúdo.                    |
| `p`, `pt`, `pb`, `pl`, `pr`, `px`, `py` | `ResponsiveProp<string \| number>` (`p` também aceita `boolean`) | Não | — | Padding (`SpacingProps`, herdado). |
| `m`, `mt`, `mb`, `ml`, `mr`, `mx`, `my` | `ResponsiveProp<string \| number>` | Não | `m` padrão `1` (spacing do tema); demais sem padrão | Margin (`SpacingProps`, herdado). Ver nota sobre `m`. |
| `radius`             | `boolean \| number`                       | Não         | `true`                                | Arredondamento de borda (`RadiusProps`, herdado). |
| `circle`             | `boolean`                                  | Não         | —                                     | Força formato circular (`RadiusProps`, herdado).                          |
| `square`             | `boolean`                                  | Não         | —                                     | Remove arredondamento (`RadiusProps`, herdado).                           |
| `height`, `width`    | `ResponsiveProp<string \| number>`         | Não         | —                                     | Dimensões (`SizeProps`, herdado).                                         |
| `hideUp`             | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`     | Não         | —                                     | Esconde o componente a partir do breakpoint informado (`VisibilityProps`, herdado). |
| `hideDown`           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`     | Não         | —                                     | Esconde o componente abaixo do breakpoint informado (`VisibilityProps`, herdado). |
| `...props`           | `Omit<AccordionProps do MUI, 'children' \| 'title'>` | Não | — | Aceita as demais props nativas do `Accordion` do MUI (ex: `expanded`, `onChange`, `disableGutters`). O componente já passa `disableGutters` por padrão, mas isso pode ser sobrescrito. Consulte a documentação do MUI para a lista completa. |

## Exemplo de uso

```tsx
import { Accordion } from '@/components';

<Accordion title="Pergunta frequente" divider>
  Texto de resposta da pergunta frequente.
</Accordion>
```

## Dependências relevantes

- Requer um `ThemeProvider` do MUI (usa `useTheme` para resolver cores via `getColor`).
- Usa utilitários internos de `@/components/styles` (`getSpacingStyles`, `getRadiusStyles`, `getSizeStyles`, `getVisibilityStyles`, `getColor`).
- Usa o ícone `ExpandMore` de `@mui/icons-material` como padrão.

## Notas

- Quando a prop `m` não é informada, o componente aplica `m={1}` por padrão E zera a margem extra que o MUI adiciona automaticamente ao estado expandido (`&.Mui-expanded { margin: 0 }`). Se `m` for informado explicitamente, esse reset não ocorre — o comportamento passa a ser o padrão do MUI.
- `radius` tem padrão `true` mesmo sem informar nada (diferente da maioria dos componentes do kit, que deixam `radius` sem valor padrão).
- `iconColor` só tem efeito quando o ícone padrão (`ExpandMore`) está em uso; ao passar `icon` customizado, a cor deve ser aplicada pelo próprio ícone recebido.
- ⚠️ Comportamento de `titleStyle`/`textStyle` com `title`/`children` não-string não foi testado no código (o `Typography` só é usado quando o valor é `string`) — nesses casos, `titleStyle`/`textStyle` são ignorados silenciosamente.
