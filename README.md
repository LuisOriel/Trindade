# Luís Trindade — Site profissional

Landing page profissional para a marca pessoal de Luís Trindade, com foco em dashboards, CRMs e automação de processos.

## Stack
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Google Fonts via `next/font`
- APIs nativas de IntersectionObserver/scroll para microinterações, sem dependência adicional de animação

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Motion / UX

O site possui:
- Smooth scroll entre âncoras.
- `scroll-margin-top` para compensar a navbar fixa.
- Reveal de seções e elementos ao entrar no viewport.
- Entrada escalonada de cards.
- Estado ativo da navegação conforme a seção visível.
- Indicador de progresso de leitura no topo.
- Microinterações em botões e cards.
- Suporte a `prefers-reduced-motion`.

## Direção de design

Paleta definida:
- #07111F
- #0D1B2A
- #1677FF
- #5EA2FF
- #F5F7FA
- #94A3B8
- #1E293B

Tipografia: Manrope (display) + Inter (interface/corpo).
