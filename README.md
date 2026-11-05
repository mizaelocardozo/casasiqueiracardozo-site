# Site da Casa Siqueira Cardozo

Site estático de uma página, com sede indicada em Brasília-DF. Não precisa de build nem de servidor próprio.

## Publicação

O site é publicado pelo GitHub Pages a partir da branch `main`. Basta enviar uma alteração para essa branch que ele se atualiza.

O domínio `casasiqueiracardozo.com.br` está definido no arquivo `CNAME`. O formulário e o link de contato dependem do e-mail `contato@casasiqueiracardozo.com.br`.

## O que costuma mudar

| O quê | Onde |
|---|---|
| E-mail e WhatsApp | `CONFIG`, no início de `assets/site.js` |
| Textos e dados da empresa | `index.html` |
| Cores e fontes | `:root`, no início de `assets/style.css` |
| Logo | `assets/logo.svg` (marrom), `assets/logo-clara.svg` (fundos escuros), `assets/favicon.svg` (ícone da aba) e `assets/og.png` (imagem de compartilhamento) |

O botão de WhatsApp só aparece quando o número é preenchido em `CONFIG`.

## Como o formulário funciona

Ele abre o aplicativo de e-mail (ou o WhatsApp) do visitante com a mensagem pronta. Nada é armazenado no site.
