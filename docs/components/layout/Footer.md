# Footer

Componente de seção de rodapé da página. Renderiza logo, colunas de links e uma linha de copyright, com todo o conteúdo lido de arquivos de constants (não recebe nada via props).

## Quando usar

Usar uma vez por layout/página, no final da árvore de componentes (ex: dentro do layout raiz do app), para exibir o rodapé padrão do site. Não é feito para ser reaproveitado com conteúdos diferentes por instância — quem quiser mudar links, seções ou logo deve editar os arquivos de constants (`src/constants/footer.ts`, `src/constants/images.ts`), não passar props (o componente não aceita nenhuma).

## Props

Este componente **não aceita props** — é declarado como `React.FC` sem props (`export const Footer: React.FC = () => {...}`). Todo o conteúdo exibido vem fixo de:

- `FOOTER` (`src/constants/footer.ts`) — seções e links do rodapé.
- `IMAGES.site.logo` (`src/constants/images.ts`) — logo exibida.

Para alterar o conteúdo do rodapé, edite esses arquivos de constants.

## Exemplo de uso

```tsx
import { Footer } from '@/components';

<Footer />
```

## Dependências relevantes

- `src/constants/footer.ts` (`FOOTER`) — define `FOOTER.home`, um array de seções (`{ label, links }`), cada uma com uma lista de `links` (`{ label, href }`).
- `src/constants/images.ts` (`IMAGES.site.logo`) — `src` do logo exibido no rodapé.
- Componentes internos do kit usados: `Container` (de `src/components/layout/PageContainer`), `Box`, `Text`, `Divider`, `Image`, `TextButton` — todos importados de `@/components`.
- Requer um `ThemeProvider` do MUI ativo (usa cores de tema: `background.paper`, `grey.500`, `grey.400`, `grey.700`, `common.white`, `textDisabled`, `secondary.main`).

## Notas

- ⚠️ Conteúdo ainda não definido / em desenvolvimento: `FOOTER.home` hoje tem uma única seção com `label: ''` e um único link `{ label: '', href: '#' }` — placeholders vazios, não é bug.
- ⚠️ `IMAGES.site.logo` está vazio (`''`) — a `Image` do logo ainda não tem uma imagem real configurada.
- O logo é renderizado com `sx={{ filter: 'brightness(0) invert(1)' }}`, o que força a imagem a aparecer totalmente branca, independentemente da imagem original usada em `IMAGES.site.logo`.
- O texto "© Todos os direitos reservados." é fixo no JSX do componente — não vem de nenhuma constant.
- Layout responsivo: a coluna do logo ocupa `100%` da largura em `xs` e `20%` a partir de `md`; o bloco de seções de links (`Box row="md"`) fica em coluna até `md` e vira linha a partir de `md`.
- O componente já embute um `Divider` e o texto de copyright fixos — não há como remover/ocultar essas partes sem alterar o código-fonte.
