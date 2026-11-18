// Monta a pasta publicar/ com tudo o que vai para a hospedagem, já com o domínio.
// Uso: npm run publicar -- belezanosofa.com.br
// O index.html do projeto não é alterado: o domínio entra só na cópia em publicar/.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (process.argv[2] || "").trim().replace(/^https?:\/\//, "").replace(/\/+$/, "");
if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(arg)) {
  console.error("Informe o domínio. Exemplo: npm run publicar -- belezanosofa.com.br");
  process.exit(1);
}
const site = `https://${arg.toLowerCase()}/`;
const out = path.join(root, "publicar");

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "css"), { recursive: true });

// index.html com endereço oficial, prévia com URL completa e dados do Google completos
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const swap = (from, to) => {
  if (!html.includes(from)) throw new Error("Trecho não encontrado no index.html: " + from.slice(0, 60));
  html = html.replace(from, to);
};
swap(`<meta property="og:image" content="img/og-image.jpg">`, `<meta property="og:image" content="${site}img/og-image.jpg">`);
html = html.replace(/<!-- Quando o domínio existir:[\s\S]*?-->\n/, "");
swap(`<meta name="twitter:card" content="summary_large_image">`,
  `<meta name="twitter:card" content="summary_large_image">
<meta property="og:url" content="${site}">
<link rel="canonical" href="${site}">`);
html = html.replace(/(<script type="application\/ld\+json">\n)([\s\S]*?)(\n<\/script>)/, (all, open, json, close) => {
  const data = JSON.parse(json);
  const salon = data.find(item => item["@type"] === "HairSalon");
  salon.url = site;
  salon.image = `${site}img/og-image.jpg`;
  salon.logo = `${site}img/logo.png`;
  return open + JSON.stringify(data, null, 2) + close;
});
fs.writeFileSync(path.join(out, "index.html"), html);

// robots.txt e sitemap.xml
fs.writeFileSync(path.join(out, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`);

// llms.txt: resumo do negócio para ferramentas de IA (ChatGPT, Perplexity, Claude...).
// Ao mudar serviços, horários ou contatos no index.html, atualize aqui também.
fs.writeFileSync(path.join(out, "llms.txt"), `# Beleza no Sofá

> Karen Paz, cabeleireira que atende em domicílio em Duque de Caxias (RJ) e região. Os agendamentos são feitos pelo WhatsApp.

A Karen vai até a casa da cliente e leva secador, escova, produtos e capa. Antes de marcar, a cliente diz o serviço que deseja e manda uma foto do cabelo pelo WhatsApp para uma avaliação prévia. O valor é confirmado antes do agendamento.

## Serviços

- Escova Simples e Modelagem: lisa, com volume ou ondulada.
- Corte Simples: feminino, com finalização.
- Coloração e Mechas: retoque de raiz, tonalização, mechas.
- Cronograma Capilar Personalizado: cronogramas feitos para a necessidade de cada cabelo.
- Colocação e Manutenção de Megahair: técnicas de fita e ponto americano.
- Alisamentos: progressivas com e sem formol e botox.
- Soltura de Cachos: soltura ácida, mantendo a integridade dos cachos.

## Atendimento

- Região: Duque de Caxias (RJ) e região.
- Dias e horários: de segunda a sábado, das 8h às 18h. Domingos e feriados, somente com horário agendado.
- Formas de pagamento: dinheiro, Pix ou cartão.
- Deslocamento: o valor depende do endereço e é combinado pelo WhatsApp, junto com o valor do serviço.
- Teste de mecha: depende do serviço; a Karen avisa na avaliação pelo WhatsApp.

## Contato

- [Site](${site})
- [WhatsApp (21) 99015-8773](https://wa.me/5521990158773)
- [Instagram @beleza.no.sofa](https://www.instagram.com/beleza.no.sofa/)
- [TikTok @belezanosofa](https://www.tiktok.com/@belezanosofa)
- [Perfil no Google](https://share.google/FNXSr7RnwOHSWry5n)
`);

// CSS final, JS e imagens
fs.copyFileSync(path.join(root, "css", "output.css"), path.join(out, "css", "output.css"));
fs.cpSync(path.join(root, "js"), path.join(out, "js"), { recursive: true });
fs.cpSync(path.join(root, "img"), path.join(out, "img"), { recursive: true });

const count = dir => fs.readdirSync(dir, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? count(path.join(dir, e.name)) : 1), 0);
console.log(`Pasta publicar/ pronta para ${site} (${count(out)} arquivos).`);
console.log("Envie o conteúdo dessa pasta para a hospedagem.");
