# Snackbar

Notificação temporária exibida em uma borda/canto da tela, com fechamento automático por tempo e fechamento manual opcional. Wrapper sobre o `Snackbar` do MUI.

## Quando usar

- Feedback rápido de uma ação (sucesso, erro, aviso) que não exige interação do usuário.
- Normalmente não é renderizado diretamente pelo consumidor — o jeito mais comum de usar é através do hook `useNotification` (`@/hooks/useNotification`) junto com o `NotificationProvider` (`@/contexts/NotificationContext`), que já gerencia o estado de abertura (ver Dependências relevantes).
- Não usar para conteúdo que exige confirmação/interação bloqueante — nesse caso use `Modal`.

## Props

| Prop        | Tipo                                                                                   | Obrigatório | Padrão            | Descrição |
|-------------|------------------------------------------------------------------------------------------|-------------|--------------------|-----------|
| `open`      | `boolean` (herdado de `MuiSnackbarProps`, não omitido)                                   | Sim*        | —                  | Controla a visibilidade. *Herdado do MUI sem default próprio — deve ser fornecido pelo consumidor. |
| `onClose`   | `(event: SyntheticEvent \| Event, reason: SnackbarCloseReason) => void`                  | Não         | —                  | Chamado ao fechar. `reason` inclui os motivos nativos do MUI (`'timeout'`, `'clickaway'`, `'escapeKeyDown'`) mais `'closeClick'`, disparado quando o usuário clica no botão de fechar interno (ver Notas). |
| `message`   | `ReactNode`                                                                               | Não         | —                  | Conteúdo textual/nó exibido na notificação. |
| `duration`  | `number`                                                                                  | Não         | `3000`             | Tempo em ms até o fechamento automático (mapeado para `autoHideDuration` do MUI). |
| `close`     | `boolean`                                                                                 | Não         | `false`            | Se `true`, exibe um botão de fechar (`Close` do MUI) dentro da notificação. |
| `icon`      | `ReactElement`                                                                            | Não         | —                  | Ícone opcional exibido à esquerda da mensagem. |
| `color`     | `string`                                                                                  | Não         | `'primary.main'`   | Cor de fundo da notificação (aceita qualquer valor resolvível como cor do tema/`bgcolor`). |
| `textColor` | `string`                                                                                  | Não         | `'common.white'`   | Cor do texto e dos ícones (resolvida via `getColor` do tema). |
| `location`  | `'top' \| 'left' \| 'right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'`               | Não         | `'top'`             | Posição na tela, mapeada internamente para `anchorOrigin` do MUI (`'top'` → topo centro, `'left'`/`'right'` → topo esquerda/direita, `'bottom'` → base centro, `'bottom-left'`/`'bottom-right'` → base esquerda/direita). |
| `...rest`   | `Omit<MuiSnackbarProps, 'color' \| 'autoHideDuration' \| 'anchorOrigin' \| 'onClose'>`    | Não         | —                  | Demais props do `Snackbar` do MUI, repassadas direto (ex: `TransitionComponent`, `ContentProps`, `sx`, `className`...). |

## Exemplo de uso

```tsx
import { useState } from 'react';
import { Snackbar } from '@/components';

const [open, setOpen] = useState(true);

<Snackbar
  open={open}
  onClose={(_e, reason) => reason !== 'clickaway' && setOpen(false)}
  message="Salvo com sucesso"
  color="success.main"
  close
/>
```

Uso recomendado, via hook (ver Dependências relevantes):

```tsx
import { useNotification } from '@/hooks/useNotification';

const { showSuccess, showError } = useNotification();

showSuccess('Salvo com sucesso');
showError('Algo deu errado');
```

## Dependências relevantes

- `Box`, `IconButton` e `Text` de `@/components`.
- `Snackbar` do MUI (`@mui/material`) e `useTheme`.
- `getColor` de `@/components/styles` (resolve `textColor` a partir do tema).
- Ícone `Close` de `@mui/icons-material` (exibido quando `close={true}`).
- Uso recomendado: hook `useNotification` (`@/hooks/useNotification.tsx`) + `NotificationProvider` (`@/contexts/NotificationContext.tsx`). O provider mantém o estado `open`/`snackbarOptions` e renderiza um único `Snackbar` controlado; `useNotification` expõe `showSuccess`, `showError` e `showSnackbar` (genérico) que disparam esse Snackbar compartilhado. `useNotification` lança erro se usado fora de um `NotificationProvider`.

## Notas

- O motivo de fechamento `'closeClick'` é específico deste componente (não existe no MUI) e é disparado apenas pelo clique no botão de fechar interno (quando `close={true}`). Quem trata `onClose` deve considerar esse motivo além dos nativos do MUI.
- O fechamento por `'clickaway'` é tratado de forma especial: o wrapper interno (`handleClose`) intercepta esse motivo e **não chama** o `onClose` informado. Ou seja, clicar fora da notificação não a fecha — só fecha por tempo (`timeout`), tecla ESC (`escapeKeyDown`) ou pelo botão de fechar (`closeClick`, quando `close={true}`).
- `role="status"` e `aria-live="polite"` já estão implementados no conteúdo da notificação.
- No fluxo via `useNotification`/`NotificationProvider`, apenas uma notificação é exibida por vez (um único `Snackbar` compartilhado) — chamar `showSuccess`/`showError`/`showSnackbar` novamente enquanto uma notificação está visível substitui as opções da notificação atual.
