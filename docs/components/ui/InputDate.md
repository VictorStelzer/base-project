# InputDate

`InputDate` é um wrapper do `DatePicker` do `@mui/x-date-pickers`, com label externo opcional e integração com o sistema de estilos do projeto (radius, bgcolor, spacing, etc.), no mesmo padrão visual do `Input`.

## Quando usar

Use para campos de seleção de data. Para texto livre com máscara (incluindo datas digitadas como texto, ex: `mask="expiryDate"`), use `Input`. Não use para seleção de hora/hora+data — o componente usa `DatePicker` (apenas data).

## Props

| Prop         | Tipo                                    | Obrigatório | Padrão                              | Descrição                                                                 |
|--------------|--------------------------------------------|-------------|----------------------------------------|--------------------------------------------------------------------------|
| `value`      | `Dayjs \| null`                            | Sim         | —                                       | Valor selecionado (componente controlado).                               |
| `onChange`   | `(value: Dayjs \| null) => void`           | Sim         | —                                       | Callback disparado quando o valor muda.                                  |
| `inputLabel` | `string`                                    | Não         | —                                       | Label exibido acima do picker, no lugar do label flutuante padrão.       |
| `errorText`  | `string`                                    | Não         | —                                       | Texto de erro exibido abaixo do picker. Se declarada (mesmo `undefined`), reserva o espaço no layout. |
| `bgcolor`    | `boolean \| string`                        | Não         | —                                       | Cor de fundo. `true` usa `background.default`; `string` usa como cor CSS ou path do tema. |
| `paper`      | `boolean`                                   | Não         | —                                       | Se `true`, aplica o `background.paper` do tema.                          |
| `iconColor`  | `string`                                    | Não         | `theme.palette.primary.main`            | Cor do ícone de calendário. |
| `required`   | `boolean`                                   | Não         | —                                       | Marca o campo como obrigatório; exibe `*` vermelho ao lado do `inputLabel`. |
| `optional`   | `boolean`                                   | Não         | —                                       | Se `true`, adiciona o texto "(Opcional)" ao lado do `inputLabel`.        |
| `disabled`   | `boolean`                                   | Não         | —                                       | Desabilita o campo.                                                      |
| `fullWidth`  | `boolean`                                   | Não         | `true`                                  | Ocupa 100% da largura disponível.                                        |
| `width`      | `string \| number`                          | Não         | `'100%'` se `fullWidth`, senão `'auto'` | Largura do wrapper externo.                                              |
| `height`     | `string \| number`                          | Não         | `45`                                    | Altura do campo.                                                         |
| `minDate`    | `Dayjs`                                     | Não         | —                                       | Data mínima selecionável.                                                |
| `maxDate`    | `Dayjs`                                     | Não         | —                                       | Data máxima selecionável.                                                |
| `format`     | `string`                                    | Não         | `'DD/MM'`                               | Formato de exibição/parsing da data (sintaxe dayjs). ⚠️ o padrão não inclui o ano — para a maioria dos formulários (ex: data de nascimento), provavelmente será necessário sobrescrever para algo como `'DD/MM/YYYY'`. |
| `radius`     | `boolean \| number`                         | Não         | `12`                                    | Arredondamento das bordas (herdado de `RadiusProps`, com valor padrão definido no componente). |
| `circle`     | `boolean`                                   | Não         | —                                       | Borda totalmente arredondada (herdado de `RadiusProps`).                 |
| `square`     | `boolean`                                   | Não         | —                                       | Remove o arredondamento (herdado de `RadiusProps`).                      |
| `p, pr, pl, pt, pb, px, py` | `ResponsiveProp<string \| number>`  | Não         | —                                       | Padding do `Box` wrapper externo (herdado de `SpacingProps`).            |
| `m, ml, mr, mt, mb, mx, my` | `ResponsiveProp<string \| number>`  | Não         | —                                       | Margin do `Box` wrapper externo (herdado de `SpacingProps`).             |
| `hideUp, hideDown` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Não        | —                                       | Visibilidade responsiva do wrapper externo (herdado de `VisibilityProps`). |

## Exemplo de uso

```tsx
import { InputDate } from '@/components';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const [date, setDate] = useState<Dayjs | null>(dayjs());

<InputDate
  inputLabel="Data de nascimento"
  format="DD/MM/YYYY"
  value={date}
  onChange={setDate}
  required
/>
```

## Dependências relevantes

- `DatePicker` de `@mui/x-date-pickers/DatePicker` e o tipo `Dayjs` de `dayjs`.
- ⚠️ **Requer `LocalizationProvider` configurado.** Para o `DatePicker` funcionar em runtime (formatar/interpretar datas), a árvore da aplicação precisa estar envolvida por um `LocalizationProvider` (de `@mui/x-date-pickers`) com `AdapterDayjs` (de `@mui/x-date-pickers/AdapterDayjs`). Esse provider **ainda não está configurado neste boilerplate** — nenhuma ocorrência de `LocalizationProvider` foi encontrada em `src/`. Quem for usar `InputDate` numa aplicação real precisa adicioná-lo manualmente na raiz da aplicação (ex: em `App.tsx`), algo como:
  ```tsx
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

  <LocalizationProvider dateAdapter={AdapterDayjs}>
    {/* app */}
  </LocalizationProvider>
  ```
- Componentes internos `Box` e `Text` de `@/components`.
- `getRadiusStyles`, `getColor` de `@/components/styles`.
- Tema MUI (`useTheme` — precisa de `ThemeProvider`).

## Notas

- `InputDateProps` **não estende** `DatePickerProps` do MUI X (diferente de `Input`, que estende `TextFieldProps`). O tipo só expõe explicitamente `value`, `onChange`, `minDate`, `maxDate`, `disabled` e os campos customizados acima. Outras props do `DatePicker` (ex: `views`, `disablePast`, `shouldDisableDate`) não são aceitas pelo TypeScript, mesmo o componente internamente repassar `...props` para o `DatePicker` — isso é uma limitação do tipo atual (⚠️ incompleto/a revisar).
- O espaço do `errorText` é reservado (altura mínima de 20px) mesmo sem erro, seguindo a mesma lógica do `Input` — só ocorre quando `errorText` é explicitamente declarada (mesmo `undefined`).
- Os estilos do popup do calendário (`desktopPaper`/`mobilePaper`) são fixos no componente (fundo `background.default`, borda `divider`) — não há prop para customizá-los.
- O comentário no código-fonte descreve `iconColor` como "a mesma cor da borda quando o campo está ativo (primary)", mas o valor padrão real é sempre `theme.palette.primary.main`, independente do estado de foco do campo.
