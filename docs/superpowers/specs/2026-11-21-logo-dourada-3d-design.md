# Logo dourada com 3D no mouse — design curto

**Data:** 2026-11-21
**Por quê:** deixar a marca com cara de luxo, combinando com o cursor de tesoura dourada. O usuário e a Karen viram três opções numa página de teste e escolheram a opção 2.

## Abordagens consideradas
1. **Folha de ouro**: logo em dourado metálico, brilho quente que atravessa. Leve, sem JS.
2. **Ouro + 3D com o mouse** (escolhida): tudo da 1, e no computador a logo inclina seguindo o mouse, com reflexo que segue o cursor.
3. **Ouro + entrada de cinema**: tudo da 1, com faixas de cinema e feixe de luz na abertura. Descartada pelo usuário.

3D "de verdade" (WebGL, logo girando em volume) foi descartado antes: pesado no celular e fora do tom da página.

## O que muda
- **Logo do topo (hero)**: `img/logo.png` continua no HTML (alt e tamanho), mas fica invisível; por cima, uma camada com máscara da própria logo pintada com gradiente dourado (`#F6E7B0` → `#7E5F1C`, a mesma família do `gold`/`goldl` do Tailwind). Relevo com sombras em tom quente. O brilho branco atual vira brilho de luz quente, na abertura e no hover.
- **3D**: só com mouse (`pointerType === 'mouse'`). Inclinação até ~9° de lado e ~7° de cima/baixo, `scale(1.03)`, reflexo radial que segue o cursor. Ao sair, volta ao normal. No celular e com toque: só o brilho.
- **Movimento reduzido**: com `prefers-reduced-motion`, sem inclinação e sem brilho animado (o site já zera animações nesse caso; o JS também não inclina).
- **Logo do rodapé** (decisão do Claude): mesma folha de ouro, parada, sem 3D — é pequena e o 3D ali só distrai. No fundo claro do rodapé, sombra mínima (`drop-shadow(0 1px 0 rgba(60,40,5,.35))`): a sombra do topo deixava uma mancha cinza em volta (visto na prévia).

## Onde
- CSS em `css/input.css` (substitui `.logo-gloss`/`.logo-shine`), rebuild com `npm run build`.
- JS da inclinação em `js/main.js`.
- HTML: só as camadas novas dentro das duas `div` da logo.

## Fora do escopo
`logo.png`, favicon, `og-image.jpg`, cursor e qualquer outra parte da página.

## Pronto quando
Conferido no navegador: topo dourado com 3D no mouse, rodapé dourado, celular sem inclinação, sem erro no console. Publicação no Netlify só com OK do usuário (junto com o "© 2026" do rodapé, que já está pronto localmente).
