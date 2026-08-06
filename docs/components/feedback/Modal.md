# Modal

Wrapper sobre o `Modal` do MUI: um `Box` de conteúdo centralizado na tela, com título opcional, botão de fechar opcional e transição de fade. Diferente do `Drawer`, aqui `open`/`onClose` são controlados normalmente pelo componente pai.

## Quando usar

- Diálogos de confirmação, formulários curtos, detalhes de um item — qualquer conteúdo que precise bloquear a interação com o resto da tela.
- Não usar para painéis laterais persistentes ou menus (ver `Drawer`) nem para notificações temporárias sem interação (ver `Snackbar`).

## Props

| Prop      | Tipo                 | Obrigatório | Padrão | Descrição |
|-----------|----------------------|-------------|--------|-----------|
| `open`    | `boolean`            | Sim         | —      | Controla a visibilidade do modal. |
| `onClose` | `() => void`         | Não         | —      | Chamado ao fechar (clique fora do conteúdo, tecla ESC, ou clique no botão de fechar quando `close={true}`). |
| `children`| `ReactNode`          | Não         | —      | Conteúdo do modal. |
| `close`   | `boolean`            | Não         | `false`| Se `true`, exibe um ícone de fechar (`Close` do MUI) no canto superior direito. |
| `paper`   | `boolean`            | Não         | `false`| Se `true`, usa a cor de fundo "paper" do tema em vez do `background.default`. |
| `title`   | `string \| ReactNode`| Não         | —      | Título do modal. Uma `string` vira um `Text` já estilizado (`variant="h6"`, negrito). Um `ReactNode` é renderizado como enviado, sem estilização adicional. |
| `width`   | `string \| number`   | Não         | `400`  | Largura do conteúdo do modal (respeitando `maxWidth: 90vw`). |

## Exemplo de uso

```tsx
import { useState } from 'react';
import { Modal, Text, Button } from '@/components';

const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)} title="Confirmar ação" close>
  <Text>Tem certeza que deseja continuar?</Text>
  <Button onClick={() => setOpen(false)}>Fechar</Button>
</Modal>
```

## Dependências relevantes

- `Box`, `Text` e `IconButton` de `@/components`.
- `Modal` e `Fade` do MUI (`@mui/material`).
- Ícone `Close` de `@mui/icons-material` (exibido quando `close={true}`).

## Notas

- Já implementa acessibilidade básica: `role="dialog"`, `aria-modal="true"` e `aria-labelledby` ligado ao `id` do título (gerado via `useId()`) quando `title` é uma `string`. Quando `title` é um `ReactNode`, `aria-labelledby` não é setado (⚠️ não há `id` automático nesse caso, fica a cargo de quem passa o `ReactNode`).
- Se nem `title` nem `close` forem passados, o cabeçalho do modal (linha com título/botão de fechar) não é renderizado.
- O fechamento pelo clique fora do conteúdo ou tecla ESC depende do comportamento padrão do `Modal` do MUI — chama `onClose` sem distinguir o motivo (ao contrário do `Snackbar`, que expõe motivos de fechamento customizados).
- Usa `closeAfterTransition` do MUI: o conteúdo só é desmontado após a transição de `Fade` terminar.
