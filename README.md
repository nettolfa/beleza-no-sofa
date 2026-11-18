# Beleza no Sofá

Landing page da Karen Paz, cabeleireira em domicílio em Duque de Caxias (RJ) e região.

Site no ar: https://belezanosofa.com.br

Feito com HTML, Tailwind CSS e JavaScript puro: galeria com ampliação, menu de celular acessível,
dados estruturados para o Google (HairSalon e FAQPage), imagens WebP otimizadas e script de publicação
que gera sitemap, robots.txt e llms.txt com o domínio.

## Estrutura

```
index.html            página (todo o conteúdo e os textos)
css/input.css         estilos próprios + diretivas do Tailwind (edite este)
css/output.css        CSS final gerado pelo Tailwind (não edite à mão)
js/main.js            galeria com ampliação, menu do celular, brilhos e botão flutuante
img/                  imagens otimizadas usadas no site (WebP + JPEG de reserva)
img/trabalhos/        fotos ampliadas da galeria (WebP)
img/trabalhos/thumb/  miniaturas da galeria (400px, WebP + JPEG)
img/og-image.jpg      prévia que aparece ao compartilhar o link (1200x630)
assets/               arquivos originais (não são carregados pelo site)
robots.txt            instruções para o Google (versão local, sem domínio)
scripts/publicar.mjs  monta a pasta publicar/ com o domínio
tailwind.config.js    cores e fontes do tema
```

## Como editar

1. Instale as dependências uma vez: `npm install`
2. Depois de mudar `index.html`, `css/input.css` ou `js/main.js`, gere o CSS de novo:
   `npm run build`
3. Para gerar automaticamente enquanto edita: `npm run dev`

Perguntas frequentes: ao incluir ou mudar uma pergunta, faça o mesmo no bloco `FAQPage`
do `<script type="application/ld+json">` no `<head>`.

## Como publicar

1. Gere a pasta de publicação com o domínio:
   `npm run publicar -- belezanosofa.com.br`
   Ela recebe o CSS atualizado, o endereço oficial da página, a prévia de compartilhamento com URL
   completa, o `sitemap.xml`, o `robots.txt` com a linha do sitemap e o `llms.txt` (resumo para
   ferramentas de IA, escrito dentro de `scripts/publicar.mjs`). O `index.html` do projeto não muda.
   Ao mudar serviços, horários ou contatos, atualize também o texto do `llms.txt` no script.
2. Envie o conteúdo da pasta `publicar/` para a hospedagem (no Netlify: arraste a pasta em app.netlify.com/drop
   ou no painel do site, em "Deploys").
3. Nunca envie `assets/`, `fotos de perfil secundario/` nem `node_modules/`.
4. Depois de cada mudança no site, repita os passos 1 e 2.

## Contatos usados na página

- WhatsApp: (21) 99015-8773 (`https://wa.me/5521990158773`)
- Instagram: @beleza.no.sofa
- TikTok: @belezanosofa
- Perfil da Empresa no Google: https://share.google/FNXSr7RnwOHSWry5n
