# Drawer

Painel lateral (ou dropdown) que se abre a partir de um botão gatilho embutido no próprio componente. Tem duas variantes: `overlay` (painel do MUI que desliza sobre o conteúdo) e `inline` (dropdown posicionado relativo ao gatilho, sem sobrepor a tela toda).

## Quando usar

- Menus de navegação (ex: menu hambúrguer mobile), painéis de filtro, carrinhos laterais — variante `overlay`.
- Dropdowns simples ancorados a um botão (ex: menu de opções, painel de notificações) — variante `inline`.
- Não usar quando for necessário controlar a abertura/fechamento a partir de um componente pai: o `Drawer` gerencia seu próprio estado internamente e não expõe `open`/`onClose` (ver Notas).

## Props

| Prop        | Tipo                                                              | Obrigatório | Padrão                          | Descrição |
|-------------|--------------------------------------------------------------------|-------------|----------------------------------|-----------|
| `children`  | `React.ReactNode`                                                  | Sim         | —                                 | Conteúdo exibido dentro do painel. |
| `variant`   | `'overlay' \| 'inline'`                                            | Não         | `'overlay'`                      | `'overlay'` usa o `Drawer` real do MUI, deslizando sobre a borda indicada por `location`. `'inline'` renderiza um dropdown posicionado de forma absoluta relativo ao botão gatilho (via `Collapse` + `ClickAwayListener`), sem usar o `Drawer` do MUI. |
| `location`  | `'top' \| 'left' \| 'right' \| 'bottom'`                           | Não         | `'top'`                           | Em `overlay`, define de qual borda da tela o painel desliza (mapeado para `anchor` do MUI). Em `inline`, define a direção em que o dropdown se abre em relação ao gatilho. |
| `icon`      | `React.ReactNode`                                                  | Não         | ícone `Menu` do MUI (via `Icon`)  | Ícone do botão que abre o Drawer. |
| `iconClose` | `React.ReactNode`                                                  | Não         | ícone `Close` do MUI (via `Icon`) | Ícone de fechar. Em `overlay`, é o botão interno de fechar dentro do painel. Em `inline`, é o ícone que o próprio botão gatilho passa a exibir quando o painel está aberto. |
| `...props`  | `Omit<MuiDrawerProps, 'variant' \| 'open' \| 'onClose'>`           | Não         | —                                 | Demais props do `Drawer` do MUI (ex: `PaperProps`, `elevation`, `keepMounted`, `sx`, `className`...). Só têm efeito quando `variant='overlay'`, sendo repassadas direto ao `Drawer` do MUI. Em `variant='inline'`, apenas `sx` e `className` são aplicados ao painel — o restante dessas props é ignorado silenciosamente. |

## Exemplo de uso

```tsx
import { Drawer, Text } from '@/components';

// Variante overlay (padrão) — painel do MUI deslizando da esquerda
<Drawer variant="overlay" location="left">
  <Text>Conteúdo do menu</Text>
</Drawer>

// Variante inline — dropdown ancorado no botão, abrindo para baixo
<Drawer variant="inline" location="bottom">
  <Text>Opções</Text>
</Drawer>
```

## Dependências relevantes

- `Box`, `IconButton` e `Icon` de `@/components`.
- `Drawer`, `Collapse` e `ClickAwayListener` do MUI (`@mui/material`).
- Ícones `Menu` e `Close` de `@mui/icons-material` (usados como padrão quando `icon`/`iconClose` não são informados).

## Notas

- `open`/`onClose` do MUI foram deliberadamente omitidos do tipo público (`Omit<MuiDrawerProps, 'variant' | 'open' | 'onClose'>`). O Drawer controla seu próprio estado de aberto/fechado internamente via `useState`, não são props controláveis de fora.
- ⚠️ O tipo `MuiDrawerProps` original inclui a prop `anchor`, e ela **não** foi omitida do tipo `DrawerProps`. Como `{...props}` é espalhado depois de `anchor={location}` no JSX do componente, passar `anchor` explicitamente sobrescreve o valor calculado a partir de `location`. Isso não parece intencional, mas é o comportamento atual do código — evite passar `anchor` diretamente, use `location`.
- Na variante `inline`, o painel é posicionado com `position: absolute` e `zIndex: 1200`, sem qualquer lógica de colisão com a borda da viewport — se o conteúdo for grande ou o gatilho estiver perto da borda da tela, pode vazar para fora da área visível. ⚠️ Não há tratamento para esse caso.
- O botão gatilho tem `aria-label` dinâmico (`"Abrir menu"` / `"Fechar menu"`), tanto em `overlay` quanto em `inline`.
