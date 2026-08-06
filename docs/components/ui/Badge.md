# Badge

Hoje é um **re-export direto** do `Badge` do MUI (`export { Badge } from '@mui/material'`). Serve para exibir um pequeno indicador (número, ponto) sobre outro elemento (ícone, avatar, etc.).

## Quando usar

Usar como qualquer `Badge` do MUI — contador de notificações, indicador de status sobre um ícone/avatar. Como ainda não tem nenhuma integração com o design system do projeto (ver Notas), usar sabendo que cores/espaçamento/hover precisam ser feitos manualmente via `sx` ou props nativas do MUI.

## Props

O componente não define props próprias — aceita exatamente as props do `Badge` do MUI (`BadgeProps`, reexportado also). Principais:

| Prop           | Tipo                                                                 | Obrigatório | Padrão       | Descrição                                                         |
|-----------------|------------------------------------------------------------------------|-------------|--------------|----------------------------------------------------------------------|
| `children`      | `ReactNode`                                                            | Não         | —            | Elemento sobre o qual o badge é posicionado.                        |
| `badgeContent`  | `ReactNode`                                                            | Não         | —            | Conteúdo exibido dentro do badge (número, texto, etc.).             |
| `color`         | `'default' \| 'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning'` | Não | `'default'` | Cor do badge, direto da paleta do tema MUI.                         |
| `variant`       | `'standard' \| 'dot'`                                                  | Não         | `'standard'` | `'dot'` exibe só um ponto, sem conteúdo.                             |
| `overlap`       | `'rectangular' \| 'circular'`                                          | Não         | `'rectangular'` | Forma de referência para o recorte/posicionamento do badge.       |
| `anchorOrigin`  | `{ vertical: 'top' \| 'bottom'; horizontal: 'left' \| 'right' }`       | Não         | `{ vertical: 'top', horizontal: 'right' }` | Posição do badge em relação ao elemento filho.  |
| `invisible`     | `boolean`                                                              | Não         | `false`      | Força o badge a ficar invisível.                                    |
| `max`           | `number`                                                               | Não         | `99`         | Valor máximo exibido antes de truncar com `+` (ex: `99+`).          |
| `showZero`      | `boolean`                                                              | Não         | `false`      | Exibe o badge mesmo quando `badgeContent` é `0`.                    |
| `component`     | `ElementType`                                                          | Não         | —            | Elemento raiz customizado.                                          |
| `sx`            | `SxProps<Theme>`                                                       | Não         | —            | Estilos customizados via sistema `sx` do MUI.                       |

Lista completa e detalhes de versão em: https://mui.com/material-ui/api/badge/

## Exemplo de uso

```tsx
import { Badge } from '@/components';
import MailIcon from '@mui/icons-material/Mail';

<Badge badgeContent={4} color="primary">
  <MailIcon />
</Badge>
```

## Dependências relevantes

- Requer `ThemeProvider` do MUI (para resolver `color` e demais tokens do tema).
- Nenhuma dependência de código próprio do projeto — é puramente MUI.

## Notas

- ⚠️ **Incompleto**: hoje é um re-export direto do `Badge` do MUI, sem nenhuma customização do design system (sem `SpacingProps`, `hover`, cores customizadas via caminho do tema/`getColor`, etc., que o resto do kit de componentes tem). Se o padrão do projeto for aplicado no futuro, este arquivo deve ganhar um wrapper próprio (`Badge.tsx` + `types.ts`) como os demais componentes de `src/components/ui/`.
- Por ser um re-export puro, qualquer atualização de versão do MUI reflete diretamente aqui sem camada de compatibilidade.
