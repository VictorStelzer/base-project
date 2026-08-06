# Input

`Input` é um wrapper do `TextField` do MUI, com label externo opcional, adornos de ícone (esquerda/direita), modo senha, máscaras de formatação automática e integração com o sistema de estilos do projeto (radius, bgcolor, spacing, etc.).

## Quando usar

Use para qualquer campo de texto do formulário que precise de label acima do campo, ícone, modo senha ou máscara (CPF, telefone, cartão, etc.). Para inputs de data, use `InputDate`. Para um `TextField` puro do MUI sem essas conveniências, use o `TextField` diretamente.

## Props

| Prop         | Tipo                                                                                                   | Obrigatório | Padrão                              | Descrição                                                                 |
|--------------|-----------------------------------------------------------------------------------------------------------|-------------|---------------------------------------|--------------------------------------------------------------------------|
| `inputLabel` | `string`                                                                                                    | Não         | —                                      | Label exibido acima do input, no lugar do label flutuante padrão do `TextField`. |
| `errorText`  | `string`                                                                                                    | Não         | —                                      | Texto de erro exibido abaixo do input. Se a prop for declarada (mesmo `undefined`), o espaço dela é reservado no layout mesmo sem erro. |
| `bgcolor`    | `boolean \| string`                                                                                         | Não         | —                                      | Cor de fundo. `true` usa `background.default` do tema; `string` usa como cor CSS ou path do tema. |
| `paper`      | `boolean`                                                                                                    | Não         | —                                      | Se `true`, aplica o `background.paper` do tema.                          |
| `icon`       | `ReactNode`                                                                                                  | Não         | —                                      | Ícone à esquerda (adorno inicial). Usa a cor da prop `color` do `TextField`, se definida. |
| `iconRight`  | `ReactNode`                                                                                                  | Não         | —                                      | Ícone à direita (adorno final). É ignorado se `password` for `true`.     |
| `password`   | `boolean`                                                                                                    | Não         | —                                      | Ativa modo senha: adiciona botão de "olho" que alterna o campo entre `type="password"` e `type="text"`. Sobrescreve `iconRight`. |
| `mask`       | `'cpf' \| 'cnpj' \| 'cpfCnpj' \| 'phone' \| 'cardNumber' \| 'expiryDate' \| 'cep' \| 'currency'`             | Não         | —                                      | Aplica formatação automática no `onChange` e define o `maxLength` do input nativo conforme a máscara. ⚠️ `'currency'` existe no tipo mas não tem implementação em `utils.ts` (`getMaskedValue`/`getMaxLength`) — nenhuma máscara é aplicada e `maxLength` fica `undefined` nesse caso. Comportamento incompleto. |
| `optional`   | `boolean`                                                                                                    | Não         | —                                      | Se `true`, adiciona o texto "(Opcional)" ao lado do `inputLabel`.        |
| `required`   | `boolean`                                                                                                    | Não         | —                                      | Marca o campo como obrigatório; exibe `*` vermelho ao lado do `inputLabel` (além do comportamento nativo do `TextField`). |
| `error`      | `boolean`                                                                                                    | Não         | `true` se `errorText` tiver valor      | Força o estado visual de erro. Se omitido, é calculado a partir de `errorText`. |
| `helperText` | `ReactNode`                                                                                                  | Não         | —                                      | Texto de ajuda exibido quando não há erro (quando há erro, `errorText` tem prioridade). |
| `radius`     | `boolean \| number`                                                                                          | Não         | `12`                                   | Arredondamento das bordas (herdado de `RadiusProps`, com valor padrão definido no `Input`). |
| `circle`     | `boolean`                                                                                                    | Não         | —                                      | Borda totalmente arredondada (herdado de `RadiusProps`).                 |
| `square`     | `boolean`                                                                                                    | Não         | —                                      | Remove o arredondamento (herdado de `RadiusProps`).                      |
| `height`     | `ResponsiveProp<string \| number>`                                                                           | Não         | `45`                                   | Altura do input (herdado de `SizeProps`, com valor padrão definido no `Input`). |
| `width`      | `ResponsiveProp<string \| number>`                                                                           | Não         | `'100%'` se `fullWidth`, senão `'auto'`| Largura do wrapper externo (herdado de `SizeProps`).                     |
| `fullWidth`  | `boolean`                                                                                                    | Não         | `true`                                 | Ocupa 100% da largura disponível (prop nativa do `TextField`, com default alterado para `true` neste componente). |
| `p, pr, pl, pt, pb, px, py` | `ResponsiveProp<string \| number>`                                                            | Não         | —                                      | Padding do `Box` wrapper externo (herdado de `SpacingProps`).            |
| `m, ml, mr, mt, mb, mx, my` | `ResponsiveProp<string \| number>`                                                            | Não         | —                                      | Margin do `Box` wrapper externo (herdado de `SpacingProps`).             |
| `hideUp, hideDown` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                 | Não         | —                                      | Visibilidade responsiva do wrapper externo (herdado de `VisibilityProps`). |

Além dessas, aceita as demais props nativas do `TextField` do MUI (`variant`, `color`, `disabled`, `multiline`, `type`, `value`, `onChange`, `slotProps`, `sx`, etc.), exceto as que conflitam com `SpacingProps`/`SizeProps`/`RadiusProps` (que são as versões customizadas acima).

## Exemplo de uso

```tsx
import { Input } from '@/components';

<Input
  inputLabel="CPF"
  mask="cpf"
  value={cpf}
  onChange={(e) => setCpf(e.target.value)}
  required
/>
```

Com ícone e modo senha:

```tsx
<Input
  inputLabel="Senha"
  password
  icon={<LockIcon />}
  errorText={errors.password}
  value={senha}
  onChange={(e) => setSenha(e.target.value)}
/>
```

## Dependências relevantes

- `TextField`, `InputAdornment`, `IconButton` do MUI (`@mui/material`).
- Ícones `Visibility`/`VisibilityOff` de `@mui/icons-material`, usados no modo `password`.
- Componentes internos `Box` e `Text` de `@/components`.
- `getRadiusStyles`, `getColor` de `@/components/styles`.
- Funções de máscara (`maskCPF`, `maskCNPJ`, `maskCpfCnpj`, `maskPhone`, `maskCardNumber`, `maskExpiryDate`, `maskCEP`) de `@/utils`, usadas internamente em `Input/utils.ts`.

## Notas

- `slotProps` (herdado do `TextField`) é a forma correta de customizar o input interno e os adornos nativos nesta versão do MUI — a API antiga `InputProps`/`inputProps` não existe mais no `@mui/material` instalado neste projeto.
- Se `slotProps.input.startAdornment`/`endAdornment` forem passados manualmente **e** `icon`/`password`/`iconRight` também forem usados, os adornos gerados pelas props `icon`/`password`/`iconRight` sobrescrevem os de `slotProps.input`.
- `slotProps.htmlInput.maxLength` é sobrescrito automaticamente quando `mask` está definido (usa `getMaxLength`), exceto para a máscara `'currency'`, que não define `maxLength` (⚠️ ver tabela de props acima).
- O espaço do `helperText`/`errorText` é reservado (altura mínima de 20px) mesmo sem erro, para o campo não "pular" de tamanho quando o erro aparece — isso só ocorre quando a prop `errorText` é explicitamente declarada (mesmo com valor `undefined`).
