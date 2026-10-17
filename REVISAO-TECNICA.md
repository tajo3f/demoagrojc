# Revisão técnica — Agropecuária JC

## Arquitetura
Site institucional multipágina. O conteúdo principal não depende de JavaScript para existir ou navegar.

## Direção visual
A identidade parte da logomarca fornecida: verde escuro, preto, vermelho do café e fundos claros quentes. O objetivo é transmitir campo, confiança, proximidade e robustez sem cair em estética genérica de template.

## Motion
- barra de progresso no scroll;
- reveal por IntersectionObserver;
- parallax leve em fotos;
- inclinação sutil do hero apenas em ponteiro fino;
- menu mobile;
- botão de voltar ao topo;
- `prefers-reduced-motion` respeitado.

## Conteúdo e veracidade
Não foram inventados:
- anos de mercado;
- número de clientes;
- marcas vendidas;
- certificações;
- preços;
- rating numérico do Google;
- estoque.

As avaliações usadas são trechos fornecidos pelo usuário.

## SEO
- title e meta description por página;
- HTML semântico;
- Schema.org `Store`;
- conteúdo local para Conceição do Castelo;
- headings estruturados;
- alt text;
- URLs simples;
- página 404;
- robots.txt.

`canonical` e Open Graph usam caminhos relativos nesta versão de demonstração porque o domínio definitivo não foi informado. Na publicação final, devem ser convertidos para URLs absolutas.

## Performance
- imagens convertidas para WebP;
- lazy loading fora da dobra;
- JavaScript próprio pequeno;
- sem bibliotecas externas;
- sem fonte externa;
- dimensões de imagens definidas onde relevante.

## Acessibilidade
- skip link;
- landmarks semânticos;
- foco visível;
- botões reais;
- `aria-label` quando necessário;
- menu com `aria-expanded`;
- redução de movimento;
- navegação funcional sem JavaScript nas páginas principais.
