# BackButton

Botão de "Voltar" pronto para uso, baseado no componente `Button` do kit. Por padrão navega para a página anterior do histórico usando `react-router-dom`.

## Quando usar

Usar em telas onde faz sentido voltar para a página/rota anterior (detalhes, formulários em etapas, wizards). Não usar como botão de navegação genérico — para isso, usar `Button` diretamente.

## Props

`BackButtonProps` estende `ButtonProps` (do componente `Button` — ver [`Button.md`](./Button.md)) e adiciona:

| Prop      | Tipo                                             | Obrigatório | Padrão     | Descrição                                                                 |
|-----------|---------------------------------------------------|-------------|------------|-----------------------------------------------------------------------------|
| `label`   | `string`                                          | Não         | `'Voltar'` | Texto exibido no botão.                                                    |
| `variant` | `'text' \| 'outlined' \| 'contained'` (MUI)       | Não         | `'text'`   | Sobrescreve o padrão do `Button` (que é `'contained'`).                    |
| `onClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | Não   | —          | Se informado, substitui o comportamento padrão (`navigate(-1)`).           |
| `startIcon` | `ReactNode`                                     | Não         | `<ArrowBackIcon />`  | Ícone inicial do botão.                                          |
| `...props` | `ButtonProps`                                    | Não         | —          | Todas as demais props do `Button` do kit são aceitas (`fontSize`, `fontWeight`, `hover`, `loading`, `glass`, `uppercase`, `textColor`, além de `SpacingProps`, `SizeProps`, `RadiusProps`, `FlexProps`, `VisibilityProps` e as props nativas do `Button` do MUI). Ver tabela completa em [`Button.md`](./Button.md). |

Internamente, o componente já define `width='fit-content'`, `fontWeight='bold'` e `fontSize={20}` como padrão (podem ser sobrescritos passando a prop correspondente).

## Exemplo de uso

```tsx
import { BackButton } from '@/components';

<BackButton />

// Com label e comportamento customizados
<BackButton label="Cancelar" onClick={() => minhaFuncaoCustom()} />
```

## Dependências relevantes

- Requer estar dentro de um contexto de roteador do `react-router-dom` (ex: `BrowserRouter`), pois usa `useNavigate` internamente.
- Depende do componente `Button` do kit (`@/components`), herdando toda a lógica de estilo dele (que por sua vez requer `ThemeProvider` do MUI).

## Notas

- Se `onClick` não for informado, o clique executa `navigate(-1)` (volta uma página no histórico do navegador). Se a pilha de histórico estiver vazia, o comportamento depende do `react-router-dom`/navegador — não é tratado explicitamente no componente.
- `startIcon` tem fallback para `<ArrowBackIcon />` do `@mui/icons-material` via `startIcon ?? <ArrowBackIcon />`. Como `??` trata tanto `null` quanto `undefined` como "vazio", passar `startIcon={null}` também cai no fallback — para remover o ícone é preciso passar `startIcon={false}`.
